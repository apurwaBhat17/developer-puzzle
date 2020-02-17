import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { APP_CONST } from './constants/app.const';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppComponent', () => {
  let appComponent: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule
      ],
      declarations: [AppComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    appComponent = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(appComponent).toBeTruthy();
  });

  it(`should have as title 'stocks'`, () => {
    expect(appComponent.title).toEqual(APP_CONST.TITLE);
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    appComponent.welComeMsg = APP_CONST.WELCOME_MSG;
    expect(compiled.querySelector('h1').textContent).toContain(APP_CONST.WELCOME_MSG);
  });
});
