import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../services/auth.service";
import { CatalogueProductService } from "../services/catalogue-product.service";
import { ViewChild, ElementRef } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { IndentDetails } from "../models/IndentDetails";

@Component({
  selector: "app-admin-upload",
  templateUrl: "./admin-upload.component.html",
  styleUrls: ["./admin-upload.component.scss"],
})
export class AdminUploadComponent implements OnInit {
  selfSelection = sessionStorage.getItem("SelectedDealerType");
  loginidvalue = sessionStorage.getItem("loginid");
  public adminSubmitForm: FormGroup;
  public formSubmitted = false;
  private isLoading = true;
  public indentDetails: IndentDetails[] = [];
  // for pagination
  currPage = 0;
  totalPages = 1;
  pageSize = 8;
  pagedItems: any[];
  selectedName : string = "";

  @ViewChild("file", { static: false }) InputVar: ElementRef;

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private catalogueProductService: CatalogueProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.adminSubmitForm = this.fb.group({
      userName: ["", [Validators.required]],
      emailId: ["", [Validators.required]],
      loginId: ["", [Validators.required]],
      businessType: ["", [Validators.required]],
      companyName: ["", [Validators.required]],
      status: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });

    this.catalogueProductService
      .viewIndentDetailsReport()
      .toPromise()
      .then((res: any) => {
        this.indentDetails = res.indentDetails;
        this.isLoading = false;
      });
  }
  public userRegister(){
    this.formSubmitted = true;

  }
  get f() {
    return this.adminSubmitForm.controls;
  }

}
