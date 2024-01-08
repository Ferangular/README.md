import {MainStoreComponent} from "./main-store.component";
import {Routes} from "@angular/router";
import {ListComponent} from "./first-example/list/list.component";
import {ParkingCarComponent} from "./parking-car/parking-car.component";
import {FormStoreComponent} from "./form-store/form-store.component";


export const STORE_ROUTES: Routes = [
  //canActivate: [ AuthGuard ]
  {
    path: '',
    component: MainStoreComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'parking', component: ParkingCarComponent },
      { path: 'form-store', component: FormStoreComponent },
    ],
  },
]
