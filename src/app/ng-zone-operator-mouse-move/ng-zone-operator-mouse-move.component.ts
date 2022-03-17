import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone} from '@angular/core';
import {fromEvent, throttleTime} from 'rxjs';
import {zoneOptimize} from '../../observables/zone';

@Component({
  selector: 'app-ng-zone-operator-mouse-move',
  templateUrl: './ng-zone-operator-mouse-move.component.html',
  styleUrls: ['./ng-zone-operator-mouse-move.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgZoneOperatorMouseMoveComponent {
  public lovePoints: number = 0;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly ngZone: NgZone,
  ) {
    fromEvent(this.elementRef.nativeElement, 'mousemove')
      .pipe(throttleTime(500), zoneOptimize(this.ngZone))
      .subscribe(() => {
        this.lovePoints += 1;
        this.changeDetectorRef.markForCheck();
      });
  }
}
