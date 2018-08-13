import { Component, OnInit } from '@angular/core';
import {ConsultantService} from "../../shared-service/consultant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Consultant} from "../../modules/consultant.module";

@Component({
  selector: 'app-profil-charge-de-compte',
  templateUrl: './profil-charge-de-compte.component.html',
  styleUrls: ['./profil-charge-de-compte.component.css']
})
export class ProfilChargeDeCompteComponent implements OnInit {
  consultant:Consultant=new Consultant();
  consultants:any;//Consultant[];
  position:number=0;
  motCle:String="";
  size:number=5;
  currentpage:number=0;
  pages:Array<number>;
  userco:String;
  constructor(private consultantService: ConsultantService,private router:Router,private route:ActivatedRoute) {
  }

  ngOnInit() {

    this.consultantService.getConsultants(this.motCle,this.currentpage,this.size).subscribe(
      (consultants) => {
        console.log(consultants);
        this.consultants = consultants;
        this.pages=new Array(consultants.totalPages);

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

  updateConsultant(c)
  {

    this.consultantService.setter(c);
    console.log(c);
    this.router.navigate(['/op2/'+this.userco]);

  }


  doSearch()
  {
    this.consultantService.getConsultants(this.motCle,this.currentpage,this.size).subscribe(
      (consultants) => {
        console.log(consultants);
        this.consultants = consultants;

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



}
