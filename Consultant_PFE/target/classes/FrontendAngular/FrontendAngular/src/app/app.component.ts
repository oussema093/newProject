import { Component } from '@angular/core';
import {ConsultantService} from "./shared-service/consultant.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private consultantService: ConsultantService,private router:Router) {
  }
  list()
  {
    this.router.navigate(['/list']);


  }
}