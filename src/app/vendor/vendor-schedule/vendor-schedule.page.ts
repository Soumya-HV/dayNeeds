import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import  * as env from '../../../../src/environments/environment'

@Component({
  selector: 'app-vendor-schedule',
  templateUrl: 'vendor-schedule.page.html',
  styleUrls: ['vendor-schedule.page.scss']
})
export class VendorSchedulePage implements OnInit {
  scheduleDeliverForm: FormGroup;
  scheduledVisits = [{id:1 ,date: 'Today', time: '4:00pm', place: 'Shobha Lake Garden', No: 8}, {id:2 ,date: 'Tomorrow', time: '6:00pm', place: 'Casin Apartments', No: 10}];
  apartmentsList = [{ id: 1, name: 'Skandha', isChecked: false }, { id: 2, name: 'GreenValley', isChecked: false }];
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.scheduleDeliverForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required]
    })
  }

  ngOnInit() {
    console.log(this.apartmentsList);
  }

  submitForm() {
    console.log(this.scheduleDeliverForm.value);
    // this.http.post(env.environment.url + '/schedule');
  }

  getForm(){
    console.log(this.scheduleDeliverForm.value);
        // this.http.get(env.environment.url');
  }

}
