import { Injectable } from '@angular/core';
import {caddy} from "../module/caddy.modele";
import {produits} from "../module/produit.modele";
import {ProduitItem} from "../module/produit-item.modele";
import {Client} from "../module/client.modele";
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class CaddyService {
  currentcaddyname:string="Caddy1";
  public  caddies:Map<string,caddy>=new Map;
  public  caddy!:caddy;
  public client!:Client;
  constructor(private loginservice:LoginService) {
       //let caddeies=localStorage.getItem('mycaddies');
   /* if(caddeies){
      this.caddies=JSON.parse(caddeies);
    }*/
   // else {
      this.caddy = new caddy(this.currentcaddyname);
      this.caddies.set(this.currentcaddyname,this.caddy);
   //}

  }


  public addproduittocaddy(produit:produits){
    let caaddy=this.caddies.get(this.currentcaddyname);

    let produitItem=caaddy?.items.get(produit.id);
    if(produitItem){
      produitItem.quantity+=produit.quantite;
      this.saveCaddies();
    }
    else {
       produitItem= new ProduitItem();
       produitItem.price=produit.curretPrice;
       produitItem.quantity=produit.quantite;
       produitItem.produit=produit;
       caaddy?.items.set(produit.id,produitItem);
       this.saveCaddies();
    }
    console.log(caaddy)
    console.log(this.caddies)
  }


  public saveCaddies() {
    const caddiesArray = Array.from(this.caddies.entries());
    let caddiesObject = {};
    caddiesArray.forEach(([key, caddy]) => {
      caddiesObject = {
        name: caddy.name,
        items: Object.fromEntries(caddy.items.entries()),
      };
    });

    const stringifiedCaddies = JSON.stringify(caddiesObject);

    try {
      localStorage.setItem('mycaddies', stringifiedCaddies);
      console.log('Caddies saved to local storage:', stringifiedCaddies);
    } catch (error) {
      console.error('Error saving caddies to local storage:', error);
    }
  }


  public getcaddy(){
    return this.caddies.get(this.currentcaddyname);
  }


  gettotal() {
    let total = 0 ;
      this.caddies.get(this.currentcaddyname)?.items.forEach(x=>{
      total+=x.price*x.quantity;
    })
    return total;
  }

}
