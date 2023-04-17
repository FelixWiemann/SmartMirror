import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { ConfigService } from '../services/configuration.service';

@Component({
  selector: 'app-remote',
  templateUrl: './remote.component.html',
  styleUrls: ['./remote.component.css']
})
export class RemoteComponent implements OnInit {

  private snackBarDuration=3*1000;
  private remoteLocation="";
  
  constructor(
    private http:HttpClient,
    private snackBar: MatSnackBar, 
    private cfg:ConfigService) {
    this.remoteLocation=window.location.protocol + '//' + window.location.hostname;
   }

  ngOnInit(): void {
  }  

  deactivateScreen():void{
    this.http.post(this.remoteLocation+":"+this.cfg.server.port+"/screen/toggle","toggle").subscribe(
      {
        next: data => {
          console.log(data)
          this.snackBar.open("toggling screen",undefined,{duration:this.snackBarDuration})
        },
        error: error=>{
          
        }
      }
    )
  }
  reboot():void{
    this.http.post(this.remoteLocation+":"+this.cfg.server.port+"/system/reboot","reboot").subscribe(
      {next: data => {
        this.snackBar.open("rebooting",undefined,{duration:this.snackBarDuration})
      }}
    ) 
  }
  shutdown():void{
    this.http.post(this.remoteLocation+":"+this.cfg.server.port+"/system/shutdown","shutdown").subscribe(
      {next: data => {}}
    ) 
  }

}
