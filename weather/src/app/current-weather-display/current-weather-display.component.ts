import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { WeatherForecast } from '../WeatherProvider/weather-provider';
import { WeatherChart } from '../WeatherProvider/WeatherChart';

@Component({
  selector: 'app-current-weather-display',
  templateUrl: './current-weather-display.component.html',
  styleUrls: ['./current-weather-display.component.css']
})
export class CurrentWeatherDisplayComponent extends WeatherChart implements OnInit {

  temperature = 0
  currentWeatherImage="../../assets/weather/animated/cloudy-day-1.svg"
  weather_text = ""
  time = ""
  ngOnInit(): void {
    this.updateData()
    this.updateTime()
    setInterval(()=>this.updateTime(),1000)
    setInterval(()=>this.updateData(),1000*60*this.timer)
  }
  private updateData():void{
    this.provider?.getCurrentWeather().then((cast)=>
    {
      this.temperature = cast.Weather.Temperature.Temperature
      this.currentWeatherImage = cast.Weather.WeatherIcon
      this.weather_text = cast.Weather.Description
      console.log("updated current weather data")
      let temp = document.getElementById('tmp')
      if (temp!=null) {
        temp.style.color=this.getGradientColor('#ff0000', '#0000ff', 0.50)
      }
    })
  }

  private updateTime():void{
      let date = new Date()
      this.time = date.getHours().toString().padStart(2,"0")+ ":"+ date.getMinutes().toString().padStart(2,"0") +":"+ date.getSeconds().toString().padStart(2,"0")
  }

  getGradientColor = function(start_color:string, end_color:string, percent:number) {
    // strip the leading # if it's there
    start_color = start_color.replace(/^\s*#|\s*$/g, '');
    end_color = end_color.replace(/^\s*#|\s*$/g, '');
 
    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(start_color.length == 3){
      start_color = start_color.replace(/(.)/g, '$1$1');
    }
 
    if(end_color.length == 3){
      end_color = end_color.replace(/(.)/g, '$1$1');
    }
 
    // get colors
    var start_red = parseInt(start_color.substr(0, 2), 16),
        start_green = parseInt(start_color.substr(2, 2), 16),
        start_blue = parseInt(start_color.substr(4, 2), 16);
 
    var end_red = parseInt(end_color.substr(0, 2), 16),
        end_green = parseInt(end_color.substr(2, 2), 16),
        end_blue = parseInt(end_color.substr(4, 2), 16);
 
    // calculate new color
    var diff_red = end_red - start_red;
    var diff_green = end_green - start_green;
    var diff_blue = end_blue - start_blue;
 
    var diff_red_s = ( (diff_red * percent) + start_red ).toString(16).split('.')[0];
    var diff_green_s = ( (diff_green * percent) + start_green ).toString(16).split('.')[0];
    var diff_blue_s = ( (diff_blue * percent) + start_blue ).toString(16).split('.')[0];
 
    // ensure 2 digits by color
    if( diff_red_s.length == 1 ) diff_red_s = '0' + diff_red_s
    if( diff_green_s.length == 1 ) diff_green_s = '0' + diff_green_s
    if( diff_blue_s.length == 1 ) diff_blue_s = '0' + diff_blue_s
 
    return '#' + diff_red_s + diff_green_s + diff_blue_s;
  };
}
