import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-sub-user',
  templateUrl: './add-sub-user.component.html',
  styleUrls: ['./add-sub-user.component.scss'],
})
export class AddSubUserComponent implements OnInit {
  addSubUserForm: FormGroup;

  constructor(private fb: FormBuilder, public modalController: ModalController) {
    this.addSubUserForm = this.fb.group({
      'userName': ['', Validators.required],
      'mblNo': ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit() { }

  submitForm(){
    
  }

  closeModal(){
    this.modalController.dismiss();

  }

}
