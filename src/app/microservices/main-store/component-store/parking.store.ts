import {iCar} from "../parking-car/interface/car";
import {ComponentStore, tapResponse} from "@ngrx/component-store";
import {ParkingLotService} from "../services/parking-lot.service";
import {inject, Injectable} from "@angular/core";
import {catchError, concatMap, EMPTY, Observable, of} from "rxjs";


export const enum LoadingState {
  INIT = 'INIT',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
}
export interface ErrorState {
  errorMsg: string;
}

export type CallState = LoadingState | ErrorState;

// The state model
interface ParkingState {
  cars: iCar[]; // render the table with cars
  callState: CallState;
}
@Injectable()
export class ParkingStore  extends ComponentStore<ParkingState> {
  private readonly parkingService = inject(ParkingLotService);

  constructor() {
    super({cars: [], callState: LoadingState.INIT});
  }


  // SELECTORS
  private readonly cars$: Observable<iCar[]> = this.select(
    (state) => state.cars
  );
  private readonly loading$: Observable<boolean> = this.select(
    (state) => state.callState === LoadingState.LOADING
  );
  private readonly error$: Observable<string | null> = this.select((state) =>
    getError(state.callState)
  );

  // ViewModel for the component
  readonly vm$ = this.select( this.cars$, this.loading$,   this.error$,
    (cars, loading, error) => ({    cars,  loading,   error,   })
  );


  // EFFECTS
  readonly addCarToParkingLot = this.effect((plate$: Observable<string>) => {
    return plate$.pipe(
      concatMap((plate: string) => {
        this.setLoading();
        return this.parkingService.add(plate).pipe(
          tapResponse(
            (car) => {
              this.setLoaded();
              this.updateCars(car);
            },
            (e: string) => this.updateError(e)
          ),
          catchError(() => EMPTY)
        );
      })
    );
  });


  // UPDATERS
  readonly updateError = this.updater((state: ParkingState, error: string) => {
    return {
      ...state,
      callState: {
        errorMsg: error,
      },
    };
  });

  readonly setLoading = this.updater((state: ParkingState) => {
    return {
      ...state,
      callState: LoadingState.LOADING,
    };
  });

  readonly setLoaded = this.updater((state: ParkingState) => {
    return {
      ...state,
      callState: LoadingState.LOADED,
    };
  });

  readonly updateCars = this.updater((state: ParkingState, car: iCar) => {
    return {
      ...state,
      cars: [...state.cars, car],
    };
  });


}
// Utility function to extract the error from the state
function getError(callState: CallState): LoadingState | string | null {
  if ((callState as ErrorState).errorMsg !== undefined) {
    return (callState as ErrorState).errorMsg;
  }

  return null;
}

