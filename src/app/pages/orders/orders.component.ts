import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { ProductsServiceService } from '../../services/products-service.service';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NavbarComponent,RouterLink,FormsModule,CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders:any;

  constructor(private productService:ProductsServiceService, private router:Router, private location:Location){}

  ngOnInit(){
    this.getOrders();
  }

  getOrders(){
    this.productService.getOrders().subscribe(res=>{
      this.orders=res;
      console.log(this.orders);
    },error=>{console.log("error fetching order",error);
    })
  }

  goBack(){
    this.location.back();
  }
}
