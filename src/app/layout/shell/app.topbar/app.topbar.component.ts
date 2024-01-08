import {Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {AppLayoutService} from "../../services/app.layout.service";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.scss']
})
export class AppTopbarComponent {
  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: AppLayoutService) { }
}
