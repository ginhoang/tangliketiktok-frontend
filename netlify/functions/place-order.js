// netlify/functions/place-order.js
import fetch from "node-fetch";

export async function handler(event) {
  try {
    const { platform, username, qty } = JSON.parse(event.body);

    const serviceId = platform === "tiktok" ? 9074 : 6450;
    const link =
      platform === "tiktok"
        ? `https://www.tiktok.com/@${username}`
        : `https://www.instagram.com/${username}`;

    const response = await fetch("https://smmprovider.com/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: process.env.SMM_API_KEY,
        action: "add",
        service: serviceId,
        link,
        quantity: qty,
      }),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return { statusCode: 500, body: "Error: " + err.message };
  }
}
