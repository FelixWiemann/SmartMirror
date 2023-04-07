import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from "../services/configuration.service"
import { WeatherForecast, WeatherProvider } from './weather-provider';

@Injectable({
    providedIn: 'root'
  })
export class OpenWeatherMap implements WeatherProvider {
    api_key:string;
    long:string;
    lat:string;
    currentWeatherCall:string
    foreCastCall:string
    imagesource="../../assets/weather/static/"

    constructor(
        private http:HttpClient, 
        private cfg:ConfigService){
      this.api_key=cfg.weather.api_key;
      this.long=cfg.location.lon;
      this.lat=cfg.location.lat;  
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
                return `${this.imagesource}day.svg`
            case "02d":
                return `${this.imagesource}cloudy-day-1.svg`
            case "03d":
                return `${this.imagesource}cloudy-day-3.svg`
            case "04d":
                return `${this.imagesource}cloudy.svg`
            case "09d":
                return `${this.imagesource}rainy-7.svg`
            case "10d":
                return `${this.imagesource}rainy-5.svg`
            case "11d":
                return `${this.imagesource}thunder.svg`
            case "13d":
                return `${this.imagesource}snowy-6.svg`
            case "01n":
                return `${this.imagesource}night.svg`
            case "02n":
                return `${this.imagesource}cloudy-night-1.svg`
            case "03n":
                return `${this.imagesource}cloudy-night-2.svg`
            case "04n":
                return `${this.imagesource}cloudy.svg`
            case "09n":
                return `${this.imagesource}rainy-7.svg`
            case "10n":
                return `${this.imagesource}rainy-5.svg`
            case "11n":
                return `${this.imagesource}thunder.svg`
            case "13n":
                return `${this.imagesource}snowy-6.svg`
        }
        return "../../assets/weather/unknown.svg"
    }
}
