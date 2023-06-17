import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../services/configuration.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})

@Injectable()
export class SystemComponent implements OnInit {

  temp=0
  ram=0
  cpu=0
  ip=""
  last_boot=""
  private remoteLocation="";

  constructor(
    private http:HttpClient,
    private cfg:ConfigService) {
      this.remoteLocation=window.location.protocol + '//' + window.location.hostname;
  }
  
  ngOnInit(): void {
    setInterval(()=>{
      this.updateData()
    }, 1000*10)
    this.updateData()
    this.updateBootTime()
  }

  updateBootTime(){
    this.http.get<any>(this.remoteLocation+":"+this.cfg.server.port+"/system/lastboot").subscribe({
      next: (value: any) => {
        this.last_boot = value.lastboot
      },
      error: (error: any) => {
        console.error("failed to get last boot from server: ", JSON.stringify(error) )
      },
      complete: () => {}
    })
  }

  updateData(){
    this.http.get<any>(this.remoteLocation+":"+this.cfg.server.port+"/system/data").subscribe({ 
      next: (value: any) => {
        this.temp = value.tmp
        this.ram = value.ram_usage
        this.cpu = value.cpu_usage
        this.ip = value.local_ip
      },
      error: (error: any) => {
        console.error("failed to get data from server: ", JSON.stringify(error))
        this.ip = "failed to get data " + error.name
      },
      complete: () => {}
    })
  }
}
