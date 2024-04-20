import {Component, OnInit} from '@angular/core';
import {CaddyService} from "../services/caddy.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../services/login.service";

@Component({
  selector: 'app-caddys',
  templateUrl: './caddys.component.html',
  styleUrl: './caddys.component.css'
})
export class CaddysComponent implements OnInit{
  ngOnInit(): void {
    if(!this.loginservice.isAuthonticated)
      this.route.navigateByUrl('/login');
    this.caddy=this.caddyservice.getcaddy();
    console.log(this.caddy);
  }
  private caddy: any;
  constructor(public caddyservice:CaddyService,private route:Router,private loginservice:LoginService,private router:ActivatedRoute) {
  }


  onremoveproduitfromcaddy() {

  }

  onNewOrder() {
    this.route.navigateByUrl("/client")
  }

  onAddCaddy() {
    
  }

  onSelectCaddy(c: any) {
    
  }
}
