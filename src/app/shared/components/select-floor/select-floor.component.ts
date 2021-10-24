import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-select-floor',
  templateUrl: './select-floor.component.html',
  styleUrls: ['./select-floor.component.scss'],
})
export class SelectFloorComponent implements OnInit {
 apartmentsFloor = [];
 @Input() selectedApartmentFloors;
 constructor(private modalController: ModalController, private http: HttpClient) { }
 ngOnInit() {
   // this.http.get(env.environment.url + 'apartments').subscribe(res => {
     // this.apartmentsBlock = res['response'];
   // });
   console.log(this.selectedApartmentFloors);
  }
  
 checkBlur() {
   this.modalController.dismiss();
 }
 navigateProductDtl(data) {
   this.modalController.dismiss(data);
 }
 searchItem(searchVal) {
   console.log(searchVal);
  }
}

