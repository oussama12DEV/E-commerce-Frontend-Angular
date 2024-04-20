import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategorieService} from "../services/categorie.service";
import {produits} from "../module/produit.modele";
import {LoginService} from "../services/login.service";
import * as events from "events";
import {HttpEventType, HttpResponse} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {json} from "stream/consumers";

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrl: './produit-detail.component.css'
})
export class ProduitDetailComponent implements OnInit{
  currentproduit!:produits;
  mode: number=0;
  public editphoto!:boolean ;
  public selectedfiles: any;
  public currentFileUpload:any;
  timesstamp:any;
  constructor(private route:Router,private router:ActivatedRoute,public service:CategorieService,public loginservice:LoginService) {
  }
  ngOnInit(): void {

    let url=atob(this.router.snapshot.params["url"]);
    console.log(url)
    this.service.getproduit(url).subscribe(data=>{
      this.currentproduit=data;
      console.log(this.currentproduit);
    },error1 => {
      console.log(error1)
    })

  }

  editephoto(currentproduit: produits) {
    this.currentproduit=currentproduit;
    this.editphoto=true;
  }

  onselctedFile(event:any) {
    this.selectedfiles=event.target.files;
  }

  uploadphoto() {
    //this.progress=0;
    this.currentFileUpload= this.selectedfiles.item(0);
    this.service.uploadphoto(this.currentFileUpload,this.currentproduit.id).subscribe((event)=>{
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

  addproducttocady(currentproduit:produits) {

  }
  oneditproduit() {
  this.mode=1;
  }

  UpdateProduit(value: any) {

  }
}
