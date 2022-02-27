import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { UserprofileRoutingModule } from './user-profile-routing.module';

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    UserprofileRoutingModule
  ]
})
export class UserProfileModule { }
