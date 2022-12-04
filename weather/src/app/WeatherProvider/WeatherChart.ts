import { Component, Input } from "@angular/core";
import { WeatherProvider } from "./weather-provider";

@Component({
    template: ''
  })
export abstract class WeatherChart{
  @Input("WeatherProvider") provider? : WeatherProvider;
  @Input("UpdateInterval") timer= 60;
  
  constructor() { }
}