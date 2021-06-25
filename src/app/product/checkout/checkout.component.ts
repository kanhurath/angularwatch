import { Component, OnInit } from "@angular/core";
import { CatalogueProductService } from "../../services/catalogue-product.service";
import { CartItem } from "src/app/models/cartitem";
import { Router } from "@angular/router";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[];
  cartItemCount = 0;
  grandTotal = 0;

  constructor(
    private router: Router,
    private catalogueProductService: CatalogueProductService
  ) {}

  ngOnInit(): void {
    // Get Item form cart
    this.catalogueProductService.getCartItems().subscribe((data) => {
      this.cartItems = data;
      this.cartItems.forEach((item) => {
        this.cartItemCount = this.cartItemCount + item.qty;
        this.grandTotal = this.grandTotal + item.ucp * item.qty;
      });
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

  placeOrder() {
    this.catalogueProductService.placeOrder(this.cartItems).subscribe(
      (res: any) => {
        this.catalogueProductService.clearCart();
        const msgParts = res.message.split(":");
        const orderId = msgParts[msgParts.length - 1].trim();
        this.router.navigate(["/", "order-success", orderId]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
