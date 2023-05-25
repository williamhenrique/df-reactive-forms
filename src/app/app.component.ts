import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  form:FormGroup = new FormGroup({
    name: new FormControl(),
    age: new FormControl(),
    tel: new FormArray([
      new FormGroup({
        code: new FormControl(),
        number: new FormControl(),
      }),
    ]),
  });

  add(){
    const tel = this.form.get('tel') as FormArray;

  }

  remove(index: number){
    const tel = this.form.get('tel') as FormArray;
  }

  get tels(){
    return (this.form.controls['tel'] as FormArray).controls
  }

  reset(){
  }

}
