import {Component, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppLayoutService} from "../../services/app.layout.service";
import {AppMenuComponent} from "../app.menu/app.menu.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, AppMenuComponent],
  templateUrl: './app.sidebar.component.html',
  styleUrls: ['./app.sidebar.component.scss']
})
export class AppSidebarComponent {
  constructor(public layoutService: AppLayoutService, public el: ElementRef) { }
}
