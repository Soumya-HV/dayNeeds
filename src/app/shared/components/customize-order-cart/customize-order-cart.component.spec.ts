import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomizeOrderCartComponent } from './customize-order-cart.component';

describe('CustomizeOrderCartComponent', () => {
  let component: CustomizeOrderCartComponent;
  let fixture: ComponentFixture<CustomizeOrderCartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizeOrderCartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomizeOrderCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
