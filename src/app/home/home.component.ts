import { Component, OnInit } from "@angular/core";

// New imports
import { BirthDay } from "../models/birthday.model";
import { FormBuilder,FormGroup, Validators } from "@angular/forms";
import { BirthdayService } from "./../services/birthday.service";

@Component({
selector:'home',
templateUrl:'./home.component.html',
styleUrls:['./home.component.scss']


})

export class HomeComponent implements OnInit{

  birthdays: Array<BirthDay> = [];
  name: string ='';
  nameForm!: FormGroup;
  placeholder_txt: any;

  constructor(
    private _fb: FormBuilder,
    private _bServ:BirthdayService
  ){}

  ngOnInit() {
    this.birthdays = [
      {name:'Khumo', date: new Date(2000,1,1)},
      {name:'Onneile', date: new Date(2000,1,1)},
      {name:'Heavy', date: new Date(2000,6,6)},
      {name:'Tshotlhe', date: new Date(2003,1,1)},]

      // calle the initform
      this._initForm();
      this._getPlaceHolder();

  }

  //on submit
  onSubmit(){
    if(this.nameForm.invalid) return;
    // this.birthdays.push(this.nameForm.value);
    this._bServ.addNew(this.nameForm.value).subscribe(res =>{
      this._getBirthdays();

    })
  }

  //on initialize form
  private _initForm() {
    this.nameForm = this._fb.group({
      name:[null, Validators.required],
      date:[null,Validators.required]
    });

  }

  //get birthdays
  private _getBirthdays(){
    this._bServ.getAll().subscribe(res =>
      {
        this.birthdays = res
      })
  }
  private _getPlaceHolder() {
    this._bServ.getPlaceHoldr().subscribe(res =>{
      this.placeholder_txt = res
    })

  }

}
