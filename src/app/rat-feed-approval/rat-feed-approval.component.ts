import { Component, OnInit } from "@angular/core";
import { CatalogueProductService } from "../services/catalogue-product.service";

@Component({
  selector: "app-rat-feed-approval",
  templateUrl: "./rat-feed-approval.component.html",
  styleUrls: ["./rat-feed-approval.component.scss"],
})
export class RatFeedApprovalComponent implements OnInit {
  feedbacks: any[];

  constructor(private catalogueProductService: CatalogueProductService) {}

  ngOnInit(): void {
    this.catalogueProductService
      .viewFeedbacks()
      .toPromise()
      .then((res: any) => {
        this.feedbacks = res.feedback_data;
      });
  }
}
