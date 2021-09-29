import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, PopoverController } from '@ionic/angular';
import { UnitSelectComponent } from '../unit-select/unit-select.component';

@Component({
  selector: 'app-vendor-product',
  templateUrl: './vendor-product.component.html',
  styleUrls: ['./vendor-product.component.scss'],
})

export class VendorProductComponent implements OnInit {
  @Input() mode;
  productDetailsForm: FormGroup;
  openUnits = false;
  unitSelected: any;

  constructor(public modalController: ModalController, private fb: FormBuilder, public popoverController: PopoverController) {
    this.productDetailsForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  ngOnInit() { }

  // openUnitList() {
    // this.openUnits = !this.openUnits;
  //  }

   async openUnitList(ev: any) {
    const popover = await this.popoverController.create({
      component: UnitSelectComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();

    const { role } = await popover.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

   selectCategory(event, unit, i) {
    this.unitSelected = unit;
   }

  closeModal() {
    this.modalController.dismiss();
  }

  loadImageFromDevice(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      let blobURL: string = URL.createObjectURL(blob);
    };
    reader.onerror = (error) => {
    };
  };

  submitForm() {
    console.log(this.productDetailsForm.value);
  }

}
