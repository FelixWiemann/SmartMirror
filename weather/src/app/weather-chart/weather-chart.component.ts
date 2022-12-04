import { Component, Input, OnInit } from '@angular/core';
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
      plugins: [{
        id:"",
        afterLayout: (chart)=>{this.afterLayout(chart)}
      }],
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
              return getGradient(ctx, chartArea);
            },
            backgroundColor:function(context:any) {
              const chart = context.chart;
              const {ctx, chartArea} = chart;
              if (!chartArea) {
                // This case happens on initial chart load
                return;
              }
              return getGradient(ctx, chartArea);
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
  afterLayout(chart:Chart) {
    return
    let ctx = chart.ctx;
    ctx.save();
    let xAxis = chart.scales['x'];
    let gradient = ctx.createLinearGradient(xAxis.left, 0, xAxis.right, 0);
    let data = chart.data.datasets[0].data;
    let color="";
    data.forEach((v, i) => {
      console.log("index: " + i)
      let x = xAxis.getPixelForTick(i) - xAxis.left;
      console.log("px: " + x)
      let offset = 1 / (xAxis.right - xAxis.left) * x;
      if (offset<0) {
        return;
      }
      if (color) {
        if (this.weatherdata){
          if (this.weatherdata[i].Weather.Clouds>50){
            gradient.addColorStop(offset, 'grey');
          }else{
            gradient.addColorStop(offset, 'yellow');
          }
        }
      }
      if (i < data.length) {
        if (this.weatherdata){
          if (this.weatherdata[i].Weather.Clouds>50){
            gradient.addColorStop(offset, 'grey');
          }else{
            gradient.addColorStop(offset, 'yellow');
          }
        }
      }
    });
    chart.data.datasets[0].backgroundColor = gradient;
    ctx.restore();
  }
}

function getGradient(ctx:CanvasRenderingContext2D, chartArea:ChartArea):CanvasGradient {
  let width, height, gradient;
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    // Create the gradient because this is either the first render
    // or the size of the chart has changed
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(1, 'rgb(255,0,0)');
    gradient.addColorStop(0.5, 'rgb(0,255,0)');
    gradient.addColorStop(0, 'rgb(0,0,255)');
  }

  return gradient;
}