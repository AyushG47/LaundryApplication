import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from '../Address';
import { Customer } from '../Customer';
import { CustomerServiceService } from '../customer-service.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerFrom: FormGroup;
  customers: Customer[];
  isUpdate:boolean=false;

  constructor(private fb: FormBuilder, private service:CustomerServiceService) {
    this.customers = new Array();
   }

  ngOnInit(): void {
    console.log("ng on init");
    this.customerFrom = this.fb.group({
      userId: ['', [Validators. required, Validators.pattern("[1-9]{6}") ]],
      name: ['', [Validators. required, Validators.pattern("^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$") ]],
      email: ['', [Validators. required, Validators.pattern("[a-z0-9._%+-]*[@][a-z]*[.][a-z]{2,4}") ]],
      contactNo: ['', [Validators. required, Validators. pattern("^((\\+91-?) |0)?[0-9]{10}$")]],
    
      dob: ['', Validators.required],
      doorNo: ['', Validators.maxLength(6)],
      street: ['',Validators.required],
      area: ['',Validators.required],
      city: ['',Validators.required],
      state: ['',Validators.required],
      pincode: ['',[Validators. required, Validators.pattern("^[1-9]{1}[0-9]{2}\\s{0,1}[0-9]{3}$")]]

      
    });

    this.service.getAllCustomers()
    .subscribe(
      data => { this.customers = data;}, //this success handler works only if status code between 200 and 299
      err => {console.log(err)}  //this success handler works only if status code between 4 and 5
      
      );
    }
  saveCustomer(data): void {
    alert(JSON.stringify(data))
    alert(data.userId)
    console.log(data.userId)
    let add:Address=new Address(data.doorNo,data.street,data.area,data.city,data.state,data.pincode);
    //constructor(doorNo:string,street:string, area:string, city:string, state:string, pin:number)
    let cust:Customer=new Customer(data.userId,data.name,data.email,data.contactNo,data.dob,add);
    //constructor(id:number, usrname:string, emailAdd:string, contactNum:string, dateOfBirth:string, customerAddress:Address)
    //let customer:Customer=this.customerFrom.value;
    //logic for saving the customer
    if(!this.isUpdate){
      this.service.addCustomer(cust)
      .subscribe(data => {
        alert("Customer with Id " + data.userId + " is created");
        this.service.getAllCustomers().subscribe(cust => {
          this.customers = cust;
        });
      });
    }
    //updating the customer
    else{
      this.service.updateCustomer(cust).subscribe(data => {
        alert("Customer  is Updated");
        this.service.getAllCustomers().subscribe(cust => {
          this.customers = cust;
             });
      });
      this.isUpdate=false;
    }
    this.customerFrom.reset();
    
  }

  //Deletes the customer
  removeCustomer(userId: number) {
    let candelete = confirm(`Are you Sure to Delete Employee '${userId}'`);
    if (candelete==true) {
      this.service.removeCustomer(userId).subscribe(data => {
        alert("Deleted Scuccessfully");
        this.service.getAllCustomers().subscribe(cust => {
          this.customers = cust;
        });
      });
    }
  }
  updateCustomer(userId: number) {
    let cust = this.customers.find(e => e.userId == userId)
    this.customerFrom = this.fb.group({
      userId: [cust.userId, Validators.required],
      name: [cust.name, Validators.required],
      email: [cust.email, Validators.required],
      contactNo: [cust.contactNo, Validators.required],
      dob: [cust.dob, Validators.required],
      //address: [cust.address, Validators.required]
      doorNo: [cust.address.doorNo, Validators.required],
      street: [cust.address.street,Validators.required],
      area: [cust.address.area,Validators.required],
      city: [cust.address.city,Validators.required],
      state: [cust.address.state,Validators.required],
      pincode: [cust.address.pincode,Validators.required]
    });
    this.isUpdate=true;

 
      
    
  
  }
}

