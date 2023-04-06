import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.css']
})
export class RemoteComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
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
