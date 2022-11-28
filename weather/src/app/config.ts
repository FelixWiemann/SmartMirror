export class Config{

    static weather:WeatherCfg;

    constructor (){
        const _cfg = require("../../../config.json")
        Config.weather=_cfg.weather;
    }

    public static create():void{
        new Config()
    }
}

class WeatherCfg{
    api_key="";
    lat="";
    lon="";
}