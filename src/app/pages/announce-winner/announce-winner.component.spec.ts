import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnounceWinnerComponent } from './announce-winner.component';

describe('AnnounceWinnerComponent', () => {
  let component: AnnounceWinnerComponent;
  let fixture: ComponentFixture<AnnounceWinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnounceWinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnounceWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
