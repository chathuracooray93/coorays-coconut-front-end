import { Component } from '@angular/core';
import emailJs,{EmailJSResponseStatus} from 'emailjs-com'
import { from } from 'rxjs';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  tmpMsg=''

  private emailKey = 'Wyun_B-TucLaPaAQK';
  message = {
    name:'',
    email:'',
    number:'',
    message: '',
  };

  constructor(){}

  sendEmail(){
    const templateParam = {
      to_email: 'coorayscoconut@gmail.com',
      message: `Details of Customer Name: ${this.message.name} Email: ${this.message.email} Message: ${this.message.message}`
    };

    emailJs.send('service_uhcbsno','template_b3qq8dd',templateParam,this.emailKey)
    .then((response : EmailJSResponseStatus)=>{
      console.log('Email sent successfully', response.status, response.text);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your Response has been sent to our team and they will contact you soon"
      })
    },(error)=>{
      console.log('Failed to send Email', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Somthing went wrong try again later"
      })
    });
  }
}
