import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class GaspriceService {
 
  private list_all_uri:string

  constructor(private config:Config, private http:HttpClient) {
    this.list_all_uri=`https://creativecommons.tankerkoenig.de/json/list.php?lat=${this.config.location.lat}&lng=${this.config.location.lon}&rad=${this.config.gas.rad}&sort=price&type=${this.config.gas.type}&apikey=${this.config.gas.api_key}`
  }

  public async getGasPrice(){
    return new Promise((resolve, reject)=>{
      this.http.get(this.list_all_uri).forEach((val)=>{
        resolve(val);
      })
    });
  }  
}
