import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-micro',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './main-micro.component.html',
  styleUrls: ['./main-micro.component.scss']
})
export class MainMicroComponent {

}
