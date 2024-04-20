import {Component, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
  }
  constructor(private loginservice:LoginService,private router:Router) {
  }
  login(value: any) {
    this.loginservice.login(value.username,value.password);
    if(this.loginservice.isAuthonticated){
      this.loginservice.saveuser();
      this.router.navigateByUrl('');
    }
  }
}
