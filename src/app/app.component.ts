import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { AppValidators } from './app.validators';
import { filter, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form:FormGroup = new FormGroup({
    name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
    email: this.fb.control('', [], [AppValidators.checkDomainExist()]),
    age: this.fb.control('', [Validators.required, AppValidators.checkIsNumber]),
    tel: new FormArray([
      new FormGroup({
        code: this.fb.control(''),
        number: this.fb.control(''),
      }),
    ]),
  }, {validators: AppValidators.checkValidCountryNumber});

  constructor(private fb: FormBuilder){

  }

  add(){
    const tel = this.form.get('tel') as FormArray;;
    tel.push(
      new FormGroup({
        code: this.fb.control(''),
        number: this.fb.control(''),
      }),
    );
  }

  remove(index: number){
    const tel = this.form.get('tel') as FormArray;;
    tel.removeAt(index)
  }

  get tels(){
    return (this.form.controls['tel'] as FormArray).controls
  }

  reset(){
    this.form.reset()
  }

  ngOnInit(){
    const email = this.form.get('email') as FormArray;
    email.valueChanges.subscribe((value) => {
      if(value === 'william.henrique@live.com'){
        this.form.get('age')?.setValidators(Validators.min(20))
      }else{
        this.form.get('age')?.setValidators(Validators.min(30))
      }
      this.form.updateValueAndValidity();
    })


  }

  require(key: string, errorKey: string){
    return  this.form.get(`${key}`)?.hasError(`${errorKey}`) &&  this.form.get(`${key}`)?.dirty;
  }






}
