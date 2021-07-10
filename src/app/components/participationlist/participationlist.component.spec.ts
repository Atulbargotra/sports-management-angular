import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipationlistComponent } from './participationlist.component';

describe('ParticipationlistComponent', () => {
  let component: ParticipationlistComponent;
  let fixture: ComponentFixture<ParticipationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipationlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
