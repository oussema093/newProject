import { Component, OnInit } from '@angular/core';
import {ConsultantService} from "../../shared-service/consultant.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Mission} from "../../modules/mission.module";
import {MissionService} from "../../shared-service/mission.service";
import {User} from "../../modules/user.module";
import {Consultant} from "../../modules/consultant.module";
import {FileserviceService} from "../../shared-service/fileservice.service";

@Component({
  selector: 'app-profilconsultant',
  templateUrl: './profilconsultant.component.html',
  styleUrls: ['./profilconsultant.component.css']
})
export class ProfilconsultantComponent implements OnInit {
  mission:Mission=new Mission();
  private missions:any;
  position:number=0;
  motCle:String="";
  size:number=5;
  currentpage:number=0;
  pages:Array<number>;
    userco:String='';
recup:any;
  cons: Consultant;
  url:string;
url2:string;
m:Mission;
  constructor(private consultantService: ConsultantService,private missionService: MissionService,private router:Router,private route:ActivatedRoute,private FileserviceService:FileserviceService) { }

  ngOnInit() {
    this.userco = this.route.snapshot.params.name;


    this.consultantService.getUserbyLogin(this.userco).subscribe((data) =>{
      this.cons=data;
      console.log(this.cons.userId);
this.url=this.cons.fileDownloadUri;
      this.missionService.getMissionsByConsultant(this.cons.userId,this.currentpage,this.size).subscribe( (data) => {
        this.missions = data;
        console.log(this.missions);
        this.pages=new Array(data.totalPages);

      }, (error) => {
        console.log(error);
      })
      }, (error) => {
      console.log(error);}

    )


console.log('UserLogin '+ this.consultantService.getUserLoggedIn());
    this.missionService.supprimerMissionAuto();
  }

  editerMission(m)
  {
    this.missionService.setter(m);
    this.consultantService.setterlogin(this.userco);

    console.log("mission est "+m);
    this.router.navigate(['/gestionmission/'+this.userco]);

  }
  deleteMission(m,userco)
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
    const confirm = window.confirm('Are you sure you want to delete this Mission?') ;
    if (confirm === true) {
      this.missionService.deleteMission(m.idMission).subscribe((data) => {
        //  this.missions.splice(1,1);

        console.log(data);
      }, (error) => {
        console.log(error);
      });
     // this.missions.toString().slice(this.missions.toString().indexOf(m), 1);
      this.missions.content.splice(
        this.missions.content.indexOf(m), 1) ;

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

        this.missionService.recherchemissionsbyconsultant(this.cons.userId,this.motCle,this.currentpage,this.size).subscribe( (data) => {
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
  desactiver(id) {
    this.missionService.desactiverMission(id).subscribe((data) => {
      console.log(data);
      this.mission = data;
      window.location.reload();


    });
  }
    activer(id)
    {
      this.missionService.activerMission(id).subscribe((data)=>{
        console.log(data);
        this.mission=data;
        window.location.reload();


      });
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
  public fileEvent($event) {
    const fileSelected: File = $event.target.files[0];
    //this.f=$event.target.files[0];
    // this.fileSelected=$event.target.files[0];
      this.FileserviceService.create(fileSelected)
     .subscribe((response) => {
     this.recup=response;
     console.log('set any success actions...');
     console.log(this.recup.fileDownloadUri);
         this.consultantService.getUserbyLogin(this.userco).subscribe((data) =>{
             this.cons=data;
             this.cons.fileDownloadUri=this.recup.fileDownloadUri;
             console.log(this.cons.userId);
             this.consultantService.updateConsultant(this.cons).subscribe((consultant) => {
               console.log(consultant);
               this.cons = consultant;


             });

           }, (error) => {
             console.log(error);}

         )
     //
     //

     return response;
     },
     (error) => {
     console.log('set any error actions...');
     });


  }
  newMission()
  {
    //L'instruction let permet de déclarer une variable dont la portée est celle du bloc courant,
    // éventuellement en initialisant sa valeur.

    let m= new Mission();
    this.missionService.setter(m);
    this.consultantService.setterlogin(this.userco);
    this.router.navigate(['/gestionmission/'+this.userco]);
  }
}
