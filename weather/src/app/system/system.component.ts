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

  constructor(private http:HttpClient) {
  }

  ngOnInit(): void {
    setInterval(()=>{
      this.updateData()
    }, 1000*10)
  }

  updateData():void{
    let data = this.http.get<any>("http://localhost:12345/system/data")
    data.forEach(
      (args)=>{
          this.temp = args.tmp
          this.ram = args.ram_usage
          this.cpu = args.cpu_usage
          this.ip = args.local_ip
      }
    )
  }
}
