import {ApplicationConfig, importProvidersFrom} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {
  provideRouter,
  RouterModule,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling, withPreloading, withRouterConfig
} from "@angular/router";
import {routes} from "./app.routes";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {provideHttpClient} from "@angular/common/http";
import {MessageManagerService} from "./shared/ui";


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    provideRouter(routes, withComponentInputBinding(),
    // this is in place of scrollPositionRestoration: 'disabled',
    withInMemoryScrolling({
        scrollPositionRestoration: 'disabled',
      }),
      // in place of initialNavigation: 'enabledBlocking'
      withEnabledBlockingInitialNavigation(),
      // same configuration
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
        onSameUrlNavigation: 'reload'
      }),

      // in place of  preloadingStrategy: PreloadService,
      // withPreloading(PreloadService),
    )
  ],
}
//     importProvidersFrom(BrowserModule, AppRoutingModule),
// { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
// provideRouter(
//   routes,
//
//   withComponentInputBinding(),
// ),
