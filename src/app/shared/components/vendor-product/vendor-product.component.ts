import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-vendor-product',
  templateUrl: './vendor-product.component.html',
  styleUrls: ['./vendor-product.component.scss'],
})

export class VendorProductComponent implements OnInit {
  @Input() mode;
  productDetailsForm: FormGroup;
  unitLists = [{ id: 1, name: 'Grams', checked: true }, { id: 2, name: 'Kg', checked: false }, { id: 3, name: 'ml', checked: false }]
  openUnits = false;
  unitSelected: any;

  constructor(public modalController: ModalController, private fb: FormBuilder) {
    this.productDetailsForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
    })
  }

  ngOnInit() { }

  openUnitList() {
    this.openUnits = !this.openUnits;
   }

   selectCategory(event, unit, i) {
    this.unitSelected = unit;
    console.log('unit list',unit, event, i, this.unitLists, this.productDetailsForm);    
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
