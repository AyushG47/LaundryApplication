import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
  import { from } from 'rxjs';
import { CustomerListComponent } from './customer-list/customer-list.component';



@NgModule({
  declarations: [CustomerListComponent],
  imports: [
    CommonModule, ReactiveFormsModule,FormsModule
  ],
  exports: [CustomerListComponent]
})
export class CustomerModule { }
