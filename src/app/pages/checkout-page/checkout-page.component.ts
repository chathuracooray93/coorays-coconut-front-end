import { Component } from '@angular/core';
import { ProductsServiceService } from '../../services/products-service.service';
import { FormsModule } from '@angular/forms';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent {
  private emailKey = 'Wyun_B-TucLaPaAQK';
  company:any;

  userDetails ={
    firstName:'',
    lastName:'',
    phoneNumber:'',
    email:''
  };

  constructor(private productService: ProductsServiceService){}

  ngOnInit(){
    this.productService.currentSeller.subscribe(seller => this.company = seller);
    console.log(this.company);
    
  }

  sendEmailToCustomer(){
    const templateParams ={
      to_email: this.company.email,
      to_name:this.company.name,
      from_name: this.userDetails.firstName
    };

    emailjs.send('service_uhcbsno','template_hgjq5r8', templateParams, this.emailKey)
    .then((response)=>{
      console.log('Order placed successfully', response.status, response.text);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your order has been sent to our team and they will contact you soon"
      })
    },(error)=>{
      console.log('Failed place order Email', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Somthing went wrong try again later"
      })
    });
  }

  sendEmailToSeller(){
    const templateParam = {
      from_name: this.userDetails.firstName,
      from_email: this.userDetails.email,
      from_number: this.userDetails.phoneNumber,
      message: this.company.product_name
    };
    emailjs.send('service_dl0npjj','template_enh9xkq', templateParam, this.emailKey)
    .then((response)=>{
      console.log('Order Placed successfully', response.status, response.text);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Your order has been sent to our team and they will contact you soon"
      })
    },(error)=>{
      console.log('Failed to place Order', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Somthing went wrong try again later"
      })
    });
    this.sendEmailToCustomer();
  }

}
