import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
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
  scheduledVisits = [{id:1 ,date: 'Today', time: '4:00pm', place: 'Shobha Lake Garden', No: 8}, {id:2 ,date: 'Tomorrow', time: '6:00pm', place: 'Casin Apartments', No: 10}];
  // apartmentsList = [{ id: 1, name: 'Skandha', isChecked: false }, { id: 2, name: 'GreenValley', isChecked: false }];
  apartmentsList: any;
  
  constructor(private fb: FormBuilder, private http: HttpClient, private popoverController: PopoverController, private cmnService:commonService) {
    this.scheduleDeliverForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      apartment: ['', Validators.required]
    })
  }

  ngOnInit() {
    console.log(this.apartmentsList, this.cmnService.userDetails?.vendorDetails.createdDate);
    var date = new Date(this.cmnService.userDetails?.vendorDetails.createdDate);
    console.log(date);
    
    this.scheduleDeliverForm.patchValue({
      date: date.toLocaleDateString(),
      time: `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`  
    });

    console.log(this.scheduleDeliverForm.value);
    
    this.getScheduleVisits();
    this.http.get(env.environment.url + 'apartments').subscribe(res => {
      this.apartmentsList = res['response'];
    })
  }

  timeTrigger() {
    var date = new Date(this.scheduleDeliverForm.value.date);
    var isoDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();
    var cDate = new Date(isoDate).toLocaleTimeString();
    console.log(this.scheduleDeliverForm.value, (this.scheduleDeliverForm.value.date as Date), cDate,isoDate);
  }

  submitForm() {
   let body = {
      "vendor": this.cmnService.userDetails._id,
      "appartment": this.scheduleDeliverForm.value.apartment,
      "visitDate": (this.scheduleDeliverForm.value.date as Date).toISOString(),
      "visitTime": (this.scheduleDeliverForm.value.time as Date).toISOString()
  }
  
  var date = new Date(this.scheduleDeliverForm.value.date).toDateString();
  console.log(this.cmnService.userDetails, date);
  
    // console.log((this.scheduleDeliverForm.value.date as Date).getDate);
    this.http.post(env.environment.url + 'shedule-visit', body).subscribe(res => {
      console.log(res);
    });
  }

  async openUnitList(ev: any) {
    const popover = await this.popoverController.create({
      component: SelectApartmentComponent,
      cssClass: 'apartment_selection',
      event: ev,
      translucent: true
    });
    await popover.present();
    popover.onDidDismiss().then((data) => { 
      console.log(data.data[0]);
      this.scheduleDeliverForm.patchValue({
        apartment: data.data[0]._id
      })
      console.log('onDidDismiss resolved with role', this.scheduleDeliverForm);
    });
  }

  getScheduleVisits(){
    console.log(this.scheduleDeliverForm.value, this.cmnService.userDetails);
    this.http.get(env.environment.url + `shedule-visit/vendor/${this.cmnService.userDetails._id}`).subscribe(res => {
      console.log(res['response']);      
    })
    }

}
