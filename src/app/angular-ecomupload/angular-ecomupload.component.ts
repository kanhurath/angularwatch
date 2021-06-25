import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../services/auth.service";
import { DomSanitizer } from "@angular/platform-browser";
import { NgForm } from "@angular/forms";
import { CatalogueProductService } from "../services/catalogue-product.service";
import { ViewChild, ElementRef } from "@angular/core";
import { GlobalVariable } from "../services/global-upload.service"; //Global Upload and Download URL Service
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: 'app-angular-ecomupload',
  templateUrl: './angular-ecomupload.component.html',
  styleUrls: ['./angular-ecomupload.component.scss']
})
export class AngularECOMUploadComponent implements OnInit {
  urlDownloadEcom = GlobalVariable.UPLOAD_BASE_API_URL + "downloadECOMUploadFormatFile";

  public loadingMore = false;
  public formSubmitted = false;
  public userType: string;
  public selfSelection = sessionStorage.getItem("SelectedDealerType");
  public loginidvalue = sessionStorage.getItem("loginid");
  public ecomuploadmsg: string;
  public valueshow: number;
  public messageshow: string[];
  public horizontalPosition: MatSnackBarHorizontalPosition = "right";
  public verticalPosition: MatSnackBarVerticalPosition = "top";
  public catagory: string;
  public file_name: FileList;
  public fileContent: any;
  isProcessing = false;

  @ViewChild("file", { static: false }) InputVar: ElementRef;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private catalogueProductService: CatalogueProductService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    // this.userType = sessionStorage.getItem('UserType');
    this.valueshow = 2;
  }

  fileUpload(detail) {
    let fileList: FileList = detail.target.files;
    this.file_name = fileList;
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 100000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
  ecomUploadsubmit(form: NgForm) {
    this.formSubmitted = true;
    if(!this.catagory || !this.file_name) {
      return;
    }
    this.loadingMore = true;
    this.isProcessing = true;
    // const userType = this.authService.getUserType();
    const userType = sessionStorage.getItem('UserType');
    // alert(userType);
    let file: File = this.file_name[0];
    let filename = file.name;
    let formData: FormData = new FormData();
    formData.append("file", file);
    formData.append("catagory", form.value.catagory);
    formData.append("loginId", this.loginidvalue);
    formData.append("userType", userType);
    this.catalogueProductService.angularEcomupload(formData).subscribe((data) => {
        this.loadingMore = false;
        this.formSubmitted = false;
        this.isProcessing = false;
        var parseObject = JSON.parse(data["_body"]);
        this.valueshow = 1;
        this.ecomuploadmsg = parseObject.Message;
        var messages = this.ecomuploadmsg
          .substring(0, this.ecomuploadmsg.length)
          .split("|");

          console.log(messages);
          console.log(typeof messages);

        this.messageshow = messages;
        this.reset();
        form.resetForm();
        this.InputVar.nativeElement.value = "";
      },
      (error) => {
        this.loadingMore = false;
        var parseObject = JSON.parse(error["_body"]);
        this.valueshow = 1;
        this.ecomuploadmsg = parseObject.Message;
        this.ecomuploadmsg = parseObject.Message;
        var messages = this.ecomuploadmsg
          .substring(1, this.ecomuploadmsg.length - 1)
          .split("|");
        this.messageshow = messages;
        this.reset();
        form.resetForm();
        this.InputVar.nativeElement.value = "";
      }
    );
  }
  closemsg() {
    this.valueshow = 2;
  }
  reset() {}
}
