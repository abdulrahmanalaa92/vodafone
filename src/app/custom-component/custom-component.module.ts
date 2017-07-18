import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text/input-text.component';

@NgModule({
  imports: [
    CommonModule
  ],exports:[InputTextComponent],
  declarations: [InputTextComponent]
})
export class CustomComponentModule { }
