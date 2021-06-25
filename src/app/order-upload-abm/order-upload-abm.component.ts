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
  selector: 'app-order-upload-abm',
  templateUrl: './order-upload-abm.component.html',
  styleUrls: ['./order-upload-abm.component.scss']
})
export class OrderUploadAbmComponent implements OnInit {
  
  loadingMore = false;
  formSubmitted = false;
  ABMuploadmsg: string;
  valueshow: number;
  messageshow: string[];
  horizontalPosition: MatSnackBarHorizontalPosition = "right";
  verticalPosition: MatSnackBarVerticalPosition = "top";
  public abmupload: string;
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

  abmorderUpload(form: NgForm) {
    const selectedDealer = this.authService.getSelectedDealer();
    this.formSubmitted = true;
    if(!this.abmupload) {
      return;
    }
    this.loadingMore = true;
    this.isProcessing = true;
    let file: File = this.file_name[0];
    let filename = file.name;
    let formData: FormData = new FormData();
    formData.append("file", file);
    formData.append("abmCode", selectedDealer.abmcode);
    // formData.append("soCode", selectedDealer.socode);
    // formData.append("rbmCode", selectedDealer.rbmcode);
   
    this.catalogueProductService.AbmOrderUploadCsv(formData).subscribe((data) => {
        this.loadingMore = false;
        this.formSubmitted = false;
        this.isProcessing = false;
        var parseObject = JSON.parse(data["_body"]);
        console.log(parseObject.Status);
        this.valueshow = 1;
        this.ABMuploadmsg = parseObject.Status;
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
        this.ABMuploadmsg = parseObject.Status;
        var messages = this.ABMuploadmsg
        .substring(1, this.ABMuploadmsg.length - 1)
        .split("|");
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
  reset() {}
}
