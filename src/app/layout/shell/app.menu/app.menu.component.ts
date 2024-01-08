import {Component, OnInit} from '@angular/core';
import {CommonModule, NgFor, NgIf} from '@angular/common';
import {AppLayoutService} from "../../services/app.layout.service";
import {AppMenuitemComponent} from "./app.menuitem.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor, AppMenuitemComponent],
  templateUrl: './app.menu.component.html',
  styleUrls: ['./app.menu.component.scss']
})
export class AppMenuComponent  implements OnInit {

  model: any[] = [];

  constructor(public layoutService: AppLayoutService) { }

  ngOnInit() {
    this.model = [
      {
        label: 'Home',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
        ]
      },
       {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        items: [
          {
            label: 'Compoment Store(Redux)',
            icon: 'pi pi-fw pi-pencil',
            routerLink: ['/dashboard/redux']
          },
          {
            label: 'REDUX - NGRX',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {
                label: 'Compoment Store',
                icon: 'pi pi-fw pi-pencil',
                routerLink: ['/dashboard/redux']
              },
              {
                label: 'Parking Lot Control',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/dashboard/redux/parking']
              },
              {
                label: 'Access Denied',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/dashboard/redux/form-store']
              }
            ]
          },
          {
            label: 'Auth',
            icon: 'pi pi-fw pi-user',
            items: [
              {
                label: 'Login',
                icon: 'pi pi-fw pi-sign-in',
                routerLink: ['/auth/login']
              },
              {
                label: 'Error',
                icon: 'pi pi-fw pi-times-circle',
                routerLink: ['/auth/error']
              },
              {
                label: 'Access Denied',
                icon: 'pi pi-fw pi-lock',
                routerLink: ['/auth/access']
              }
            ]
          },
        ]
      }

    ];
  }
}
