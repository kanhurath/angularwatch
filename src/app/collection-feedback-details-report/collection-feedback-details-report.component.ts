import { Component, OnInit } from '@angular/core';
import { CatalogueProductService } from "../services/catalogue-product.service";
import { CollectionFeedbackDetails} from "../models/CollectionFeedbackDetails";
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-collection-feedback-details-report',
  templateUrl: './collection-feedback-details-report.component.html',
  styleUrls: ['./collection-feedback-details-report.component.scss']
})
export class CollectionFeedbackDetailsReportComponent implements OnInit {

  public collectionFeedbackDetails: CollectionFeedbackDetails[] = [];
  private isLoading = true;

  constructor( private catalogueProductService: CatalogueProductService) {
  }

  ngOnInit(): void {
    this.catalogueProductService
    .collectionFeedbackDetailsReport()
    .toPromise()
    .then((res: any) => {
      this.collectionFeedbackDetails = res.collectionFeedbackDetails;
      this.isLoading = false;
      console.log("Report", this.collectionFeedbackDetails);
      // alert(this.collectionFeedbackDetails);
    });
  }

  exportAsExcel()
  {

     const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.collectionFeedbackDetails);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
  XLSX.writeFile(wb, 'CollectionDetailsReport.xlsx');

  }

}
