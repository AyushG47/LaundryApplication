export class Address{
    doorNo:string;
    street:string;
    area:string;
    city:string;
    state:string;
    pincode:number;
  address: Address;

    constructor(doorNo:string,street:string, area:string, city:string, state:string, pincode:number){
        this.doorNo=doorNo;
        this.street=street;
        this.area=area;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
    }
    toString():string{
        return "DoorNo: "+this.doorNo+", Street: "+this.street+", Area: "+this.area+", City: "+this.city+", State: "+this.state+", Pincode: "+this.pincode+" ";
}



}
