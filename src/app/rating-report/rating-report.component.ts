import { Component, OnInit } from '@angular/core';
import { CatalogueProductService } from "../services/catalogue-product.service";
import { RatingReport } from "../models/RatingReport";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-rating-report',
  templateUrl: './rating-report.component.html',
  styleUrls: ['./rating-report.component.scss']
})
export class RatingReportComponent implements OnInit {
  public RatingReportData: RatingReport[] = [];
  private isLoading = true;
  constructor(private catalogueProductService: CatalogueProductService) { }

  ngOnInit(): void {
    this.catalogueProductService.ratingDetailsReport().toPromise().then((res: any) => {
         this.RatingReportData = res.RatingReportData;
         this.isLoading = false;
    });
  }
    // for exporting json data to excel
  exportAsExcel()
  {

     const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.RatingReportData);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
  XLSX.writeFile(wb, 'RatingReport.xlsx');

  }


}
