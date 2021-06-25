import { Component, OnInit } from '@angular/core';
import { SummaryLevelData} from "../models/SummaryLevelData";
import { CatalogueProductService } from "../services/catalogue-product.service";
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-summary-level-report',
  templateUrl: './summary-level-report.component.html',
  styleUrls: ['./summary-level-report.component.scss']
})
export class SummaryLevelReportComponent implements OnInit {

  constructor( private catalogueProductService: CatalogueProductService) { }
  public summaryLevelData: SummaryLevelData[] = [];
  private isLoading = true;

  ngOnInit(): void {
    this.catalogueProductService
    .SummaryLevelReport()
    .toPromise()
    .then((res: any) => {
      this.summaryLevelData = res.summaryLevelData;
      this.isLoading = false;
      // alert("Response : "+res.summaryLevelData);
      console.log("Summary Data : "+res.summaryLevelData);
    });
  }

  exportAsExcel()
  {

     const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.summaryLevelData);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
  XLSX.writeFile(wb, 'SummaryLevelReport.xlsx');

  }


}
