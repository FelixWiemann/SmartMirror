import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from "../config"
import { WeatherData, WeatherForecast, WeatherProvider } from './weather-provider';
import { map } from 'rxjs';

@Injectable()
export class OpenWeatherMap implements WeatherProvider {
    api_key:string;
    long:string;
    lat:string;
    currentWeatherCall:string
    foreCastCall:string


    constructor(private http:HttpClient){
      this.api_key=Config.weather.api_key;
      this.long=Config.weather.lon;
      this.lat=Config.weather.lat;  
      this.currentWeatherCall=`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&appid=${this.api_key}&units=metric`
      this.foreCastCall=`https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.long}&appid=${this.api_key}&units=metric`
    }

    async getForeCast(): Promise<WeatherForecast[]> {
        return new Promise((resolve, reject)=>{
            let forecast:WeatherForecast[]=[]
            let data = this.http.get<any>(this.foreCastCall)
            data.forEach(
                (args)=>{
                    args.list.forEach((element:any) => {
                        forecast.push(this.WeatherForecastFromElement(element))
                    });
                    resolve(forecast);
                }
            )
        })
    }

    async getCurrentWeather(): Promise<WeatherForecast> {
        return new Promise((resolve, reject)=>{
            let forecast:WeatherForecast=new WeatherForecast
            let data = this.http.get<any>(this.currentWeatherCall)
            data.forEach(args=> {
                forecast = this.WeatherForecastFromElement(args)
                resolve(forecast)
            })
        })
    }

    private WeatherForecastFromElement(element:any):WeatherForecast{
        let forecast = new WeatherForecast();
        forecast.TimeStamp = element.dt*1000;
        forecast.Weather.Clouds=element.clouds.all
        forecast.Weather.Description=element.weather[0].description
        forecast.Weather.Humidity=1// todo
        forecast.Weather.Precipitation.Probability = element.pop * 100
        if (element.rain!=undefined){
            forecast.Weather.Precipitation.Rain=element.rain["3h"];
        }
        if (element.snow!=undefined){
            forecast.Weather.Precipitation.Rain=element.snow["3h"];
        }        
        forecast.Weather.Pressure.Pressure=element.main.pressure
        forecast.Weather.Pressure.PressureSeaLevel=element.main.sea_level
        forecast.Weather.Pressure.PressureGroundLevel=element.main.grnd_level
        
        forecast.Weather.Temperature.Temperature = element.main.temp
        forecast.Weather.Temperature.PercievedTemp = element.main.feels_like

        forecast.Weather.Wind.Direction=element.wind.deg
        forecast.Weather.Wind.Gust=element.wind.gust
        forecast.Weather.Wind.Speed=element.wind.speed
        forecast.Weather.WeatherIcon=this.mapWeatherIcon(element)
        return forecast
    }

    private mapWeatherIcon(element:any):string
    {
        switch(element.weather[0].icon){
            case "01d":
                return "../../assets/weather/animated/day.svg"
            case "02d":
                return "../../assets/weather/animated/cloudy-day-1.svg"
            case "03d":
                return "../../assets/weather/animated/cloudy-day-3.svg"
            case "04d":
                return "../../assets/weather/animated/cloudy.svg"
            case "09d":
                return "../../assets/weather/animated/rainy-7.svg"
            case "10d":
                return "../../assets/weather/animated/rainy-5.svg"
            case "11d":
                return "../../assets/weather/animated/thunder.svg"
            case "13d":
                return "../../assets/weather/animated/snowy-6.svg"
            case "01n":
                return "../../assets/weather/animated/night.svg"
            case "02n":
                return "../../assets/weather/animated/cloudy-night-1.svg"
            case "03n":
                return "../../assets/weather/animated/cloudy-night-2.svg"
            case "04n":
                return "../../assets/weather/animated/cloudy.svg"
            case "09n":
                return "../../assets/weather/animated/rainy-7.svg"
            case "10n":
                return "../../assets/weather/animated/rainy-5.svg"
            case "11n":
                return "../../assets/weather/animated/thunder.svg"
            case "13n":
                return "../../assets/weather/animated/snowy-6.svg"
        }
        return "../../assets/weather/unknown.svg"
    }
}
