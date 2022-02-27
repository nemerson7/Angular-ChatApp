import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { IUser } from '../shared/interfaces/user.interface';
import { LandingPageService } from './services/landing-page.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  isUserLoggedIn: boolean
  user: IUser | any

  constructor(
    private service: LandingPageService,
    private auth: AuthService,
    private router: Router
  ) {
    this.isUserLoggedIn = false
  }

  ngOnInit(): void {
    this.auth.user$.forEach(
      (value) => {
        if (value) {
          this.isUserLoggedIn = true
        }
      }
    )
  }

  userProfile() {
    this.router.navigate(["/user"])
  }

  signinClick() {
    this.router.navigate(["/login"])
  }

  signoutClick() {
    this.auth.signOut()
  }

}
