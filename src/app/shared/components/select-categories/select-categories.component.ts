import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';
import * as env from '../../../../environments/environment';


@Component({
  selector: 'app-select-categories',
  templateUrl: './select-categories.component.html',
  styleUrls: ['./select-categories.component.scss'],
})
export class SelectCategory implements OnInit {
 
  constructor(private modalController: ModalController) {
 
  }

  ngOnInit() {
  
  }

  closeCategory() {
    this.modalController.dismiss();
  }


}
