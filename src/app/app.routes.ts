import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CoconutSellerComponent } from './pages/coconut-seller/coconut-seller.component';
import { DetailsComponent } from './pages/details/details.component';
import { SellerStockRegComponent } from './pages/seller-stock-reg/seller-stock-reg.component';
import { SellerRegComponent } from './pages/seller-reg/seller-reg.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { LotsPageComponent } from './pages/lots-page/lots-page.component';

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "products",
    component: ProductsPageComponent
  },
  {
    path: "checkout",
    component: CheckoutPageComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "company-dashboard",
    component: ProductsPageComponent
  },
  {
    path: "coconut-dashboard",
    component: CoconutSellerComponent
  },
  {
    path: "no-more",
    component: DetailsComponent
  },
  {
    path: "seller-stockReg",
    component: SellerStockRegComponent
  },
  {
    path: "seller-Reg",
    component: SellerRegComponent
  },
  {
    path: "payment",
    component: PaymentsComponent
  },
  {
    path: "orders",
    component: OrdersComponent
  },
  {
    path:"lots",
    component: LotsPageComponent
  }
];
