import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {
    path:'',
    component:BookingComponent
  },
  {
    path:'room/:id',
    component:RoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
