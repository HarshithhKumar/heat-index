# Heat Index

**Know when things are heating up.**

**[View the live Heat Index dashboard](https://heat-index-hk.netlify.app)**

Heat Index is a responsive weather dashboard built with HTML, CSS, and vanilla JavaScript. It displays current conditions, forecasts, air quality, and sunrise and sunset times, with city search and light and dark themes.

## Screenshots

### Latest live dashboard

![Heat Index latest live dashboard](./screenshots/latest-dashboard.jpg)

[Open the live Heat Index dashboard](https://heat-index-hk.netlify.app)

## Features

- Current weather and a five-day forecast
- Hourly forecast and weather metrics
- Air quality readings for PM2.5, PM10, O₃, and NO₂
- Sunrise, sunset, and day length
- City search and location-based weather
- Responsive layout with light and dark themes

## Built with

- HTML, CSS, and vanilla JavaScript
- OpenWeather API
- Netlify Functions for server-side API requests

## API

The frontend sends requests through `/api/weather`. The Netlify function keeps the OpenWeather API key on the server and allows only these endpoints:

| `endpoint` | OpenWeather resource |
|---|---|
| `weather` | Current weather |
| `forecast` | Five-day forecast |
| `air_pollution` | Air pollution |
| `geocode_reverse` | Reverse geocoding |

Only the supported query parameters (`q`, `lat`, `lon`, `units`, `lang`, and `limit`) are forwarded. The API key is read from the `OPENWEATHER_KEY` environment variable; do not put it in frontend files or commit it.

## Run locally

Requirements: Node.js 20 and an OpenWeather API key.

1. Copy `.env.example` to `.env` and set `OPENWEATHER_KEY` to your key.
2. From the project root, run:

   ```sh
   npx netlify-cli dev
   ```

3. Open `http://localhost:8888`.

The Netlify CLI serves the static site from `src` and routes `/api/weather` to `netlify/functions/weather.mjs`.

## Deploy to Netlify

1. Import the repository in Netlify.
2. Set `OPENWEATHER_KEY` in the site's environment variables.
3. Deploy. The included `netlify.toml` configures `src` as the publish directory and `netlify/functions` as the functions directory.

## Project structure

```text
.
├── netlify/
│   └── functions/
│       └── weather.mjs
├── screenshots/
├── src/
│   ├── images/
│   ├── js/
│   │   └── script.js
│   ├── styles/
│   │   └── style.css
│   └── index.html
├── .env.example
├── LICENSE
├── netlify.toml
└── package.json
```

## Attribution and license

Heat Index is adapted from [Aakash Gugilla's weather dashboard](https://github.com/Gugilla-Aakash/weather-dashboard), distributed under the MIT License. The original license and copyright notice are retained in [LICENSE](./LICENSE).
