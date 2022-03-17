import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone} from '@angular/core';

@Component({
  selector: 'app-component-with-mark-for-check',
  templateUrl: './component-with-mark-for-check.component.html',
  styleUrls: ['./component-with-mark-for-check.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentWithMarkForCheckComponent {
  public random: number = 0;

  constructor(
    private readonly ngZone: NgZone,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.ngZone.runOutsideAngular(() =>
      setInterval(() => {
        this.random = Math.random();
        this.changeDetectorRef.markForCheck();
      }, 50)
    );
  }
}
