import { Component, OnInit } from '@angular/core';
import {Experience} from "../../modules/experience.module";
import {ConsultantService} from "../../shared-service/consultant.service";
import {Router} from "@angular/router";
import {ExperienceService} from "../../shared-service/experience.service";
import {isNullOrUndefined} from "util";
import {Consultant} from "../../modules/consultant.module";

@Component({
  selector: 'app-experienceform',
  templateUrl: './experienceform.component.html',
  styleUrls: ['./experienceform.component.css']
})
export class ExperienceformComponent implements OnInit {
  mode:number=1;
  userco: String;
experience:Experience=new Experience();
consultant:Consultant=new Consultant();

  constructor(private consultantService: ConsultantService, private router: Router,private experienceService:ExperienceService ) { }


  ngOnInit() {
    this.experience=this.experienceService.getter();
    this.userco=this.consultantService.getterlogin();
  }
  processForm()
  {

    if(isNullOrUndefined(this.experience.idExperience)){
      this.consultantService.getUserbyLogin(this.userco).subscribe(data=> {
        this.consultant = data;
        // this.competences.setConsultant(this.consultant);
        this.experience.consultant = this.consultant;


        this.experienceService.createExperience(this.experience).subscribe((data) => {
          console.log(data);
          this.experience = data;


        });
      })
    }
    else
    {

      this.experienceService.updateExperience(this.experience).subscribe((data)=>{
        console.log(data);
        this.experience=data;
        console.log("phase finale "+this.experience);

      });



    }


    this.mode=2;




  }

  retour()
  {
    this.router.navigate(['/experiences/'+this.userco]);
    console.log("login: "+this.userco);

  }
}
