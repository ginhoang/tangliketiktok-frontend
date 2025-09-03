
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
    const steps = ["queued","processing","partial","completed"];
    const status = steps[Math.floor(Math.random()*steps.length)];
    return { statusCode: 200, headers, body: JSON.stringify({ status }) };
  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: "Server error" }) };
  }
};
