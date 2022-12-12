import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  temperatureGradients:Gradient[]=[]
  cloudGradients:Gradient[]=[]
  /**
   * element for temperature value
   */
  @ViewChild("tmp_value") temp_element?:ElementRef
  /**
   * element for text description
   */
  @ViewChild("weather_element") weather_element?:ElementRef
  /**
   * element for background
   */
  @ViewChild("background") background_element?:ElementRef

  ngOnInit(): void {
    this.updateData()
    this.updateTime()
    setInterval(()=>this.updateTime(),1000*10) // update time every 10 s
    setInterval(()=>this.updateData(),1000*60*this.timer)
    this.cloudGradients.push(new Gradient(0,50,"#1499ed","#2684ba"))
    this.cloudGradients.push(new Gradient(50,70,"#2684ba","#377293"))
    this.cloudGradients.push(new Gradient(70,100,"#377293","#445b66"))
    // upper bounds
    this.temperatureGradients.push(new Gradient(100,3000,"#ff0ef0","#ff0ef0"))
    this.temperatureGradients.push(new Gradient(30,100,"#ff0050","#ff0ef0"))
    this.temperatureGradients.push(new Gradient(20,30,"#fdff00","#ff0050"))
    this.temperatureGradients.push(new Gradient(10,20,"#17ff00","#fdff00"))
    this.temperatureGradients.push(new Gradient(0,10,"#00ffa8","#17ff00"))
    this.temperatureGradients.push(new Gradient(-5,0,"#0094ff","#00ffa8"))
    this.temperatureGradients.push(new Gradient(-10,-5,"#0012ff","#0094ff"))
    // lower value
    this.temperatureGradients.push(new Gradient(-1000,-10,"#0094ff","#0012ff"))
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
    if (this.temp_element!=null) {
      this.temp_element.nativeElement.style.color=this.getColorForValue(this.temperatureGradients, this.temperature)
    }
    if(this.background_element!=null){
      this.background_element.nativeElement.style.backgroundColor=this.getColorForValue(this.cloudGradients,forecast.Weather.Clouds);
      this.background_element.nativeElement.style.border=this.getColorForValue(this.cloudGradients,forecast.Weather.Clouds);      
    }
  }

  getColorForValue(gradients:Gradient[], val:number):string{
    for (let element of gradients){
      if (element.start<=val&&element.end>=val) return element.getGradientColor(val)
    }
    // return black default
    return '#000000';
  }

  private updateTime():void{
      let date = new Date()
      this.time = date.getHours().toString().padStart(2,"0")+ ":"+ date.getMinutes().toString().padStart(2,"0") +":"+ date.getSeconds().toString().padStart(2,"0")
  }
  
}

export class Gradient {
  constructor(public start:number, public end:number, public start_color:string, public end_color:string){}

  getPercentage(value:number):number{
    let tmpDiff = this.end-this.start
    let p = (value-this.start)/tmpDiff
    return p
  }
  /**
   * color gradient based on https://stackoverflow.com/questions/3080421/javascript-color-gradient
   * 
   * @param value of the way between start and end color (0=> start, 1=>end, 0.5 halfway inbetween)
   * @returns mixed color
   */
   getGradientColor(value:number) {
    let percent=this.getPercentage(value)
    if (percent>=1) return this.end_color;
    if (percent<=0) return this.start_color;
    // strip the leading # if it's there
    this.start_color = this.start_color.replace(/^\s*#|\s*$/g, '');
    this.end_color = this.end_color.replace(/^\s*#|\s*$/g, '');
 
    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(this.start_color.length == 3){
      this.start_color = this.start_color.replace(/(.)/g, '$1$1');
    }
 
    if(this.end_color.length == 3){
      this.end_color = this.end_color.replace(/(.)/g, '$1$1');
    }
 
    // get colors
    var start_red = parseInt(this.start_color.substr(0, 2), 16),
        start_green = parseInt(this.start_color.substr(2, 2), 16),
        start_blue = parseInt(this.start_color.substr(4, 2), 16);
 
    var end_red = parseInt(this.end_color.substr(0, 2), 16),
        end_green = parseInt(this.end_color.substr(2, 2), 16),
        end_blue = parseInt(this.end_color.substr(4, 2), 16);
 
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