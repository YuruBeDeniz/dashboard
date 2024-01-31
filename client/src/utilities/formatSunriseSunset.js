export function formatSunrise(sunrise, timezone) {
    const sunriseDate = new Date((sunrise + timezone) * 1000);
    const sunriseHours = sunriseDate.getUTCHours();
    const sunriseMinutes = sunriseDate.getUTCMinutes();
  
    return sunriseMinutes < 10 ? `${sunriseHours}:0${sunriseMinutes}` : `${sunriseHours}:${sunriseMinutes}`
}

export function formatSunset(sunset, timezone) {
    const sunsetDate = new Date((sunset + timezone) * 1000);
    const sunsetHours = sunsetDate.getUTCHours();
    const sunsetMinutes = sunsetDate.getUTCMinutes();
  
    return sunsetMinutes < 10 ? `${sunsetHours}:0${sunsetMinutes}` : `${sunsetHours}:${sunsetMinutes}`;
}

