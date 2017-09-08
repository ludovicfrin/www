/**
 * Firebase configuration
 *
 * @author Ludovic FRIN<ludovic@frin.fr>
 */
import { NgModule } from '@angular/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
 
const CONFIG = {
  apiKey: "",
  authDomain: "",
  databaseURL: ",
  projetctId: "",
  storageBucket: "",
  messagingSenderId: ""
};
 
@NgModule({
  imports: [
    AngularFireModule.initializeApp(CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
})
export class AppFirebaseModule { }