import {Component, OnInit} from '@angular/core';
import {CategorieService} from "../services/categorie.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {HttpEventType, HttpResponse} from "@angular/common/http";

import {LoginService} from "../services/login.service";
import {produits} from "../module/produit.modele";
import {CaddyService} from "../services/caddy.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  product: any;
  editphoto:any;
  currentphoto: any;
  selectedfile:any;
  progress: any;
  currentFileUpload: any;
  timesstamp:number=0;
  titel: any;

  constructor(public service:CategorieService,private route:ActivatedRoute,private router:Router,
              public serviclogin:LoginService,public caddyservice:CaddyService) {
  }
  ngOnInit(): void {
    this.getroduct("/produits/search/selectedProduit");
    this.router.events.subscribe(val=>{

      if(val instanceof NavigationEnd){
        let url=val.url;
        console.log(url);
        let p1=this.route.snapshot.params["p1"];
        if(p1==1){
          this.getroduct("/produits/search/selectedProduit");
          this.titel="Produit Selected";
        }
        else if (p1==2){
          let idcat=this.route.snapshot.params["p2"];
          this.getroduct("/categories/"+idcat+"/produits");
          this.titel="Produit De Categorie"+idcat;
        }
        else if (p1==3){
          this.getroduct("/produits/search/promotionProduit");
          this.titel="Produit En Promotion";
        }
        else if (p1==4){
          this.getroduct("/produits/search/DisponibleProduit");
          this.titel="Produit Desponible";
        }
      }
    });

  }

  private getroduct(url:string) {
    this.service.getresource(url).subscribe(data=>{
      this.product=data;
    },error => {
      console.log(error);
    })
  }

  editephoto(p:any) {
    this.currentphoto=p;
    this.editphoto =true;
  }

  selectfile(event:any) {
    this.selectedfile=event.target.files;
  }

  upload() {
    this.progress=0;
    this.currentFileUpload= this.selectedfile.item(0);
    this.service.uploadphoto(this.currentFileUpload,this.currentphoto.id).subscribe((event)=>{
      if(event.type==HttpEventType.UploadProgress){
        // this.progress=(100 * event.loaded / event.total);
      }
      else if(event instanceof HttpResponse){
        //this.getroduct("/produits/search/selectedProduit");
        //je fait sa just pour actualiser la page
        this.timesstamp=Date.now();
      }
    },error => {
      alert("Problème de chargement")
    })

  }

  getdate() {
    return this.timesstamp;
  }

  onaddproducttocady(p:produits) {
   this.caddyservice.addproduittocaddy(p);
  }
  ondetail(p:produits) {
    let url=btoa(p._links.produit.href);
    this.router.navigateByUrl("produit-detail/"+url);
  }
}
