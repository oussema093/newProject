import { Component, OnInit } from '@angular/core';
import {Competences} from "../../modules/competences.module";
import {ConsultantService} from "../../shared-service/consultant.service";
import {Router} from "@angular/router";
import {CompetencesService} from "../../shared-service/competences.service";
import {isNullOrUndefined} from "util";
import {Consultant} from "../../modules/consultant.module";

@Component({
  selector: 'app-competencesform',
  templateUrl: './competencesform.component.html',
  styleUrls: ['./competencesform.component.css']
})
export class CompetencesformComponent implements OnInit {
mode:number=1;
  competences: Competences=new Competences();
  userco: String;
  consultant:Consultant;



  constructor(private consultantService: ConsultantService, private router: Router,private competenceservice:CompetencesService) { }

  ngOnInit() {
    this.competences=this.competenceservice.getter();
    this.userco=this.consultantService.getterlogin();

  }
  processForm()
  {

    if(isNullOrUndefined(this.competences.idCompetence)){

      this.consultantService.getUserbyLogin(this.userco).subscribe(data=>
      {
        this.consultant=data;
        // this.competences.setConsultant(this.consultant);
        this.competences.consultant=this.consultant;

        this.competenceservice.createCompetences(this.competences).subscribe((data)=>{
          console.log(data);
          this.competences=data;


        });

      })


    }
    else
    {
      this.competenceservice.updateCompetences(this.competences).subscribe((data)=>{
        console.log(data);
        this.competences=data;

      });



    }

    this.mode=2;



  }
  retour()
  {
    this.router.navigate(['/competences/'+this.userco]);


  }
}
