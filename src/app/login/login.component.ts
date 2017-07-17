import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
  });
   }

  ngOnInit() {
  }
 login(form: FormGroup) {
    console.log(form.value);
  }
}
