import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';
import * as env from '../../../../environments/environment';


@Component({
  selector: 'app-select-categories',
  templateUrl: './select-categories.component.html',
  styleUrls: ['./select-categories.component.scss'],
})
export class SelectCategory implements OnInit {
  categoryLists = [];
  navigateData = [];
  selectedCategory = [];
  constructor(private modalController: ModalController, private http: HttpClient, public navParams: NavParams) {
    this.navigateData = JSON.parse(this.navParams.get('data'));
    console.log(this.navigateData);
  }

  ngOnInit() {
    if (this.navigateData.length == 0) {
      this.getCategories();
      this.selectedCategory=[];
    } else {
      this.categoryLists = this.navigateData;
    }
  }

  closeCategory() {
    this.modalController.dismiss(this.categoryLists);
  }

  getCategories() {
    this.http.get(env.environment.url + 'categories').subscribe
      (res => {
        this.categoryLists = res['response'];
        console.log(this.categoryLists);
      });
  }

  selectCategory(ev,data, index) {
    // this.selectCategoryCloneId(data);
    console.log(data, index)
    for (var i = 0; i < this.categoryLists.length; i++) {
      if(this.categoryLists[i]==index){
        this.categoryLists[i].checked = data.checked;
      }
    }
    console.log(this.categoryLists);
  }

   selectCategoryCloneId(data){
    if (data.checked == true) {
      this.selectedCategory.push(data.categoryName);
    } else {
      let newArray = this.selectedCategory.filter(function (el) {
        return el !== data.categoryName;
      });
      this.selectedCategory = newArray;
    }
    console.log(this.selectedCategory);
  }


}
