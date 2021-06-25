import { Component, OnInit, Inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import { CatalogueProductService } from "../services/catalogue-product.service";
import { Order } from "../models/order";

@Component({
  selector: "app-indent-abm-approval",
  templateUrl: "./indent-abm-approval.component.html",
  styleUrls: ["./indent-abm-approval.component.scss"],
})
export class IndentAbmApprovalComponent implements OnInit {
  public orders: Order[] = [];
  private isLoading = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private catalogueProductService: CatalogueProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.catalogueProductService
      .viewOrders()
      .toPromise()
      .then((res: any) => {
        this.orders = res.allOrders;
        this.isLoading = false;
      });
  }

  public viewOrderDetails(order: Order) {
    const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
      height: "400px",
      width: "600px",
      data: { order },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public approveOrder(order: any, index: number) {
    // const msg = `Are you sure you want to approve the order: ${order.orderNumber}?`;
    // if(!confirm(msg)) {
    //   return;
    // }   
    
    this.catalogueProductService
      .approveOrder(order.orderNumber)
      .toPromise()
      .then((res: any) => {
        this.orders.splice(index, 1);
        this.openSnackBar(`${order.orderNumber} approved successfully!`, "Ok");
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  
}

@Component({
  selector: "app-order-details-dialog",
  templateUrl: "./order-details-dialog.html",
  styleUrls: ["./indent-abm-approval.component.scss"],
})
export class OrderDetailsDialogComponent implements OnInit {
  public order: any;
  public orderItems: any[];
  public isLoading = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private catalogueProductService: CatalogueProductService
  ) {
    this.order = this.data.order;
    // alert(JSON.stringify(this.data));
  }

  ngOnInit(): void {
    this.catalogueProductService
      .viewOrderDetails(this.order.orderNumber)
      .toPromise()
      .then((res: any) => {
        this.orderItems = res.AllOrderDetails;
        this.isLoading = false;
      });
  }
}
