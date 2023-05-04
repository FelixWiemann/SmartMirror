import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 

import { WeatherChartModule } from './weather-chart/weather-chart.module';
import { CurrentWeatherDisplayComponent } from './current-weather-display/current-weather-display.component';
import { SystemComponent } from './system/system.component';
import { RemoteComponent } from './remote/remote.component';
import { MirrorComponent } from './mirror/mirror.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GaspriceComponent } from './gasprice/gasprice.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentWeatherDisplayComponent,
    SystemComponent,
    RemoteComponent,
    MirrorComponent,
    GaspriceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WeatherChartModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSnackBarModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
