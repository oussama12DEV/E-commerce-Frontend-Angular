import {Client} from "./client.modele";
import {ProduitItem} from "./produit-item.modele";


export class caddy {
  public name:string="";
  public items:Map<number,ProduitItem>=new Map();
  public client:Client={name:"",address:"",phoneNumber:"",email:"",username:""};
  constructor(name:string) {
    this.name = name;
  }
}
