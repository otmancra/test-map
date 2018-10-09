import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapService } from '../services/map.service';
import { Marker } from '../models/marker.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  markers: Marker[];
  lat: number;
  lng: number;
  display= 'none';
  popupForm: FormGroup;

  markersSubscription: Subscription;


  constructor(private formBuilder: FormBuilder,
              private mapService: MapService) { }

  ngOnInit() {
    this.getUserLocation()
    this.initForm()

    this.markersSubscription = this.mapService.markersSubject.subscribe(
      (markers: Marker[]) => {
        this.markers = markers;
      }
    );
    this.mapService.emitMarkers();
  }

  private getUserLocation() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      })
    }
  }

  initForm() {
    this.popupForm = this.formBuilder.group({
      choice: ['', Validators.required],
    });
  }


  onChoseLocation(event){
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.display='block';
  }


  onSaveMarker() {
    const lat = this.lat;
    const lng = this.lng;
    const choice = this.popupForm.get('choice').value;
    const newMarker = new Marker(lat, lng, choice);
    this.mapService.createNewMarker(newMarker);
    this.display='none';
  }

  onCloseHandled(){
    console.log("popup closed");
    this.display='none';
  }



  ngOnDestroy() {
    this.markersSubscription.unsubscribe();
  }


}
