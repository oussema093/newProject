
import { Component, OnInit } from '@angular/core';
import {Consultant} from "../../modules/consultant.module";
import {ConsultantService} from "../../shared-service/consultant.service";
import {Router} from "@angular/router";
import {isNullOrUndefined, isUndefined} from "util";
import {Mission} from "../../modules/mission.module";
import {MissionService} from "../../shared-service/mission.service";
import {FileserviceService} from "../../shared-service/fileservice.service";

@Component({
  selector: 'app-missionform',
  templateUrl: './missionform.component.html',
  styleUrls: ['./missionform.component.css']
})
export class MissionformComponent implements OnInit {
  mission: Mission=new Mission();
   userco: String;
  mode:number=1;
  recup:any;
  m:Mission;
consultant:Consultant;
f:File;
  constructor(private consultantService: ConsultantService, private router: Router,private missionservice:MissionService,private FileserviceService:FileserviceService) {
  }

  ngOnInit() {
    this.mission = this.missionservice.getter();
    this.userco=this.consultantService.getterlogin();

  }
  public fileEvent($event) {
    const fileSelected: File = $event.target.files[0];
     this.f = $event.target.files[0];

    //this.f=$event.target.files[0];
    // this.fileSelected=$event.target.files[0];


  }

  processForm() {

    if(isNullOrUndefined(this.mission.idMission)){

      this.consultantService.getUserbyLogin(this.userco).subscribe(data=> {
        this.consultant = data;
        // this.competences.setConsultant(this.consultant);
        this.mission.consultant = this.consultant;
       /* this.missionservice.createMission(this.mission).subscribe((data)=>{
          console.log(data);
          this.mission=data;

        });*/

        this.FileserviceService.create(this.f)
          .subscribe((response) => {
              this.recup=response;
              console.log('set any success actions...');
              console.log(this.recup.fileDownloadUri);

                  this.mission.fileDownloadUri=this.recup.fileDownloadUri;
                  this.missionservice.createMission(this.mission).subscribe((data) => {
                    //  console.log(consultant);
                    this.m = data;


                  });


              //
              //

              return response;
            },
            (error) => {
              console.log('set any error actions...');
            });




      });
    }

    else
    {
      this.FileserviceService.create(this.f)
        .subscribe((response) => {
            this.recup=response;
            console.log('set any success actions...');
            console.log(this.recup.fileDownloadUri);

            this.mission.fileDownloadUri=this.recup.fileDownloadUri;
            this.missionservice.updateMission(this.mission).subscribe((data) => {
              //  console.log(consultant);
              this.m = data;


            });


            //
            //

            return response;
          },
          (error) => {
            console.log('set any error actions...');
          });




    //});
     /* this.missionservice.updateMission(this.mission).subscribe((data)=>{
        console.log(data);
        this.mission=data;

      });
*/


    }

    this.mode=2;


  }
  retour()
  {
    console.log("redirection");
    this.router.navigate(['/consultant/'+this.userco]);
  }
}
