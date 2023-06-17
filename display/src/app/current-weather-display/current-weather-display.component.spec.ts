import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherForecast } from '../WeatherProvider/weather-provider';

import { CurrentWeatherDisplayComponent } from './current-weather-display.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CurrentWeatherDisplayComponent', () => {
  let component: CurrentWeatherDisplayComponent;
  let fixture: ComponentFixture<CurrentWeatherDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentWeatherDisplayComponent ],
      providers:[HttpClient, HttpHandler]
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
    expect(component.temp_element?.nativeElement.textContent).toEqual(temp.toString()+" °C")
  })
  it('update data should update description',()=>{
    let description ="test_description"
    let forecast = new WeatherForecast()
    forecast.Weather.Description=description
    component.updateScreen(forecast)
    fixture.detectChanges()
    expect(component.weather_element?.nativeElement.textContent).toEqual(description)
  })

  
});
