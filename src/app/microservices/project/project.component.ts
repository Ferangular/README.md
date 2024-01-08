import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {

}
