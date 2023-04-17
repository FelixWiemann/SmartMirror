import { Component, OnInit } from '@angular/core';
import { OpenWeatherMap } from '../WeatherProvider/openweathermap.service';

@Component({
  selector: 'app-mirror',
  templateUrl: './mirror.component.html',
  styleUrls: ['./mirror.component.css']
})
export class MirrorComponent implements OnInit {

  constructor(public weather_provider:OpenWeatherMap) { }

  ngOnInit(): void {
  }

}
