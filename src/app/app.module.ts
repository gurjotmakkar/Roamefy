import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//App page references
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { InitialConfigurationPage } from '../pages/initial-configuration/initial-configuration';
import { InitialConfigurationTwoPage } from '../pages/initial-configuration-two/initial-configuration-two';
import { UserProfilePage } from '../pages/user-profile/user-profile'
import { EditUserProfilePage } from '../pages/edit-user-profile/edit-user-profile'
import { AddEventPage } from '../pages/add-event/add-event'
import { EditUserEventPage } from '../pages/edit-user-event/edit-user-event'
import { UserEventsPage } from '../pages/user-events/user-events';

//UI
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Import angularfire and firebase module
import { HttpModule } from '@angular/http';
import { HttpProvider } from '../providers/http/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireOfflineModule } from 'angularfire2-offline';

//Firebase database configuration data
//DO NOT CHANGE ANYTHING
const firebaseConfig = {
  apiKey: "AIzaSyAfAtP5YK9MsFgB7erifiiLX3XT4JouuY0",
  authDomain: "roamefy-app.firebaseapp.com",
  databaseURL: "https://roamefy-app.firebaseio.com",
  projectId: "roamefy-app",
  storageBucket: "roamefy-app.appspot.com",
  messagingSenderId: "844616883402"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    InitialConfigurationPage,
    InitialConfigurationTwoPage,
    UserProfilePage,
    EditUserProfilePage,
    AddEventPage,
    EditUserEventPage,
    UserEventsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireOfflineModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    InitialConfigurationPage,
    InitialConfigurationTwoPage,
    UserProfilePage,
    EditUserProfilePage,
    AddEventPage,
    EditUserEventPage,
    UserEventsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    HttpProvider
  ]
})
export class AppModule {}
