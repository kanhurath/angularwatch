import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DealerService } from "../services/different-dealer.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  error_message = false;
  errorMsg: string;
  selectedForm = "emp";
  isSpecial = true;

  btnClicked = "validateOtp";
  otpReceived = false;
  guestLoginError = "";

  guestsubmitted = false;
  guestForm: FormGroup;
  guest_error_message = false;
  guesterrorMsg: string;
  checkUserType = "";
  public contactus: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.getContactUsHelp();
    this.loginForm = this.formBuilder.group({
      userId: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });

    // If already loggedin
    if (this.authService.getUserId()) {
      this.router.navigate(["/home"]);
    }

    //guest login
    this.guestForm = this.formBuilder.group({
      mobileNumber: ["", [Validators.required, Validators.minLength(10)]],
      otpnum: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  private getContactUsHelp() {
    this.authService.getContactUsDetails().subscribe((data: any) => {
      this.contactus = data.ContactUsDetails;
      // console.log(this.contactus);
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }
  //Submitted from the UI
  public onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    let loginData = {
      login_id: this.loginForm.value.userId,
      password: this.loginForm.value.password,
    };
    sessionStorage.setItem("loginid", this.loginForm.value.userId);

    this.authService
      .login(loginData)
      .subscribe((data) => this.afterLogIn(data));
  }

  private afterLogIn(result) {
    DealerService.setAllDealers(result.mapping_Users);
    //sessionStorage.setItem("UserType", result.user_Type.userType);
    //SO LOGIN-1
    if (
      result.message[0].Message === "Login Success redirect to home" &&
      result.user_Type.userType === "SO"
    ) {
      this.checkUserType = result.user_Type.userType;
      sessionStorage.setItem("loginResponse", JSON.stringify(result));
      //sessionStorage.setItem("userType", this.checkUserType);
      this.router.navigateByUrl("/user-selection");
    } else if (
      //Retail Executive LOGIN-2
      result.message[0].Message === "Login Success redirect to home" &&
      result.user_Type.userType === "Retail Executive"
    ) {
      this.checkUserType = result.user_Type.userType;
      sessionStorage.setItem("loginResponse", JSON.stringify(result));
      this.router.navigateByUrl("/user-selection");
      // this.router.navigate(['/', 'home']);
    } else if (
      //ABM LOGIN-3
      result.message[0].Message === "Login Success redirect to home" &&
      result.user_Type.userType === "ABM"
    ) {
      this.checkUserType = result.user_Type.userType;
      sessionStorage.setItem("loginResponse", JSON.stringify(result));
      this.router.navigateByUrl("/user-selection");
    } else if (
      //Retail Merchandiser LOGIN-4
      result.message[0].Message === "Login Success redirect to home" &&
      result.user_Type.userType === "Retail Merchandiser"
    ) {
      this.checkUserType = result.user_Type.userType;
      sessionStorage.setItem("loginResponse", JSON.stringify(result));
      sessionStorage.setItem("userSession", JSON.stringify(result));
      sessionStorage.setItem(
        "userDetails",
        JSON.stringify(result.userDetails[0])
      );
      this.router.navigate(["/", "home"]);
    } else if (
      //LFS Merchandiser LOGIN-5
      result.message[0].Message === "Login Success redirect to home" &&
      result.user_Type.userType === "LFS Merchandiser"
    ) {
      this.checkUserType = result.user_Type.userType;
      sessionStorage.setItem("loginResponse", JSON.stringify(result));
      sessionStorage.setItem("userSession", JSON.stringify(result));
      sessionStorage.setItem(
        "userDetails",
        JSON.stringify(result.userDetails[0])
      );
      this.router.navigate(["/", "home"]);
    } else if (
      //RBM LOGIN-6
      result.message[0].Message === "Login Success redirect to home" &&
      result.user_Type.userType === "RBM"
    ) {
      this.checkUserType = result.user_Type.userType;
      sessionStorage.setItem("loginResponse", JSON.stringify(result));
      sessionStorage.setItem("userSession", JSON.stringify(result));
      sessionStorage.setItem(
        "userDetails",
        JSON.stringify(result.userDetails[0])
      );
      this.router.navigate(["/", "home"]);
    } else if (
      //Amazon Ecom
      result.message[0].Message === "Login Success redirect to home" &&
      result.user_Type.userType === "Amazon Ecom"
    ) {
      this.checkUserType = result.user_Type.userType;
      sessionStorage.setItem("loginResponse", JSON.stringify(result));
      sessionStorage.setItem("userSession", JSON.stringify(result));
      sessionStorage.setItem(
        "userDetails",
        JSON.stringify(result.userDetails[0])
      );
      this.router.navigate(["/", "home"]);
    } else if (
      //Filpkart Ecom
      result.message[0].Message === "Login Success redirect to home" &&
      result.user_Type.userType === "Filpkart Ecom"
    ) {
      this.checkUserType = result.user_Type.userType;
      sessionStorage.setItem("loginResponse", JSON.stringify(result));
      sessionStorage.setItem("userSession", JSON.stringify(result));
      sessionStorage.setItem(
        "userDetails",
        JSON.stringify(result.userDetails[0])
      );
      this.router.navigate(["/", "home"]);
    } else if (
      //TEC Ecom
      result.message[0].Message === "Login Success redirect to home" &&
      result.user_Type.userType === "TEC Ecom"
    ) {
      this.checkUserType = result.user_Type.userType;
      sessionStorage.setItem("loginResponse", JSON.stringify(result));
      sessionStorage.setItem("userSession", JSON.stringify(result));
      sessionStorage.setItem(
        "userDetails",
        JSON.stringify(result.userDetails[0])
      );
      this.router.navigate(["/", "home"]);
    } else if (
      //Market Place Ecom
      result.message[0].Message === "Login Success redirect to home" &&
      result.user_Type.userType === "Market Place Ecom"
    ) {
      this.checkUserType = result.user_Type.userType;
      sessionStorage.setItem("loginResponse", JSON.stringify(result));
      sessionStorage.setItem("userSession", JSON.stringify(result));
      sessionStorage.setItem(
        "userDetails",
        JSON.stringify(result.userDetails[0])
      );
      this.router.navigate(["/", "home"]);
    } else {
      this.error_message = true;
      this.errorMsg = result.message[0].Message;
      sessionStorage.setItem("status", "failure");
    }
    sessionStorage.setItem("userType", result.user_Type.userType);
  }

  //Guest Form
  get glf() {
    return this.guestForm.controls;
  }
  // OTP button click
  public sendOTP() {
    if (!this.guestForm.controls["mobileNumber"].valid) {
      this.guestLoginError = "Invalid Mobile Number";
      return;
    }
    const mobileNumber = this.guestForm.controls["mobileNumber"].value;
    // sessionStorage.setItem("GUESTLOGIN",mobileNumber);
    this.authService.guestLoginOTP(mobileNumber).subscribe((res: any) => {
      // alert(res.OTP);
      if (res.OTP) {
        // how to know that otp is returned or not
        this.otpReceived = true;
        this.guestLoginError = "";
      } else {
        this.guestLoginError = res.status;
      }
    });
  }

  //click on guest submit
  public onSubmitGuest() {
    this.guestsubmitted = true;
    // stop here if form is invalid
    if (this.guestForm.invalid) {
      return;
    }
    this.authService
      .guestValidateOtp(this.guestForm.value)
      .subscribe((res: any) => {
        if (res.Status === "Entered OTP is valid...") {
          sessionStorage.setItem("userType", "GUEST"); //Gautam
          this.guestLoginError = "";
          this.afterOtpValidation(this.guestForm.value.mobileNumber);
          if (this.guestLoginError == "Invalid OTP") {
            this.guestLoginError = this.guestLoginError;
          }
        } else {
          this.guestLoginError = res.Status;
        }
      });
  }

  private afterOtpValidation(mobileNumber: number) {
    this.authService.guestDetails(mobileNumber).subscribe((result: any) => {
      if (result.status.Success === "Success") {
        // guest detail sap code = dealer code //Gautam
        sessionStorage.setItem("dealercode", result.guestdata[0].sap_Code);
        sessionStorage.setItem("userSession", JSON.stringify(result));
        const guestInfo = result.guestdata[0];
        const userDetails = {
          ...guestInfo,
          userName: guestInfo.name,
          loginId: mobileNumber,
        };
        sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
        sessionStorage.setItem("UserType", "GUEST");

        this.router.navigate(["/", "home"]);
      } else {
        this.guestLoginError = "Invalid OTP";
      }
    });
  }
  //Help right click event
  onRightClick(e) {
    e.preventDefault();
    return false;
  }
  // ModalBox Help Show
  public showHelpModal(gDriveHelp) {
    this.modalService.open(gDriveHelp, { size: <any>"md", scrollable: true });
  }
}
