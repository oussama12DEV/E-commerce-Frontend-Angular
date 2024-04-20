import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from "./product/product.component";
import {LoginComponent} from "./login/login.component";
import {ProduitDetailComponent} from "./produit-detail/produit-detail.component";
import {CaddysComponent} from "./caddys/caddys.component";
import {ClientComponent} from "./client/client.component";
import {PayementComponent} from "./payement/payement.component";

const routes: Routes = [
  { path: 'produits/:p1/:p2', component: ProductComponent },
  { path: '', redirectTo: '/produits/1/0', pathMatch: 'full' },
  //{ path: '', redirectTo: '/login',pathMatch:'full' },
  { path: 'login',component: LoginComponent },
  { path: 'produit-detail/:url',component: ProduitDetailComponent },
  { path: 'caddies',component: CaddysComponent },
  { path: 'client',component: ClientComponent },
  { path: 'payment/:t1',component: PayementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
