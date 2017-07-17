import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { PhoneValidator} from './shared/custom-validation.directive';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'app';
  form: FormGroup;
   constructor(private fb: FormBuilder) {
 
    this.form = this.fb.group({
      name: ['', Validators.required],
     phone:['',PhoneValidator]
     
    });

  }
  test(data) {
    console.log(data);
  }
}
