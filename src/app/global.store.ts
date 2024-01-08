import {ComponentStore} from "@ngrx/component-store";
import {Injectable} from "@angular/core";
import {AuthResponse} from "./core/models/auth-response";


export interface GlobalState{
 loading: boolean;
 user: AuthResponse | null;
 roles: string[];
}
@Injectable({
  providedIn: 'root'
})
export class GlobalStore extends ComponentStore<GlobalState>{

  constructor() {
    super({loading: false, user: null, roles: []});
  }

  readonly loading$ = this.select(state => state.loading, {debounce: true});
  readonly loggedIn$ = this.selectSignal(state => !!state.user );


  readonly setLoading = this.updater((state, loading: boolean) => {
    return {
      ...state,
      loading
    }
  })

  readonly setUser = this.updater((state, user: AuthResponse) => {
    return {
      ...state,
      user
    }
  })
  readonly setRoles = this.updater((state, roles: string[]) => {
    return {
      ...state,
      roles
    }
  })


  hasPermission(permission: string): boolean {

    // if(permmissionKey === Permision.Chore) return true;

    return this.get().roles.includes(permission);
  }

}


/**
 {debounce: true} => Mejora el rendimiento al reducir la cantidad de procesamiento y renderizado innecesarios con actualizacion demasiados frecuentes
 */
