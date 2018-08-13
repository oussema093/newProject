import { Component, OnInit } from '@angular/core';
import {ConsultantService} from "../../shared-service/consultant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Consultant} from "../../modules/consultant.module";
import {isNullOrUndefined} from "util";

@Component({
  selector: 'app-consultantform2',
  templateUrl: './consultantform2.component.html',
  styleUrls: ['./consultantform2.component.css']
})
export class Consultantform2Component implements OnInit {
  consultant: Consultant=new Consultant();
  mode:number=1;
  name='';
  selectedFile:File=null;
  pathBasic:string="/assets/consultants/";

  constructor(private consultantService: ConsultantService, private router: Router,private route:ActivatedRoute,private http:HttpClient) {
  }

  ngOnInit() {

    this.consultant = this.consultantService.getter();
    this.name=this.route.snapshot.params.name;

  }

  processForm() {
    if(isNullOrUndefined(this.consultant.userId)) {

      this.consultant.setPhoto(this.pathBasic);

      this.consultantService.createConsultant(this.consultant).subscribe((consultant) => {
        console.log(consultant);
        this.consultant = consultant;

      });

    }
    else {


      //    this.consultant.setPhoto(this.pathBasic);

      this.consultantService.updateConsultant(this.consultant).subscribe((consultant) => {
        console.log(consultant);
        this.consultant = consultant;


      });


    }

    this.mode = 2;


  }
  retour()
  {
    console.log("redirection");
    this.router.navigate(['/chargeCompte/'+this.name]);
  }


}
