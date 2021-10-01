import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { commonService } from 'src/app/core/services/common-service';
import { VendorDabbastoryComponent } from 'src/app/shared/components/vendor-dabbastory/vendor-dabbastory.component';
import { VendorEditProductComponent } from 'src/app/shared/components/vendor-edit-product/vendor-edit-product.component';
import { VendorProductComponent } from 'src/app/shared/components/vendor-product/vendor-product.component';
import * as env from '../../../environments/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.page.html',
  styleUrls: ['product-list.page.scss']
})
export class ProductListPage {
  isActive = false;
  products = [
    { id: 1, catName: 'Vegetables', list: [{ id: 1, itemName: 'Tomatoes', itemPrice: '70/kg', active: false }, { id: 2, itemName: 'Beetroot', itemPrice: '30/kg', active: false }] },
    {
      id: 12, catName: 'Dairy Products', list: [{ id: '3', itemName: 'Milk', itemPrice: '30/lt', active: false }, {
        id: '4',
        itemName:
          'Curd', itemPrice: '20/cup', active: false
      }]
    },
  ];

  constructor(public modalController: ModalController, public alertController: AlertController, private http: HttpClient, private cmnService: commonService
  ) {
    this.getProductsofVendor();
  }

  getProductsofVendor() {
    this.http.get(env.environment.url + `items/vendor/${this.cmnService.userDetails._id}`).subscribe(
      res => {
        console.log('subscribe', res);
      });
    let body = []
  }
  

  async addProduct() {
    let catSelected = 'dabba stories';
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: (catSelected == 'dabba stories') ? VendorDabbastoryComponent : VendorProductComponent,
      cssClass: 'sideMenuModal',
      componentProps: { mode: 'Add' }
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  async updateProduct() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: VendorProductComponent,
      cssClass: 'sideMenuModal',
      componentProps: { mode: 'Update' }
    });
    modal.onDidDismiss().then((data) => {
    });
    return await modal.present();
  }

  async openeditModal(details, selectedProduct) {
    console.log(details, selectedProduct);

    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: VendorEditProductComponent,
      cssClass: 'sideMenuModal',
      componentProps: { mode: 'Update', details: selectedProduct }
    });
    modal.onDidDismiss().then((data) => {
      console.log(data);
    });
    return await modal.present();
  }

  async removeProduct(list, item) {
    const alert = await this.alertController.create({
      cssClass: 'text-center',
      header: 'Confirm!',
      message: '<strong>Are you sure to remove a Product??</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            // this.offerDetails.splice(0, 1);
            this.deleteProduct(item.id);
            console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
  }

  deleteProduct(id) {
    console.log(id);
    this.http.delete(env.environment.url + id).subscribe(res => { console.log(res) });
  }
}
