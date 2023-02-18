import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http:HttpClient) {
  }

  ngOnInit(): void {
    this.updateData()
    setInterval(()=>{
      this.updateData()
    }, 1000*10)
    this.http.get<any>("http://localhost:12345/system/lastboot").subscribe({
      next: (value: any) => {
        this.last_boot = value.lastboot
      },
      error: (error: any) => {
        console.error("failed to get last boot from server: ", error)
      },
      complete: () => {}
    })
  }

  updateData(){
    this.http.get<any>("http://localhost:12345/system/data").subscribe({ 
      next: (value: any) => {
        this.temp = value.tmp
        this.ram = value.ram_usage
        this.cpu = value.cpu_usage
        this.ip = value.local_ip
      },
      error: (error: any) => {
        console.error("failed to get data from server: ", error)
        this.ip = "failed to get data " + error.name
      },
      complete: () => {}
    })
  }
}
