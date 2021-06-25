import { Component, OnInit } from '@angular/core';
import { CatalogueProductService } from "../services/catalogue-product.service";
import { ECOMReportDatails} from "../models/ECOMReportDetails";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-ecom-indent-reports',
  templateUrl: './ecom-indent-reports.component.html',
  styleUrls: ['./ecom-indent-reports.component.scss']
})
export class ECOMIndentReportsComponent implements OnInit {

  public ECOMReportData: ECOMReportDatails[] = [];
  private isLoading = true;

  constructor( private catalogueProductService: CatalogueProductService ) { }

  ngOnInit(): void {
    this.catalogueProductService
    .ECOMReportDetail()
    .toPromise()
    .then((res: any) => {
      this.ECOMReportData = res.ECOMReportData;
      this.isLoading = false;
      console.log("Report", this.ECOMReportData);
      // alert(this.ecomReportDatails);
    });
  }
  exportAsExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.ECOMReportData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
  XLSX.writeFile(wb, 'ECOMDetailsReport.xlsx');

  }

}
