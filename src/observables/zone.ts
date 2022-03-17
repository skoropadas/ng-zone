import {NgZone} from '@angular/core';
import {MonoTypeOperatorFunction, Observable, Observer, Operator, pipe, Subscriber, TeardownLogic} from 'rxjs';

class LuZoneDetachSourceOperator<T> implements Operator<T, T> {
	constructor(private readonly ngZone: NgZone) {}

	public call(observer: Observer<T>, source: Observable<T>): TeardownLogic {
		return this.ngZone.runOutsideAngular(() => source.subscribe(observer));
	}
}

/**
 * Отключает от ngZone источник
 *
 * @param ngZone
 */
function zoneDetachSource<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
	return (source: Observable<T>) => source.lift(new LuZoneDetachSourceOperator<T>(ngZone));
}

/**
 * Отключает от ngZone операторы
 *
 * @param ngZone
 */
function zoneDetach<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
	return (source: Observable<T>) =>
		new Observable((subscriber: Subscriber<T>) =>
			source.subscribe({
				next: (value: T) => ngZone.runOutsideAngular(() => subscriber.next(value)),
				error: (error: unknown) => ngZone.runOutsideAngular(() => subscriber.error(error)),
				complete: () => ngZone.runOutsideAngular(() => subscriber.complete()),
			}),
		);
}

/**
 * Подключает поток к ngZone
 *
 * @param ngZone
 */
export function luZoneAttach<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
	return (source: Observable<T>) =>
		new Observable((subscriber: Subscriber<T>) =>
			source.subscribe({
				next: (value: T) => ngZone.run(() => subscriber.next(value)),
				error: (error: unknown) => ngZone.run(() => subscriber.error(error)),
				complete: () => ngZone.run(() => subscriber.complete()),
			}),
		);
}

/**
 * Выводит поток из ngZone
 *
 * @param ngZone
 */
export function luZoneDetach<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
	return pipe(zoneDetach(ngZone), zoneDetachSource(ngZone));
}

/**
 * Оптимизирует поток отключая его от ngZone и подключая только при получении результата
 *
 * @param ngZone
 */
export function luZoneOptimize<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
	return pipe(zoneDetach(ngZone), zoneDetachSource(ngZone), luZoneAttach(ngZone));
}
