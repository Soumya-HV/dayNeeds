import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private platform: Platform,
    private authService: AuthenticationService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
          console.log('hello');
        }, false);
      });
      if (!this.authService.getToken()) {
        this.router.navigate(["welcome"]);
      } else {
        this.router.navigate(["tab/home"]);
      }
    });
  }

}
