import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss'],
})
export class RewardsComponent implements OnInit {
  userRewards = [{
    id: 1, amount: '5000', type: 'Transaction Amount', color: '#2A3757'
  }, { id: 1, amount: '500', type: 'Total Rewards', color: '#FF7043' }, { id: 1, amount: '300', type: 'In Wallet', color: '#FF7043' }];
  constructor(public modalController: ModalController) { }

  ngOnInit() { }


  closeModal() {
    this.modalController.dismiss();
  }

}
