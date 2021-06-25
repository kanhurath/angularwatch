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
  selector: "app-angularsoupload",
  templateUrl: "./angularsoupload.component.html",
  styleUrls: ["./angularsoupload.component.scss"],
})
export class AngularsouploadComponent implements OnInit {
  urlDownloadSo = GlobalVariable.UPLOAD_BASE_API_URL + "downloadSOUploadFormatFile";

  loadingMore = false;
  formSubmitted = false;
  selfSelection = sessionStorage.getItem("SelectedDealerType");
  loginidvalue = sessionStorage.getItem("loginid");
  souploadmsg: string;
  valueshow: number;
  messageshow: string[];
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  catagory: string;
  file_name: FileList;
  fileContent: any;
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

  sosubmint(form: NgForm) {
    this.formSubmitted = true;
    if(!this.catagory || !this.file_name) {
      return;
    }

    this.loadingMore = true;
    this.isProcessing = true;
    let file: File = this.file_name[0];
    let filename = file.name;
    let formData: FormData = new FormData();
    formData.append("file", file);
    formData.append("catagory", form.value.catagory);
    formData.append("loginId", this.loginidvalue);
    formData.append("Map_User_type", this.selfSelection);
    this.catalogueProductService.angularsoupload(formData).subscribe((data) => {
        this.loadingMore = false;
        this.formSubmitted = false;
        this.isProcessing = false;
        var parseObject = JSON.parse(data["_body"]);
        this.valueshow = 1;
        this.souploadmsg = parseObject.Message;
        var messages = this.souploadmsg
          .substring(0, this.souploadmsg.length)
          .split("|");

        // var linemessages = this.souploadmsg.replace("|", "\n");
        // this.openSnackBar(linemessages, "Ok");

        this.messageshow = messages;
        this.reset();
        form.resetForm();
        this.InputVar.nativeElement.value = "";
        // setTimeout(() => {
        //   this.valueshow = 2;
        // }, 5000);
      },
      (error) => {
        this.loadingMore = false;
        var parseObject = JSON.parse(error["_body"]);
        this.valueshow = 1;
        this.souploadmsg = parseObject.Message;
        this.souploadmsg = parseObject.Message;
        var messages = this.souploadmsg
          .substring(1, this.souploadmsg.length - 1)
          .split("|");
        this.messageshow = messages;
        this.reset();
        form.resetForm();
        this.InputVar.nativeElement.value = "";
        // setTimeout(() => {
        //   this.valueshow = 2;
        // }, 5000);
      }
    );
  }

  closemsg() {
    this.valueshow = 2;
  }

  reset() {}

}
