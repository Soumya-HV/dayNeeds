import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { commonService } from '../core/services/common-service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
})
export class Tab4Component implements OnInit {
  showDetails =false;
  constructor(public modalController: ModalController,private router: Router, private tabService: commonService) { }

  ngOnInit() { }

  backHome() {
    this.router.navigate(['tab/tab2']);
    
  }
}
