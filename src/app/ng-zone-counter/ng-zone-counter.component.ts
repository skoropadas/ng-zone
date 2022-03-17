import {ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone} from '@angular/core';

@Component({
  selector: 'app-ng-zone-counter',
  templateUrl: './ng-zone-counter.component.html',
  styleUrls: ['./ng-zone-counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgZoneCounterComponent {
  public ngZoneCount: number = 0;

  constructor(
    private readonly ngZone: NgZone,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.ngZone.onStable.subscribe(() => {
      this.ngZoneCount += 1;
      this.changeDetectorRef.detectChanges();
    });
  }
}
