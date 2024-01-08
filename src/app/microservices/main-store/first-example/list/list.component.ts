import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {JsonplaholderService} from "../../services/jsonplaholder.service";
import {iTodo} from "../interfaces/todo";
import {Store} from "../../component-store/store";
import {ChildComponent} from "../child/child.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ChildComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[Store]
})
export class ListComponent implements OnInit{

  // private readonly service = inject(JsonplaholderService)
  protected readonly store = inject(Store)
  protected readonly todos= this.store.todos
  // todos: iTodo[]=[];

  ngOnInit(): void {
    this.store.initialize();
    // this.service.getData().subscribe({
    //   next: (data: iTodo[]) => {
    //     this.todos = data
    //   }
    // })
  }
  setchild(){
    this.store.setChild('Hola hijo desde el padre');
  }
  updateTodo(todo: iTodo){
this.store.updatedCompleted({...todo, completed: !todo.completed});
  }

}
