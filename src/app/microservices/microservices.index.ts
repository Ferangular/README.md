import {Routes} from "@angular/router";

import {HomeComponent} from "./home/home.component";
import {AppLayoutComponent} from "../layout/shell/app.layout/app.layout.component";
import {STORE_ROUTES} from "./main-store/main-store.index";


export const MICROSERVICES_ROUTES: Routes = [
  {  path: '', component:  AppLayoutComponent,
    children: [
      { path: '', component: HomeComponent, title: 'Banco de Trabajo' },
      { path: 'home', component: HomeComponent, title: 'Banco de Trabajo' },
      { path: 'redux', title: 'Component Store', loadChildren: () => import('./main-store/main-store.index').then((m) => m.STORE_ROUTES) },

      { path: 'project', title: 'Proyectos', loadChildren: () => import('./project/project.index').then((m) => m.PROJECT_ROUTES) },
    ],

  }

  ]
