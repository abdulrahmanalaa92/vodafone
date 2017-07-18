import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
    , {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]

})

export class InputTextComponent implements OnInit, ControlValueAccessor {
  change: Function;
  touched: Function;
  disabled: boolean;

  username: string;

  @Input()
  isPassword: boolean;

  @Input()
  myPlaceholder: string;

  @Input()
  myLabel: string;

  @Input()
  min: number;

  @Input()
  max: number;

  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
    this.change = fn;
  }
  registerOnTouched(fn: any): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;

  }
  mytype: string;
mytouched(){
  this.touched();
}
  ngOnInit() {
    this.mytype = this.isPassword ? "password" : "text";
    //  console.log(String(this.isPassword) == "true"?"password" : "text");
  }
  validate(c: FormControl) {
    //debugger;
    if (c.value.length > this.max || c.value.length < this.min) {
      return { rangeError: { a: c.value, min: this.min, max: this.max } }
    }
    else {
      return null;
    }

    //console.log(c.value);
  }


  
  changed($event: Event) {
    this.change(($event.target as HTMLInputElement).value);
  }
}
