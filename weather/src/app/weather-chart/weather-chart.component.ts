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
    
    let lables:string[]=[];
    let chartData:any;
    if (this.weatherdata!=undefined){
      this.weatherdata.forEach((cast)=>{lables.push(new Date(cast.TimeStamp).toUTCString())})
      chartData = {// values on X-Axis
        labels: lables,  
        datasets: [
         {
            label: 'Temperature [°C]',
            data:this.weatherdata.map((cast)=>cast.Weather.Temperature.Temperature),
            yAxisID:'temperatureScale',
            backgroundColor: 'rgb(200, 0, 0)',
            borderColor: 'rgb(200, 0, 0)'
          },
          {
            label: 'Cloudiness [%]',
            data:this.weatherdata.map((cast)=>cast.Weather.Clouds),
            yAxisID:'percentageScale',
            backgroundColor: 'rgb(150, 150, 150)',
            borderColor: 'rgb(170, 170, 170)'
          },
          {
            label: 'Downpour [%]',
            data:this.weatherdata.map((cast)=>cast.Weather.Precipitation.Probability),
            yAxisID:'precipitationScale',
            backgroundColor: 'rgb(155, 102, 102)',
            borderColor: 'rgb(155, 102, 102)'
          },
          {
            label: 'Downpour [ml]',
            data:this.weatherdata.map((cast)=>cast.Weather.Precipitation.Snow+cast.Weather.Precipitation.Rain),
            yAxisID:'precipitationAmount',
            backgroundColor: 'rgb(173,216,230)',
            borderColor: 'rgb(173,216,230)',
            fill:{
              target:'origin',  
            }
          }
        ],
      }
    }

    this.chart = new Chart("weather_chart", {
      type: 'line', //this denotes tha type of chart
      data: chartData,
      options: {
        aspectRatio:1.7,
        datasets:{
          line:{
            tension:0.5
          }
        },
        scales:{
          temperatureScale:{
            type: 'linear',
            position: 'left',
          },
          percentageScale:{
            type: 'linear',
            position: 'right',
          },
          precipitationScale:{
            type:'linear',
            position: 'right'
          },
          precipitationAmount:{
            type:'linear',
            position: 'right'
          }
        }
      }
    });
  }
  public _reload = true;

}