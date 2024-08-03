import { Component, ElementRef, ViewChild } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { ProductsServiceService } from '../../services/products-service.service';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import { response } from 'express';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, RouterLink, NavbarComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private emailKey = 'Wyun_B-TucLaPaAQK';
  username: any = '';
  password: any = '';
  type:any='';

  email: any ='';
  newPw: any ='';
  otp: any ='';

  constructor(private product_service: ProductsServiceService, private router: Router, private authService: AuthServiceService){}

  // login():void{
  //   console.log(this.username,this.password);

  //   this.product_service.login(this.username,this.password).subscribe(response => {
  //     localStorage.setItem('userType', response.userType);
  //     this.authService.login(response.userType,response.userId);

  //     if(response.message === 'wp'){
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Login Failed',
  //         text: 'Invalid password'
  //       });
  //       localStorage.setItem('userType', response.userType);
  //       localStorage.setItem('wp',response.pw);
  //       console.log(response.message,response.userType);

  //     }

  //     Swal.fire({
  //       icon: 'success',
  //       title: 'Login Successful!',
  //       text: `Welcome Logged in as ${response.userType}, ${this.username}!`,
  //       //timer: 2000, // Automatically close after 2 seconds
  //       showConfirmButton: true
  //     }).then(() => {
  //       const dashboardRoute = this.getDashboardRoute(response.userType);
  //       this.router.navigate([dashboardRoute]);
  //     });
  //   }, error => {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Login Failed',
  //       text: 'Invalid username or password'
  //     });
  //   });
  // }
  login(): void {
    console.log(this.username, this.password);

    this.product_service.login(this.username, this.password).subscribe(response => {
      if (response.message === 'wp') {
        // Password incorrect case
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid password'
        });
        localStorage.setItem('userType', response.userType); // Assuming userType should still be saved
        localStorage.setItem('wp', response.message); // Setting some indication of wrong password
        console.log(response.userType, response.message);
      } else if (response.message === 'Login Successful') {
        // Successful login case
        localStorage.setItem('userType', response.userType);
        this.authService.login(response.userType, response.userId);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: `Welcome! Logged in as ${response.userType}, ${this.username}!`,
          //timer: 2000, // Automatically close after 2 seconds
          showConfirmButton: true
        }).then(() => {
          const dashboardRoute = this.getDashboardRoute(response.userType);
          this.router.navigate([dashboardRoute]);
        });
      } else {
        // Handle other unexpected cases if needed
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Unexpected error occurred'
        });
      }
    }, error => {
      sessionStorage.setItem('restUser',this.username);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid username or password'
      });
    });
  }


  getDashboardRoute(userType:string){
    switch(userType){
      case 'seller': return '/coconut-dashboard';
      case 'company': return '/company-dashboard';
      default: return '/login';
    }
  }

  getOtp(){
    const otp = this.genarateToken();
    sessionStorage.setItem('otp',otp);
    const templateParams = {
      to_email: this.email,
      message:`Your OTP for resseting Password ${otp}`
    };
    emailjs.send('service_uhcbsno','template_b3qq8dd', templateParams, this.emailKey)
    .then((response)=>{
      console.log('An OTP has sent to your email', response.status, response.text);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "OTP has been sent to your email"
      });
    },
    (error)=>{
      console.log('Failed send OTP', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Somthing went wrong try again later"
      })
    });
  }

  genarateToken():string{
    return Math.random().toString(36).substr(2, 32);
  }

  resetPassword() {
    const otp = sessionStorage.getItem('otp');
    const username = sessionStorage.getItem('restUser');

    if (otp && username) {
      console.log(otp,username);

        if (otp === this.otp) {
            this.product_service.findUser(username).subscribe(
                response => {
                    const data = response;
                    if (data.userType === 'company') {
                        this.product_service.updateCompanyPassword({ id: data.user._id, newPassword: this.password }).subscribe(
                            res => {
                                console.log('Password updated successfully:', res);
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Password Reset Successful',
                                    text: 'Your password has been reset successfully.'
                                });
                                // Optionally, close the modal or navigate the user
                            },
                            error => {
                                console.error('Error updating password:', error);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'There was an error updating the password.'
                                });
                            }
                        );
                    } else if (data.userType === 'seller') {
                        this.product_service.updateSellerPassword({ id: data.user._id, newPassword: this.newPw }).subscribe(
                            res => {
                                console.log('Password updated successfully:', res);
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Password Reset Successful',
                                    text: 'Your password has been reset successfully.'
                                });
                                // Optionally, close the modal or navigate the user
                            },
                            error => {
                                console.error('Error updating password:', error);
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'There was an error updating the password.'
                                });
                            }
                        );
                    }
                },
                error => {
                    console.error('Error fetching user:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'There was an error fetching the user details.'
                    });
                }
            );
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Invalid OTP',
                text: 'The OTP you entered is incorrect.'
            });
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'OTP or username not found in session storage.'
        });
    }
}


  // resetPassword(){
  //   const otp = sessionStorage.getItem('otp');
  //   const username = sessionStorage.getItem('restUser');
  //   let data:any='';
  //   if(otp&&username){
  //     if(otp==this.otp){
  //       this.product_service.findUser(username).subscribe(response=>{
  //         data=response;
  //       },(error)=>{console.log('error fetching user',response);
  //       })
  //       if(data.userType=='company'){
  //         this.product_service.updateSellerPassword({id:data.user._id,password:this.password}).subscribe(res=>{
  //           console.log('password updated',res);

  //         },(error)=>{console.log('error');
  //         })
  //       }
  //     }
  //   }
  // }
}
