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
      'username': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      'password': ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
    });
  }

  ngOnInit() {
  }

  public testVar: string = '';

  login(model: FormGroup, isValid: boolean) {
    console.log(model.value);
    console.log(model.controls.password);
    // console.log(isValid);
    this.testVar = 'Kireya';
  }
}
