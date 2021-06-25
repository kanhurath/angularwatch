import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../services/auth.service";
import { DomSanitizer } from "@angular/platform-browser";

import {
  HttpResponse,
  HttpEventType,
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import {
  Headers,
  Http,
  Response,
  RequestOptions,
  RequestMethod,
} from "@angular/http";

import { CatalogueProductService } from "../services/catalogue-product.service";
import { FormBuilder, FormGroup } from "@angular/forms";
@Component({
  selector: "app-file-upload-component",
  templateUrl: "./file-upload-component.component.html",
  styleUrls: ["./file-upload-component.component.scss"],
})
export class FileUploadComponentComponent implements OnInit {
  fileToUpload: File = null;
  file: File = null;

  form: FormGroup;

  userDetails: any;
  menuItems: any;
  usersesionDetails: any;
  fullurl: any;
  urlwithloginid: any;
  fynialurlvalue: string;
  urlSafe: any;

  // constructor(private uploadService: CatalogueProductService, private formBuilder: FormBuilder, private httpClient: HttpClient) { }
  constructor(
    private uploadService: CatalogueProductService,
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.createForm();
    this.usersesionDetails = this.authService.getUserSession();

    // note: bring DD/RS/SELF selection here to pass to upload logic
    if (this.authService.getuserDetails()) {
      this.userDetails = this.authService.getuserDetails();
      console.log("check");
      console.log(this.userDetails.loginId);

      this.urlwithloginid =
        "https://nplaunch.titan.in/NPSCSOUpload/uploadSOFile";

      this.urlSafe = this.urlwithloginid;
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      file_upload: null,
    });
  }

  // Check for changes in files inputs via a DOMString reprsenting the name of an event
  fileChange(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  // ModalBox Upload Show
  public showPdfModal(gDrivePdf) {
    this.modalService.open(gDrivePdf, { size: <any>"xl", scrollable: true });
    // window.open(this.urlwithloginid);
  }

  // Upload the file to the API
  upload() {
    console.log(this.fileToUpload);

    // Instantiate a FormData to store form fields and encode the file
    let body = new FormData();
    // Add file content to prepare the request
    // alert(this.file+" name : "+this.file.name);
    body.append("file", this.fileToUpload);
    console.log(body);
    let HttpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "multipart/form-data" }),
    };
    // let headers = new Headers();
    let headers = new Headers();
    // headers.append('Content-Type' , 'application/json',);
    var tok = "YWRtaW46bnBzQDIwMjAjVl8wMSQ";
    headers.append(
      "Authorization",
      "Basic " + tok

      // headers.append('Authorization','Bearer ' + localStorage.getItem('access')
    );
    let options = new RequestOptions({ headers: headers });

    // Launch post request
    return (
      this.httpClient
        .post("http://localhost:8080/ProductPreLaunch/api/uploadSOFile", body, {
          headers: {
            //  'Content-Type' : 'multipart/form-data',
            Authorization: "Basic " + tok,
          },
        })
        // return this.httpClient.post('http://localhost:8080/ProductPreLaunch/api/uploadSOFile',body,options)
        .subscribe(
          // Admire results
          (data) => {
            console.log(data);
          },
          // Or errors :-(
          (error) => console.log(error),
          // tell us if it's finished
          () => {
            console.log("completed");
          }
        )
    );
  }
}
