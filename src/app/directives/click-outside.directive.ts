import {
  Directive,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  ElementRef,
} from "@angular/core";
import { Observable, fromEvent } from "rxjs";
import { tap, delay } from "rxjs/operators";

@Directive({
  selector: "[click-outside]",
})
export class ClickOutside implements OnInit, OnDestroy {
  private listening: boolean;
  private globalClick: Observable<MouseEvent>;

  @Output("clickOutside") clickOutside: EventEmitter<Object>;

  constructor(private _elRef: ElementRef) {
    this.listening = false;
    this.clickOutside = new EventEmitter();
  }

  ngOnInit() {
    // this.globalClick =
    fromEvent(document, "click")
      .pipe(
        delay(1000),
        tap((e) => {
          console.log(e);
          this.listening = true;
        })
      )
      .subscribe((event: MouseEvent) => {
        this.onGlobalClick(event);
      });
  }

  ngOnDestroy() {
    // this.globalClick.unsubscribe();
  }

  onGlobalClick(event: MouseEvent) {
    if (event instanceof MouseEvent && this.listening === true) {
      if (this.isDescendant(this._elRef.nativeElement, event.target) === true) {
        this.clickOutside.emit({
          target: event.target || null,
          value: false,
        });
      } else {
        this.clickOutside.emit({
          target: event.target || null,
          value: true,
        });
      }
    }
  }

  isDescendant(parent, child) {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      } else {
        node = node.parentNode;
      }
    }
    return false;
  }
}
