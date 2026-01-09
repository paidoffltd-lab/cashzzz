import { neon } from "@neondatabase/serverless";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 1) взять строку подключения из разных вариантов env
    const conn =
      process.env.DATABASE_URL ||
      process.env.POSTGRES_URL ||
      process.env.POSTGRES_URL_NON_POOLING ||
      process.env.NEON_DATABASE_URL;

    if (!conn) {
      return res.status(500).json({
        error: "No DB connection env var",
        hint: "Set DATABASE_URL or POSTGRES_URL in Vercel env",
      });
    }

    // 2) body может быть строкой, если прилетело не так
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});
    const { words, birthdayHeight } = body;

    if (!Array.isArray(words) || words.length !== 24) {
      return res.status(400).json({ error: "Need 24 words" });
    }

    const cleaned = words.map(w => String(w || "").trim());
    if (cleaned.some(w => !w)) {
      return res.status(400).json({ error: "Empty words not allowed" });
    }

    const sql = neon(conn);

    await sql`
      insert into submissions (words, birthday_height)
      values (${JSON.stringify(cleaned)}::jsonb, ${birthdayHeight ? String(birthdayHeight).trim() : null})
    `;

    return res.json({ ok: true });
  } catch (e) {
    // чтобы увидеть реальную ошибку (таблица не та, нет прав, env не тот и т.д.)
    return res.status(500).json({ error: "DB error", details: String(e?.message || e) });
  }
}
