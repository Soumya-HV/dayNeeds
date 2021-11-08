import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
starRate=3
  constructor(public modalController: ModalController,) { }
  isReadonly: boolean = true;
 
  ngOnInit() {}

  
  closeModal(){
    this.modalController.dismiss();
  }
  onRateChange(ev){
    console.log(ev);
  }

}
