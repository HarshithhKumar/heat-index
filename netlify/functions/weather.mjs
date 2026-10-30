const ALLOWED = {
  weather: (query) =>
    `https://api.openweathermap.org/data/2.5/weather?${query}`,
  forecast: (query) =>
    `https://api.openweathermap.org/data/2.5/forecast?${query}`,
  air_pollution: (query) =>
    `https://api.openweathermap.org/data/2.5/air_pollution?${query}`,
  geocode_reverse: (query) =>
    `https://api.openweathermap.org/geo/1.0/reverse?${query}`,
};

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export default async function weather(request) {
  try {
    const params = new URL(request.url).searchParams;
    const endpoint = params.get("endpoint");

    if (!endpoint || !Object.hasOwn(ALLOWED, endpoint)) {
      return jsonResponse(
        { message: "Missing or invalid 'endpoint' param." },
        400
      );
    }

    const allowedKeys = ["q", "lat", "lon", "units", "lang", "limit"];
    const query = [];

    for (const key of allowedKeys) {
      if (params.has(key)) {
        query.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(params.get(key))}`
        );
      }
    }

    const key = process.env.OPENWEATHER_KEY;
    if (!key) {
      return jsonResponse(
        { message: "Server misconfigured: missing OPENWEATHER_KEY." },
        500
      );
    }
    query.push(`appid=${encodeURIComponent(key)}`);

    if (
      endpoint === "air_pollution" &&
      (!params.get("lat") || !params.get("lon"))
    ) {
      return jsonResponse(
        { message: "air_pollution requires lat and lon." },
        400
      );
    }

    const response = await fetch(ALLOWED[endpoint](query.join("&")));
    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      return jsonResponse(await response.json(), response.status);
    }

    return new Response(await response.text(), {
      status: response.status,
      headers: contentType ? { "content-type": contentType } : undefined,
    });
  } catch (error) {
    console.error("weather function error:", error);
    return jsonResponse({ message: "Internal server error" }, 500);
  }
}
