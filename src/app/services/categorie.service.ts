import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {produits} from "../module/produit.modele";

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
   public host="http://localhost:8080"
  constructor(private http:HttpClient) { }



  public getresource(s: string) {
   return this.http.get(this.host+s);
  }
  public getproduit(url:string):Observable<produits> {
    return this.http.get<produits>(url);
  }

  uploadphoto(file: File, id:number){
     let formadata:FormData=new FormData();
     formadata.append('file',file);
     const req = new HttpRequest('POST', this.host+'/uploadphoto/'+id ,formadata,{
       reportProgress:true,
       responseType:'text',
     });
    return this.http.request(req);



  }

  patchresource(url: string, value: any) {

  }
}
