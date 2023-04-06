
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Config{

    static weather:WeatherCfg;
    public location:LocationCfg;
    public gas:GasCfg;

    constructor (){
        const _cfg = require("../../../config.json")
        Config.weather=_cfg.weather;
        this.location=_cfg.location;
        this.gas=_cfg.gas;
    }

    public static create():void{
        new Config()
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