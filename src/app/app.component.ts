import {Component, OnInit} from '@angular/core';
import {CategorieService} from "./services/categorie.service";
import {Router} from "@angular/router";
import {LoginService} from "./services/login.service";
import {CaddyService} from "./services/caddy.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  public categorie:any;
  public currentcategorie:any;
  constructor(private catservice:CategorieService,private rout:Router,public loginservice:LoginService
  ,public caddyservice:CaddyService,private  cadyservice:CaddyService) {

  }
  ngOnInit(): void {
    this.loginservice.loadAuthentificatedfromLocalstorage();

    this.getcategories();
  }

  private getcategories() {
    this.catservice.getresource("/categories").subscribe(data=>{
      this.categorie=data;
    },error => {
      console.log(error);
    })
  }

  getproduitcategorie(c: any) {
    this.currentcategorie=c;
    this.rout.navigateByUrl('/produits/2/'+c.id);
  }

  getproduitselected() {
    this.currentcategorie=undefined;
    this.rout.navigateByUrl("/produits/1/0");
  }

  getproduitpromotion() {
    this.currentcategorie=undefined;
    this.rout.navigateByUrl("/produits/3/0");
  }

  getproduitdisponible() {
    this.currentcategorie=undefined;
    this.rout.navigateByUrl("/produits/4/0");
  }

  logout() {
    this.rout.navigateByUrl("/login");
    this.loginservice.removelocalstorage();
  }
}
