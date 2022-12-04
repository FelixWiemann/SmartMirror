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
  document_temperature_id = "tmp_value"
  document_weather_text_id = "weather_Text"

  ngOnInit(): void {
    this.updateData()
    this.updateTime()
    setInterval(()=>this.updateTime(),1000)
    setInterval(()=>this.updateData(),1000*60*this.timer)
  }

  private updateData():void{
    this.provider?.getCurrentWeather().then((cast)=>
    {
      this.updateScreen(cast);
    })
  }

  updateScreen(forecast:WeatherForecast){
    this.temperature = forecast.Weather.Temperature.Temperature
    this.currentWeatherImage = forecast.Weather.WeatherIcon
    this.weather_text = forecast.Weather.Description
    console.log("updated current weather data")
    let temp = document.getElementById(this.document_temperature_id)
    if (temp!=null) {
      temp.style.color=this.getColorForTemperature(this.temperature)
    }
  }

  getPercentage(temp:number, min: number, max: number):number{
    let tmpDiff = max-min
    let p = (temp-min)/tmpDiff
    return p
  }

  getColorForTemperature(temp: number):string{
    // red(50) -> green(10)
    if (temp>10) return this.getGradientColor('#00ff00', '#ff0000',this.getPercentage(temp, 10,50))
    // green(10) -> blue(-10)
    return this.getGradientColor('#0000ff', '#00ff00',this.getPercentage(temp, -10,10))
  }

  private updateTime():void{
      let date = new Date()
      this.time = date.getHours().toString().padStart(2,"0")+ ":"+ date.getMinutes().toString().padStart(2,"0") +":"+ date.getSeconds().toString().padStart(2,"0")
  }

  /**
   * color gradient based on https://stackoverflow.com/questions/3080421/javascript-color-gradient
   * 
   * @param start_color start color
   * @param end_color 
   * @param percent of the way between start and end color (0=> start, 1=>end, 0.5 halfway inbetween)
   * @returns mixed color
   */
  getGradientColor = function(start_color:string, end_color:string, percent:number) {
    if (percent>=1) return end_color;
    if (percent<=0) return start_color;
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
