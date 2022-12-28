import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Gradient, GradientUtils } from '../WeatherProvider/ColorGradient';
import { WeatherForecast } from '../WeatherProvider/weather-provider';
import { WeatherChart } from '../WeatherProvider/WeatherChart';

@Component({
  selector: 'app-current-weather-display',
  templateUrl: './current-weather-display.component.html',
  styleUrls: ['./current-weather-display.component.css']
})
export class CurrentWeatherDisplayComponent extends WeatherChart implements OnInit {

  temperature = 0
  currentWeatherImage="../../assets/weather/static/cloudy-day-1.svg"
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

    this.updateData()
    this.updateTime()
    setInterval(()=>this.updateTime(),1000*1) // update time every 1 s
    setInterval(()=>this.updateData(),1000*60*this.timer)
  }

  private updateData():void{
    this.provider?.getCurrentWeather().then((cast)=>
    {
      this.updateScreen(cast);
    })
  }

  updateScreen(forecast:WeatherForecast){
    this.temperature = Math.round(forecast.Weather.Temperature.Temperature)
    this.currentWeatherImage = forecast.Weather.WeatherIcon
    this.weather_text = forecast.Weather.Description
    console.debug("updated current weather data")
    if (this.temp_element!=null) {
      this.temp_element.nativeElement.style.color=GradientUtils.getColorForValue(this.temperatureGradients, this.temperature)
    }
    if(this.background_element!=null){
      this.background_element.nativeElement.style.backgroundColor=GradientUtils.getColorForValue(this.cloudGradients,forecast.Weather.Clouds);
      this.background_element.nativeElement.style.border=GradientUtils.getColorForValue(this.cloudGradients,forecast.Weather.Clouds);      
    }
  }

  private updateTime():void{
      let date = new Date()
      this.time = date.getHours().toString().padStart(2,"0")+ ":"+ date.getMinutes().toString().padStart(2,"0") +":"+ date.getSeconds().toString().padStart(2,"0")
  }
  
}
