import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-store',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './main-store.component.html'
})
export class MainStoreComponent {

}
