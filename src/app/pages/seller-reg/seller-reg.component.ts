import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ContactUsComponent } from '../../components/contact-us/contact-us.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';

@Component({
  selector: 'app-seller-reg',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, ContactUsComponent, FormsModule],
  templateUrl: './seller-reg.component.html',
  styleUrls: ['./seller-reg.component.css']
})
export class SellerRegComponent {

  seller = {
    username: '',
    password: '',
    email: '',
    phone_number: ''
  };

  constructor(private http: HttpClient, private location:Location) {}

  onSubmit() {
    const formData = new FormData();
    formData.append('username', this.seller.username);
    formData.append('password', this.seller.password);
    formData.append('email', this.seller.email);
    formData.append('phone_number', this.seller.phone_number);

    this.http.post('http://localhost:3000/seller', this.seller).subscribe(
      (response) => {
        console.log('Upload successful', response);
        Swal.fire({
          title: 'Success!',
          text: 'Successfully registered as a Seller.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      },
      (error) => {
        console.error('Upload failed', error);
      }
    );
  }

  goBack(){
    this.location.back();
  }
}
