import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppLayoutService} from "../../services/app.layout.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.footer.component.html',
  styleUrls: ['./app.footer.component.scss']
})
export class AppFooterComponent {
  constructor(public layoutService: AppLayoutService) { }
}
