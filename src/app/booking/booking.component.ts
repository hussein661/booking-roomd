import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { EmailService } from '../email.service';
import { HelperService } from '../helper.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  guestForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private db:AngularFirestore,private router:Router,private emailService:EmailService,private helperService:HelperService) {
    this.guestForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      passportNumber: ['', Validators.required],
      passportIssueDate: ['', Validators.required],
      passportExpirydate: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.guestForm.invalid) {
      this.guestForm.markAllAsTouched()
      return;
    }
    console.log(this.guestForm.value)
    const id = 'booking_'+ new Date().getTime()
    const data = {id,...this.guestForm.value,createdAt:new Date().getTime()}
    this.db.collection('bookings').doc(id).set(data).then(r=>{
      this.helperService.toastAlert('Your info was saved, we will send you details email. (check you spam folder)')
      this.emailService.sendCreateDetails(data)

      this.router.navigateByUrl('/room/'+id)
    }).catch(err=>{
      console.log(err)
    })
    // submit guest details to server
  }

  expiryDateValidator() {
    return (control:any) => {
      const currentDate = new Date();
      const expiryDate = new Date(control.value);

      return expiryDate < currentDate ? { expired: true } : null;
    };
  }
}