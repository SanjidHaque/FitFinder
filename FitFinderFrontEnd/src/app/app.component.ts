import {Component, ElementRef, NgZone, Renderer2, ViewChild, ViewEncapsulation} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public router: Router) {}

 // @ViewChild('spinnerElement') spinnerElement: ElementRef;

 /* constructor(public router: Router,
              private ngZone: NgZone,
              private renderer2: Renderer2) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    });
  }
*/
 /* private navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.ngZone.runOutsideAngular(() => {
        this.renderer2.setStyle(
          this.spinnerElement.nativeElement,
          'opacity',
          '1'
        )
      })
    }
    if (event instanceof NavigationEnd) {
      this.hideSpinner();
    }
    if (event instanceof NavigationCancel) {
      this.hideSpinner();
    }
    if (event instanceof NavigationError) {
      this.hideSpinner();
    }
  }

  private hideSpinner() {
    this.ngZone.runOutsideAngular(() => {

      this.renderer2.setStyle(
        this.spinnerElement.nativeElement,
        'opacity',
        '0'
      )
    })
  }*/
}



