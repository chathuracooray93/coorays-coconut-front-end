import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {
  private baseUrl = 'http://localhost:3000';

  private sellerSource = new BehaviorSubject<any>(null);
  currentSeller = this.sellerSource.asObservable();

  private companySource = new BehaviorSubject<any>(null);
  currentCompany = this.sellerSource.asObservable();

  changeSeller(sellerId: String){
    this.sellerSource.next(sellerId);
  }

  constructor(private http: HttpClient){}

  login(username: string, password: string): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/login`, { username, password });
  }

  createCoconutLot(coconutLotData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/coconut`, coconutLotData);
  }

  getCoconutLots(sellerId:any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/coconut/seller/${sellerId}`);
  }

  getAllCoconuts(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/coconut`);
  }

  findSeller(sellerId:string): Observable<any> {
    console.log(sellerId);

    return this.http.get<any>(`${this.baseUrl}/seller/${sellerId}`);
  }

  updateCoconutLot(id: string, updates: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/coconut/${id}`, updates);
  }

  findUser(username:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/login/find-user/${username}`);
  }

  createCompany(companyData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/company`, companyData);
  }

  createOrder(orderData:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/order`,orderData);
  }

  getAllCompanies(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/order`);
  }

  updateCompany(id: string, updates: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/order/${id}`, updates);
  }

  updateSellerPassword(updates:any){
    return this.http.post<any>(`${this.baseUrl}/seller/update-password/`,updates);
  }

  updateCompanyPassword(updates:any){
    return this.http.post<any>(`${this.baseUrl}/company/update-password/`,updates);
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/order/${id}`);
  }

  deleteLot(id:string):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/coconut/${id}`);
  }

  findCompany(id:string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/company/${id}`);
  }

  getOrders():Observable<any>{
    return this.http.get(`${this.baseUrl}/order`);
  }

  // createCoconutLot(data: FormData): Observable<any>{
  //   return this.http.post<any>(`${this.baseUrl}/coconut`, data);
  // }

}
