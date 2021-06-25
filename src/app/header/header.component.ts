import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { fromEvent } from "rxjs";
import { throttleTime, map, startWith } from "rxjs/operators";

import { MenuService } from "../services/menu.service";
import { CatalogueProductService } from "../services/catalogue-product.service";
import { AuthService } from "../services/auth.service";
import { CartItem } from "../models/cartitem";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  loading = false;
  showCart = false;
  cartItems: Array<any>;
  cartItemCount = 0;
  grandTotal = 0;
  showrResponsiveMenu = true;
  showrResponsiveMenuCloseBtn = false;
  userType: string = "GUEST";
  // userTypeRM: string = 'Retail Merchandiser';
  userDetails: any;
  menuItems: any;
  usersesionDetails: any;
  public userdisplay = sessionStorage.getItem("userDetails");
  public usertype = sessionStorage.getItem("userType");
  // this.userType = sessionStorage.getItem('UserType');

  public dealerdetail = sessionStorage.getItem("dealername");
  public checkusertype = sessionStorage.getItem("selfusertype");
  selfSelection = sessionStorage.getItem("SelectedDealerType");
  userGroup: any;

  constructor(
    private router: Router,
    private menuService: MenuService,
    private catalogueProductService: CatalogueProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log(this.userdisplay);
    console.log(this.dealerdetail);

    //alert(this.usertype); pls check

    if (this.usertype == "GUEST") {
      this.userGroup = "GUEST";
    } else {
      let loginResponse = JSON.parse(sessionStorage.getItem("loginResponse"));
      this.userGroup = loginResponse.mapping_Users[0].userGroup;
    }
    this.userType = this.authService.getUserType(); // coming from the user_type column of user_mapping_master table

    //Show Nav menu
    this.menuService.getHomeMenu().subscribe(
      (menu: any[]) => {
        this.menuItems = menu;
        console.log(this.menuItems);
      },
      (error) => {
        console.log(error);
      }
    );

    this.usersesionDetails = this.authService.getUserSession();
    //console.log("userSession",this.usersesionDetails, this.usersesionDetails.userGroupAccessResponse);
    // Session Checking
    if (this.authService.getuserDetails()) {
      this.userDetails = this.authService.getuserDetails();
    }

    // Checks if screen size is less than 1024 pixels
    const checkScreenSize = () => document.body.offsetWidth < 1024;
    const screenSizeChanged$ = fromEvent(window, "resize").pipe(
      throttleTime(500),
      map(checkScreenSize)
    );
    screenSizeChanged$.pipe(startWith(checkScreenSize())).subscribe((data) => {
      this.showrResponsiveMenu = !data;
    });

    // Get Item form cart
    this.getCartItems();
    this.catalogueProductService.getCartUpdatedSub().subscribe((status) => {
      this.getCartItems();
    });
  }

  getCartItems() {
    this.cartItemCount = 0;
    this.grandTotal = 0;
    this.catalogueProductService.getCartItems().subscribe((data) => {
      this.cartItems = data;
      this.cartItems.forEach((item) => {
        this.cartItemCount = this.cartItemCount + item.qty;
        this.grandTotal += item.ucp * item.qty;
      });
    });
  }

  onClickOutside(event: any) {
    if (event.target.parentNode.id !== "showCartIcon") {
      if (event && event["value"] === true) {
        // console.log('clicked inside');
      } else {
        this.showCart = false;
        // console.log('clicked inside');
      }
    }
  }

  updateCart(item: CartItem, action: string) {
    if (item.qty === 1 && action === "decrement") {
      this.removeFromCart(item);
      return;
    }
    const qty = action === "decrement" ? -1 : 1;
    this.catalogueProductService.addToCart(item, qty).subscribe(
      (response: any) => {
        this.getCartItems();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  removeFromCart(item) {
    this.catalogueProductService.removeItem(item).subscribe(
      (data) => {
        this.getCartItems();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  goToCheckout() {
    this.router.navigate(["/checkout"]).then(() => {
      this.showCart = false;
    });
  }

  logout() {
    const userId = this.authService.getUserId();
    if (sessionStorage && userId) {
      this.authService
        .onLogout({ login_id: userId })
        .subscribe((response: any) => {
          if (response.status === "You have successfully logged out!") {
            // this.router.navigateByUrl("/login");
          }
        });
      this.router.navigateByUrl("/login");
      sessionStorage.clear();
    }
  }
}
