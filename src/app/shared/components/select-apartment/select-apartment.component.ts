import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import  * as env from '../../../../environments/environment'

@Component({
  selector: 'app-select-apartment',
  templateUrl: './select-apartment.component.html',
  styleUrls: ['./select-apartment.component.scss'],
})
export class SelectApartmentComponent implements OnInit {
  // apartmentsList = [{id: 1, name: 'Skandha', checked: false}, {id:2, name: 'Krishna Satura', checked: false}]
  apartmentsList :any;
  constructor(private popoverController: PopoverController, private http: HttpClient) { }

  ngOnInit() {
    this.http.get(env.environment.url + 'apartments').subscribe(res => {
      this.apartmentsList = res['response'];
      console.log(this.apartmentsList);
    })
  }

  selectApartment(ev,data, index) {
      for (var i = 0; i < this.apartmentsList.length; i++) {
        if(this.apartmentsList[i]==index){
          this.apartmentsList[i].checked = data.checked;
        }
      }
      let selectedApartment = this.apartmentsList.filter(x => x.checked == true);
      console.log(this.apartmentsList);
      this.popoverController.dismiss(selectedApartment);
    }
  }

