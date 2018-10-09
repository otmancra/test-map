import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor (){
    const config = {
    apiKey: "AIzaSyBd-YLPDfjz9jFqnUCqWcc4Jbiz37Jb31o",
    authDomain: "test-map-511b7.firebaseapp.com",
    databaseURL: "https://test-map-511b7.firebaseio.com",
    projectId: "test-map-511b7",
    storageBucket: "",
    messagingSenderId: "637487065491"
  };
  firebase.initializeApp(config);
  }
}
