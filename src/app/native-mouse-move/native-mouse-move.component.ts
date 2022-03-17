import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef} from '@angular/core';
import {fromEvent, throttleTime} from 'rxjs';

@Component({
  selector: 'app-native-mouse-move',
  templateUrl: './native-mouse-move.component.html',
  styleUrls: ['./native-mouse-move.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NativeMouseMoveComponent {
  public lovePoints: number = 0;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    fromEvent(this.elementRef.nativeElement, 'mousemove')
      .pipe(throttleTime(500))
      .subscribe(() => {
        this.lovePoints += 1;
        this.changeDetectorRef.markForCheck();
      });
  }
}
