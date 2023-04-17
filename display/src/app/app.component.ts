import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './services/configuration.service';
import { Injectable } from '@angular/core';
import { DummyProvider } from './WeatherProvider/DummyProvider';
import { LoggingConsole } from './LoggingConsole';
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

  constructor(
    private http:HttpClient, 
    private gasPrice:GaspriceService, 
    private route: ActivatedRoute, 
    private cfg:ConfigService){
    (console as unknown as LoggingConsole).setHttpClient(http)  
    // TODO vofo speedtest https://github.com/peterbaumert/ioBroker.vofo-speedtest/blob/master/main.js
    // setInterval(()=>{this.getSpeedData()},1000*60*5) // speedtest every 5 min
  }

  heartBeat(){
    this.http.get<any>(this.cfg.server.local_adress+"/heartbeat/ping").subscribe({
      next: (value: any) => {
        
      },
      error: (error: any) => {
        console.error("heartbeat failed")
      },
      complete: () => {}
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
}

  


