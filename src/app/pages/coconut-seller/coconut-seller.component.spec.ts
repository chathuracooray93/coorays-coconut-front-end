import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoconutSellerComponent } from './coconut-seller.component';

describe('CoconutSellerComponent', () => {
  let component: CoconutSellerComponent;
  let fixture: ComponentFixture<CoconutSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoconutSellerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoconutSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
