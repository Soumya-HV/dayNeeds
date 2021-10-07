import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from '../app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire'
import { RegisterUserComponent } from '../app/modules/register-user/register-user.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './core/interceptor/http-config.interceptor';
import { AuthenticationService } from './core/services/authentication.service';
import { RegisterVendorComponent } from './modules/register-vendor/register-vendor.component';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

// import { GeoLocationComponent } from './modules/geo-location/geo-location.component';

@NgModule({
  declarations: [AppComponent, RegisterUserComponent,RegisterVendorComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule, ReactiveFormsModule],
  providers: [
              AuthenticationService,
              NativeGeocoder,
              { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              {provide: HTTP_INTERCEPTORS,useClass: HttpConfigInterceptor,multi: true}
            ],
  bootstrap: [AppComponent],
})
export class AppModule { }
