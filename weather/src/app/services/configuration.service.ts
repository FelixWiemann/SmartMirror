
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Config{

    public weather:WeatherCfg;
    public location:LocationCfg;
    public gas:GasCfg;

    constructor (){
        const _cfg = require("../../../../config.json")
        this.weather=_cfg.weather;
        this.location=_cfg.location;
        this.gas=_cfg.gas;
    }
}

class GasCfg{
    api_key="";
    rad="";
    type="";
}

class LocationCfg{
    lat="";
    lon="";
}

class WeatherCfg{
    api_key="";
    lat="";
    lon="";
}