import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {FormsModule, NgModel} from "@angular/forms";
import {ParkingStore} from "../../../component-store/parking.store";

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
  providers: [ParkingStore],
})
export class SearchFormComponent {
  private readonly parkingStore = inject(ParkingStore);
  vm$ = this.parkingStore.vm$;
  @Input() loading = false;
  @Output() addPlate = new EventEmitter<string>();
  plate = '';

  constructor() {}

  onSubmit($event: Event) {
    $event.preventDefault();

    this.addPlate.emit(this.plate);
    this.plate = '';
  }

  selectPlate($event: Event) {
    const target = $event.target as HTMLButtonElement;

    if (target.nodeName === 'BUTTON') {
      this.plate = target.innerHTML;
    }
  }
}
