export default async function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }

    if (req.method !== "POST") {
      return res.status(405).json({
        ok: false,
        error: "Method not allowed. Use POST."
      });
    }

    const response = await fetch(
      "https://zoom-webhook-final-914694835.catalystserverless.com/server/send_zoom_sms",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(req.body || {})
      }
    );

    const text = await response.text();

    res.status(response.status);

    try {
      return res.json(JSON.parse(text));
    } catch (e) {
      return res.send(text);
    }
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message || "Proxy error"
    });
  }
}
