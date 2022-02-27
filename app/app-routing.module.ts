import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { ChatComponent } from './chat-components/chat/chat.component';

const routes: Routes = [
  // Home/Landing Page
  {
    path: "",
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
    // ,
    // canActivate: [AuthGuard]
  },
  // Login
  {
    path: "login",
    loadChildren: () => import("./login/login.module").then(m => m.LoginModule)
    // ,
    // canActivate: [AuthGuard]
  },
  {
    path: "user",
    component: ChatComponent,
    canActivate: [AuthGuard]
  },

  // Add AuthGuard to pages like User Profile, Order Details, Cancellation, Chat


  // Redirection
  {
    path: "home",
    redirectTo: "/", pathMatch: "full"
  },

  {
    path: "chat",
    component: ChatComponent,
    canActivate: [AuthGuard]
  },

  {
    path: "**",
    redirectTo: "/"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
