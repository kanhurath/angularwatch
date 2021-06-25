import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../services/auth.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-rmrsfile-upload",
  templateUrl: "./rmrsfile-upload.component.html",
  styleUrls: ["./rmrsfile-upload.component.scss"],
})
export class RMRSFileUploadComponent implements OnInit {
  fileToUpload: File = null;
  file: File = null;

  userDetails: any;
  menuItems: any;
  usersesionDetails: any;
  fullurl: any;
  urlwithloginid: any;
  fynialurlvalue: string;
  urlSafe: any;

  constructor(
    private modalService: NgbModal,

    private authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.usersesionDetails = this.authService.getUserSession();

    if (this.authService.getuserDetails()) {
      this.userDetails = this.authService.getuserDetails();
      console.log("check");

      this.urlwithloginid =
        "https://nplaunch.titan.in/NPSCSOUpload/uploadRMRSFile";

      this.urlSafe = this.urlwithloginid;
    }
  }
  // ModalBox Upload Show
  public showPdfModal(gDrivePdf) {
    this.modalService.open(gDrivePdf, { size: <any>"xl", scrollable: true });
  }
}
