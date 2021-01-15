import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";


import { Observable, of } from "rxjs";

import { BirthDay } from "./../models/birthday.model";

@Injectable({
  providedIn: 'root'
})


export class BirthdayService {

  birthdays: Array<BirthDay> = []
  private _url = 'https://jsonplaceholder.typicode.com/todos/1';

  constructor(
    private _httpC: HttpClient
  ) {

  }

  getAll (): Observable<Array<BirthDay>> {
    return of(this.birthdays)

  }

  getByName(name : String):Observable<BirthDay | undefined>{
    const found = this.birthdays.find(b =>b.name === name);
    return of(found);
  }

  addNew(birthday: BirthDay):Observable<BirthDay>{
    this.birthdays.push(birthday);
    return of(birthday)
  }

  getPlaceHoldr():Observable<any>{
    return this._httpC.get(this._url)

  }
}
