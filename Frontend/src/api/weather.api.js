
export const getCitiesWeather = async () => {
    const response = await fetch('http://localhost:8000/api/weather');
    const data = await response.json();
    return data;
}

export const addCity = async (cityName) => {
    const response = await fetch('http://localhost:8000/api/weather/cities', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city: cityName })
    });
    const data = await response.text();
    return data;
}