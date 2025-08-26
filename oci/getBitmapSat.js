export async function getBitmapSat(bitmapNumber) {
  const allPages = [
    'https://ordinals.com/content/01bba6c58af39d7f199aa2bceeaaba1ba91b23d2663bc4ef079a4b5e442dbf74i0',
    'https://ordinals.com/content/bb01dfa977a5cd0ee6e900f1d1f896b5ec4b1e3c7b18f09c952f25af6591809fi0',
    'https://ordinals.com/content/bb02e94f3062facf6aa2e47eeed348d017fd31c97614170dddb58fc59da304efi0',
    'https://ordinals.com/content/bb037ec98e6700e8415f95d1f5ca1fe1ba23a3f0c5cb7284d877e9ac418d0d32i0',
    'https://ordinals.com/content/bb9438f4345f223c6f4f92adf6db12a82c45d1724019ecd7b6af4fcc3f5786cei0',
    'https://ordinals.com/content/bb0542d4606a9e7eb4f31051e91f7696040db06ca1383dff98505618c34d7df7i0',
    'https://ordinals.com/content/bb06a4dffba42b6b513ddee452b40a67688562be4a1345127e4d57269e6b2ab6i0',
    'https://ordinals.com/content/bb076934c1c22007b315dd1dc0f8c4a2f9d52f348320cfbadc7c0bd99eaa5e18i0'
  ];

  const page = Math.floor(bitmapNumber / 100000);
  let data = await fetch(allPages[page]).then(r => r.text());

  if (page === 2 || page === 3) {
    data = '[' + data + ']';
    data = JSON.parse(data);
    data = [data.slice(0, 99999), data.slice(100000, 199999)];
  } else {
    try { data = JSON.parse(data.replaceAll('\\n ', '')); } catch (e) {}
    try { data = JSON.parse(data.replaceAll(' ', '')); } catch (e) {}
  }

  const fullSats = [];
  data[0].forEach((sat, i) => {
    if (i === 0) fullSats.push(parseInt(sat));
    else fullSats.push(parseInt(fullSats[i - 1]) + parseInt(sat));
  });

  const filledArray = Array(100000).fill(0);
  data[1].forEach((index, i) => {
    filledArray[index] = fullSats[i];
  });

  return filledArray[bitmapNumber % 100000];
}
