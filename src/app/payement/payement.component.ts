import {Component, OnInit} from '@angular/core';
import {Order} from "../module/Order.model";
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrl: './payement.component.css'
})
export class PayementComponent implements OnInit{
  currentOrder!:Order;
  constructor(private  router:ActivatedRoute,private orderService:OrderService) {
  }

  ngOnInit(): void {
    let orderid=this.router.snapshot.params["t1"];
    this.orderService.getOrder(orderid).subscribe(data=>{
     this.currentOrder=data
    },error => {
      console.log(error)
    });
  }
  onParOrder(value: any) {

  }
}
