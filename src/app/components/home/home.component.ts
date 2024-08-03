import { Component, ElementRef} from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { IntroPageComponent } from '../intro-page/intro-page.component';
import { ViewChild } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { ReviewCardsComponent } from '../review-cards/review-cards.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsServiceService } from '../../services/products-service.service';
import { CardsComponent } from '../cards/cards.component';
import { ServicesComponent } from '../services/services.component';
import { CarouselComponent } from '../carousel/carousel.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,IntroPageComponent,FooterComponent,ReviewCardsComponent,ContactUsComponent,HttpClientModule,CardsComponent,ServicesComponent,CarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @ViewChild('target-element') targetElement!: ElementRef;
  scrollToTarget(): void{
    this.targetElement.nativeElement.srollIntoView({behavior: 'smooth'})
  }
}
