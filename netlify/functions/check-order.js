// netlify/functions/check-order.js
import fetch from "node-fetch";

export async function handler() {
  try {
    const response = await fetch("https://smmprovider.com/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: process.env.SMM_API_KEY, // để API key trong biến môi trường
        action: "services",
      }),
    });

    const services = await response.json();
    const tiktok = services.find((s) => s.service == 9074);
    const insta = services.find((s) => s.service == 6450);

    const calcPrice = (rate, factor) =>
      Math.round(rate * factor * 1.013); // cộng 1.3%

    return {
      statusCode: 200,
      body: JSON.stringify({
        tiktok: {
          1000: calcPrice(tiktok.rate, 10),
          2000: calcPrice(tiktok.rate, 20),
          5000: calcPrice(tiktok.rate, 50),
        },
        instagram: {
          1000: calcPrice(insta.rate, 10),
          2000: calcPrice(insta.rate, 20),
          5000: calcPrice(insta.rate, 50),
        },
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: "Error: " + err.message };
  }
}
