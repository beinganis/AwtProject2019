import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesispostsComponent } from './thesisposts.component';

describe('ThesispostsComponent', () => {
  let component: ThesispostsComponent;
  let fixture: ComponentFixture<ThesispostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThesispostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThesispostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
