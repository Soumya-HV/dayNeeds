import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// import { env } from 'process';

@Component({
  selector: 'app-select-block',
  templateUrl: './select-block.component.html',
  styleUrls: ['./select-block.component.scss'],
})
export class SelectBlockComponent implements OnInit {
  apartmentsBlock = [];
  @Input() selectedApartmentBlocks;

  constructor(private modalController: ModalController, private http: HttpClient) { }

  ngOnInit() {
    // this.http.get(env.environment.url + 'apartments').subscribe(res => {
      // this.apartmentsBlock = res['response'];
    // });
    console.log(this.selectedApartmentBlocks);
   }
   
  checkBlur() {
    this.modalController.dismiss();
  }

  navigateProductDtl(data) {
    this.modalController.dismiss(data);
  }

  searchItem(searchVal) {
    console.log(searchVal);
   // http://localhost:3000/prod/apartments/filterAppartments/{searchingWord}
    // this.http.get(env.environment.url +  'apartments/filterAppartments/' + searchVal).subscribe(res => {
      // this.apartmentsBlock = ['response'];
      // console.log(this.apartmentsBlock);
    // });
    this.apartmentsBlock
  }

}
