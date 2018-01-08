import { Component } from '@angular/core';

// Import the DataService
import { DataService } from '../data.service';
import { User } from '../user';
import { Order } from '../order';

@Component({
  selector: 'sample1',
  templateUrl: './sample1.html',
  styleUrls: ['../app.component.css']
})
export class Sample1Component {
  
  // Define a users property to hold our user data
  //users: Array<any>;
  //orders: Array<any>;
  //textreturn = 'init';
  return: any;
  userJson: any;
  orderJson: any;
  userGet = new User('','','','','','','','','','','');
  userSub = new User('','','','','','','','','','','');
  order = new Order('','','','','','','');
  orderSub = new Order('','','','','','','');
  succeed = false;
  orderCount = 0;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {
    this.succeed = false;
    // Access the Data Service's getUsers() method we defined
    //this._dataService.getUsers()
        //.subscribe(res => this.users = res);
    //this._dataService.getUsersByNum('C2')
    //    .subscribe(res => this.userJson = res);
  }

  /*onClickMe(inputSrh: string): void {
    console.log(inputSrh);
    this.textreturn = 'testreturn';
  }*/

  onSubmit(form: any) { 
    //this._dataService.getUsersByNum(form.custNum)
    //.subscribe(res => this.users = res);
    /*this._dataService.getUsersByNum(form.custNum)
    .subscribe(res => this.collectUser(res));*/
    /*this._dataService.getOrdersByUser(form.custNum)
    .subscribe(res => this.orders = res);*/
    //this._dataService.orderSubmit(form.custNum, this.order)
    this.userGet.num = form.num;
    this.userGet.name = form.custName;
    this.userGet.contactLastName = form.contactLastName;
    this.userGet.contactFirstName = form.contactFirstName;
    this.userGet.phone = form.phone;
    this.userGet.addressLine1 = form.addressLine1;
    this.userGet.addressLine2 = form.addressLine2;
    this.userGet.city = form.city;
    this.userGet.email = form.email;
    this.userGet.gender = form.gender;
    this.userGet.creditLimit = form.creditLimit;
    /*this.order.num = form.ordNum;
    this.order.date = form.ordDate;
    this.order.requiredDate = form.requiredDate;
    this.order.shippedDate = form.shippedDate;
    this.order.itemQty = form.itemQty;
    this.order.status = form.status;
    this.order.remarks = form.remarks;
    console.log('tslog:'+this.orderSub.date);
    console.log('tslog:'+form.ordNum);*/
    this._dataService.getOrder(this.orderSub.num)
    .subscribe(res => {
      this.return = res;
      this.orderCount = res;
      console.log('orderCount: '+ this.orderCount);
    });
    if (this.orderCount > 0){
      this._dataService.orderSubmit(this.userGet, this.orderSub)
      //.subscribe(res => this.return = res);
      .subscribe(res => {
        this.return = res;
        console.log('orderSubmit'+ res);
        this.succeed = true;
      });
    }else{
      this._dataService.orderUpdate(this.userGet, this.orderSub)
      //.subscribe(res => this.return = res);
      .subscribe(res => {
        this.return = res;
        console.log('orderUpdate'+ res);
        this.succeed = true;
      });
      this._dataService.custUpdate(this.userSub)
      //.subscribe(res => this.return = res);
      .subscribe(res => {
        this.return = res;
        console.log('custUpdate'+ res);
        this.succeed = true;
      });
    }
    this.orderCount = 0;
  }

  collectUser(userRtn: Array<any>){
    console.log('collectUser');
    this.userJson = userRtn[0];
    this.userGet.num = this.userJson.cust_num;
    this.userGet.name = this.userJson.cust_name;
    this.userGet.contactLastName = this.userJson.contactLastName;
    this.userGet.contactFirstName = this.userJson.contactFirstName;
    this.userGet.phone = this.userJson.phone;
    this.userGet.addressLine1 = this.userJson.addressLine1;
    this.userGet.addressLine2 = this.userJson.addressLine2;
    this.userGet.city = this.userJson.city;
    this.userGet.gender = this.userJson.gender;
    this.userGet.email = this.userJson.email;
    this.userGet.creditLimit = this.userJson.creditLimit;
    this.orderJson = this.userJson.orders_docs[0];
    this.order.num = this.orderJson.ord_num;
    this.order.date = this.orderJson.ord_date;
    this.order.requiredDate = this.orderJson.requiredDate;
    this.order.shippedDate = this.orderJson.shippedDate;
    this.order.itemQty = this.orderJson.itemQty;
    this.order.status = this.orderJson.status;
    this.order.remarks = this.orderJson.remarks;
    console.log('backorder: '+this.order.num);
    //this.orderSub.date = this.orderJson.ord_date;
    this.orderSub = this.order;
    this.userSub = this.userGet;
  }

  reset(){
    this.userGet = new User('','','','','','','','','','','');
    this.userSub = new User('','','','','','','','','','','');
    this.order = new Order('','','','','','','');
    this.orderSub = new Order('','','','','','','');
    this.succeed = false;
    this.orderCount = 0;
  }

  loadData(form: any){
    //this._dataService.getUsersByNum(this.userGet.num)
    this._dataService.getUsersByNum(form.num)
    .subscribe(res => this.collectUser(res));
    this.succeed = false;
  }
}