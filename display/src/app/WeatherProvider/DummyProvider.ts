import { WeatherForecast, WeatherProvider } from "./weather-provider";

export class DummyProvider implements WeatherProvider{
    datasting = `[
        {
          "TimeStamp": 1669766400000,
          "Weather": {
            "Description": "overcast clouds",
            "Temperature": {
              "Temperature": 6.43,
              "PercievedTemp": 5.74
            },
            "Pressure": {
              "Pressure": 1021,
              "PressureSeaLevel": 1021,
              "PressureGroundLevel": 1001
            },
            "Humidity": 1,
            "Clouds": 10,
            "Wind": {
              "Speed": 1.37,
              "Direction": 338,
              "Gust": 1.6
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669777200000,
          "Weather": {
            "Description": "light rain",
            "Temperature": {
              "Temperature": 6.39,
              "PercievedTemp": 5.65
            },
            "Pressure": {
              "Pressure": 1021,
              "PressureSeaLevel": 1021,
              "PressureGroundLevel": 1001
            },
            "Humidity": 1,
            "Clouds": 10,
            "Wind": {
              "Speed": 1.41,
              "Direction": 338,
              "Gust": 2.26
            },
            "Precipitation": {
              "Probability": 45,
              "Snow": 0,
              "Rain": 0.6
            }
          }
        },
        {
          "TimeStamp": 1669788000000,
          "Weather": {
            "Description": "light rain",
            "Temperature": {
              "Temperature": 6.46,
              "PercievedTemp": 6.46
            },
            "Pressure": {
              "Pressure": 1021,
              "PressureSeaLevel": 1021,
              "PressureGroundLevel": 1002
            },
            "Humidity": 1,
            "Clouds": 10,
            "Wind": {
              "Speed": 1.15,
              "Direction": 340,
              "Gust": 1.82
            },
            "Precipitation": {
              "Probability": 59,
              "Snow": 0,
              "Rain": 0.37
            }
          }
        },
        {
          "TimeStamp": 1669798800000,
          "Weather": {
            "Description": "light rain",
            "Temperature": {
              "Temperature": 6.64,
              "PercievedTemp": 6.64
            },
            "Pressure": {
              "Pressure": 1022,
              "PressureSeaLevel": 1022,
              "PressureGroundLevel": 1003
            },
            "Humidity": 1,
            "Clouds": 10,
            "Wind": {
              "Speed": 0.99,
              "Direction": 348,
              "Gust": 1.33
            },
            "Precipitation": {
              "Probability": 54,
              "Snow": 0,
              "Rain": 0.49
            }
          }
        },
        {
          "TimeStamp": 1669809600000,
          "Weather": {
            "Description": "light rain",
            "Temperature": {
              "Temperature": 6.93,
              "PercievedTemp": 6.93
            },
            "Pressure": {
              "Pressure": 1022,
              "PressureSeaLevel": 1022,
              "PressureGroundLevel": 1003
            },
            "Humidity": 1,
            "Clouds": 10,
            "Wind": {
              "Speed": 0.92,
              "Direction": 14,
              "Gust": 2.13
            },
            "Precipitation": {
              "Probability": 40,
              "Snow": 0,
              "Rain": 0.33
            }
          }
        },
        {
          "TimeStamp": 1669820400000,
          "Weather": {
            "Description": "light rain",
            "Temperature": {
              "Temperature": -20,
              "PercievedTemp": 5.46
            },
            "Pressure": {
              "Pressure": 1023,
              "PressureSeaLevel": 1023,
              "PressureGroundLevel": 1003
            },
            "Humidity": 1,
            "Clouds": 10,
            "Wind": {
              "Speed": 2.02,
              "Direction": 3,
              "Gust": 4.76
            },
            "Precipitation": {
              "Probability": 24,
              "Snow": 0,
              "Rain": 0.1
            }
          }
        },
        {
          "TimeStamp": 1669831200000,
          "Weather": {
            "Description": "overcast clouds",
            "Temperature": {
              "Temperature": -15,
              "PercievedTemp": 4.78
            },
            "Pressure": {
              "Pressure": 1023,
              "PressureSeaLevel": 1023,
              "PressureGroundLevel": 1004
            },
            "Humidity": 1,
            "Clouds": 100,
            "Wind": {
              "Speed": 2.38,
              "Direction": 4,
              "Gust": 5.64
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669842000000,
          "Weather": {
            "Description": "overcast clouds",
            "Temperature": {
              "Temperature": -10,
              "PercievedTemp": 4.35
            },
            "Pressure": {
              "Pressure": 1024,
              "PressureSeaLevel": 1024,
              "PressureGroundLevel": 1005
            },
            "Humidity": 1,
            "Clouds": 100,
            "Wind": {
              "Speed": 2.65,
              "Direction": 3,
              "Gust": 5.81
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669852800000,
          "Weather": {
            "Description": "overcast clouds",
            "Temperature": {
              "Temperature": -5,
              "PercievedTemp": 4.59
            },
            "Pressure": {
              "Pressure": 1024,
              "PressureSeaLevel": 1024,
              "PressureGroundLevel": 1004
            },
            "Humidity": 1,
            "Clouds": 100,
            "Wind": {
              "Speed": 2.1,
              "Direction": 22,
              "Gust": 4.57
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669863600000,
          "Weather": {
            "Description": "overcast clouds",
            "Temperature": {
              "Temperature": 0,
              "PercievedTemp": 4.1
            },
            "Pressure": {
              "Pressure": 1024,
              "PressureSeaLevel": 1024,
              "PressureGroundLevel": 1005
            },
            "Humidity": 1,
            "Clouds": 98,
            "Wind": {
              "Speed": 2.08,
              "Direction": 24,
              "Gust": 4.88
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669874400000,
          "Weather": {
            "Description": "light rain",
            "Temperature": {
              "Temperature": 5,
              "PercievedTemp": 3.32
            },
            "Pressure": {
              "Pressure": 1025,
              "PressureSeaLevel": 1025,
              "PressureGroundLevel": 1005
            },
            "Humidity": 1,
            "Clouds": 98,
            "Wind": {
              "Speed": 1.86,
              "Direction": 45,
              "Gust": 5.07
            },
            "Precipitation": {
              "Probability": 20,
              "Snow": 0,
              "Rain": 0.1
            }
          }
        },
        {
          "TimeStamp": 1669885200000,
          "Weather": {
            "Description": "overcast clouds",
            "Temperature": {
              "Temperature": 10,
              "PercievedTemp": 2.23
            },
            "Pressure": {
              "Pressure": 1025,
              "PressureSeaLevel": 1025,
              "PressureGroundLevel": 1006
            },
            "Humidity": 1,
            "Clouds": 96,
            "Wind": {
              "Speed": 2.86,
              "Direction": 30,
              "Gust": 6.39
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669896000000,
          "Weather": {
            "Description": "broken clouds",
            "Temperature": {
              "Temperature": 15,
              "PercievedTemp": 3.4
            },
            "Pressure": {
              "Pressure": 1025,
              "PressureSeaLevel": 1025,
              "PressureGroundLevel": 1005
            },
            "Humidity": 1,
            "Clouds": 61,
            "Wind": {
              "Speed": 3.49,
              "Direction": 43,
              "Gust": 4.35
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669906800000,
          "Weather": {
            "Description": "few clouds",
            "Temperature": {
              "Temperature": 20,
              "PercievedTemp": 2.18
            },
            "Pressure": {
              "Pressure": 1024,
              "PressureSeaLevel": 1024,
              "PressureGroundLevel": 1005
            },
            "Humidity": 1,
            "Clouds": 18,
            "Wind": {
              "Speed": 3,
              "Direction": 29,
              "Gust": 5.69
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669917600000,
          "Weather": {
            "Description": "scattered clouds",
            "Temperature": {
              "Temperature": 22,
              "PercievedTemp": -0.16
            },
            "Pressure": {
              "Pressure": 1025,
              "PressureSeaLevel": 1025,
              "PressureGroundLevel": 1005
            },
            "Humidity": 1,
            "Clouds": 38,
            "Wind": {
              "Speed": 3.17,
              "Direction": 29,
              "Gust": 6.44
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669928400000,
          "Weather": {
            "Description": "overcast clouds",
            "Temperature": {
              "Temperature": 25,
              "PercievedTemp": -0.77
            },
            "Pressure": {
              "Pressure": 1026,
              "PressureSeaLevel": 1026,
              "PressureGroundLevel": 1006
            },
            "Humidity": 1,
            "Clouds": 100,
            "Wind": {
              "Speed": 3.31,
              "Direction": 28,
              "Gust": 6.29
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669939200000,
          "Weather": {
            "Description": "overcast clouds",
            "Temperature": {
              "Temperature": 30,
              "PercievedTemp": -1.3
            },
            "Pressure": {
              "Pressure": 1026,
              "PressureSeaLevel": 1026,
              "PressureGroundLevel": 1006
            },
            "Humidity": 1,
            "Clouds": 97,
            "Wind": {
              "Speed": 3.37,
              "Direction": 21,
              "Gust": 6.33
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669950000000,
          "Weather": {
            "Description": "broken clouds",
            "Temperature": {
              "Temperature": 40,
              "PercievedTemp": -2.91
            },
            "Pressure": {
              "Pressure": 1026,
              "PressureSeaLevel": 1026,
              "PressureGroundLevel": 1006
            },
            "Humidity": 1,
            "Clouds": 81,
            "Wind": {
              "Speed": 3.81,
              "Direction": 32,
              "Gust": 6.86
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669960800000,
          "Weather": {
            "Description": "broken clouds",
            "Temperature": {
              "Temperature": 50,
              "PercievedTemp": -3.33
            },
            "Pressure": {
              "Pressure": 1026,
              "PressureSeaLevel": 1026,
              "PressureGroundLevel": 1006
            },
            "Humidity": 1,
            "Clouds": 66,
            "Wind": {
              "Speed": 3.2,
              "Direction": 37,
              "Gust": 6.61
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669971600000,
          "Weather": {
            "Description": "scattered clouds",
            "Temperature": {
              "Temperature": 1.75,
              "PercievedTemp": -1.88
            },
            "Pressure": {
              "Pressure": 1026,
              "PressureSeaLevel": 1026,
              "PressureGroundLevel": 1006
            },
            "Humidity": 1,
            "Clouds": 27,
            "Wind": {
              "Speed": 3.63,
              "Direction": 49,
              "Gust": 6.29
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669982400000,
          "Weather": {
            "Description": "scattered clouds",
            "Temperature": {
              "Temperature": 3.9,
              "PercievedTemp": 0.44
            },
            "Pressure": {
              "Pressure": 1025,
              "PressureSeaLevel": 1025,
              "PressureGroundLevel": 1005
            },
            "Humidity": 1,
            "Clouds": 28,
            "Wind": {
              "Speed": 4.12,
              "Direction": 46,
              "Gust": 4.99
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1669993200000,
          "Weather": {
            "Description": "scattered clouds",
            "Temperature": {
              "Temperature": 2.3,
              "PercievedTemp": -1.76
            },
            "Pressure": {
              "Pressure": 1025,
              "PressureSeaLevel": 1025,
              "PressureGroundLevel": 1005
            },
            "Humidity": 1,
            "Clouds": 50,
            "Wind": {
              "Speed": 4.49,
              "Direction": 39,
              "Gust": 7.9
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670004000000,
          "Weather": {
            "Description": "scattered clouds",
            "Temperature": {
              "Temperature": 0.84,
              "PercievedTemp": -3.11
            },
            "Pressure": {
              "Pressure": 1025,
              "PressureSeaLevel": 1025,
              "PressureGroundLevel": 1005
            },
            "Humidity": 1,
            "Clouds": 44,
            "Wind": {
              "Speed": 3.8,
              "Direction": 47,
              "Gust": 8.35
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670014800000,
          "Weather": {
            "Description": "broken clouds",
            "Temperature": {
              "Temperature": -0.02,
              "PercievedTemp": -3.7
            },
            "Pressure": {
              "Pressure": 1026,
              "PressureSeaLevel": 1026,
              "PressureGroundLevel": 1006
            },
            "Humidity": 1,
            "Clouds": 63,
            "Wind": {
              "Speed": 3.2,
              "Direction": 37,
              "Gust": 6.82
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670025600000,
          "Weather": {
            "Description": "broken clouds",
            "Temperature": {
              "Temperature": -0.13,
              "PercievedTemp": -3.87
            },
            "Pressure": {
              "Pressure": 1025,
              "PressureSeaLevel": 1025,
              "PressureGroundLevel": 1005
            },
            "Humidity": 1,
            "Clouds": 73,
            "Wind": {
              "Speed": 3.25,
              "Direction": 30,
              "Gust": 7.08
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670036400000,
          "Weather": {
            "Description": "overcast clouds",
            "Temperature": {
              "Temperature": -0.7,
              "PercievedTemp": -4.69
            },
            "Pressure": {
              "Pressure": 1024,
              "PressureSeaLevel": 1024,
              "PressureGroundLevel": 1004
            },
            "Humidity": 1,
            "Clouds": 99,
            "Wind": {
              "Speed": 3.4,
              "Direction": 27,
              "Gust": 7.16
            },
            "Precipitation": {
              "Probability": 9,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670047200000,
          "Weather": {
            "Description": "light snow",
            "Temperature": {
              "Temperature": -0.93,
              "PercievedTemp": -5.34
            },
            "Pressure": {
              "Pressure": 1024,
              "PressureSeaLevel": 1024,
              "PressureGroundLevel": 1004
            },
            "Humidity": 1,
            "Clouds": 100,
            "Wind": {
              "Speed": 3.88,
              "Direction": 37,
              "Gust": 8.42
            },
            "Precipitation": {
              "Probability": 44,
              "Snow": 0,
              "Rain": 0.64
            }
          }
        },
        {
          "TimeStamp": 1670058000000,
          "Weather": {
            "Description": "light snow",
            "Temperature": {
              "Temperature": -0.76,
              "PercievedTemp": -5.49
            },
            "Pressure": {
              "Pressure": 1023,
              "PressureSeaLevel": 1023,
              "PressureGroundLevel": 1003
            },
            "Humidity": 1,
            "Clouds": 100,
            "Wind": {
              "Speed": 4.4,
              "Direction": 44,
              "Gust": 7.78
            },
            "Precipitation": {
              "Probability": 89,
              "Snow": 0,
              "Rain": 1.32
            }
          }
        },
        {
          "TimeStamp": 1670068800000,
          "Weather": {
            "Description": "light snow",
            "Temperature": {
              "Temperature": 0.55,
              "PercievedTemp": -3.45
            },
            "Pressure": {
              "Pressure": 1022,
              "PressureSeaLevel": 1022,
              "PressureGroundLevel": 1002
            },
            "Humidity": 1,
            "Clouds": 100,
            "Wind": {
              "Speed": 3.77,
              "Direction": 52,
              "Gust": 5.37
            },
            "Precipitation": {
              "Probability": 90,
              "Snow": 0,
              "Rain": 0.53
            }
          }
        },
        {
          "TimeStamp": 1670079600000,
          "Weather": {
            "Description": "overcast clouds",
            "Temperature": {
              "Temperature": 0.13,
              "PercievedTemp": -3.37
            },
            "Pressure": {
              "Pressure": 1022,
              "PressureSeaLevel": 1022,
              "PressureGroundLevel": 1002
            },
            "Humidity": 1,
            "Clouds": 98,
            "Wind": {
              "Speed": 3.03,
              "Direction": 51,
              "Gust": 5.7
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670090400000,
          "Weather": {
            "Description": "overcast clouds",
            "Temperature": {
              "Temperature": -0.9,
              "PercievedTemp": -4.36
            },
            "Pressure": {
              "Pressure": 1021,
              "PressureSeaLevel": 1021,
              "PressureGroundLevel": 1002
            },
            "Humidity": 1,
            "Clouds": 97,
            "Wind": {
              "Speed": 2.77,
              "Direction": 35,
              "Gust": 5.72
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670101200000,
          "Weather": {
            "Description": "overcast clouds",
            "Temperature": {
              "Temperature": 0.12,
              "PercievedTemp": -2.6
            },
            "Pressure": {
              "Pressure": 1021,
              "PressureSeaLevel": 1021,
              "PressureGroundLevel": 1001
            },
            "Humidity": 1,
            "Clouds": 100,
            "Wind": {
              "Speed": 2.24,
              "Direction": 28,
              "Gust": 4.54
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670112000000,
          "Weather": {
            "Description": "overcast clouds",
            "Temperature": {
              "Temperature": 0.4,
              "PercievedTemp": -2.13
            },
            "Pressure": {
              "Pressure": 1021,
              "PressureSeaLevel": 1021,
              "PressureGroundLevel": 1001
            },
            "Humidity": 1,
            "Clouds": 100,
            "Wind": {
              "Speed": 2.12,
              "Direction": 33,
              "Gust": 4.12
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670122800000,
          "Weather": {
            "Description": "scattered clouds",
            "Temperature": {
              "Temperature": -1.66,
              "PercievedTemp": -4.72
            },
            "Pressure": {
              "Pressure": 1021,
              "PressureSeaLevel": 1021,
              "PressureGroundLevel": 1001
            },
            "Humidity": 1,
            "Clouds": 50,
            "Wind": {
              "Speed": 2.26,
              "Direction": 21,
              "Gust": 3.19
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670133600000,
          "Weather": {
            "Description": "scattered clouds",
            "Temperature": {
              "Temperature": -2.21,
              "PercievedTemp": -5.15
            },
            "Pressure": {
              "Pressure": 1021,
              "PressureSeaLevel": 1021,
              "PressureGroundLevel": 1001
            },
            "Humidity": 1,
            "Clouds": 41,
            "Wind": {
              "Speed": 2.09,
              "Direction": 19,
              "Gust": 2.78
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670144400000,
          "Weather": {
            "Description": "few clouds",
            "Temperature": {
              "Temperature": 0.28,
              "PercievedTemp": -1.78
            },
            "Pressure": {
              "Pressure": 1021,
              "PressureSeaLevel": 1021,
              "PressureGroundLevel": 1001
            },
            "Humidity": 1,
            "Clouds": 13,
            "Wind": {
              "Speed": 1.73,
              "Direction": 33,
              "Gust": 3.12
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670155200000,
          "Weather": {
            "Description": "scattered clouds",
            "Temperature": {
              "Temperature": 3.96,
              "PercievedTemp": 1.91
            },
            "Pressure": {
              "Pressure": 1020,
              "PressureSeaLevel": 1020,
              "PressureGroundLevel": 1001
            },
            "Humidity": 1,
            "Clouds": 32,
            "Wind": {
              "Speed": 2.24,
              "Direction": 85,
              "Gust": 4.81
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670166000000,
          "Weather": {
            "Description": "few clouds",
            "Temperature": {
              "Temperature": 1.78,
              "PercievedTemp": 0.27
            },
            "Pressure": {
              "Pressure": 1020,
              "PressureSeaLevel": 1020,
              "PressureGroundLevel": 1000
            },
            "Humidity": 1,
            "Clouds": 18,
            "Wind": {
              "Speed": 1.5,
              "Direction": 83,
              "Gust": 1.82
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670176800000,
          "Weather": {
            "Description": "few clouds",
            "Temperature": {
              "Temperature": -0.69,
              "PercievedTemp": -0.69
            },
            "Pressure": {
              "Pressure": 1021,
              "PressureSeaLevel": 1021,
              "PressureGroundLevel": 1001
            },
            "Humidity": 1,
            "Clouds": 15,
            "Wind": {
              "Speed": 1.23,
              "Direction": 38,
              "Gust": 1.4
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        },
        {
          "TimeStamp": 1670187600000,
          "Weather": {
            "Description": "few clouds",
            "Temperature": {
              "Temperature": -1.34,
              "PercievedTemp": -1.34
            },
            "Pressure": {
              "Pressure": 1022,
              "PressureSeaLevel": 1022,
              "PressureGroundLevel": 1002
            },
            "Humidity": 1,
            "Clouds": 13,
            "Wind": {
              "Speed": 0.77,
              "Direction": 2,
              "Gust": 1.26
            },
            "Precipitation": {
              "Probability": 0,
              "Snow": 0,
              "Rain": 0
            }
          }
        }
      ]`

    currentData = '{"TimeStamp":1670073999000,"Weather":{"Description":"overcast clouds","Temperature":{"Temperature":1.63,"PercievedTemp":-1.25},"Pressure":{"Pressure":1020},"Humidity":1,"Clouds":100,"Wind":{"Speed":2.67,"Direction":47,"Gust":3.79},"Precipitation":{"Probability":null,"Snow":0,"Rain":0}}}'
    
    async getForeCast(): Promise<WeatherForecast[]> {
        return new Promise<WeatherForecast[]>((resolve, reject)=>{
            resolve(JSON.parse(this.datasting))
        });
    }
    async getCurrentWeather(): Promise<WeatherForecast> {
        return new Promise<WeatherForecast>((resolve, reject)=>{
            resolve(JSON.parse(this.currentData))
        })
    }

}