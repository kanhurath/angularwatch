import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../services/auth.service";
import { DomSanitizer } from "@angular/platform-browser";
import { NgForm } from "@angular/forms";
import { CatalogueProductService } from "../services/catalogue-product.service";
import { ViewChild, ElementRef } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";

@Component({
  selector: "app-order-upload-rbm",
  templateUrl: "./order-upload-rbm.component.html",
  styleUrls: ["./order-upload-rbm.component.scss"],
})
export class OrderUploadRbmComponent implements OnInit {
  loadingMore = false;
  formSubmitted = false;
  RBMuploadmsg: string;
  valueshow: number;
  messageshow: string[];
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  public rbmupload: string;
  file_name: FileList;
  fileContent: any;
  abmCode: any;
  soCode: any;
  rbmCode: any;
  isProcessing = false;

  @ViewChild("file", { static: false }) InputVar: ElementRef;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private catalogueProductService: CatalogueProductService,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    let loginResponse = JSON.parse(sessionStorage.getItem("loginResponse"));
    this.rbmCode = loginResponse.mapping_Users[0].rbmcode;
    
    this.valueshow = 2;
  }

  fileUpload(detail) {
    let fileList: FileList = detail.target.files;
    this.file_name = fileList;
  }

  rbmorderUpload(form: NgForm) {
    this.formSubmitted = true;
    if (!this.rbmupload) {
      return;
    }

    this.loadingMore = true;
    this.isProcessing = true;
    let file: File = this.file_name[0];
    let filename = file.name;
    let formData: FormData = new FormData();
    formData.append("file", file);
    formData.append("rbmCode", this.rbmCode);

    this.catalogueProductService.RbmOrderUploadCsv(formData).subscribe(
      (data) => {
        this.loadingMore = false;
        this.formSubmitted = false;
        this.isProcessing = false;
        var parseObject = JSON.parse(data["_body"]);
        console.log(parseObject.Status);
        this.valueshow = 1;
        this.RBMuploadmsg = parseObject.Status;
        var messages = this.RBMuploadmsg.substring(
          0,
          this.RBMuploadmsg.length
        ).split("|");
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
        this.RBMuploadmsg = parseObject.Status;
        var messages = this.RBMuploadmsg.substring(
          1,
          this.RBMuploadmsg.length - 1
        ).split("|");
        this.messageshow = messages;
        this.reset();
        form.resetForm();
        this.InputVar.nativeElement.value = "";
        this.closemsg()
      }
    );
  }
  closemsg() {
    this.valueshow = 2;
    this.reset();
  }
  reset() {
   
  }
}
