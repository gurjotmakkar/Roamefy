import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirebaseProvider } from '../providers/firebase/firebase';
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { InitialConfigurationPage } from '../pages/initial-configuration/initial-configuration';
import { InitialConfigurationTwoPage } from '../pages/initial-configuration-two/initial-configuration-two';
import { UserProfilePage } from '../pages/user-profile/user-profile';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{title: string, component: any}>;
  activePage: any;

  constructor(public platform: Platform, afAuth: AngularFireAuth, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    public firebase: FirebaseProvider) {
    const authObserver = afAuth.authState.subscribe( user => {
      if (user) {
        this.rootPage = HomePage;
        authObserver.unsubscribe();
      } else {
        this.rootPage = LoginPage;
        authObserver.unsubscribe();
      }
    });

    this.initializeApp();

    this.pages = [
      { title: "Profile", component: UserProfilePage },
      { title: "Home", component: HomePage },
      { title: "Interests", component: InitialConfigurationPage },
      { title: "Time and Distance", component: InitialConfigurationTwoPage }
    ];

    this.activePage = this.pages[1];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.activePage = page;
    this.nav.setRoot(page.component);
  }

  logout() {
    this.rootPage = LoginPage;
    this.nav.setRoot(LoginPage);
    this.firebase.logoutUser();
  }

  checkActive(page){
    return page = this.activePage;
  }

}
