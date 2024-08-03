import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductsServiceService } from '../../services/products-service.service';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import { FormsModule } from '@angular/forms';
import { AuthServiceService } from '../../service/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-coconut-seller',
  standalone: true,
  imports: [NavbarComponent,CommonModule,FormsModule,RouterLink],
  templateUrl: './coconut-seller.component.html',
  styleUrl: './coconut-seller.component.css'
})
export class CoconutSellerComponent implements OnInit{
  @ViewChild('products-modal') myModal!:ElementRef;
  companies: any[] = []
  selectedOrder: any;
  company: any;
  sellerId: any;
  seller:any;
  sellingQty: number=0;
  lotQty: Number = 0;
  coconutLot:any;
  private emailKey = 'Wyun_B-TucLaPaAQK';

  constructor(private productService: ProductsServiceService, private http: HttpClient, private router: Router, private authService: AuthServiceService){}

  ngOnInit(): void {
    this.getCompanies();
    this.checkOrders();
    this.getSeller();
    this.getOrder();
    // this.productService.currentSeller.subscribe(seller => this.company = seller);
    this.authService.currentSeller.subscribe(seller => this.sellerId = seller);
    console.log(this.sellerId);
  }

  getSeller(){
    const id = sessionStorage.getItem('seller');
    if(id){
      this.productService.findSeller(id).subscribe(res=>{
        this.seller=res;
        console.log(this.seller);
      },
    error =>{
      console.log('Error fetching seller', error);

    }
  );
    }else{
      console.log('No id');

    }


  }

  getCompanies(){
    this.productService.getAllCompanies().subscribe(response=>{
      this.companies = response;
      console.log(this.companies);
      this.checkOrders();
    },
    error =>{
      console.error('Error fetching coconuts',error);
    }
  );
  }

  setValue(card:any){
    this.selectedOrder=card;
    console.log(this.selectedOrder);
  }

  sellCoconut(){
    // this.sendEmailToCustomer();
    this.updateQuantityOrder();
  }

  sendRejectedEmail(){
    const templateParams = {
      to_email: this.selectedOrder.company.email,
      to_name:this.selectedOrder.company.company_name,
      from_name:this.seller.name,
      message:`Your Buying order has been declined OrderID - ${this.selectedOrder._id}`
    };

    emailjs.send('service_uhcbsno','template_b3qq8dd', templateParams, this.emailKey)
    .then((response)=>{
      console.log('Order rejected Successfuly', response.status, response.text);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Order Rejected Successfuly"
      });
    },
    (error)=>{
      console.log('Failed Reject', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Somthing went wrong try again later"
      })
    });
  }

  sendEmailToCustomer(){
    console.log(this.selectedOrder.company.email);

    const templateParams ={
      to_email: this.selectedOrder.company.email,
      to_name:this.selectedOrder.company.company_name,
      from_name: this.seller.name,
      from_quantity: this.sellingQty
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

  updateQuantityCoconut():void{
    const sellingQty = Number(this.sellingQty);
    const coconutQty = Number(this.seller.quantity);
  }

  getOrder(){
    const id = sessionStorage.getItem('seller');
    if(id){
      this.productService.getCoconutLots(id).subscribe(res=>{
        this.coconutLot=res[0];
        console.log(this.coconutLot);

      },(error)=>{console.log('error fetching lot',error);
      });
    }
  }


  updateQuantityOrder(): void {
    // const sellingQty = Number(this.sellingQty);
    // const orderQty = Number(this.selectedOrder.buying_quantity);
    // const orderId = this.selectedOrder._id;
    // const sellqty = orderQty - sellingQty;
    // const updateData = { buying_quantity: sellqty };

    // if(!orderId){
    //   console.log('OrderId missing');
    //   return;
    // }
    // if(isNaN(sellqty)){
    //   console.log('Qty invalid');
    //   return;
    // }
    // if(sellingQty>orderQty){
    //   console.log('too much qty');
    //   Swal.fire({
    //     icon: "error",
    //     title: "Error",
    //     text: "Exceeds buyer's request amount"
    //   });
    //   return;
    // }
    // if()

  const sellingQty = Number(this.sellingQty);
  const orderQty = Number(this.selectedOrder.buying_quantity);
  const orderId = this.selectedOrder._id;
  const sellerId = sessionStorage.getItem('seller');
  const sellqty = orderQty - sellingQty;
  const updateData = { buying_quantity: sellqty };
  let seller:any;

  if (!orderId) {
    console.log('Order ID is missing');
    return;
  }
  if (!sellerId) {
    console.log('No seller found on session storage');
    return;
  }
  if (isNaN(sellqty)) {
    console.log('Invalid sell quantity');
    return;
  }
  console.log(this.coconutLot.quantity,sellingQty);


  if (sellingQty > orderQty) {
    console.log('Too much quantity');

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Exceeds buyer's request amount"
    });
    return;
  }
  if (sellingQty > this.coconutLot.quantity) {
    console.log('Not enough stock', this.coconutLot.quantity);

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Not enough in stock"
    });
    return;
  }

  console.log(orderId);
  console.log(updateData, orderQty, sellingQty);

  this.productService.updateCompany(orderId, updateData).subscribe(
    res => {
      console.log('Updated order', res.buying_quantity);
      this.getCompanies();
      this.sendEmailToCustomer();
    },
    error => {
      console.error('Error updating company', error);
    }
  );
  const lotData = (this.coconutLot.quantity-sellingQty);
  console.log(lotData);

  const lotDataUpdate = {quantity:lotData}
  this.productService.updateCoconutLot(this.coconutLot._id,lotDataUpdate).subscribe(res=>{
    console.log(res);

  })
  }

  delOrder(id:string){
    this.productService.deleteOrder(id).subscribe(res=>{
      if(res){
        console.log('rejected order', id);
        this.getCompanies();
      }else{
        console.log("error");
        this.getCompanies();
      }
    });
  }

  deleteOrder(){
    this.productService.deleteOrder(this.selectedOrder._id).subscribe(res=>{
      if(res){
        console.log('rejected order', this.selectedOrder._id);
        this.getCompanies();
        this.sendRejectedEmail();
      }else{
        console.log("error");
        this.getCompanies();
      }
    });
  }

  getImageUrl(filename: string):string{
    return `http://localhost:3000/assets/`
  }

  goToCreateLot(){
    this.router.navigate(['/seller-stockReg'])
  }

  checkOrders(){
    if(this.companies){
      this.companies.forEach((comp)=>{
        if(comp.buying_quantity<=0){
          console.log('deletion',comp);
          this.delOrder(comp._id);
        }
      })
    }
  }

}
