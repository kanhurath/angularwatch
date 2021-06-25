import { Component, OnInit } from '@angular/core';
import { CatalogueProductService } from "../services/catalogue-product.service";

@Component({
  selector: 'app-user-manual',
  templateUrl: './user-manual.component.html',
  styleUrls: ['./user-manual.component.scss']
})
export class UserManualComponent implements OnInit {
  public userType: string;
  // public pdfSuccessMsg: string;

  // public usertype = sessionStorage.getItem("userType");
  constructor(private catalogueProductService: CatalogueProductService) { }

  ngOnInit(): void {
     this.userType = sessionStorage.getItem('userType');
   
  }

  downloadMyFile(){
    let link = document.createElement("a");
    link.download = "No file attached";
    
    if(this.userType === 'SO') {
      link.href = "assets/pdf/SO_Manual.pdf";
      link.download = "SO_Manual.pdf";
    } else if(this.userType === 'Retail Merchandiser') {
      link.href = "assets/pdf/REM_Manual.pdf";
      link.download = "REM_Manual.pdf";
    } else if(this.userType === 'Retail Executive') {
      link.href = "assets/pdf/RE_Manual.pdf";
      link.download = "Retail_Executive_Manual.pdf";
    } else if(this.userType === 'LFS Merchandiser') {
      link.href = "assets/pdf/LFSM_Manual.pdf";
      link.download = "LFS_Merchandiser_Manual.pdf";
    } else if(this.userType === 'RBM') {
      link.href = "assets/pdf/RBM_Manual.pdf";
      link.download = "RBM_Manual.pdf";
    } else if(this.userType === 'ABM') {
      link.href = "assets/pdf/ABM_Manual.pdf";
      link.download = "ABM_Manual.pdf";
    }else if(this.userType === 'GUEST') {
      link.href = "assets/pdf/GUEST_Manual.pdf";
      link.download = "GUEST_Manual.pdf";
    } else if(this.userType === 'Amazon Ecom') {
      link.href = "assets/pdf/Amazon_ECOM_Manual.pdf";
      link.download = "Amazon_ECOM_Manual.pdf";
    }else if(this.userType === 'Filpkart Ecom') {
      link.href = "assets/pdf/Filpkart_ECOM_Manual.pdf";
      link.download = "Filpkart_ECOM_Manual.pdf";
    } else if(this.userType === 'TEC Ecom') {
      link.href = "assets/pdf/TEC_ECOM_Manual.pdf";
      link.download = "TEC_ECOM_Manual.pdf";
    }else if(this.userType === 'Market Place Ecom') {
      link.href = "assets/pdf/MarketPlace_ECOM_Manual.pdf";
      link.download = "MarketPlace_ECOM_Manual.pdf";
    } 
    // this.pdfSuccessMsg = "Download Successful !";
    // setTimeout(() => {
    //   this.pdfSuccessMsg = "";
    // }, 5000);
    link.click();
    
 }
}
