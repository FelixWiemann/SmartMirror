import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart, { ChartArea } from 'chart.js/auto';
import { __extends } from 'tslib';
import { WeatherForecast } from '../WeatherProvider/weather-provider';
import { WeatherChart } from '../WeatherProvider/WeatherChart';


@Component({
  selector: 'app-line-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.css'],
})

export class WeatherChartComponent extends WeatherChart implements OnInit {

  public tmp_chart?: Chart;
  public cloud_chart?: Chart;
  weatherdata :WeatherForecast[] | undefined;
  interval?:NodeJS.Timer;
  aspect_ratio=1.7

  private getLabel(item:WeatherForecast):string{
    var dayOfWeek = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"]; 
    let label = ""
    let date = new Date(item.TimeStamp)
    label=dayOfWeek[date.getDay()];
    return label
  }

  private iniChart(){
    console.log("creating chart")
    this.provider?.getForeCast().then((data)=>{
      this.weatherdata = data; 
      this.createChart(); 
      this.updateChart();
      this.interval = setInterval(()=>
      {
        this.provider?.getForeCast().then((data)=>{this.updateChart()})
      },1000*60*this.timer)
    })
  }

  async ngOnInit(): Promise<void> {
    this.iniChart();
  }

  private updateChart(){
    let lables:string[]=[];
    if (this.weatherdata==undefined) return;
    this.weatherdata.forEach((cast)=>{lables.push(this.getLabel(cast))})
    if (this.cloud_chart==undefined) return;
    if (this.tmp_chart==undefined) return;
    this.cloud_chart.data.labels=lables
    this.cloud_chart.data.datasets[0].data=this.weatherdata.map((cast)=>cast.Weather.Clouds)
    this.cloud_chart.data.datasets[1].data=this.weatherdata.map((cast)=>cast.Weather.Precipitation.Probability)
    this.tmp_chart.data.labels=lables
    this.tmp_chart.data.datasets[0].data=this.weatherdata.map((cast)=>cast.Weather.Temperature.Temperature)
    this.tmp_chart.data.datasets[1].data=this.weatherdata.map((cast)=>cast.Weather.Precipitation.Snow)
    this.tmp_chart.data.datasets[2].data=this.weatherdata.map((cast)=>cast.Weather.Precipitation.Snow+cast.Weather.Precipitation.Rain)
    this.cloud_chart.update()
    this.tmp_chart.update()
    console.log("updated weather charts")
  }


  createChart(){
    let lables:string[]=[];
    if (this.weatherdata==undefined) return;
    this.weatherdata.forEach((cast)=>{lables.push(this.getLabel(cast))})
    let parent = this;
    this.cloud_chart = new Chart("cloud_chart", {
      type:'line',
      options:
      {
        aspectRatio:this.aspect_ratio,
        scales:
        {
          yPercentageScale:{
            type: 'linear',
            position: 'right',
          },
          yPrecipitationScale:{
            type:'linear',
            position: 'right',
          },
        },
        datasets:
        {
          line:
          {
            tension:0.5
          }
        },
      },
      data:{// values on X-Axis
        labels: lables,  
        datasets: [
          {
            label: 'Cloudiness [%]',
            data:[],
            yAxisID:'yPercentageScale',
            backgroundColor: 'rgb(150, 150, 150)',
            borderColor: 'rgb(170, 170, 170)'
          },
          {
            label: 'Downpour [%]',
            data:[],
            yAxisID:'yPrecipitationScale',
            backgroundColor: 'rgb(155, 102, 102)',
            borderColor: 'rgb(155, 102, 102)'
          },
          
        ],
      }
    })

    this.tmp_chart = new Chart("tmp_chart", {
      type: 'line', //this denotes tha type of chart
      data: {// values on X-Axis
        labels: lables,  
        datasets: [
          {
            label: 'Temperature [°C]',
            data:[],
            yAxisID:'yTemperatureScale',
            borderColor: function(context:any) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return parent.getGradient(ctx, chart,'yTemperatureScale');
            },
            backgroundColor:function(context:any) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return parent.getGradient(ctx, chart,'yTemperatureScale');
            },
            fill: false
          },
          { 
            type:'bar',
            label: 'Snow [ml]',
            data:[],
            yAxisID:'yPrecipitationAmount',
            backgroundColor: 'rgba(173,216,250, .5)',
            borderColor: 'rgba(173,216,250, .5)'
          },
          {
            type:'bar',
            label: 'Rain [ml]',
            data:[],
            yAxisID:'yPrecipitationAmount',
            backgroundColor: 'rgba(73,116,230, .5)',
            borderColor: 'rgba(73,116,230, .5)',
          }
        ],
      },
      options: {
        aspectRatio:1.7,
        datasets:{
          line:{
            tension:0.5
          }
        },
        scales:{
          yTemperatureScale:{
            type: 'linear',
            position: 'left',
            title:{
              display:true,
              text:'Temperature [°C]',
              align:'center'
            }
          },
          yPrecipitationAmount:{
            type:'linear',
            position: 'right',
            title:{
              display:true,
              text:'Downpour [ml]',
              align:'center'
            }
          },
        },
      }
    });
  }

  gradient?:CanvasGradient
  width=0
  height=0

  getGradient(ctx:CanvasRenderingContext2D, chart:Chart, scale:string):CanvasGradient {
    
    let chartArea = chart.chartArea
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;

    if (!this.gradient || this.width !== chartWidth || this.height !== chartHeight) {
      // Create the gradient because this is either the first render
      // or the size of the chart has changed
      this.width = chartWidth;
      this.height = chartHeight;
      // gradient from chart -20 -> 50
      this.gradient = ctx.createLinearGradient(0, chart.scales[scale].getPixelForValue(-20), 0, chart.scales[scale].getPixelForValue(50));
      this.gradient.addColorStop(this.getPercent(50), 'rgb(200,0,200)');   // >50
      this.gradient.addColorStop(this.getPercent(35), 'rgb(200,10,50)');   // >40
      this.gradient.addColorStop(this.getPercent(30), 'rgb(255,30,0)');    // >30
      this.gradient.addColorStop(this.getPercent(25), 'rgb(230,70,0)');    // >25
      this.gradient.addColorStop(this.getPercent(20), 'rgb(200,100,0)');   // >20
      this.gradient.addColorStop(this.getPercent(15), 'rgb(120,150,0)');   // >15
      this.gradient.addColorStop(this.getPercent(10), 'rgb(70,255,0)');    // >10
      this.gradient.addColorStop(this.getPercent(5), 'rgb(10,200,10)');    // >5
      this.gradient.addColorStop(this.getPercent(0), 'rgb(40,100,250)');   // >0
      this.gradient.addColorStop(this.getPercent(-5), 'rgb(10,80,200)');   // >-5
      this.gradient.addColorStop(this.getPercent(-10), 'rgb(0,10,255)');   // >-10
      this.gradient.addColorStop(this.getPercent(-20), 'rgb(0,0,0)');      // >-20
    }

    return this.gradient;
  }

  getPercent(degree:number):number{
    let perDegree = 1/70
    return perDegree*(degree+20);
  }
}

