import { Component, OnInit } from '@angular/core';
import {Mission} from "../../modules/mission.module";
import {ConsultantService} from "../../shared-service/consultant.service";
import {MissionService} from "../../shared-service/mission.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Consultant} from "../../modules/consultant.module";

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.css']
})
export class MissionsComponent implements OnInit {

  mission:Mission=new Mission();
  private missions:any;
  position:number=0;
  motCle:String="";
  size:number=5;
  currentpage:number=0;
  pages:Array<number>;
  userco:String='';

  cons: Consultant;

  constructor(private consultantService: ConsultantService,private missionService: MissionService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.userco = this.route.snapshot.params.name;



        this.missionService.getMissions("",this.currentpage,this.size).subscribe( (data) => {
          this.missions = data;
          console.log(this.missions);
          this.pages=new Array(data.totalPages);

        }, (error) => {
          console.log(error);
        })


    console.log('UserLogin '+ this.consultantService.getUserLoggedIn());
    this.missionService.supprimerMissionAuto();
  }

  editerMission(m)
  {
    this.missionService.setter(m);
    this.consultantService.setterlogin(this.userco);

    console.log("mission est "+m);
    this.router.navigate(['/gestionmission2/'+this.userco]);

  }

  doSearch()
  {

    this.consultantService.getUserbyLogin(this.userco).subscribe((data) =>{
        this.cons=data;

        this.missionService.getMissions(this.motCle,this.currentpage,this.size).subscribe( (data) => {
          this.missions = data;
          console.log(this.missions);
          this.pages=new Array(data.totalPages);

        }, (error) => {
          console.log(error);
        })
      }, (error) => {
        console.log(error);}

    )
  }
  chercher()
  {
    this.doSearch();
  }






  goToPage(i:number)
  {
    this.currentpage=i;
    this.doSearch();
  }

  login()
  {
    this.router.navigate(['/login']);

  }

}
