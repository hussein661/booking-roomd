import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailService } from '../email.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {
  constructor(private fb: FormBuilder,private db:AngularFirestore,private emailService:EmailService,private router:Router,private helperService:HelperService) {
    this.bookingForm = this.fb.group({
      numDays: [1, Validators.required],
      // other form fields here
    });
  }
  bookingForm: FormGroup;
  dayOptions = [1, 2, 3, 4, 5, 6, 7];
  rooms = ['Room 1', 'Room 2', 'Room 3'];
  roomSelected = '';
  numAdults = 1;
  numChildren = 0;
  adultOptions = [1, 2, 3];
  childOptions = [0, 1, 2];
  extraSelected = false;
  showExtraForm = false
 extra:any = {price:0}


 getPriceAfterDiscount(){
  const currentDate = new Date();
const isHighSeason = (currentDate >= new Date(currentDate.getFullYear(), 5, 1) && currentDate <= new Date(currentDate.getFullYear(), 9, 31)) || (currentDate >= new Date(currentDate.getFullYear(), 11, 21) && currentDate <= new Date(currentDate.getFullYear() + 1, 0, 10));
const discountPercentage = isHighSeason ? 0.1 : 0; // 0.1 is 10%

// Apply the discount to the price
const price = this.bookingForm.value.numDays * 80 + this.extra.price; // Example price
const finalPrice = price * (1 - discountPercentage);
return finalPrice

 }

 getDiscount(){
  const currentDate = new Date();
const isHighSeason = (currentDate >= new Date(currentDate.getFullYear(), 5, 1) && currentDate <= new Date(currentDate.getFullYear(), 9, 31)) || (currentDate >= new Date(currentDate.getFullYear(), 11, 21) && currentDate <= new Date(currentDate.getFullYear() + 1, 0, 10));
const discountPercentage = isHighSeason ? 0.1 : 0; // 0.1 is 10%

// Apply the discount to the price
const price = this.bookingForm.value.numDays * 80 + this.extra.price; // Example price
const discount = price * (1 - (1 - discountPercentage));
return discount

 }


 onAddExtra() {
  this.showExtraForm = true;
}
  onRoomSelected(event: any) {
    this.roomSelected = event.target.value;
  }

  addAdult() {
    if (this.numAdults < 3 && this.numAdults + this.numChildren < 3) {
      this.numAdults++;
    }
  }

  removeAdult() {
    if (this.numAdults > 1) {
      this.numAdults--;
    }
  }

  addChild() {
    if (this.numChildren < 2 && this.numAdults + this.numChildren < 3) {
      this.numChildren++;
    }
  }

  removeChild() {
    if (this.numChildren > 0) {
      this.numChildren--;
    }
  }
  onSubmit() {
    // send booking data to backend
    const {
      dayOptions,
      rooms ,
      roomSelected,
      numAdults,
      numChildren ,
      adultOptions ,
      childOptions ,
      extraSelected,
      showExtraForm,
     extra,
    } = this
    const data = {
     ...this.bookingForm.value,
     dayOptions,
     rooms ,
     roomSelected,
     numAdults,
     numChildren ,
     adultOptions ,
     childOptions ,
     extraSelected,
     showExtraForm,
    extra,
    discount:this.getDiscount(),
    final:this.getPriceAfterDiscount()
    }
    this.db.collection('bookings').doc(window.location.href.split('/room/')[1]).update(data).then(res=>{
      this.db.collection('bookings').doc(window.location.href.split('/room/')[1]).get().toPromise().then(res=>{
        const data = res?.data()
        this.emailService.sendInvoiceEmail(data)
        this.helperService.toastAlert('Booked succesfully, check you inbox for the invoice details please. (check you spam folder)')
        this.router.navigateByUrl('/')
      })
  })}

}
