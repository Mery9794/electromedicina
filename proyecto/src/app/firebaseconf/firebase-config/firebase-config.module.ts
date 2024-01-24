import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebaseConfig: {
  apiKey: "AIzaSyDszFEPn5M0xtCy4xKG8_HinMdmc5mt0ng",
  authDomain: "electromedicina-95a2a.firebaseapp.com",
  databaseURL: "https://electromedicina-95a2a-default-rtdb.firebaseio.com",
  projectId: "electromedicina-95a2a",
  storageBucket: "electromedicina-95a2a.appspot.com",
  messagingSenderId: "457827562334",
  appId: "1:457827562334:web:e29558d8bbaddb69f515cf",
  measurementId: "G-5L7L40TK28"
}
}

const app = initializeApp(environment.firebaseConfig);
const analytics = getAnalytics(app);

export default app;

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]

})
export class FirebaseConfigModule { }
