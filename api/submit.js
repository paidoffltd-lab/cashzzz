import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { words, birthdayHeight } = req.body || {};

    if (!Array.isArray(words) || words.length !== 24) {
      return res.status(400).json({ error: "Need 24 words" });
    }

    const cleaned = words.map(w => String(w || "").trim());
    if (cleaned.some(w => !w)) {
      return res.status(400).json({ error: "Empty words not allowed" });
    }

    const sql = neon(process.env.DATABASE_URL);

    await sql`
      insert into submissions (words, birthday_height)
      values (${JSON.stringify(cleaned)}::jsonb, ${birthdayHeight || null})
    `;

    return res.json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: "DB error" });
  }
}