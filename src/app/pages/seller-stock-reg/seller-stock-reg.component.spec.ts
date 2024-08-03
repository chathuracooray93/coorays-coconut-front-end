import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerStockRegComponent } from './seller-stock-reg.component';

describe('SellerStockRegComponent', () => {
  let component: SellerStockRegComponent;
  let fixture: ComponentFixture<SellerStockRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerStockRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerStockRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
