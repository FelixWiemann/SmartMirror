import { Component } from '@angular/core';
import { OpenWeatherMap } from "./WeatherProvider/openweathermap"
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { Injectable } from '@angular/core';
import { WeatherProvider } from './WeatherProvider/weather-provider';
import { DummyProvider } from './WeatherProvider/DummyProvider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  title = 'weather test';
  weather_provider:WeatherProvider

  constructor(private http:HttpClient){
    Config.create()
    this.weather_provider = new OpenWeatherMap(http)
    this.weather_provider.getCurrentWeather().then((weatherdata)=>{
        console.log(JSON.stringify(weatherdata));
    })
  }}


