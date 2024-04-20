import {Client} from "./client.modele";
import {ProduitItem} from "./produit-item.modele";


export class Order {
  public id!:number;
  public client:Client={name:"",address:"",phoneNumber:"",email:"",username:""};
  public products:Array<ProduitItem>=[];
  public totalAmount!:number;
  public date!:Date;
}
