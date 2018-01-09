import { Component } from '@angular/core';

// Import the DataService
import { DataService } from '../data.service';
import { User } from '../user';
import { Order } from '../order';
import * as moment from 'moment';

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
  userGet = new User('','','','','','','','','','','',new Date());
  userSub = new User('','','','','','','','','','','',new Date());
  order = new Order('','','','','','','');
  orderSub = new Order('','','','','','','');
  succeed = false;
  orderCount = 0;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  temp: any;

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
    this.userSub.num = form.num;
    this.userSub.name = form.custName;
    this.userSub.contactLastName = form.contactLastName;
    this.userSub.contactFirstName = form.contactFirstName;
    this.userSub.phone = form.phone;
    this.userSub.addressLine1 = form.addressLine1;
    this.userSub.addressLine2 = form.addressLine2;
    this.userSub.city = form.city;
    this.userSub.email = form.email;
    this.userSub.gender = form.gender;
    this.userSub.creditLimit = form.creditLimit;
    this.userSub.updateDate = new Date();
    /*this.order.num = form.ordNum;
    this.order.date = form.ordDate;
    this.order.requiredDate = form.requiredDate;
    this.order.shippedDate = form.shippedDate;
    this.order.itemQty = form.itemQty;
    this.order.status = form.status;
    this.order.remarks = form.remarks;
    console.log('tslog:'+this.orderSub.date);*/
    console.log('tslog:'+this.userSub.updateDate);
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
      .subscribe(res => {
        this.return = res;
        console.log('orderUpdate'+ res);
        this.succeed = true;
      });
      this._dataService.custUpdate(this.userSub)
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
    this.userGet.updateDate = this.userJson.updateDate;
    this.orderJson = this.userJson.orders_docs[0];
    this.order.num = this.orderJson.ord_num;
    this.order.date = this.orderJson.ord_date;
    this.order.requiredDate = this.orderJson.requiredDate;
    this.order.shippedDate = this.orderJson.shippedDate;
    this.order.itemQty = this.orderJson.itemQty;
    this.order.status = this.orderJson.status;
    this.order.remarks = this.orderJson.remarks;
    //this.temp = this.userGet.updateDate;
    console.log('updateDate: '+moment(this.userGet.updateDate).format('YYYY-MM-DD HH:mm:ss'));
    //this.orderSub.date = this.orderJson.ord_date;
    this.orderSub = this.order;
    this.userSub = this.userGet;
  }

  reset(){
    this.userGet = new User('','','','','','','','','','','',new Date());
    this.userSub = new User('','','','','','','','','','','',new Date());
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