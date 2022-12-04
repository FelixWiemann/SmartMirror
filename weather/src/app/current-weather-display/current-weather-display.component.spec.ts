import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherForecast } from '../WeatherProvider/weather-provider';

import { CurrentWeatherDisplayComponent } from './current-weather-display.component';

describe('CurrentWeatherDisplayComponent', () => {
  let component: CurrentWeatherDisplayComponent;
  let fixture: ComponentFixture<CurrentWeatherDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentWeatherDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentWeatherDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('update data should update temperature',()=>{
    let temp = 10
    let forecast = new WeatherForecast()
    forecast.Weather.Temperature.Temperature = temp
    component.updateScreen(forecast)
    fixture.detectChanges()
    expect(document.getElementById(component.document_temperature_id)?.textContent).toEqual(temp.toString()+" °C")
  })
  it('update data should update description',()=>{
    let description ="test_description"
    let forecast = new WeatherForecast()
    forecast.Weather.Description=description
    component.updateScreen(forecast)
    fixture.detectChanges()
    expect(document.getElementById(component.document_weather_text_id)?.textContent).toEqual(description)
  })

  it('10 should be 50% of scale between 0 and 20',()=>{
    expect(component.getPercentage(10, 0, 20)).toEqual(0.5)
  });
  it('0 should be 0% of scale between 0 and 20',()=>{
    expect(component.getPercentage(0, 0, 20)).toEqual(0)
  });
  it('0 should be 50% of scale between -10 and 10',()=>{
    expect(component.getPercentage(0, -10, 10)).toEqual(0.5)
  });
  it('-10 should be 0% of scale between -10 and 10',()=>{
    expect(component.getPercentage(-10, -10, 10)).toEqual(0)
  });
  it('10 should be 100% of scale between -10 and 10',()=>{
    expect(component.getPercentage(10, -10, 10)).toEqual(1)
  });
  it('20 should be 100% of scale between 0 and 20',()=>{
    expect(component.getPercentage(20, 0, 20)).toEqual(1)
  });
  it('30 should be 150% of scale between 0 and 20',()=>{
    expect(component.getPercentage(30, 0, 20)).toEqual(1.5)
  });

  it('1 gradient color between red and green',()=>{
    expect(component.getGradientColor("#ff0000", "#00ff00", 1)).toEqual("#00ff00")
  })
  it('0.5 gradient color between red and green',()=>{
    expect(component.getGradientColor("#ff0000", "#00ff00", 0.5)).toEqual("#7f7f00")
  })
  it('0 gradient color between red and green',()=>{
    expect(component.getGradientColor("#ff0000", "#00ff00", 0)).toEqual("#ff0000")
  })

  it('50° should be red',()=>{
    expect(component.getColorForTemperature(50)).toEqual("#ff0000")
  });

  it('10° should be green',()=>{
    expect(component.getColorForTemperature(10)).toEqual("#00ff00")
  });

  it('-15° should be blue',()=>{
    expect(component.getColorForTemperature(-15)).toEqual("#0000ff")
  });
});
