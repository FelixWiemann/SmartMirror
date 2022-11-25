import { Component } from '@angular/core';
import {OpenWeatherMap} from "./openweathermap"
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'weather test';

  constructor(private http:HttpClient){
    let config = new Config()
    let map = new OpenWeatherMap(http)

    map.getCurrentWeather().forEach((args)=>{console.log(args)})
    //map.getForeCastWeather().forEach((args)=>{console.log(args)})
    map.getForeCastWeather().forEach((args)=>{
      args.list.forEach((element:any) => {
        console.log(element.dt_txt, element.main.temp)
      });
    })
  }

}


