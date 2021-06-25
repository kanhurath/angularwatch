import { Component } from "@angular/core";
import { Router } from "@angular/router";
const MINUTES_UNITL_AUTO_LOGOUT = 60; // in mins
const CHECK_INTERVAL = 20000; // in ms
const STORE_KEY = "lastAction";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "show-case";

  ngOnInit() {}

  public getLastAction() {
    return parseInt(sessionStorage.getItem(STORE_KEY));
  }
  public setLastAction(lastAction: number) {
    sessionStorage.setItem(STORE_KEY, lastAction.toString());
  }
  constructor(private router: Router) {
    this.check();
    this.initListener();
    this.initInterval();
    sessionStorage.setItem(STORE_KEY, Date.now().toString());
  }
  initListener() {
    document.body.addEventListener("click", () => this.reset());
    document.body.addEventListener("mouseover", () => this.reset());
    document.body.addEventListener("mouseout", () => this.reset());
    document.body.addEventListener("keydown", () => this.reset());
    document.body.addEventListener("keyup", () => this.reset());
    document.body.addEventListener("keypress", () => this.reset());
  }

  reset() {
    this.setLastAction(Date.now());
  }

  initInterval() {
    setInterval(() => {
      this.check();
    }, CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    const timeleft =
      this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 1000 * 30;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    if (isTimeout) {
      sessionStorage.clear();
      this.router.navigate(["/login"]);
    }
  }
  onRightClick() {
    return false;
  }
}
