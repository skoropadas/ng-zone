import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone} from '@angular/core';
import {fromEvent, throttleTime} from 'rxjs';

@Component({
  selector: 'app-ng-zone-mouse-move',
  templateUrl: './ng-zone-mouse-move.component.html',
  styleUrls: ['./ng-zone-mouse-move.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgZoneMouseMoveComponent {
  public lovePoints: number = 0;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly ngZone: NgZone,
  ) {
    this.ngZone.runOutsideAngular(() => fromEvent(this.elementRef.nativeElement, 'mousemove')
      .pipe(throttleTime(500))
      .subscribe(() => {
        this.ngZone.run(() => {
          this.lovePoints += 1;
          this.changeDetectorRef.markForCheck();
        })
      }));
  }
}
