import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { WeatherChartModule } from './weather-chart/weather-chart.module';
import { CurrentWeatherDisplayComponent } from './current-weather-display/current-weather-display.component';
import { SystemComponent } from './system/system.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherDisplayComponent,
    SystemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WeatherChartModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
