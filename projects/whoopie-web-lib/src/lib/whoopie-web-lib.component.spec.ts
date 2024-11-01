import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoopieWebLibComponent } from './whoopie-web-lib.component';

describe('WhoopieWebLibComponent', () => {
  let component: WhoopieWebLibComponent;
  let fixture: ComponentFixture<WhoopieWebLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhoopieWebLibComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhoopieWebLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
