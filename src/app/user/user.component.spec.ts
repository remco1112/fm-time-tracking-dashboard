import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TimeMode } from '../time-mode';

import { UserComponent } from './user.component';
import { first } from 'rxjs/operators';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have profile image', () => {
    const testImage = 'http://test-image.png/';
    component.profileUrl = testImage;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('img')).nativeElement.src).toBe(testImage);
  });

  it('should have profile name', () => {
    const testName = 'Test Name';
    component.profileName = testName;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('p')).nativeElement.textContent).toContain(testName);
  });

  it('should emit event on time mode switch', () => {
    spyOn(component.timeModeSwitchEvent, 'emit').and.callThrough();
    const lis = fixture.debugElement.queryAll(By.css('li'));
    lis.forEach((li) => {
      component.timeModeSwitchEvent.pipe(first()).subscribe((timeMode) => {
        expect(timeMode).toBe(li.nativeElement.textContent.trim());
      })
      li.nativeElement.click();
      fixture.detectChanges();
      expect(li.nativeElement).toHaveClass('active')
    });
    expect(lis.length).toBe(Object.keys(TimeMode).length);
    expect(component.timeModeSwitchEvent.emit).toHaveBeenCalledTimes(lis.length);
  });
});
