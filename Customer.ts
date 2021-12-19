import { Address } from "./Address";

export class Customer{
     userId:number;
     name:string;
	 email:string;
	 contactNo:string;
	 dob:string;
     address: Address;



    constructor(id:number, usrname:string, emailAdd:string, contactNum:string, dateOfBirth:string, customerAddress:Address){
        this.userId = id;
        this.name = usrname;
        this.email = emailAdd;
        this.contactNo = contactNum;
        this.dob = dateOfBirth;
        this.address = customerAddress;
    }
    toString():string{
        return "Id: "+this.userId+", Name: "+this.name+", Salary: "+this.email+", ContactNo: "+this.contactNo+", DOB: "+this.dob+", "+this.address+" ";
    }
}