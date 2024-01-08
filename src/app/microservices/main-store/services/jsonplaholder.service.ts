import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {iTodo} from "../first-example/interfaces/todo";

@Injectable({
  providedIn: 'root'
})
export class JsonplaholderService {

  private readonly http = inject(HttpClient);
  path = 'https://jsonplaceholder.typicode.com/todos';

  getData(): Observable<iTodo[]>{
    return this.http.get<iTodo[]>(this.path);
  }
  update(todo: iTodo): Observable<iTodo>{
    return this.http.put<iTodo>(`${this.path}/${todo.id}`, todo);
  }
}
