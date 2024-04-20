import {Component, OnInit} from '@angular/core';
import {CaddyService} from "../services/caddy.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginService} from "../services/login.service";
import {OrderService} from "../services/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{
  public mode:number=0;
  accountFormGroup! :FormGroup;
  panelStyle:string= "panel-default";
  constructor(public caddyservice:CaddyService,private fb:FormBuilder,private authService:LoginService,public orderService:OrderService,
              private router:Router) {
  }
  ngOnInit(): void {
    this.accountFormGroup=this.fb.group({
      name : this.fb.control(''),
      email : this.fb.control(''),
      address : this.fb.control(''),
      phonenumber : this.fb.control(0)
    })
  }

  affuctation() {
    let name:string = this.accountFormGroup.value.name;
    let email:string = this.accountFormGroup.value.email;
    let address:string = this.accountFormGroup.value.address;
    let phoneNumber:string = this.accountFormGroup.value.phonenumber;

    let currentCaddy = this.caddyservice.caddies.get(this.caddyservice.currentcaddyname);
    if (currentCaddy) {
      currentCaddy.client.username=this.authService.UserAuthonticated.username;
      currentCaddy.client.name=name;
      currentCaddy.client.email = email;
      currentCaddy.client.address = address;
      currentCaddy.client.phoneNumber = phoneNumber;

      this.orderService.setClient(currentCaddy.client);
      this.orderService.loadProductsFromCaddy();
      this.mode=1;

    }
    console.log(currentCaddy)
  }

  onSaveClient(value: any) {

  }

  onOrder() {
    this.orderService.submitOrder().subscribe(
      (data: any) => {
        if (data && data.id && data.date) {
          this.orderService.order.id = data.id;
          this.orderService.order.date = data.date;
          this.panelStyle = "panel-success";
        } else {
          console.error("Les données reçues de la commande sont incomplètes.");
        }
      },
      (err) => {
        console.error("Une erreur est survenue lors de la soumission de la commande :", err);
      }
    );
  }

  onPayOrder() {
    this.router.navigateByUrl("payment/"+this.orderService.order.id);
  }
}
