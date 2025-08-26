import { getBitmapSat } from '../../../oci/getBitmapSat.js';

export const config = {
  runtime: 'nodejs',
};

export async function GET(request, context) {
  const number = parseInt(context.params.number);

  try {
    const sat = await getBitmapSat(number);
    const inscription = await fetch(`https://ordinals.com/r/sat/${sat}/at/-1`).then(r => r.json());
    const meta = await fetch(`https://api-mainnet.magiceden.dev/v2/ord/btc/inscriptions/${inscription.id}`).then(r => r.json());

    return new Response(JSON.stringify({
      bitmap: `${number}.bitmap`,
      sat,
      inscriptionId: inscription.id,
      owner: meta.owner
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
