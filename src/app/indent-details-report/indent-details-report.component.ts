import { Component, OnInit } from '@angular/core';
import { CatalogueProductService } from "../services/catalogue-product.service";
import { IndentVariantDetails} from "../models/IndentVariantDetails";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-indent-details-report',
  templateUrl: './indent-details-report.component.html',
  styleUrls: ['./indent-details-report.component.scss']
})
export class IndentDetailsReportComponent implements OnInit {

  public indentDetails: IndentVariantDetails[] = [];
  private isLoading = true;
  currPage = 0;
  totalPages = 1;
  pageSize = 8;
  pagedItems: any[];

  constructor( private catalogueProductService: CatalogueProductService) {
  }

  ngOnInit(): void {
    this.catalogueProductService
    .indentVariantDetailsReport()
    .toPromise()
    .then((res: any) => {
      this.indentDetails = res.indentDetails;
      this.isLoading = false;
    });
  }

  exportAsExcel()
  {

     const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.indentDetails);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
  XLSX.writeFile(wb, 'IndentDetailsReport.xlsx');

  }

}
