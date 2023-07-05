import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPopComponentComponent } from './login-pop-component.component';

describe('LoginPopComponentComponent', () => {
  let component: LoginPopComponentComponent;
  let fixture: ComponentFixture<LoginPopComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPopComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPopComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
