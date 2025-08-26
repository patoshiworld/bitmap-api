export const config = {
  runtime: 'nodejs',
};

export async function GET(request, context) {
  const address = context.params.address;

  try {
    const res = await fetch(`https://api-mainnet.magiceden.dev/v2/ord/btc/wallets/${address}/inscriptions`);
    const inscriptions = await res.json();

    // Filtrar por inscriptions que parezcan .bitmap
    const bitmaps = inscriptions.filter(i =>
      i.name?.endsWith('.bitmap') ||
      i.inscriptionId?.includes('.bitmap') ||
      i.contentType?.includes('text/html')
    );

    return new Response(JSON.stringify({
      wallet: address,
      total: bitmaps.length,
      bitmaps
    }), {
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
