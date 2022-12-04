import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherForecast } from '../WeatherProvider/weather-provider';

import { CurrentWeatherDisplayComponent, Gradient } from './current-weather-display.component';

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

  it('10 should be 50% of scale between 0 and 20',()=>{
    
    expect(new Gradient(0,20,"","").getPercentage(10)).toEqual(0.5)
  });
  it('0 should be 0% of scale between 0 and 20',()=>{
    expect(new Gradient(0,20,"","").getPercentage(0)).toEqual(0)
  });
  it('0 should be 50% of scale between -10 and 10',()=>{
    expect(new Gradient(-10,10,"","").getPercentage(0)).toEqual(0.5)
  });
  it('-10 should be 0% of scale between -10 and 10',()=>{
    expect(new Gradient(-10,10,"","").getPercentage(-10)).toEqual(0)
  });
  it('10 should be 100% of scale between -10 and 10',()=>{
    expect(new Gradient(-10,10,"","").getPercentage(10)).toEqual(1)
  });
  it('20 should be 100% of scale between 0 and 20',()=>{
    expect(new Gradient(0,20,"","").getPercentage(20)).toEqual(1)
  });
  it('30 should be 150% of scale between 0 and 20',()=>{
    expect(new Gradient(0,20,"","").getPercentage(30)).toEqual(1.5)
  });

  it('1 gradient color between red and green',()=>{
    expect(new Gradient(0,1,"#ff0000","#00ff00").getGradientColor(1)).toEqual("#00ff00")
  })
  it('0.5 gradient color between red and green',()=>{
    expect(new Gradient(0,1,"#ff0000","#00ff00").getGradientColor( 0.5)).toEqual("#7f7f00")
  })
  it('0 gradient color between red and green',()=>{
    expect(new Gradient(0,1,"#ff0000","#00ff00").getGradientColor(0)).toEqual("#ff0000")
  })
});
