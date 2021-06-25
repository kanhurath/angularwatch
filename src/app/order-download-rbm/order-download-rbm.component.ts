
import { Component, OnInit } from "@angular/core";
import { OrderDownloadRbmService } from "../services/order-download-rbm.service";
import { CatalogueProductService } from "../services/catalogue-product.service";
import { RBMOrdersDownload } from "../models/RBMOrdersDownload";

@Component({
  selector: 'app-order-download-rbm',
  templateUrl: './order-download-rbm.component.html',
  styleUrls: ['./order-download-rbm.component.scss']
})
export class OrderDownloadRbmComponent implements OnInit {
  public rbmOrderDownloadData: RBMOrdersDownload[] = [];
  public RBMOrderDownloadingSuccessMsg: string;
  
  private isLoading = true;

  constructor(
    private orderDownloadRbmservice: OrderDownloadRbmService,
    private catalogueProductService: CatalogueProductService
  ) {}

  ngOnInit(): void {
    this.catalogueProductService
      .downloadRbmOrder()
      .toPromise()
      .then((res: any) => {
        this.rbmOrderDownloadData = res.RBMOrdersDownload;
        this.isLoading = false;
        console.log("OrderData", this.rbmOrderDownloadData[0]);
      });
  }
  
  download() {
    this.orderDownloadRbmservice.downloadFile(
      this.rbmOrderDownloadData, "RBMordersDownload"
    );
    this.RBMOrderDownloadingSuccessMsg = "Download succesfull !";
    setTimeout(() => {
      this.RBMOrderDownloadingSuccessMsg = "";
    }, 5000);
  
  }
  
}
