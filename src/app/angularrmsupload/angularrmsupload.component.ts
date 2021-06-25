import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../services/auth.service";
import { DomSanitizer } from "@angular/platform-browser";
import { NgForm } from "@angular/forms";
import { CatalogueProductService } from "../services/catalogue-product.service";
import { GlobalVariable } from "../services/global-upload.service"; //Global Upload and Download URL Service

@Component({
  selector: "app-angularrmsupload",
  templateUrl: "./angularrmsupload.component.html",
  styleUrls: ["./angularrmsupload.component.scss"],
})
export class AngularrmsuploadComponent implements OnInit {
  urlDownloadRmrs = GlobalVariable.UPLOAD_BASE_API_URL + "downloadRMRSUploadFormatFile";

  loadingMore = false;
  formSubmitted = false;
  selfSelection = sessionStorage.getItem("SelectedDealerType");
  loginidvalue = sessionStorage.getItem("loginid");
  rmsuploadmsg: string;
  valueshow: number;
  messageshow: string[];
  catagory: string;
  file_name: FileList;
  fileContent: any;
  isProcessing = false;
 
  @ViewChild("file", { static: false }) InputVar: ElementRef;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private catalogueProductService: CatalogueProductService,
    private sanitizer: DomSanitizer
  ) {}
  
  ngOnInit(): void {
    this.valueshow = 2;
  }

  fileUpload(detail) {
    let fileList: FileList = detail.target.files;
    this.file_name = fileList;
  }

  rmsubmint(form: NgForm) {
    this.formSubmitted = true;
    if(!this.catagory || !this.file_name) {
      return;
    }
    // console.log("check angular so upload ");
    this.loadingMore = true;
    this.isProcessing = true;
    console.log(form.value);
    let file: File = this.file_name[0];
    console.log(file);
    console.log(form.value.catagory);
    //console.log(this.selfSelection);
    console.log(this.loginidvalue);

    let filename = file.name;
    let formData: FormData = new FormData();
    formData.append("file", file);
    formData.append("catagory", form.value.catagory);
    formData.append("loginId", this.loginidvalue);
  
    this.catalogueProductService.angularRMSupload(formData).subscribe((data) => {
        this.loadingMore = false;
        this.formSubmitted = false;
        this.isProcessing = false;
        var parseObject = JSON.parse(data["_body"]);
        console.log(parseObject.Message);
        this.valueshow = 1;
        this.rmsuploadmsg = parseObject.Message;
        //this.souploadmsg = "first line" + " <br/> secondlone";
        var messages = this.rmsuploadmsg
          .substring(0, this.rmsuploadmsg.length)
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
        this.rmsuploadmsg = parseObject.Message;
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
