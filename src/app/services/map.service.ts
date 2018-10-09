import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Marker } from '../models/marker.model';


@Injectable()
export class MapService {

  markers: Marker[] = [];

  markersSubject = new Subject<Marker[]>();

  constructor() {
      this.getMarkers();
  }

  emitMarkers() {
    this.markersSubject.next(this.markers);
  }

  saveMarkers() {
  firebase.database().ref('/markers').set(this.markers);
  }

  getMarkers() {
    firebase.database().ref('/markers')
      .on('value', (data) => {
          this.markers = data.val() ? data.val() : [];
          this.emitMarkers();
        }
      );
  }

  createNewMarker(newMarker: Marker) {
    this.markers.push(newMarker);
    this.saveMarkers();
    this.emitMarkers();
  }




}
