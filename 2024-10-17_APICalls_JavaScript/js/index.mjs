const url = "https://api.open-meteo.com/v1/forecast?latitude=40.79&longitude=-77.86&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&current_weather=true&timezone=EST";

let weatherDecodes = [[0, "Clear sky", '<i className="bi bi-cloud-slash"></i>'],
    [1, "Mainly clear", '<i className="bi bi-cloud-slash"></i>'],
    [2, "Partly Cloudy", '<i className="bi bi-cloud-sun"></i>'],
    [3, "Overcast", '<i className="bi bi-cloud-haze2-fill"></i>'],
    [45, "Fog", '<i className="bi bi-cloud-fog"></i>'],
    [48, "Depositing Rime Fog", '<i className="bi bi-cloud-fog"></i>'],
    [51, "Light Drizzle", '<i className="bi bi-cloud-drizzle"></i>'],
    [53, "Moderate Drizzle", '<i className="bi bi-cloud-drizzle"></i>'],
    [55, "Dense Drizzle", '<i className="bi bi-cloud-drizzle-fill"></i>'],
    [56, "Light Freezing Drizzle", '<i className="bi bi-cloud-rain-heavy"></i>'],
    [57, "Dense Freezing Drizzle", '<i className="bi bi-cloud-rain-heavy-fill"></i>'],
    [61, "Slight Rain", '<i className="bi bi-cloud-drizzle-fill"></i>'],
    [63, "Moderate Rain", '<i className="bi bi-cloud-drizzle-fill"></i>'],
    [65, "Heavy Rain", '<i className="bi bi-cloud-drizzle-fill"></i>'],
    [66, "Light Freezing Rain", '<i className="bi bi-cloud-drizzle-fill"></i>'],
    [67, "Heavy Freezing Rain", '<i className="bi bi-cloud-drizzle-fill"></i>'],
    [71, "Slight Snowfall", '<i className="bi bi-snow"></i>'],
    [73, "Moderate Snowfall", '<i className="bi bi-snow"></i>'],
    [75, "Heavy Snowfall", '<i className="bi bi-snow"></i>'],
    [77, "Snow Grains", '<i className="bi bi-snow"></i>'],
    [80, "Slight Rain Showers", '<i className="bi bi-cloud-drizzle-fill"></i>'],
    [81, "Moderate Rain Showers", '<i className="bi bi-cloud-drizzle-fill"></i>'],
    [82, "Violent Rain Showers", '<i className="bi bi-cloud-drizzle-fill"></i>'],
    [85, "Slight Snow Showers", '<i className="bi bi-snow"></i>'],
    [86, "Heavy Snow Showers", '<i className="bi bi-snow"></i>'],
    [95, "Thunderstorm", '<i className="bi bi-cloud-lightning-fill"></i>'],
    [96, "Thunderstorm with Slight Hail", '<i className="bi bi-cloud-hail-fill"></i>'],
    [99, "Thunderstorm with Heavy Hail", '<i className="bi bi-cloud-hail-fill"></i>']];

document.addEventListener("DOMContentLoaded", async () =>
{
    console.log("gettingWeatherData");
    const data = await getWeatherData();
    modifyPage(data);

});

async function getWeatherData() {
    try
    {
        console.log("getWeatherData.try")
        const results = await fetch(url);
        console.log(results);
        console.log(results);
        if(results.ok === false)
        {
            throw new Error(results.statusText)
        }
        const data = await results.json();
        console.log(data);
        return data;
    }
    catch (err)
    {
        console.error(err);
        throw new Error(err.message);
    }
}

function modifyPage(data)
{
    document.title = `Weather`;
    document.getElementById("header").innerHTML = ` <i class="bi bi-globe-americas"></i> ${data.latitude}, ${data.longitude} <em>Weather Report<em></em>`;
    document.getElementById("time").textContent = `${data.current_weather.time}`;
    document.getElementById("temperature").innerHTML = `<i class="bi bi-thermometer"></i> ${data.current_weather.temperature}`;
    document.getElementById("temperature-unit").textContent = `${data.current_weather_units.temperature}`;
    document.getElementById("wind-speed").innerHTML = `<i class="bi bi-wind"></i> ${data.current_weather.windspeed}`;
    let code = data.current_weather.weathercode;
    for(let i = 0; i < weatherDecodes.length; i++)
    {
        if(code===weatherDecodes[i][0])
        {
            document.getElementById("weather-code").innerHTML = `${weatherDecodes[i][2]}${weatherDecodes[i][1]}`;
            // Whatever, this doesn't work haha
        }
    }

}



