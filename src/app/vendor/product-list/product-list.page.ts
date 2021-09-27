import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VendorDabbastoryComponent } from 'src/app/shared/components/vendor-dabbastory/vendor-dabbastory.component';
import { VendorProductComponent } from 'src/app/shared/components/vendor-product/vendor-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.page.html',
  styleUrls: ['product-list.page.scss']
})
export class ProductListPage {
  products = [
    { id: 1, catName: 'Vegetables', list: [{ productName: 'Tomatoes', price: '70/kg' }, { productName: 'Beetroot', price: '30/kg' }] },
    {
      id: 12, catName: 'Dairy Products', list: [{ productName: 'Milk', price: '30/lt' }, {
        productName:
          'Curd', price: '20/cup'
      }]
    },
  ];

  constructor(public modalController: ModalController) { }

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
}
