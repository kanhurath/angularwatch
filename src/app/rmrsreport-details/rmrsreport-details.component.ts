import { Component, OnInit } from '@angular/core';
import { CatalogueProductService } from "../services/catalogue-product.service";
import * as XLSX from 'xlsx';
import { RMRSReportDetails} from "../models/RMRSReportDetails";

@Component({
  selector: 'app-rmrsreport-details',
  templateUrl: './rmrsreport-details.component.html',
  styleUrls: ['./rmrsreport-details.component.scss']
})
export class RMRSReportDetailsComponent implements OnInit {

  constructor( private catalogueProductService: CatalogueProductService) { }
  public RMRSReportList: RMRSReportDetails[] = [];
  private isLoading = true;

  ngOnInit(): void {
    this.catalogueProductService
    .RMRSReportDetails()
    .toPromise()
    .then((res: any) => {
      this.RMRSReportList = res.RMRSReportList;
      this.isLoading = false;
    });
  }

  exportAsExcel()
  {
    const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.RMRSReportList);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  XLSX.writeFile(wb, 'RMRSReport.xlsx');

  }


}
