import { Component,ViewChild, ElementRef, OnInit } from '@angular/core';
import { CatalogueProductService } from "../services/catalogue-product.service";
import { IndentDetails} from "../models/IndentDetails";
//import { PagerService } from "../services/pagination.service";
import * as XLSX from 'xlsx';
import { DatatableComponent } from '@swimlane/ngx-datatable';
// import { saveAs } from 'file-saver';
@Component({
  selector: 'app-indent-abm-reports',
  templateUrl: './indent-abm-reports.component.html',
  styleUrls: ['./indent-abm-reports.component.scss']
})
export class IndentAbmReportsComponent implements OnInit {

  public indentDetails: IndentDetails[] = [];
  private isLoading = true;

  // for pagination
  currPage = 0;
  totalPages = 1;
  // pageSize = 4;
  // pager: any = {};
  pageSize = 8;
  pagedItems: any[];
 
  constructor( private catalogueProductService: CatalogueProductService,private myElement: ElementRef) {
  }

  ngOnInit(): void {
    this.catalogueProductService
    .viewIndentDetailsReport()
    .toPromise()
    .then((res: any) => {
      this.indentDetails = res.indentDetails;
      this.isLoading = false;
    });
  
  }
 
  // @ViewChild('myTable') table: DatatableComponent;  
  // @ViewChild('TABLE') ngx_datatable: ElementRef;
exportAsExcel()
  {
    //alert("Hiii");
     const ws: XLSX.WorkSheet=XLSX.utils.json_to_sheet(this.indentDetails);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
  XLSX.writeFile(wb, 'IndentSummaryReport.xlsx');

  }

}
