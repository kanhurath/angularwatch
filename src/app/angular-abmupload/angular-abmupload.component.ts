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
  selector: 'app-angular-abmupload',
  templateUrl: './angular-abmupload.component.html',
  styleUrls: ['./angular-abmupload.component.scss']
})
export class AngularAbmuploadComponent implements OnInit {
  urlDownloadAbm = GlobalVariable.UPLOAD_BASE_API_URL + "downloadSOUploadFormatFile";

  loadingMore = false;
  formSubmitted = false;
  selfSelection = sessionStorage.getItem("SelectedDealerType");
  loginidvalue = sessionStorage.getItem("loginid");
  ABMuploadmsg: string;
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

  abmsubmint(form: NgForm) {
    // console.log("check angular abm upload ");
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
    this.catalogueProductService.angularabmupload(formData).subscribe((data) => {
        this.loadingMore = false;
        this.formSubmitted = false;
        this.isProcessing = false;
        var parseObject = JSON.parse(data["_body"]);
        console.log(parseObject.Message);
        this.valueshow = 1;
        this.ABMuploadmsg = parseObject.Message;
        var messages = this.ABMuploadmsg.substring(
          0,
          this.ABMuploadmsg.length
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
        this.ABMuploadmsg = parseObject.Message;
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
