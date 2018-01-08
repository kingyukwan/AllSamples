import { Component } from '@angular/core';

// Import the DataService
import { DataService } from '../data.service';

@Component({
  selector: 'sample3',
  templateUrl: './sample3.html',
  styleUrls: ['../app.component.css']
})
export class Sample3Component {
  
  // Define a users property to hold our order data
  orders: Array<any>;

  // Create an instance of the DataService through dependency injection
  constructor(private _dataService: DataService) {
    
    // Access the Data Service's getOrders() method we defined
    this._dataService.getOrders()
        .subscribe(res => this.orders = res);
  }
}