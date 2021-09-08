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
import { RegisterComponent } from './modules/register/register.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './core/interceptor/http-config.interceptor';

@NgModule({
  declarations: [AppComponent, RegisterComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, SharedModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule, ReactiveFormsModule],
    providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: HTTP_INTERCEPTORS,
    useClass: HttpConfigInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
