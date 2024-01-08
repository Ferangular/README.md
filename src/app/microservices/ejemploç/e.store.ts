

import {formatNumber} from '@angular/common';
import {Injectable, inject} from '@angular/core';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {ConfirmationService, MessageService} from 'primeng/api';
import {
  Observable,
  delay,
  exhaustMap,
  filter,
  finalize,
  of,
  switchMap,
  tap,
  withLatestFrom,
  catchError,
} from 'rxjs';
import {ValuesOf} from '../../../shared/types';
import {PolarimeterConfigUpdateUserDto, PolarimeterConfigVisualizationDto, PolarimeterService} from '../../domain';
import {trigger} from '@angular/animations';

type BooleanKeysOf<T> = ValuesOf<{
  [K in keyof T]: T[K] extends boolean ? K : never;
}>;

interface RichnessRegister {
  sampleBarCode?: string;
  sequenceNumber?: number;
  richness: number;
  dateTime: Date;
}

export interface LabState {
  loading: boolean;
  autoRead: boolean;
  askWeightReadingConfirmation: boolean;
  issueVisible: boolean;
  manualReading: boolean;
  manualRichness: number | null;
  lastRichnessRegistered: RichnessRegister | null;
  sampleBarCode: string | null;
}

const DEFAULT_STATE: LabState = {
  loading: false,
  autoRead: true,
  askWeightReadingConfirmation: true,
  issueVisible: false,
  manualReading: false,
  manualRichness: null,
  lastRichnessRegistered: null,
  sampleBarCode: null,
};

@Injectable({
  providedIn: 'root',
})
export class LabStore extends ComponentStore<LabState> {
  private readonly confirmationService = inject(ConfirmationService);
  private readonly polarimeterService = inject(PolarimeterService);
  private readonly messageService = inject(MessageService);

  constructor() {
    super(DEFAULT_STATE);
  }
  // SELECTORES
  readonly vm$ = this.select((state) => state);


  // EFECTS


  readonly requestRichness = this.effect<HTMLInputElement>((trigger$) =>
    trigger$.pipe(
      withLatestFrom(this.select((state) => state.autoRead)),
      tap(
        ([_, autoRead]) => !autoRead && this.patchState({manualReading: true})
      ),
      filter(([_, autoRead]) => autoRead),
      tap(() => this.patchState({loading: true})),
      exhaustMap(([input]) =>
        this.getRichness().pipe(
          switchMap((richness) => this.showConfirmation(richness)),
          filter(Boolean),
          switchMap( (richness)=> this.polarimeterService.apiPolarimeterSetPolaritySampleCodePost(this.get().sampleBarCode || null, richness)
          ),
          tapResponse(
            (richness) => this.updateRichness(richness), ///ojo cuando tenga el endpoint funciona comprobar que nos trae
            (error) => console.log(error)
          ),
          finalize(() => {
            this.patchState({loading: false, sampleBarCode: null});
            input.focus();
          })
        )
      )
    )
  );

  readonly confirmManualReading = this.effect<{
    richness: number;
    input: HTMLInputElement;
  }>((trigger$) =>
    trigger$.pipe(
      tap(({richness, input}) => {
        this.updateRichness(richness);
        this.closeManualReading();
        this.patchState({sampleBarCode: null});
        input.focus();
      })
    )
  );

  readonly getLabConfig = this.effect((trigger$) =>
    trigger$.pipe(
      tap(()=>this.patchState({loading:true})),

      switchMap((res) =>
        this.polarimeterService.apiPolarimeterConfigurationGet().pipe(
          tapResponse(
            ({automaticReading, requiredReadingConfirmation}) => {
              this.patchState({
                autoRead: automaticReading,
                askWeightReadingConfirmation: requiredReadingConfirmation,
              });
            },
            (er: any) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: er.message,
              });
            }
          ),
          finalize( ()=>this.patchState({loading:false}))
        )
      ),

    )
  );


  readonly updateLabConfig = this.effect<void>((trigger$) =>
    trigger$.pipe(
      switchMap(() =>
        new Observable<void>((observer) => {
          this.confirmationService.confirm({
            header: 'Confirmar modificación',
            message: '¿Está seguro de que desea modificar los valores?',
            acceptLabel: 'Sí',
            rejectLabel: 'No',
            accept: () => {
              const config: PolarimeterConfigUpdateUserDto = {
                automaticReading: this.get((state)=> state.autoRead),
                requiredReadingConfirmation: this.get((state)=> state.askWeightReadingConfirmation),
              };

              this.polarimeterService.apiPolarimeterConfigurationPut(config).pipe(
                tapResponse(
                  () => {
                    this.patchState({
                      autoRead: config.automaticReading,
                      askWeightReadingConfirmation: config.requiredReadingConfirmation,
                    });
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Éxito',
                      detail: '¡Configuración guardada correctamente!',
                    });
                  },
                  (error: any) => {
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: error.message,
                    });
                    observer.error(error);
                  }
                )// end taresponse
              );// pipe end
              observer.complete();
            },
            reject: () => {
              observer.complete();
            },
          });
        })
      )
    )
  );


  /* codigo original sin cambios
    readonly updateLabConfig= this.effect<PolarimeterConfigUpdateUserDto>((trigger$)=>  trigger$.pipe(
      tap(console.log),
      switchMap( (config)=>
            this.polarimeterService.apiPolarimeterConfigurationPut(config).pipe(
                  tapResponse(
                    ({automaticReading, requiredReadingConfirmation}) => {
                      this.patchState({
                        autoRead: automaticReading,
                        askWeightReadingConfirmation: requiredReadingConfirmation,
                      });
                      this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'exito!!!',
                      });
                    },
                    (er: any) => {
                      this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: er.message,
                      });
                    }
                  )
              )
          )


    )
  )

   */

  //  apiPolarimeterSetPolaritySampleCodePost
  getRichness(): Observable<number> {
    // should request the richness with the barSampleCode value
    // service.getRichness(this.get().sampleBarCode) // servicio no actualizado aun, pediendte hoy

    return of(Math.floor(Math.random() * 3) + Math.random() + 14).pipe(
      delay(1000)
    );
  }



  // UPDATERS
  readonly toggleStateProp = this.updater(
    (state, prop: BooleanKeysOf<LabState>) => ({
      ...state,
      [prop]: !state[prop],
    })
  );

  readonly updateSampleBarCode = this.updater(
    (state, sampleBarCode: string) => ({
      ...state,
      sampleBarCode,
    })
  );

  readonly updateManualRichness = this.updater((state, richness: number) => ({
    ...state,
    manualRichness: richness,
  }));

  readonly closeManualReading = this.updater((state) => ({
    ...state,
    manualReading: false,
    manualRichness: null,
  }));

  readonly updateRichness = this.updater((state, richness: number) => ({
    ...state,
    lastRichnessRegistered: {
      richness,
      dateTime: new Date(),
      sampleBarCode: state.sampleBarCode,
      sequenceNumber: Math.round(Math.random() * 100),// viene del rupro
    },
  }));




  private showConfirmation(richness: number): Observable<number | null> {
    if (!this.get().askWeightReadingConfirmation) {
      return of(richness);
    }

    return new Observable((obs) => {
      this.confirmationService.confirm({
        header: "Confirmar riqueza",
        message: `Lectura:&nbsp;&nbsp;<strong>${formatNumber(
          richness,
          "es",
          "1.1-1"
        )}</strong> %`,
        accept: () => {
          obs.next(richness);
          obs.complete();
        },
        reject: () => {
          obs.next(null);
          obs.complete();
        },
      });
    });
  }
}


