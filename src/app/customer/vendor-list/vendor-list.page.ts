import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides, ModalController } from '@ionic/angular';
import { ShopDetailsComponent } from '../../shop-details/shop-details.component';
import { Camera, CameraResultType,CameraSource,ImageOptions } from '@capacitor/camera';
import * as env from '../../../environments/environment';
import { commonService } from 'src/app/core/services/common-service';
import { ManageAddressComponent } from 'src/app/shared/components/manage-address/manage-address.component';
@Component({
  selector: 'app-vendor-list',
  templateUrl: 'vendor-list.page.html',
  styleUrls: ['vendor-list.page.scss']
})
export class VendorListPage {

  categoryId: any;
  vendorList= [];
  imageElement: any;
  base64: string="";
  dummy = Array(10);
  @ViewChild('mySlider') slider: IonSlides;
  @ViewChild('categorySlider') catslider: IonSlides;
  sliderOpts = {
    autoplay: true,
    speed: 1000,

  };
  categorySliderOpts = {
    slidesPerView: 4,
    autoplay: true,
    speed: 1000,

  }
  addressSelected: any;
  constructor(public modalController: ModalController,private http: HttpClient, private router: Router,private activatedRoute : ActivatedRoute, private cmnService:commonService) {
    activatedRoute.queryParams.subscribe(params => {
      this.categoryId = params.category_id;
      console.log(this.categoryId);
      this.addressSelected = this.cmnService.customerdeliveryAddress;
    })
  }


  async openModalAddress(name) {
    const modal = await this.modalController.create({
      component: ManageAddressComponent,
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  ionViewWillEnter(){
    console.log('ion view will enter');
    this.dummy = Array(10);
    if(this.categoryId){
      this.getVendorListbyCategoryId();
    } else{
      this.getVendorList();
    }
  }



  ngOnInit(){
    Camera.requestPermissions({permissions:['photos']})
  }

  getVendorListbyCategoryId(){
    this.http.get(env.environment.url+'category/'+this.categoryId+'/vendors').subscribe
    (res => {
      this.dummy=[];
      this.vendorList = res['response'];
      console.log(this.vendorList);
    });

  }
  pickImageFromGallery(){
    var options:ImageOptions ={
      source:CameraSource.Photos,
      resultType:CameraResultType.DataUrl
    }
    Camera.getPhoto(options).then((result) =>{
      this.base64 = result.dataUrl;
    },(err)=>{
      alert(err)
    })
  }

  getVendorList(){
    this.http.get(env.environment.url+'vendors').subscribe
    (res => {
      this.dummy=[];
      this.vendorList = res['response'];
      console.log(this.vendorList);
    });
  }

  backHome() {
    this.router.navigate(['customer/home']);
  }

  async openShopDetail(vendor) {
    const modal = await this.modalController.create({
      component: ShopDetailsComponent,
      componentProps:{data:vendor},
      cssClass: 'sideMenuModal'
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

}
