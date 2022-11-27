import { Component, Input } from '@angular/core';
import {OpenWeatherMap} from "./openweathermap"
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { Injectable } from '@angular/core';
import { DataSet } from './line-chart/line-chart.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  title = 'weather test';
  data_set:DataSet[]=[]

  constructor(private http:HttpClient){
    let config = new Config()
    let map = new OpenWeatherMap(http)
    map.getCurrentWeather().forEach((args)=>{
      console.log(args);
    })
    //map.getForeCastWeather().forEach((args)=>{console.log(args)})
    map.getForeCastWeather().forEach((args)=>{
      args.list.forEach((element:any) => {
        this.data_set.push({label: element.dt_txt,data :element.main.temp});
      });
      let dat : DataSet[]=[]
      this.data_set = dat.concat(this.data_set)
    })
  }

  ngOnInit(): void {
    var element = document.getElementById("chartdiv")
    
    //element?.addData("test", 12)
  }

}


