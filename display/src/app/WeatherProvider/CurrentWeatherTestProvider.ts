import { WeatherForecast, WeatherProvider } from "./weather-provider";

export class CurrentWeatherTestProvider implements WeatherProvider{

    constructor(private temp:number, private clouds:number, private desc:string, private icon:string){
    }

    getForeCast(): Promise<WeatherForecast[]> {
        throw new Error("Method not implemented.");
    }
    
    getCurrentWeather(): Promise<WeatherForecast> {
        return new Promise((resolve, reject)=>{
            let cast = new WeatherForecast()
            cast.Weather.Temperature.Temperature=this.temp
            cast.Weather.Clouds=this.clouds
            cast.Weather.WeatherIcon=this.icon
            cast.Weather.Description=this.desc
            if (this.desc==""){
                cast.Weather.Description = `${this.temp}°C; ${this.clouds}%`
            }
            resolve(cast)
        })
    }


}