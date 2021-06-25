import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Dealer } from '../models/maping-dealer';

let ALL_DEALERS: Dealer[] = [];

@Injectable({
  providedIn: 'root',
})
export class DealerService {
  static getAllDealers() {
    return of(ALL_DEALERS);
  }

  static setAllDealers(dealers) {
    console.log(JSON.stringify(dealers));
    ALL_DEALERS = dealers;
  }
}
