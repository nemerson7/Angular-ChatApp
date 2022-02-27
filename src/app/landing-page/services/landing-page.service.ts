import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor() { }
  
  public sampleService(): string {
    return "Home Page"
  }
}
