import {Routes} from "@angular/router";
import {ProjectComponent} from "./project.component";


export const PROJECT_ROUTES: Routes = [
  //canActivate: [ AuthGuard ]
  {
    path: '',
    component: ProjectComponent,
    children: [
      // { path: 'projects', component: ProjectComponent,  title: 'ProjectComponent' },

    ],
  },
]
