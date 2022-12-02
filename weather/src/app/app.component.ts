import { Component, Input } from '@angular/core';
import {OpenWeatherMap} from "./weather-chart/openweathermap"
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { Injectable } from '@angular/core';
import { WeatherProvider } from './weather-chart/weather-provider';
import { DummyProvider } from './weather-chart/DummyProvider';

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
    this.weather_provider = new DummyProvider()
  }}


