import {Routes} from "@angular/router";


export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadChildren: () => import('./microservices/microservices.index')
      .then((m) => m.MICROSERVICES_ROUTES), data: {animation: 'Home'} },

  ];
