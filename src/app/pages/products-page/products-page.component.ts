import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductsServiceService } from '../../services/products-service.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../app.routes';
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthServiceService } from '../../service/auth-service.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [NavbarComponent, HttpClientModule, CommonModule, FooterComponent, FormsModule,RouterLink],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css'
})
export class ProductsPageComponent implements OnInit {

  products: any[] = [];
  company: any;
  companyId:any='';
  coconutLots: any;
  selectedLot: any;

  newOrder = {
    buying_price: '',
    buying_quantity: '',
    company:''
  };

  constructor(private productService: ProductsServiceService, private router: Router, private authService: AuthServiceService){}
  ngOnInit(): void {
    this.getLots();
  }

  // getCompany(){
  //   this.productService.get
  // }

  getLots() {
    this.productService.getAllCoconuts().subscribe(
      (response) => {
        this.coconutLots = response;
        console.log(this.coconutLots);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setValue(card: any) {
    this.selectedLot = card;
    console.log(this.selectedLot);
  }

  createOrder(){
    const companyId = sessionStorage.getItem('company');
    if(!companyId){
      console.log('error getting companyID');
    }else{
      this.newOrder.company=companyId;
    }
    console.log(this.newOrder);
    this.productService.createOrder(this.newOrder).subscribe(res=>{
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Order has been created successfuly',
        showConfirmButton: false,
        timer: 1500
      });
    },(error)=>{
      console.log('error creating Order',error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error creating new Order',
        showConfirmButton: false,
        timer: 1500
      });
    })
  }

  //     getFeatures(id:any){
  //       this.productService.getFeatures(id).subscribe(
  //         (response)=>{
  //           this.features=response;
  //           console.log(response);
  //         }
  //       )
  //     }

  //     purchaseProduct(){
  //       this.productService.changeProduct(this.selectedCard);
  //       this.router.navigate(['/checkout']);
  //     }

}
