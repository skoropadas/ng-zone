import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NativeMouseMoveComponent} from './native-mouse-move/native-mouse-move.component';
import {NgZoneCounterComponent} from './ng-zone-counter/ng-zone-counter.component';
import {AfterViewCheckedDirective} from './after-view-checked.directive';
import {NgZoneMouseMoveComponent} from './ng-zone-mouse-move/ng-zone-mouse-move.component';
import {NgZoneOperatorMouseMoveComponent} from './ng-zone-operator-mouse-move/ng-zone-operator-mouse-move.component';

@NgModule({
  declarations: [
    AppComponent,
    NativeMouseMoveComponent,
    NgZoneCounterComponent,
    AfterViewCheckedDirective,
    NgZoneMouseMoveComponent,
    NgZoneOperatorMouseMoveComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
