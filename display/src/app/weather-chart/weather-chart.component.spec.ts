import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherChartComponent } from './weather-chart.component';

describe('LineChartComponent', () => {
  let component: WeatherChartComponent;
  let fixture: ComponentFixture<WeatherChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeatherChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
