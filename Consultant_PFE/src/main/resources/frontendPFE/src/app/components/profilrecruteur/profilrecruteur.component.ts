import { Component, OnInit } from '@angular/core';
import {Consultant} from "../../modules/consultant.module";
import {ConsultantService} from "../../shared-service/consultant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CompetencesService} from "../../shared-service/competences.service";

@Component({
  selector: 'app-profilrecruteur',
  templateUrl: './profilrecruteur.component.html',
  styleUrls: ['./profilrecruteur.component.css']
})
export class ProfilrecruteurComponent implements OnInit {

  consultant:Consultant=new Consultant();
  consultants:any;//Consultant[];
  position:number=0;
  motCle:String="";
  size:number=5;
  currentpage:number=0;
  pages:Array<number>;
  userco:String;
  competences:any;
  motCley:String="";
  constructor(private consultantService: ConsultantService,private router:Router,private route:ActivatedRoute,private competencesservice: CompetencesService) {
  }

  ngOnInit() {

    /* this.consultantService.getConsultants(this.motCle,this.currentpage,this.size).subscribe(
     (consultants) => {
     console.log(consultants);
     this.consultants = consultants;
     this.pages=new Array(consultants.totalPages);

     }, (error) => {
     console.log(error);
     })*/
    this.competencesservice.rechercheCompetences(this.motCle,this.currentpage,this.size).subscribe(
      (data) => {
        this.competences = data;
        this.pages=new Array(data.totalPages);

      }, (error) => {
        console.log(error);
      })

    this.userco = this.route.snapshot.params.name;

  }
  rechercheConsultantbyID(id)
  {
    this.consultantService.getConsultantByid(id).subscribe(
      (consultant) => {
        this.consultant = consultant;

      }, (error) => {
        console.log(error);
      })

  }

  recommanderConsultant(c) {
    const confirm = window.confirm('Are you sure you want to recommand this Consultant?') ;
    if (confirm === true) {
      this.consultantService.recruter(c).subscribe(
        (data) => {

        }, (error) => {
          console.log(error);
        })
    }

  }



  doSearch()
  {
    this.competencesservice.rechercheCompetences(this.motCle,this.currentpage,this.size).subscribe(
      (data) => {
        this.competences = data;
        this.pages=new Array(data.totalPages);

      }, (error) => {
        console.log(error);
      })

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
  doSearch2()
  {
    this.competencesservice.rechercheCompetences2(this.motCley,this.currentpage,this.size).subscribe(
      (data) => {
        this.competences = data;
        this.pages=new Array(data.totalPages);

      }, (error) => {
        console.log(error);
      })

  }
  chercher2()
  {
    this.doSearch2();
  }
}
