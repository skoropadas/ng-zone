import {NgZone} from '@angular/core';
import {MonoTypeOperatorFunction, Observable, Observer, Operator, pipe, Subscriber, TeardownLogic} from 'rxjs';

class ZoneDetachSourceOperator<T> implements Operator<T, T> {
  constructor(private readonly ngZone: NgZone) {
  }

  public call(observer: Observer<T>, source: Observable<T>): TeardownLogic {
    return this.ngZone.runOutsideAngular(() => source.subscribe(observer));
  }
}

function zoneDetachSource<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) => source.lift(new ZoneDetachSourceOperator<T>(ngZone));
}

function zoneDetachOperators<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    new Observable((subscriber: Subscriber<T>) =>
      source.subscribe({
        next: (value: T) => ngZone.runOutsideAngular(() => subscriber.next(value)),
        error: (error: unknown) => ngZone.runOutsideAngular(() => subscriber.error(error)),
        complete: () => ngZone.runOutsideAngular(() => subscriber.complete()),
      }),
    );
}

export function zoneAttach<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    new Observable((subscriber: Subscriber<T>) =>
      source.subscribe({
        next: (value: T) => ngZone.run(() => subscriber.next(value)),
        error: (error: unknown) => ngZone.run(() => subscriber.error(error)),
        complete: () => ngZone.run(() => subscriber.complete()),
      }),
    );
}

export function zoneDetach<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return pipe(zoneDetachOperators(ngZone), zoneDetachSource(ngZone));
}

export function zoneOptimize<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return pipe(zoneDetachOperators(ngZone), zoneDetachSource(ngZone), zoneAttach(ngZone));
}
