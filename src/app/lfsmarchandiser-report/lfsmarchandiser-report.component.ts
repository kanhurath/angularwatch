import { Component, OnInit } from '@angular/core';
import { CatalogueProductService } from "../services/catalogue-product.service";
import * as XLSX from 'xlsx';
import { LFSMerchandiser } from "../models/LFSMerchandiser";
@Component({
  selector: 'app-lfsmarchandiser-report',
  templateUrl: './lfsmarchandiser-report.component.html',
  styleUrls: ['./lfsmarchandiser-report.component.scss']
})
export class LFSMarchandiserReportComponent implements OnInit {

  constructor(private catalogueProductService: CatalogueProductService) { }
  public LFSMerchandiserList: LFSMerchandiser[] = [];
  private isLoading = true;

  ngOnInit(): void {
    this.catalogueProductService
      .LFSMerchandiserReportDetails()
      .toPromise()
      .then((res: any) => {
        this.LFSMerchandiserList = res.LFSReportData;
        this.isLoading = false;
        console.log("LFS Details : " + this.LFSMerchandiserList);
      });
  }

  exportAsExcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.LFSMerchandiserList);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'LFSMerchandiserReport.xlsx');

  }


}
