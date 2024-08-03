import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { ProductsServiceService } from '../../services/products-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-lots-page',
  standalone: true,
  imports: [NavbarComponent, RouterLink,CommonModule,FormsModule],
  templateUrl: './lots-page.component.html',
  styleUrl: './lots-page.component.css'
})
export class LotsPageComponent {
  sellerID : any = sessionStorage.getItem('seller');
  lots:any;
  constructor(private location:Location, private productService:ProductsServiceService){}


  ngOnInit(){
    this.getLots();
  }

  getLots(){
    if(this.sellerID){
      this.productService.getCoconutLots(this.sellerID).subscribe(res=>{
        this.lots=res
        console.log(res);
      },error=>{console.log('error fetching lots', error);
      });
    }
  }

  deleteLot(id:any){
    this.productService.deleteLot(id).subscribe(res=>{
      Swal.fire({
        title:"Confirmation",
        text:"Deleted Successfully",
        icon:"success"
      })
      this.getLots();
    })
  }

  goBack(){
    this.location.back();
  }
}
