import {AfterViewChecked, Directive, Renderer2} from '@angular/core';
import {AppComponent} from './app.component';

@Directive({
  selector: '[appAfterViewChecked]'
})
export class AfterViewCheckedDirective implements AfterViewChecked {

  constructor(
    private readonly app: AppComponent,
    private readonly renderer: Renderer2,
  ) {
  }

  public ngAfterViewChecked(): void {
    this.renderer.removeClass(this.app.elementRef.nativeElement, 'blink');
    this.app.elementRef.nativeElement.offsetWidth;
    this.renderer.addClass(this.app.elementRef.nativeElement, 'blink');
  }
}
