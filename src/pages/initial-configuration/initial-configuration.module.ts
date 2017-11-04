import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InitialConfigurationPage } from './initial-configuration';

@NgModule({
  declarations: [
    InitialConfigurationPage,
  ],
  imports: [
    IonicPageModule.forChild(InitialConfigurationPage),
  ],
})
export class InitialConfigurationPageModule {}
