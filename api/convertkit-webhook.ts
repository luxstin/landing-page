import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const sig = req.headers["x-webhook-secret"];
    if (sig !== process.env.WEBHOOK_SECRET) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    const payload = req.body as any;
    const email = payload?.record?.email;
    if (!email) return res.status(400).json({ error: "Missing email in payload" });

    const tagId = process.env.CONVERTKIT_TAG_ID;
    const apiKey = process.env.CONVERTKIT_API_KEY;

    const r = await fetch(`https://api.convertkit.com/v3/tags/${tagId}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: apiKey, email }),
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: "ConvertKit failed", details: data });

    return res.status(200).json({ ok: true, result: data });
  } catch (e: any) {
    return res.status(500).json({ error: "Server error", details: e?.message || String(e) });
  }
}
