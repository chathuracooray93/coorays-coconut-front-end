import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {

  constructor(private location:Location){}

  goBack(){
    this.location.back();
  }
}
