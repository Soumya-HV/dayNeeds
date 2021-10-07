import { Component, ElementRef, OnInit, ViewChild, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { MapsAPILoader, AgmMap } from '@agm/core';

@Component({
  selector: 'app-geo-location',
  templateUrl: './geo-location.component.html',
  styleUrls: ['./geo-location.component.scss'],
})
export class GeoLocationComponent implements OnInit {

  lat: number;
  lng: number;
  private geoCoder;
  zoom: number;
  address: string;
  @ViewChild('search',{static:false})
  public searchElementRef: ElementRef;
  constructor(public navCtrl: NavController, private nativeGeocoder: NativeGeocoder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentPosition();
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.address = place.formatted_address;
          //set latitude, longitude and zoom
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          console.log(this.lat,this.lng);
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.lat, this.lng);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  markerDragEnd($event: MouseEvent) {
    let event = JSON.stringify($event);
    let parseJSON = JSON.parse(event);
    console.log(parseJSON)
    this.lat = parseJSON.latLng.lat;
    this.lng = parseJSON.latLng.lng;
    console.log(this.lat, this.lng);
    this.getAddress(this.lat,this.lng);
  }

  async setCurrentPosition() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.ngZone.run(() => {
      this.lat = coordinates.coords.latitude;
      this.lng = coordinates.coords.longitude;
      this.getAddressfromCoords();
    })
  }

  // async locate() {
  //   alert('caling loacate')
  //   const coordinates = await Geolocation.getCurrentPosition();
  //   this.coords = coordinates.coords;
  //   alert(JSON.stringify(this.coords));
  //   console.log("coordinates", this.coords);
  //   if (this.coords) {
  //     alert('calling addres');
  //     this.getAddressfromCoords();
  //   }
  // }



  getAddressfromCoords() {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.nativeGeocoder.reverseGeocode(this.lat, this.lng, options)
      .then((result: NativeGeocoderResult[]) =>
        alert(JSON.stringify(result))
        // console.log(JSON.stringify(result[0]))
      )
      .catch((error: any) => console.log(error));
  }

}
