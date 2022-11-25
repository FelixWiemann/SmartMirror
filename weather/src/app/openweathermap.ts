import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './config';

@Injectable()
export class OpenWeatherMap {
    api_key:string;
    long:string;
    lat:string;
    data:any[]=[]


    constructor(private http:HttpClient){
      this.api_key=Config.weather.api_key;
      this.long=Config.weather.lon;
      this.lat=Config.weather.lat;  
    }

    getCurrentWeather(){
        return  this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.long}&appid=${this.api_key}&units=metric`)
    }
    getForeCastWeather(){
        return  this.http.get<any>(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.long}&appid=${this.api_key}&units=metric`)
    }
}


