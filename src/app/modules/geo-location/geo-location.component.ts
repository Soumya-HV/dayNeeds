import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation/ngx'; 
declare var google;


@Component({
  selector: 'app-geo-location',
  templateUrl: './geo-location.component.html',
  styleUrls: ['./geo-location.component.scss'],
})
export class GeoLocationComponent implements OnInit {
  options : GeolocationOptions;
  currentPos : Geoposition;
  @ViewChild('map') mapElement: ElementRef;
map: any;
  constructor(public navCtrl: NavController,private geolocation : Geolocation) { }

  ngOnInit() {}

  getUserPosition(){
    this.options = {
    enableHighAccuracy : false
    };
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;     

        console.log(pos);
        this.addMap(pos.coords.latitude,pos.coords.longitude);

    },(err : PositionError)=>{
        console.log("error : " + err.message);
    ;
    })
}

addMap(lat,long){

  let latLng = new google.maps.LatLng(lat, long);

  let mapOptions = {
  center: latLng,
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP
  }

  this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  this.addMarker();

}

addMarker(){

  let marker = new google.maps.Marker({
  map: this.map,
  animation: google.maps.Animation.DROP,
  position: this.map.getCenter()
  });

  let content = "<p>This is your current position !</p>";          
  let infoWindow = new google.maps.InfoWindow({
  content: content
  });

  google.maps.event.addListener(marker, 'click', () => {
  infoWindow.open(this.map, marker);
  });

}

ionViewDidEnter(){
  this.getUserPosition();
}  

}
