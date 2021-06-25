import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../services/auth.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-lfsindent-upload",
  templateUrl: "./lfsindent-upload.component.html",
  styleUrls: ["./lfsindent-upload.component.scss"],
})
export class LFSIndentUploadComponent implements OnInit {
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

  ngOnInit(): void {
    this.usersesionDetails = this.authService.getUserSession();

    if (this.authService.getuserDetails()) {
      this.userDetails = this.authService.getuserDetails();
      console.log("check");
      console.log(this.userDetails.loginId);

      this.urlwithloginid =
        "https://nplaunch.titan.in/NPSCSOUpload/LFSUploadGet";

      this.urlSafe = this.urlwithloginid;
    }
  }

  // ModalBox Upload Show
  public showPdfModal(gDrivePdf) {
    this.modalService.open(gDrivePdf, { size: <any>"xl", scrollable: true });
    // window.open(this.urlwithloginid);
  }
}
