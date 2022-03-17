import {ChangeDetectionStrategy, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(
    public readonly elementRef: ElementRef<HTMLElement>,
  ) {
  }
}
