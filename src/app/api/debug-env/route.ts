export async function GET() {
  return new Response(JSON.stringify({
    hasKey: !!process.env.OPENAI_API_KEY,
    keyLength: process.env.OPENAI_API_KEY?.length || 0,
    nodeEnv: process.env.NODE_ENV,
    region: process.env.VERCEL_REGION || 'local'
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
