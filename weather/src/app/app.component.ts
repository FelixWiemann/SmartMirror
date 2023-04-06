import { Component, ElementRef, ViewChild } from '@angular/core';
import { OpenWeatherMap } from "./WeatherProvider/openweathermap.service"
import { HttpClient } from '@angular/common/http';
import { Config } from './services/configuration.service';
import { Injectable } from '@angular/core';
import { DummyProvider } from './WeatherProvider/DummyProvider';
import { LoggingConsole } from './LoggingConsole';
import {SpeedTestService} from 'ng-speed-test';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GaspriceService } from './services/gasprice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'weather test';
  @ViewChild("parent") parent?:ElementRef
  isLocal=false

  constructor(private http:HttpClient,public weather_provider:OpenWeatherMap, private gasPrice:GaspriceService, private speedTestService: SpeedTestService, private route: ActivatedRoute){
    (console as unknown as LoggingConsole).setHttpClient(http)
    Config.create();    
    // TODO vofo speedtest https://github.com/peterbaumert/ioBroker.vofo-speedtest/blob/master/main.js
    // setInterval(()=>{this.getSpeedData()},1000*60*5) // speedtest every 5 min
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

  ngOnInit() {
    this.route.queryParams.forEach((param)=>{
      if (param["islocal"]){
        console.info ("starting screen")
        this.isLocal = true
        console.debug("is local")
        setInterval(()=>{this.heartBeat()},1000*5)
        /*this.gasPrice.getGasPrice().then((val)=>{
          console.log(val);
        })*/
      }else{
        
      }
    })
  }

  ngAfterViewInit (): void {
    // set size to screen
    if (this.parent){
      this.parent.nativeElement.style.width=screen.width+"px"
      this.parent.nativeElement.style.height=screen.height+"px"
    }
  }

  deactivateScreen():void{
    this.http.post(window.location.href.substring(0, window.location.href.length-1)+":12345/screen/toggle","toggle").subscribe(
      {next: data => {}}
    ) 
  }
  reboot():void{
    this.http.post(window.location.href.substring(0, window.location.href.length-1)+":12345/system/reboot","reboot").subscribe(
      {next: data => {}}
    ) 
  }
  shutdown():void{
    this.http.post(window.location.href.substring(0, window.location.href.length-1)+":12345/system/shutdown","shutdown").subscribe(
      {next: data => {}}
    ) 
  }
}

  


