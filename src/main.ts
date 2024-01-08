import { AppComponent } from './app/app.component';

import {appConfig} from "./app/app.config";


import {bootstrapApplication} from "@angular/platform-browser";
import {environment} from "./environments/environment";
import {enableProdMode} from "@angular/core";


if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, appConfig).then(ref => {
  console.log('Application is running!');
  // if(window['ngRef']){
  //   window['ngRef'].destroy();
  // }
  // window['ngRef'] = ref;
})
  .catch(err => console.error(err));

// platformBrowserDynamic.bootstrapModule(AppComponent, appConfig).catch((err:any)=>console.error(err));
