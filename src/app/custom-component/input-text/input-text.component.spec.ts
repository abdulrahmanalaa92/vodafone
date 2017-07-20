import { FormControl } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTextComponent } from './input-text.component';
import { } from 'jasmine';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should input text type is password', () => {
    component.passwordMood = true;
    component.ngOnInit();
    expect(component.mytype).toEqual('password');
  });

  it('should not exceed maximum length or be less than the minimum length', () => {
    component.max = 20;
    component.min = 5;
    let textInput = new FormControl();
    textInput.setValue('kireya');
    const validatedValue = component.validate(textInput);
    expect(validatedValue).toBeNull();
  });
});
