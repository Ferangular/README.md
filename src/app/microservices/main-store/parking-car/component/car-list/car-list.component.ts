import {Component, Input} from '@angular/core';
import {CommonModule, NgForOf, NgIf} from '@angular/common';
import {iCar} from "../../interface/car";

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [CommonModule, NgForOf, NgIf],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent {
  @Input() cars: iCar[] = [];

  constructor() {}
}

