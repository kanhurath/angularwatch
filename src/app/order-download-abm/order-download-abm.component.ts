import { Component, OnInit } from "@angular/core";
import { OrderDownloadAbmService } from "../services/order-download-abm.service";
import { CatalogueProductService } from "../services/catalogue-product.service";
import { ABMOrdersDownload } from "../models/ABMOrdersDownload";

@Component({
  selector: "app-order-download-abm",
  templateUrl: "./order-download-abm.component.html",
  styleUrls: ["./order-download-abm.component.scss"],
})
export class OrderDownloadAbmComponent implements OnInit {
  public abmOrderDownloadData: ABMOrdersDownload[] = [];
  public ABMOrderDownloadingSuccessMsg: string;
  
  private isLoading = true;

  constructor(
    private orderDownloadAbmservice: OrderDownloadAbmService,
    private catalogueProductService: CatalogueProductService
  ) {}

  ngOnInit(): void {
    
    this.catalogueProductService
      .downloadAbmOrder()
      .toPromise()
      .then((res: any) => {
        this.abmOrderDownloadData = res.ABMOrdersDownload;
        this.isLoading = false;
        console.log("OrderData", this.abmOrderDownloadData[0]);

      });
  }

  download() {
    this.orderDownloadAbmservice.downloadFile(
      this.abmOrderDownloadData, "ABMordersDownload"
    )
    this.ABMOrderDownloadingSuccessMsg =
    "Download succesfull !";
    setTimeout(() => {
      this.ABMOrderDownloadingSuccessMsg = "";
    }, 5000);
  
  }
  
}
