import { Injectable } from '@angular/core';
import {Http, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {observable} from "rxjs/symbol/observable";
import {Consultant} from "../modules/consultant.module";
//import {LocalStorageService, LocalStorage} from 'ng2-webstorage';
import {Ng2Webstorage} from 'ngx-webstorage';
import {LocalStorageService, LocalStorage} from 'ngx-webstorage';
import {HttpClient} from "@angular/common/http";
import {Client} from "../modules/client.module";
import {Competences} from "../modules/competences.module";
@Injectable()
export class ConsultantService {
  private baseUrl:string='http://localhost:8080';
  //private headers=new Headers({'Content-Type':'application/json'});
  // private options=new RequestOptions({headers:this.headers});
  private consultant:Consultant;
  private username:String;
  private isUserLoggedIn;

  constructor(private http:HttpClient,private Ws:Ng2Webstorage) {
    this.isUserLoggedIn=false;
  }
  errorHandler(error:Response)
  {
    return Observable.throw(error||"SERVER ERROR");
  }
  getConsultants(motCle:String,page:number,size:number){

    return this.http.get(this.baseUrl+'/api/chercherconsultant?mc='+motCle+'&size='+size+'&page='+page).catch(this.errorHandler);

  }
  getConsultantByid(id:number){

    return this.http.get(this.baseUrl+'/api/consultant/'+id).catch(this.errorHandler);

  }
  deleteConsultant(id:number){

    return this.http.delete(this.baseUrl+'/api/consultant/'+id).catch(this.errorHandler);

  }
  createConsultant(consultant:Consultant){

    return this.http.post(this.baseUrl+'/api/consultant/',consultant).catch(this.errorHandler);

  }
  updateConsultant(consultant:Consultant){

    return this.http.put(this.baseUrl+'/api/consultant/',consultant).catch(this.errorHandler);

  }
  loginUser(username:String,password:string)
  {
    return this.http.get(this.baseUrl+'/user/auth?login='+username+'&pwd='+password).catch(this.errorHandler);

  }
  /*loginConsultant(consultant:Consultant)
   {
   return localStorage.getItem(this.http.post(this.baseUrl+'/Security/login/',consultant).map(resp => resp.json()).catch(this.errorHandler));
   }*/
  setter(consultant)
  {
    this.consultant=consultant;

  }
  getter()
  {
    return this.consultant;
  }
  setterlogin(login)
  {
    this.username=login;

  }
  getterlogin()
  {
    return this.username;
  }
  getUserbyLogin(login)
  {
    return this.http.get(this.baseUrl+'/api/consultantlogin?login='+login).catch(this.errorHandler);
  }
  setUserLoggedIn()
  {
     this.isUserLoggedIn=true;
     //localStorage.setItem(this.isUserLoggedIn,true);

  }
  getUserLoggedIn()
  {
    return this.isUserLoggedIn;
  }
  activerConsultant(id:number)
  {
    return this.http.put(this.baseUrl+'/api/consultant/activer/'+id,null).catch(this.errorHandler);
  }
  desactiverConsultant(id:number)
  {
    return this.http.put(this.baseUrl+'/api/consultant/desactiver/'+id,null).catch(this.errorHandler);
  }
  recommander(comp:Competences)
  {
    console.log(comp.consultant.email);
    return this.http.get(this.baseUrl+'/api99/recommander/'+'?to='+comp.consultant.email+'&x=recommandation consultant PFE'+'&msg='+'vous etes recommandé monsieur_'+comp.consultant.nom+'_'+comp.consultant.prenom);
  }
  recruter(comp:Competences)
  {
    console.log(comp.consultant.email);
    return this.http.get(this.baseUrl+'/api99/recommander/'+'?to='+comp.consultant.email+'&x=recrutement consultant PFE'+'&msg='+'vous etes recruté monsieur_'+comp.consultant.nom+'_'+comp.consultant.prenom);
  }
}
