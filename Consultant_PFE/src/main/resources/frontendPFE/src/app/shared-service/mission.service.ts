//MissionService

import { Injectable } from '@angular/core';
import {Http, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";

import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import {observable} from "rxjs/symbol/observable";
//import {LocalStorageService, LocalStorage} from 'ng2-webstorage';
//map(resp => resp.json())
import {Ng2Webstorage} from 'ngx-webstorage';
import {LocalStorageService, LocalStorage} from 'ngx-webstorage';
import {Mission} from "../modules/mission.module";
import {HttpClient} from "@angular/common/http";
@Injectable()
export class MissionService {
  private baseUrl:string='http://localhost:8080/apimission';
  //private headers=new Headers({'Content-Type':'application/json'});
  // private options=new RequestOptions({headers:this.headers});
  private mission:Mission;
  private username:String;
  constructor(private http:HttpClient,private Ws:Ng2Webstorage) { }
  errorHandler(error:Response)
  {
    return Observable.throw(error||"SERVER ERROR");
  }
  getMissions(motCle:String,page:number,size:number){

    return this.http.get(this.baseUrl+'/cherchermission?mc='+motCle+'&size='+size+'&page='+page).catch(this.errorHandler);

  }
  getMissionsByConsultant(motCle:number,page:number,size:number){

    return this.http.get(this.baseUrl+'/getmissionsbyconsultant?mc='+motCle+'&size='+size+'&page='+page).catch(this.errorHandler);

  }
  recherchemissionsbyconsultant(motCle:number,motCle2:String,page:number,size:number)
  {
    return this.http.get(this.baseUrl+'/recherchemissionsbyconsultant?mc='+motCle+'&mc2='+motCle2+'&size='+size+'&page='+page).catch(this.errorHandler);

  }
  getMissionByid(id:number){

    return this.http.get(this.baseUrl+'/mission/'+id).catch(this.errorHandler);

  }
  deleteMission(id:number){

    return this.http.delete(this.baseUrl+'/mission/'+id).catch(this.errorHandler);

  }
  createMission(mission:Mission){

    return this.http.post(this.baseUrl+'/mission/',mission).catch(this.errorHandler);

  }
  updateMission(mission:Mission){

    return this.http.put(this.baseUrl+'/mission/',mission).catch(this.errorHandler);

  }
  setter(mission)
  {
    this.mission=mission;
  }
  getter()
  {
    return this.mission;
  }
  desactiverMission(id:number)
  {
    return this.http.put(this.baseUrl+'/mission/desactiver/'+id,null).catch(this.errorHandler);

  }
  activerMission(id:number)
  {
    return this.http.put(this.baseUrl+'/mission/activer/'+id,null).catch(this.errorHandler);

  }
  supprimerMissionAuto()
  {
    return this.http.delete(this.baseUrl+'/missionauto/').catch(this.errorHandler);

  }

}
