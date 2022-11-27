/**
 * weather providers should implement this interface
 */
export interface WeatherProvider {
    /**
     * get forecast 
     */
     getForeCast():Promise<WeatherForecast[]>;

    /**
     * get current weather data
     */
     getCurrentWeather():Promise<WeatherForecast>;

}

export class WeatherForecast{

    /**
     * timestamp of forecast instance
     */
    public TimeStamp:number=0;

    public Weather:WeatherData=new WeatherData();
}
/**
 * temperature data
 */
export class TemperatureData{
    /**
     * actual temperature value
     */
     public Temperature:number=0;
    /**
     * precieved temperature level
     */
     public  PercievedTemp:number=0;
}

/**
 * air pressure data
 */
export class PressureData{
    /**
     * pressure
     */
     public Pressure:number=0;
    /**
     * pressure at sea level
     */
     public PressureSeaLevel:number=0;
    /**
     * pressure at ground level
     */
     public PressureGroundLevel:number=0;
}

/**
 * wind data
 */
export class WindData{
    /**
     * windspeed
     */
     public Speed: number =0;
    /**
     * wind direction in °
     */
     public Direction :number =0;
    /**
     * gust
     */
     public Gust: number=0;
}

/**
 * Precipitation forecast
 */
export class Precipitation{
    /**
     * probability of precipitation
     */
     public Probability: number=0;
    /**
     * amount of snow
     */
     public Snow: number=0;
    /**
     * amunt of rain 
     */
     public Rain: number=0;
}

export class WeatherData{
    /**
     * Group of weather parameters (Rain, Snow, Extreme etc.)
     */
     public Description:string="";
    /**
     * temperature data
     */
     public Temperature:TemperatureData = new TemperatureData();
    /**
     * pressure data
     */
     public Pressure:PressureData = new PressureData();
    /** 
     * humidity level in %
     */
     public Humidity:number=0;
    /**
     * cloudiness level in %
     */
     public Clouds:number=0;
    /**
     * wind data
     */
     public Wind:WindData=new WindData();
    /**
     * Precipitiation data
     */
     public Precipitation:Precipitation=new Precipitation();
}