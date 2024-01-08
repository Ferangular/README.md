import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ErrorMessageComponent} from "./component/error-message/error-message.component";
import {SearchFormComponent} from "./component/search-form/search-form.component";
import {CarListComponent} from "./component/car-list/car-list.component";
import {ParkingStore} from "../component-store/parking.store";

@Component({
  selector: 'app-parking-car',
  standalone: true,
  imports: [CommonModule, ErrorMessageComponent, SearchFormComponent, CarListComponent],
  templateUrl: './parking-car.component.html',
  styleUrls: ['./parking-car.component.scss'],
  providers: [ParkingStore],
})
export class ParkingCarComponent {
  protected readonly parkingStore = inject(ParkingStore);
  vm$ = this.parkingStore.vm$;

  constructor() {}

  addPlate(plate: string) {
    this.parkingStore.addCarToParkingLot(plate);
  }
}
