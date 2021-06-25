import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

import { CatalogueProductService } from "../../services/catalogue-product.service";
import { PdfViewService } from "../../services/pdf-view.service";
import { CartItem } from "src/app/models/cartitem";
import { AuthService } from "src/app/services/auth.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.scss"],
})
export class ProductDetailComponent implements OnInit {
  userType: string = "GUEST";
  isLoading = true;
  variantNumber: string;
  singleProduct: any;
  price: number;
  brandName: string;
  mainImage: string;
  closeResult: string;
  qty = 1;
  pdfs: any[];
  selectedPdf: any;
  videos: any[];
  selectedVideo: any;
  usersesionDetails: any;
  public activeProjectIndex: number;
  public pdfErrorMsg: string;

  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  showless: boolean;

  selfSelection = sessionStorage.getItem("SelectedDealerType");

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private pdfViewService: PdfViewService,
    private catalogueProductService: CatalogueProductService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.variantNumber = params.variantNumber;
      this.getProductDetails();
      this.getProductPdfs();
      this.getProductVideos();
    });
    this.userType = this.authService.getUserType();
    this.usersesionDetails = this.authService.getUserSession();
  }

  private getProductDetails() {
    this.catalogueProductService
      .getProductDetails(this.variantNumber)
      .toPromise()
      .then((data) => {
        this.isLoading = false;
        this.singleProduct = data;
        this.mainImage = this.singleProduct.images[0];
        if (this.singleProduct.watchSpecifications) {
          this.price = this.singleProduct.watchSpecifications[0].price;
          this.brandName = this.singleProduct.watchSpecifications[0].brand;
        } else if (this.singleProduct.clockSpecifications) {
          this.price = this.singleProduct.clockSpecifications[0].ucp;
          this.brandName = this.singleProduct.clockSpecifications[0].brand;
        } else if (this.singleProduct.braceletSpecifications) {
          this.price = this.singleProduct.braceletSpecifications[0].ucp;
          this.brandName = this.singleProduct.braceletSpecifications[0].brand;
        }
      });
  }

  // SHOW PDF
  onRightClick() {
    return false;
  }
  onError(error) {
    console.log("error", error);
    this.pdfErrorMsg = "PDF file aren't available on the folder!";
  }
  private getProductPdfs() {
    this.pdfViewService
      .showPdfFile(this.variantNumber)
      .toPromise()
      .then((res: any) => {
        this.pdfs = res.pdfdata;
        this.selectPdf(0);
      });
  }

  selectPdf(index: number) {
    this.activeProjectIndex = index;
    this.selectedPdf = this.pdfs[index];
    const pdfFullPath = "" + this.selectedPdf.pdf_link;
    //this.selectedPdf.pdf_link = this.sanitizer.bypassSecurityTrustResourceUrl(
    //pdfFullPath
    //   );
  }

  //SHOW VIDEO
  private getProductVideos() {
    this.pdfViewService
      .showVideoFile(this.variantNumber)
      .toPromise()
      .then((res: any) => {
        this.videos = res.video_data;
        this.selectVideo(0);
      });
  }

  selectVideo(index: number) {
    this.selectedVideo = this.videos[index];
    this.selectedVideo.video_link = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.selectedVideo.video_link
    );
    // .slice(0, -1)
  }
  // ModalBox Video Show
  public showVideoModal(gDriveVideo) {
    this.modalService.open(gDriveVideo, { size: <any>"lg", scrollable: true });
  }

  // ModalBox Pdf Show
  public showPdfModal(gDrivePdf) {
    this.modalService.open(gDrivePdf, { size: <any>"xl", scrollable: true });
    // alert('Type Your Password');
    // document.oncontextmenu = function() {return false;};
    // this.modalService.open(gDrivePdf, { scrollable: true });
  }

  // Issue fixed, you may test  now
  public addToCart() {
    const item: CartItem = {
      variant_number: this.variantNumber,
      lineitem: 1,
      qty: this.qty,
      ucp: this.price,
      brandName: this.brandName,
    };

    this.catalogueProductService
      .addToCart(item, this.qty)
      .toPromise()
      .then((response) => {
        this.openSnackBar(response.msg, "Ok");
      });
  }

  public showImage(image: string) {
    this.mainImage = image;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  public show: boolean = true;
  public moreSpecifData: boolean = false;
  getMoreSpecifications() {
    //alert("Hiii");
    this.show = false;
    this.showless = true;
    this.moreSpecifData = true;
  }
  getLessSpecifications() {
    //  this.show = true;
    this.showless = false;
    this.moreSpecifData = false;
    this.show = true;
    // this.moreSpecifData = true;
  }
}
