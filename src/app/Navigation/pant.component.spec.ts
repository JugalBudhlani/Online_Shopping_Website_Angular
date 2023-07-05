import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantComponent } from './pant.component';

describe('PantComponent', () => {
  let component: PantComponent;
  let fixture: ComponentFixture<PantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
