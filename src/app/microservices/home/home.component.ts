import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainLoadingComponent} from "../../shared/components/main-loading/main-loading.component";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [CommonModule, MainLoadingComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

}
