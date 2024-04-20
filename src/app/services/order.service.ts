import { Injectable } from '@angular/core';
import {Client} from "../module/client.modele";
import {Order} from "../module/Order.model";
import {CaddyService} from "./caddy.service";
import {HttpClient} from "@angular/common/http";
import {CategorieService} from "./categorie.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public order:Order=new Order();
  constructor(public cadyservice:CaddyService,private  httpclient:HttpClient,private categorieservice:CategorieService) { }

  public setClient(client:Client){
    this.order.client=client;
  }
  public getTotal():number{
    let total:number=0;
    this.order.products.forEach(p=>{
      total+=p.price*p.quantity;
    });
    return total;
  }

  public loadProductsFromCaddy() {
    this.order.products = [];
     this.cadyservice.getcaddy()?.items.forEach(x=>{

       this.order.products.push(x);
       console.log(this.order.products)
     })
    }

  submitOrder() {
    console.log(this.order);
    return this.httpclient.post(this.categorieservice.host+"/orderss",this.order);

  }
  public getOrder(id:number):Observable<Order>{
    return this.httpclient.get<Order>(this.categorieservice.host+"/orders/"+id);
  }

}
