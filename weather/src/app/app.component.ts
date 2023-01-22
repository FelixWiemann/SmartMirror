import { Component, ElementRef, ViewChild } from '@angular/core';
import { OpenWeatherMap } from "./WeatherProvider/openweathermap"
import { HttpClient } from '@angular/common/http';
import { Config } from './config';
import { Injectable } from '@angular/core';
import { WeatherProvider } from './WeatherProvider/weather-provider';
import { DummyProvider } from './WeatherProvider/DummyProvider';
import { CurrentWeatherTestProvider } from './WeatherProvider/CurrentWeatherTestProvider';
import { LoggingConsole } from './LoggingConsole';
import {SpeedTestService} from 'ng-speed-test';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'weather test';
  weather_provider:WeatherProvider
  testprovider:CurrentWeatherTestProvider[][]=[]
  @ViewChild("parent") parent?:ElementRef

  constructor(private http:HttpClient, private speedTestService: SpeedTestService){
    (console as unknown as LoggingConsole).setHttpClient(http)
    Config.create();
    console.info ("starting screen")
    this.weather_provider = new OpenWeatherMap(http)
    //this.weather_provider = this.getDummyProvider()
    // this.generateDummyProviders()
    
    // TODO vofo speedtest https://github.com/peterbaumert/ioBroker.vofo-speedtest/blob/master/main.js
    setInterval(()=>{this.getSpeedData()},1000*60*5) // speedtest every 5 min
    setInterval(()=>{this.heartBeat()},1000*5)
  }

  heartBeat(){
    this.http.get<any>("http://localhost:12345/heartbeat/ping").subscribe({
      next: (value: any) => {
        
      },
      error: (error: any) => {
        console.error("heartbeat failed")
      },
      complete: () => {}
    })
  }

  getSpeedData(){
    this.speedTestService.getMbps().subscribe((speed)=>{
      console.log("Speed: " + speed)
    })
  }

  getDummyProvider(){
    return new DummyProvider();
  }

  ngAfterViewInit (): void {
    // set size to screen
    if (this.parent){
      this.parent.nativeElement.style.width=screen.width+"px"
      this.parent.nativeElement.style.height=screen.height+"px"
    }
  }

  generateDummyProviders(){
    let images=["../../assets/weather/animated/day.svg",
    "../../assets/weather/animated/day.svg",
    "../../assets/weather/animated/day.svg",
    "../../assets/weather/animated/cloudy-day-1.svg",
    "../../assets/weather/animated/cloudy-day-1.svg",
    "../../assets/weather/animated/cloudy-day-2.svg",
    "../../assets/weather/animated/cloudy-day-2.svg",
    "../../assets/weather/animated/cloudy-day-3.svg",
    "../../assets/weather/animated/cloudy-day-3.svg",
    "../../assets/weather/animated/cloudy.svg"]

    for (let clouds=0; clouds<10; clouds++){
      this.testprovider.push([])
      for (let tmp=0;tmp<15;tmp++){
        this.testprovider[clouds].push(new CurrentWeatherTestProvider(-10+tmp*3,clouds*10,"",images[clouds]))
      }
    }
  }
}

  


