import { Injectable } from '@angular/core';
import {iCar} from "../parking-car/interface/car";
import {delay, Observable, of, throwError} from "rxjs";


const data: iCar[] = [
  {
    plate: "2FMDK3",
    brand: "Volvo",
    model: "960",
    color: "Violet"
  },
  {
    plate: "1GYS4C",
    brand: "Saab",
    model: "9-3",
    color: "Purple"
  },
  {
    plate: "1GKS1E",
    brand: "Ford",
    model: "Ranger",
    color: "Indigo"
  },
  {
    plate: "1G6AS5",
    brand: "Volkswagen",
    model: "Golf",
    color: "Aquamarine"
  }
];
const FAKE_DELAY = 600;
@Injectable({
  providedIn: 'root'
})
export class ParkingLotService {
  private cars: iCar[] = [];

  constructor() {}

  add(plate: string): Observable<iCar> {
    try {
      const existingCar = this.cars.find((eCar: iCar) => eCar.plate === plate);

      if (existingCar) {
        throw `This car with plate ${plate} is already parked`;
      }

      const car = this.getCarByPlate(plate);
      this.cars = [...this.cars, car];

      return of(car).pipe(delay(FAKE_DELAY));
    } catch (error) {
      return throwError(error);
    }
  }

  private getCarByPlate(plate: string): iCar {
    const car = data.find((item: iCar) => item.plate === plate);

    if (car) {
      return car;
    }

    throw `The car with plate ${plate} is not register`;
  }
}

