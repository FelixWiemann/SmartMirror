import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { WeatherForecast, WeatherProvider } from './weather-provider';

@Component({
  selector: 'app-line-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.css'],
})

export class WeatherChartComponent implements OnInit {

  constructor() { }
  public chart?: Chart;
  weatherdata :WeatherForecast[] | undefined;

  @Input("WeatherProvider") provider? : WeatherProvider;

  async ngOnInit(): Promise<void> {
    this.provider?.getForeCast().then((data)=>{
      this.weatherdata = data; 
      this.createChart(); 
      console.log("received data")
    })
  }

  public addData(label:string, data:any){
    this.chart?.data?.labels?.push(label);
    this.chart?.data?.datasets?.forEach((element:any) => {
      element.data.push(data)
    });
  }

  createChart(){
    let chartData = {// values on X-Axis
      labels: ["datasetundefined"], 
      datasets: [{label:"undef", data:[0]}],
    }
    let lables:string[]=[];

    if (this.weatherdata!=undefined){
      this.weatherdata.forEach((cast)=>{lables.push(cast.TimeStamp.toString())})
      chartData={// values on X-Axis
        labels: lables, 
        datasets: [
         {
            label: 'Temperature °C',
            data:this.weatherdata.map((cast)=>cast.Weather.Temperature.Temperature)
          }
        ],
      }
    }
    let chartOptions= {
      aspectRatio:2.5,
      datasets:{
        line:{
          tension:0.5
        }
      }
    }
    this.chart = new Chart("weather_chart", {
      type: 'line', //this denotes tha type of chart
      data: chartData,
      options: chartOptions
    });
  }
  public _reload = true;

}

export class DataSet{
  label:string="";
  data:number=0
}