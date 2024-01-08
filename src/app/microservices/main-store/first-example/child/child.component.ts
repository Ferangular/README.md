import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Store} from "../../component-store/store";

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [CommonModule],
template:`
<h3>{{ store.child()  }}</h3>
`


})
export class ChildComponent {
  protected readonly  store = inject(Store)

}
