import { Component, OnInit } from '@angular/core';
import {Mission} from "../../modules/mission.module";
import {ConsultantService} from "../../shared-service/consultant.service";
import {Router} from "@angular/router";
import {MissionService} from "../../shared-service/mission.service";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-missionsform2',
  templateUrl: './missionsform2.component.html',
  styleUrls: ['./missionsform2.component.css']
})
export class Missionsform2Component implements OnInit {
  mission: Mission=new Mission();
  userco: String;
  mode:number=1;

  constructor(private consultantService: ConsultantService, private router: Router,private missionservice:MissionService) {
  }

  ngOnInit() {
    this.mission = this.missionservice.getter();
    this.userco=this.consultantService.getterlogin();

  }

  processForm() {
    if(isNullOrUndefined(this.mission.idMission)){
      this.missionservice.createMission(this.mission).subscribe((data)=>{
        console.log(data);
        this.mission=data;

      });

    }
    else
    {

      this.missionservice.updateMission(this.mission).subscribe((data)=>{
        console.log(data);
        this.mission=data;

      });



    }

    this.mode=2;


  }
  retour()
  {
    console.log("redirection");
    this.router.navigate(['/missions/'+this.userco]);
  }
}
