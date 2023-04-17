
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService{

    public weather:WeatherCfg;
    public location:LocationCfg;
    public gas:GasCfg;
    public server:Server;

    constructor (){
        const _cfg = require("../../../../config.json")
        this.weather=_cfg.weather;
        this.location=_cfg.location;
        this.gas=_cfg.gas;
        this.server=_cfg.server;
        this.server.local_adress=this.server.host+":"+this.server.port
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
class Server{
    port="";
    host="";
    local_adress=""
}