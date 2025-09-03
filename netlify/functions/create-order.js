
exports.handler = async (event, context) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }
  try {
    const data = JSON.parse(event.body || "{}");
    const username = (data.username || "").trim();
    const pkg = String(data.pkg || "100");
    if (!/^[A-Za-z0-9._]{2,24}$/.test(username)) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid username" }) };
    }
    const orderId = "ORD-" + Math.random().toString(36).slice(2,8).toUpperCase();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ orderId, status: "received", etaMinutes: 30, pkg, username })
    };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Server error" }) };
  }
};
