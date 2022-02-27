import { Injectable, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { IUser } from '../../shared/interfaces/user.interface';

import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<IUser | any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        }
        else {
          return of(null);
        }
      })
    )
  }

  async forgotPassword(passwordResetEmail: string) {
    const resetPass = this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    resetPass
      .then(
        (userData) => {
          console.log("Password reset link sent!")
        }
      )
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }

  async signUp(email: string, password: string) {
    const userData = this.afAuth.createUserWithEmailAndPassword(email, password);
    return userData
      .then(
        (credential) => {
          this.updateUserData(credential.user)
          this.emailVerification(credential)
        }
      )
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }

  private emailVerification(credential: firebase.auth.UserCredential) {
    credential.user?.sendEmailVerification()
      .then(
        (user) => {
          this.router.navigate(["/login/verify-email"])
        }
      )
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }

  async signIn(email: string, password: string) {
    const userData = this.afAuth.signInWithEmailAndPassword(email, password);
    return userData
      .then(
        (credential) => {
          this.ngZone.run(
            () => {
              this.router.navigate(["/user"])
              this.updateUserData(credential.user);
            }
          )
        }
      )
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    // const userData = await this.afAuth.signInWithPopup(provider);
    const credential = this.afAuth.signInWithPopup(provider);
    credential
      .then(
        (userData) => {
          return this.updateUserData(userData.user)
        }
      )
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }

  private updateUserData(user: any) { //{ uid, email, displayName, photoURL }) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }

    return userRef.set(data, { merge: true })
  }

  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }

}
// https://fireship.io/lessons/multi-step-signup-firebase-email-password-auth-angular-reactive-forms/
