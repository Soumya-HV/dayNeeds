import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  welcomeImgOn = true;
  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.welcomeImgOn = false;
    }, 500);
  }

  startEventHandler() {
    this.router.navigate(['/login']);
  }

}
