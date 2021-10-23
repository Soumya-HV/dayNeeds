import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import * as env from '../../../../environments/environment'

@Component({
  selector: 'app-select-apartment',
  templateUrl: './select-apartment.component.html',
  styleUrls: ['./select-apartment.component.scss'],
})
export class SelectApartmentComponent implements OnInit {
  apartmentsList = [{ _id: 1, apartmentName: 'Skandha' }, { _id: 2, apartmentName: 'Krishna Satura' }]
  constructor(private modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {
    this.http.get(env.environment.url + 'apartments').subscribe(res => {
      this.apartmentsList = res['response'];
    });
   }

  checkBlur() {
    this.modalController.dismiss();
  }

  navigateProductDtl(data) {
    // for (var i = 0; i < this.apartmentsList.length; i++) {
    // if(this.apartmentsList[i]==index){
    // this.apartmentsList[i].checked = data.checked;
    // }
    // }
    // let selectedApartment = this.apartmentsList.filter(x => x.checked == true);
    console.log(this.apartmentsList, data);
    this.modalController.dismiss(data);
  }


  searchItem(searchVal) {
    console.log(searchVal);
    
    http://localhost:3000/prod/apartments/filterAppartments/{searchingWord}
    this.http.get(env.environment.url + 'apartments/filterAppartments/' + searchVal).subscribe(res => {
      this.apartmentsList = res['response'];
      console.log(this.apartmentsList);
    })
  }

}



