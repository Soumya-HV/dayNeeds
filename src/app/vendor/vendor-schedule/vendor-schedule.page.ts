import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import * as moment from 'moment';
import { SelectApartmentComponent } from 'src/app/shared/components/select-apartment/select-apartment.component';
import  * as env from '../../../../src/environments/environment';
import {commonService } from '../../core/services/common-service'; 

@Component({
  selector: 'app-vendor-schedule',
  templateUrl: 'vendor-schedule.page.html',
  styleUrls: ['vendor-schedule.page.scss']
})
export class VendorSchedulePage implements OnInit {
  scheduleDeliverForm: FormGroup;
  // scheduledVisits = [{id:1 ,visitDate: '2021-09-26T05:31:56.499Z', visitTime: '4:00pm', appartment: 'Shobha Lake Garden', No: 8}, {id:2 ,visitDate: '2021-11-06T09:40:56.499Z', visitTime: '6:00pm', appartment: 'Casin Apartments', No: 10}];
  apartmentsList = [{ id: 1, name: 'Skandha' }, { id: 2, name: 'GreenValley' }];
  selectedApartment: any;
  scheduledVisits: any;
  // apartmentsList: any;
  
  constructor(private fb: FormBuilder, private http: HttpClient, private modalController: ModalController, private cmnService:commonService) {
    this.scheduleDeliverForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      apartment: ['', Validators.required]
    })
  }

  ngOnInit() {
    var date = new Date();
    console.log(this.apartmentsList, date.toISOString(),this.cmnService.userDetails?.vendorDetails.createdDate);
    console.log(this.scheduleDeliverForm.value);    
    this.getScheduleVisits();
  }

  timeTrigger() {
    var date = new Date(this.scheduleDeliverForm.value.time);
    var cDate = moment(date).format('LT');
    this.scheduleDeliverForm.patchValue({
      time: cDate
    })   
  }

  dateTrigger() {
    var date = new Date(this.scheduleDeliverForm.value.date);
    var selectedDate = date.toISOString();
    console.log(selectedDate, date, this.scheduleDeliverForm.value.date);    
  }

  submitForm() {
   let body = {
      "vendor": this.cmnService.userDetails._id,
      "appartment": this.selectedApartment,
      "visitDate": this.scheduleDeliverForm.value.date,
      "visitTime": this.scheduleDeliverForm.value.time 
  }
     
    // console.log((this.scheduleDeliverForm.value.date as Date).getDate);
    this.http.post(env.environment.url + 'shedule-visit', body).subscribe(res => {
      console.log(res);
    });
  }

  async navigateToProduct(ev: any) {
    const modal = await this.modalController.create({
      component: SelectApartmentComponent,
      cssClass: 'apartment_selection'
    });
    await modal.present();
    modal.onDidDismiss().then((data) => { 
      console.log(data['data']);
      this.selectedApartment = data.data._id
      this.scheduleDeliverForm.patchValue({
        apartment: data.data.apartmentName
      })
      console.log('onDidDismiss resolved with role', this.scheduleDeliverForm);
    });
  }

  getScheduleVisits(){
    console.log(this.scheduleDeliverForm.value, this.cmnService.userDetails);
    this.http.get(env.environment.url + `shedule-visit/vendor/${localStorage.getItem('loginId')}`).subscribe(res => {
      console.log(res['response']);   
      this.scheduledVisits = res['response'];   
    })
    }

}
