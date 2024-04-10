const URL_BASE = "https://weatherapp-of0p.onrender.com/api/weather";

export const getCitiesWeather = async () => {
    const response = await fetch(URL_BASE);
    const data = await response.json();
    return data;
}

export const refreshWeatherData = async () => {
    const response = await fetch(`${URL_BASE}/refresh`);
    const data = await response.text();
    return data;
}

export const getCityWeather = async (cityName) => {
    const response = await fetch(`${URL_BASE}/forecast/${cityName}`);
    const data = await response.json();
    return data;
}

export const addCity = async (cityName) => {
    const response = await fetch(`${URL_BASE}/cities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city: cityName })
    });
    return response;
}

export const deleteCity = async (cityName) => {
    const response = await fetch(`${URL_BASE}/cities`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city: cityName })
    });
    const data = await response.text();
    return data;
}