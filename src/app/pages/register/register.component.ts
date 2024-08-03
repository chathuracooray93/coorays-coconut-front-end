import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ContactUsComponent } from "../../components/contact-us/contact-us.component";
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, ContactUsComponent, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  selectedFile: File | null = null;
  company = {
    username: '',
    password: '',
    company_name: '',
    br: '',
    email: '',
    address: '',
    phone_number: ''
  };

  constructor(private http: HttpClient){}

  onFileChange(event:any){
    this.selectedFile = event.target.files[0];
  }

  onSubmit(){
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('username', this.company.username);
      formData.append('password', this.company.password);
      formData.append('company_name', this.company.company_name);
      formData.append('br', this.company.br);
      formData.append('email', this.company.email);
      formData.append('address', this.company.address);
      formData.append('phone_number', this.company.phone_number);

      this.http.post('http://localhost:3000/company', formData).subscribe(
        (response) => {
          console.log('Upload successful', response);
          Swal.fire({
            title: 'Success!',
            text: 'Successfully registered as a Company.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        (error) => {
          console.error('Upload failed', error);
        }
      );
    } else {
      console.error('No file selected');
    }
  }
}
