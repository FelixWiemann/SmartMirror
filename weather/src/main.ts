import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { config } from 'rxjs';

import { AppModule } from './app/app.module';
import { LoggingConsole } from './app/LoggingConsole';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
// replacing console to also send logs to the py server
let loggingconsole = new LoggingConsole()
console = {
  ...console,
  ...loggingconsole
} 

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

