import {inject, Injectable} from "@angular/core";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {iTodo} from "../first-example/interfaces/todo";
import {catchError, EMPTY, pipe, switchMap, tap} from "rxjs";
import {JsonplaholderService} from "../services/jsonplaholder.service";


interface TodoState {
  todos: iTodo[],
  child: string
}

@Injectable()
export class Store extends ComponentStore<TodoState> {
  private readonly service = inject(JsonplaholderService)

  constructor() {
    super({todos: [{userId: 1, id: 1, title: 'delectus aut autem', completed: true}], child: 'Hola Padre'});
  }


//   select
//   todo$ = this.select(state => state.todos);
  readonly todos = this.selectSignal(state => state.todos);
  readonly child = this.selectSignal(state => state.child);


  // effect ,.. click raton....
  /*
   readonly  initialize = this.effect((trigger$) => trigger$.pipe(
   switchMap(()=> this.service.getData().pipe(
     tap(response => this.patchState({todos: response})),
     catchError((error) => {
       console.log(error);
       return EMPTY;
     }),
   ))
  ))*/
  readonly initialize = this.effect((trigger$) => trigger$.pipe(
    switchMap(() => this.service.getData().pipe(
      tapResponse({
        next: (response) => this.patchState({todos: response}),
        error: (error) => {
          console.log(error);
        }
      }),
    ))
  ));

  readonly updatedCompleted = this.effect<iTodo>((trigger$) =>
  trigger$.pipe(
    switchMap((todo: iTodo) => this.service.update(todo).pipe(
      tapResponse({
        next: (response) => console.log(response),
        error: (error) => {
          console.log(error);
        }
      }),
    ))
  ))
  // updaters
  readonly addTodo = this.updater((state, todo: iTodo) => {
    return {
      ...state,
      todos: [...state.todos, todo]
    }
  })
  readonly setChild = this.updater((state, child: string) => {
    return {
      ...state,
      child
    }
  });
  readonly setTodoUpdated = this.updater((state, todo: iTodo) => {
    return {
      ...state,
      todos: state.todos.map(t => t.id === todo.id ? todo : t)
    }
  })

}
