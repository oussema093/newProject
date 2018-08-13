import { Component, OnInit } from '@angular/core';
import {Experience} from "../../modules/experience.module";
import {ConsultantService} from "../../shared-service/consultant.service";
import {CompetencesService} from "../../shared-service/competences.service";
import {ExperienceService} from "../../shared-service/experience.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Consultant} from "../../modules/consultant.module";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  experience:Experience=new Experience();
  Experiences:any;
  position:number=0;
  motCle:String="";
  size:number=5;
  currentpage:number=0;
  pages:Array<number>;
  userco:String='';

  cons: Consultant;

  constructor(private consultantService: ConsultantService,private experienceService: ExperienceService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.userco = this.route.snapshot.params.name;

    this.consultantService.getUserbyLogin(this.userco).subscribe((data) =>{
        this.cons=data;
        console.log(this.cons.userId);

        this.experienceService.rechercheexpsbyconsultant(this.cons.userId,"",this.currentpage,this.size).subscribe( (data) => {
          this.Experiences = data;
          this.pages=new Array(data.totalPages);

        }, (error) => {
          console.log(error);
        })
      }, (error) => {
        console.log(error);}

    )


    console.log('UserLogin '+ this.consultantService.getUserLoggedIn());
  }

  editerExperiences(e)
  {
    this.experienceService.setter(e);
    this.consultantService.setterlogin(this.userco);

    console.log("oussema experience est "+e);
    this.router.navigate(['/experiencesform/'+this.userco]);

  }
  deleteExperiences(e)
  {
    /*
     *  const confirm = window.confirm('Are you sure you want to delete this User?') ;
     if (confirm === true) {
     this.userservice.supprUser(u.id).subscribe(data => {
     this.pageUsers.content.splice(
     this.pageUsers.content.indexOf(u), 1) ;
     } , err => {
     console.log(err) ;
     }) ;
     }
     * */
    const confirm = window.confirm('Are you sure you want to delete this Experience?') ;
    if (confirm === true) {
      this.experienceService.deleteExperience(e.idExperience).subscribe((data) => {
        //  this.missions.splice(1,1);

        console.log(data);
      }, (error) => {
        console.log(error);
      });
      // this.missions.toString().slice(this.missions.toString().indexOf(m), 1);
      this.Experiences.content.splice(
        this.Experiences.content.indexOf(e), 1) ;

      // window.history.go(0);
      /*this.consultantService.setterlogin(this.userco);
       window.location.reload();
       this.userco = this.consultantService.getterlogin();*/


      // this.userco=userco;

    }
  }
  doSearch()
  {

    this.consultantService.getUserbyLogin(this.userco).subscribe((data) =>{
        this.cons=data;
        console.log(this.cons.userId);

        this.experienceService.rechercheexpsbyconsultant(this.cons.userId,this.motCle,this.currentpage,this.size).subscribe( (data) => {
          this.Experiences = data;
          console.log(this.Experiences);
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
newExp()
{
  let c= new Experience();
  this.consultantService.setterlogin(this.userco);

  this.experienceService.setter(c);
  this.router.navigate(['/experiencesform/'+this.userco]);

}

}
