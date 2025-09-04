import fetch from "node-fetch";

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const { username, quantity } = body;

    const apiKey = process.env.SMM_API_KEY; 
    const serviceId = process.env.SMM_SERVICE_ID; 

    // Gọi API SmmProvider
    const response = await fetch("https://smmprovider.co/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        key: apiKey,
        action: "add",
        service: serviceId,
        link: `https://www.tiktok.com/@${username}`,
        quantity: quantity
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
