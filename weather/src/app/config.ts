export class Config{
    static weather:WeatherCfg;

    constructor (){
        const _cfg = require("../../../config.json")
        Config.weather=_cfg.weather;
    }
    
}

class WeatherCfg{
    api_key="";
    lat="";
    lon="";
}