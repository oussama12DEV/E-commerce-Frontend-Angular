import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
    private users=[
      {username:'admin',password:'1234',roles:['USER','ADMIN']},
      {username:'user1',password:'1234',roles:['USER']},
      {username:'user2',password:'1234',roles:['USER','ADMIN']},
    ]
  public isAuthonticated!:boolean;

  public UserAuthonticated:any;
  public token:any;
  constructor() { }
  public login(usename:string,password:string){
    let user;
    this.users.forEach(x=>{
      if(x.username==usename && x.password==password){
        user=x;
        this.token={username:x.username,roles:x.roles};
      }
    });
    if(user){
      this.isAuthonticated=true;
      this.UserAuthonticated=user;
    }
    else {
      this.isAuthonticated=false;
      this.UserAuthonticated=undefined;
    }
  }
  public isadmin(){
    if(this.UserAuthonticated){
      if(this.UserAuthonticated.roles.indexOf('ADMIN')>-1){
        return true;
      }
    }
    return false;
  }
  public saveuser()
  {
    if(this.UserAuthonticated){
      localStorage.setItem('savetoken',btoa(JSON.stringify(this.token)));
    }
  }
  public loadAuthentificatedfromLocalstorage(){
    let token=localStorage.getItem('savetoken');
    if(token){
      let user=JSON.parse(atob(token));
      this.UserAuthonticated={username:user.username,roles:user.roles};
      this.isAuthonticated=true;
      this.token={username:user.username,roles:user.roles};
      console.log(this.token);
    }

  }
  public removelocalstorage(){
    localStorage.removeItem('savetoken');
    this.token=undefined;
    this.UserAuthonticated=undefined;
    this.isAuthonticated=false;
  }
}

