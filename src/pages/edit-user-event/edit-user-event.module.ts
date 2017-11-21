import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditUserEventPage } from './edit-user-event';

@NgModule({
  declarations: [
    EditUserEventPage,
  ],
  imports: [
    IonicPageModule.forChild(EditUserEventPage),
  ],
})
export class EditUserEventPageModule {}
