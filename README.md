# Heat Index

**Know when things are heating up.**

[**Open Heat Index**](https://heat-index-hk.netlify.app)

Heat Index is a small personal weather dashboard I built to check weather conditions for different cities in one place. It is a self-directed project made to practise working with a weather API, presenting live data in a simple interface, and making a useful frontend experience.

It is intentionally lightweight. The goal is not to build a large weather platform, but to have a straightforward app that makes it easy to look up a city, see the current conditions, and get a quick sense of the forecast.

## What the app does

### Current weather

Search for a city and view its current weather, including temperature, feels-like temperature, condition, wind speed, humidity, pressure, and cloud cover.

### Forecast

See the upcoming forecast and a set of hourly weather entries, so you can get a quick idea of how conditions may change throughout the day.

### Air quality

View the Air Quality Index and available pollutant readings, including PM2.5, PM10, ozone (O₃), and nitrogen dioxide (NO₂).

### Sunrise and sunset

Check local sunrise and sunset times, day length, and the location's time zone.

### Location and display preferences

- Search for weather by city.
- Use browser location access when available.
- Switch between light and dark themes.
- Keep the most recently searched city in the browser for the next visit.
- Use the dashboard on desktop or mobile screens.

## Built with

- **HTML** for the page structure.
- **CSS** for the layout, responsive styling, cards, and themes.
- **Vanilla JavaScript** for user interactions, API requests, and rendering weather data.
- **OpenWeather API** for current weather, forecast, air pollution, and geocoding data.
- **Netlify Functions** for server-side API requests and keeping the API key out of browser code.
- **Netlify** for hosting and deployment.

No frontend framework or large application stack is required.

## How the API requests work

The browser sends weather requests to the app's `/api/weather` route. Netlify redirects that route to the function at `netlify/functions/weather.mjs`.

The function:

1. Reads the OpenWeather key from the `OPENWEATHER_KEY` environment variable.
2. Accepts only the supported endpoint names.
3. Forwards only the expected query parameters.
4. Requests the data from OpenWeather and returns the response to the frontend.

Supported endpoint values:

- `weather` for current weather.
- `forecast` for the five-day forecast.
- `air_pollution` for air-quality readings.
- `geocode_reverse` for converting coordinates into a location.

The API key is used by the server-side function. It should never be added to frontend JavaScript, HTML, or any committed file.

## Run it locally

### Requirements

- Node.js 20
- An OpenWeather API key
- Git

### 1. Clone the repository

```bash
git clone https://github.com/HarshithhKumar/heat-index.git
cd heat-index
```

### 2. Create your local environment file

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

On macOS or Linux:

```bash
cp .env.example .env
```

Open `.env` and replace the placeholder with your own key:

```env
OPENWEATHER_KEY=your_openweathermap_api_key_here
```

Keep the real `.env` file private. It is ignored by Git and must not be committed.

### 3. Start the local site

From the project root, run:

```bash
npx netlify-cli dev
```

Open [http://localhost:8888](http://localhost:8888) in your browser.

Netlify CLI serves the static frontend from `src` and makes the weather function available through the same `/api/weather` route used by the deployed site.

## Deploy it with Netlify

The repository includes a `netlify.toml` file with the site and function configuration.

1. Import this GitHub repository into Netlify.
2. Add `OPENWEATHER_KEY` in the site's environment variables.
3. Make sure the variable is available to Netlify Functions.
4. Deploy the site.

The publish directory is `src`, and the functions directory is `netlify/functions`. Once the repository is connected, pushes to the configured production branch can trigger new deployments automatically.

## Project structure

```text
.
├── netlify/
│   └── functions/
│       └── weather.mjs
├── src/
│   ├── images/
│   ├── js/
│   │   └── script.js
│   ├── styles/
│   │   └── style.css
│   └── index.html
├── .env.example
├── .gitignore
├── LICENSE
├── netlify.toml
└── package.json
```

## A note about the project

Heat Index is a personal, lightweight weather app. I made it as a practical way to work with API data, JavaScript, responsive styling, and a small serverless function. It is not intended to be a complex commercial weather service; it is a simple project that I can use, learn from, and keep improving.

## License

This project is distributed under the MIT License. See the [LICENSE](LICENSE) file for the complete license terms.
