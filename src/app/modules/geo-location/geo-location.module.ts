import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeoLocationRoutingModule } from './geo-location-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GeoLocationRoutingModule,
    // SharedModule
  ]
})
export class GeoLocationModule { }
