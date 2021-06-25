import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { startWith, map, switchMap } from "rxjs/operators";
import { DealerService } from "../services/different-dealer.service";
import { Dealer } from "../models/maping-dealer";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-maping-dealer",
  templateUrl: "./maping-dealer.component.html",
  styleUrls: ["./maping-dealer.component.scss"],
})
export class MapingDealerComponent implements OnInit {
  public loginResponse: any;
  selectedUserType: string = "";
  $allDealers: Observable<Dealer[]>;
  $filteredDealers: Observable<Dealer[]>;
  public hideUserSection = true;
  checkUserType: string;
  //soform: number;

  constructor(
    private formBuilder: FormBuilder,
    private dealerService: DealerService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    let loginResponse  = JSON.parse(sessionStorage.getItem("loginResponse"));
    this.loginResponse = loginResponse;
    DealerService.setAllDealers(loginResponse.mapping_Users); 

    //console.log("all Delear", DealerService.getAllDealers());
    this.$allDealers = DealerService.getAllDealers();
   // console.log("dealer",loginResponse.mapping_Users);

    this.$filteredDealers = this.dealer.valueChanges.pipe(
      startWith(""),
      switchMap((value) => this.filterDealers(value))
    );

    this.authService.loginUserType().subscribe((res: any) => {
      this.checkUserType = res.userType.userType;
    });
  }

  onUserTypeSelect(userType: string) {
    console.log(userType);
    if (userType == "SO") {
      //not Use
      //this.soform = 1
    } else {
      //this.soform = 0
      this.hideUserSection = true;
    }

    sessionStorage.setItem("selfusertype", userType);
    this.selectedUserType = userType;
    this.$filteredDealers = this.dealer.valueChanges.pipe(
      startWith(""),
      switchMap((value) => this.filterDealers(value))
    );
  }

  private filterDealers(value: string | Dealer) {
    console.log(value);
    if (!this.selectedUserType) {
      return of([]);
    }
    let filterValue =
      //typeof value === "string"? value.toLowerCase():value.name.toLowerCase();
      typeof value === "string"? value.toLowerCase():'';
    return this.$allDealers.pipe(
      map((dealers) =>
        dealers.filter(
          (dealer) =>
            dealer.name.toLowerCase().includes(filterValue) &&
            dealer.userType == this.selectedUserType
        )
      )
    );
  }

  public displayFn(dealer?: Dealer): string | undefined {
    return dealer ? dealer.name : undefined;
  }

  dealerForm = this.formBuilder.group({
    dealer: [null, Validators.required],
    optradio:[],
  });

  get dealer() {
    return this.dealerForm.get("dealer");
  }
  /*
  select  dealer page submit
  */
  onFormSubmit() {
    // for the dealer type radio button.
    sessionStorage.setItem("SelectedDealerType", this.selectedUserType);

    if (!this.dealerForm.valid) {
      return false;
    }

    if (this.dealerForm.valid) {
      // alert(this.dealerForm.value.dealer);
      sessionStorage.setItem(
        "selectedDealer",
        JSON.stringify(this.dealerForm.value.dealer) // this will contain selected dealer
      );
    }
    // }
    sessionStorage.setItem("dealercode", this.dealerForm.value.dealer.userCode);
    const result = JSON.parse(sessionStorage.getItem("loginResponse"));
    sessionStorage.setItem("dealername", this.dealerForm.value.dealer.name);
    sessionStorage.setItem("userSession", JSON.stringify(result));
    sessionStorage.setItem("userDetails", JSON.stringify(result.userDetails[0])
    );
    sessionStorage.setItem("userType", result.user_Type.userType);
    this.router.navigateByUrl("/home");
    this.dealerForm.reset();
  }

  public resetForm() {
    // console.log("formvalue",this.dealerForm.value.usertype);
    // this.onUserTypeSelect(this.dealerForm.value.usertype);
    this.dealerForm.reset();
  }
}
