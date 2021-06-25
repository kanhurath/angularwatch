import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpHeaders,
} from "@angular/common/http";
import { filter, map, tap } from "rxjs/operators";
import { of, Subject, Observable } from "rxjs";
import { CartItem } from "../models/cartitem";
import { API_URLS } from "../constants/app-constants";
import { AuthService } from "./auth.service";
import {
  Headers,
  Http,
  Response,
  RequestOptions,
  RequestMethod,
} from "@angular/http";

import { GlobalVariable } from "./global-upload.service"; //Global Upload URL Service

@Injectable({
  providedIn: "root",
})
export class CatalogueProductService {
  private cartUpdatedSub = new Subject();

  constructor(
    private httpservicenew: Http,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  /**
   * Get Menu List
   */
  getSlidebarMenu() {
    return this.http.get(API_URLS.SIDEFILTER_URL);
  }

  /**
   * Post all the products
   */
  getProducts() {
    return this.http.get(API_URLS.CATALOGUE_URL);
  }

  /**
   * @param varientNumber
   * Get product details
   */
  getProductDetails(varientNumber: string) {
    const empCode = this.authService.getUserId();
    let postObj = {
      login_id: empCode,
      variant_Number: varientNumber,
    };
    return this.http.post(API_URLS.SINGLEPRODUCT_URL, postObj).pipe(
      map((data) => {
        let images = [];
        for (let i = 1; i <= 5; i++) {
          images.push(
            `assets/images/Product-images/${varientNumber}/${varientNumber}_${i}.jpg`
          );
        }
        return { ...data, images };
      })
    );
  }

  submitFeedback(feedbackData: any) {
    const userType = this.authService.getUserType();
    const userDetails = this.authService.getuserDetails();

    let postData = {};
    // If Guest
    if (this.authService.isGuest) {
      postData = {
        ...feedbackData,
        login_id: this.authService.getUserId(),
        userType: userType,
        dealer: "",
        abmcode: "",
        rscode: "",
      };
    } else {
      // If User
      const selectedDealer = this.authService.getSelectedDealer();
      postData = {
        ...feedbackData,
        login_id: this.authService.getUserId(),
        userType: userType,
        dealer: selectedDealer.userCode,
        abmcode: selectedDealer.abmcode,
        rscode: selectedDealer.rsCode,
      };
    }
    return this.http.post(API_URLS.FEEDBACK_URL, postData);
  }

  getCartUpdatedSub() {
    return this.cartUpdatedSub.asObservable();
  }

  addToCart(item: CartItem, qty: number) {
    let cartItems = [];
    if (sessionStorage.getItem("cartItems")) {
      let cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
      const index = cartItems.findIndex(
        (cartItem) => cartItem.variant_number === item.variant_number
      );
      if (index === -1) {
        cartItems = [
          { ...item, qty: qty },
          ...JSON.parse(sessionStorage.getItem("cartItems")),
        ];
      } else {
        const newQty = cartItems[index]["qty"] + qty;
        if (newQty > 0) {
          cartItems[index]["qty"] = newQty;
        } else {
          this.removeItem(item);
        }
      }
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      cartItems = [{ ...item, qty: qty }];
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
    this.cartUpdatedSub.next(true);
    // console.log(sessionStorage.getItem("cartItems"));
    const msg =
      qty > 1
        ? `${qty} quantity added to cart successfully!`
        : `1 quantity added to cart successfully!`;
    return of({ msg });
  }

  getCartItems() {
    if (sessionStorage.getItem("cartItems")) {
      return of(JSON.parse(sessionStorage.getItem("cartItems")));
    }
    return of([]);
  }

  removeItem(item: CartItem) {
    const cartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    const updatedCartItems = cartItems.filter(
      (el) => el.variant_number !== item.variant_number
    );
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    this.cartUpdatedSub.next(true);
    return of({ msg: "Product removed from cart successfully!" });
  }

  clearCart() {
    sessionStorage.removeItem("cartItems");
    this.cartUpdatedSub.next(true);
    return of({ msg: "Cart cleared successfully!" });
  }

  placeOrder(items: CartItem[]) {
    const userSession = this.authService.getUserSession();
    const selectedDealer = this.authService.getSelectedDealer();

    let postObj = {
      indenting: items,
      login_code: userSession.userDetails[0]["loginId"],
      abm_code: selectedDealer.abmcode,
      dealer: selectedDealer.userCode,
      rscode: selectedDealer.rscode, //userSession.userDetails[0]['loginId'], // this is not RS
      userType: userSession.user_Type.userType,
      createdBy: userSession.userDetails[0]["userName"],
    };
    return this.http.post(API_URLS.PLACE_ORDER_URL, postObj);
  }
  viewOrders() {
    const selectedDealer = this.authService.getSelectedDealer();
    const login_id = selectedDealer.abmcode;
    return this.http.post(API_URLS.ORDERS_URL, { login_id });
  }

  viewOrderDetails(orderNumber: string) {
    return this.http.post(API_URLS.ORDER_DETAILS_URL, { orderNumber });
  }

  approveOrder(orderNumber: string) {
    const selectedDealer = this.authService.getSelectedDealer();
    const approvedByABM = selectedDealer.abmcode;
    return this.http.post(API_URLS.ORDER_APPROVAL_URL, {
      orderNumber,
      approvedByABM,
    });
  }

  viewFeedbacks() {
    const login_id = this.authService.getSelectedDealer(); //this.authService.getUserId();
    return this.http.post(API_URLS.FEEDBACK_LIST_URL, { login_id });
  }

  //ECOM Indent Reports
  ECOMReportDetail() {
    const userSession = this.authService.getUserSession();
    const login_Id = userSession.userDetails[0]["loginId"];
    return this.http.post(API_URLS.ECOM_REPORT_URL, { login_Id });
  }

  //SO Upload
  angularsoupload(formdata) {
    console.log(formdata);
    let headers = new Headers();
    var urlvalue = GlobalVariable.UPLOAD_BASE_API_URL + "uploadAnguSOFilePost";
    let options = new RequestOptions({ headers: headers });
    return this.httpservicenew.post(urlvalue, formdata, options);
  }

  //RMRS Upload
  angularRMSupload(formdata) {
    console.log(formdata);
    let headers = new Headers();
    var urlvalue = GlobalVariable.UPLOAD_BASE_API_URL + "uploadAnguRMSFilePost";
    let options = new RequestOptions({ headers: headers });
    return this.httpservicenew.post(urlvalue, formdata, options);
  }

  //ECOM Upload
  angularEcomupload(formdata) {
    console.log(formdata);
    let headers = new Headers();
    var urlvalue =
      GlobalVariable.UPLOAD_BASE_API_URL + "ECOMFileUploadAngularPost";
    let options = new RequestOptions({ headers: headers });
    return this.httpservicenew.post(urlvalue, formdata, options);
  }

  //ABM Upload
  angularabmupload(formdata) {
    console.log(formdata);
    let headers = new Headers();
    var urlvalue = GlobalVariable.UPLOAD_BASE_API_URL + "uploadAnguSOFilePost";
    let options = new RequestOptions({ headers: headers });
    return this.httpservicenew.post(urlvalue, formdata, options);
  }

  // LFS upload
  angularlfsupload(formdata) {
    console.log(formdata);
    let headers = new Headers();
    var urlvalue =
      GlobalVariable.UPLOAD_BASE_API_URL + "LFSFileUploadAngularPost";
    let options = new RequestOptions({ headers: headers });
    return this.httpservicenew.post(urlvalue, formdata, options);
  }

  //CSV Format ABM Order Download(FS10)
  downloadAbmOrder() {
    const selectedDealer = this.authService.getSelectedDealer();
    const abmCode = selectedDealer.abmcode;
    return this.http.post(API_URLS.ORDER_DOWNLOAD_ABM_URL, { abmCode });
  }

  //CSV Format ABM Order Upload(FS10)
  AbmOrderUploadCsv(formdata) {
    console.log(formdata);
    let headers = new Headers();
    var urlvalue =
      GlobalVariable.UPLOAD_BASE_API_URL + "uploadABMOrdersCSVFile";
    let options = new RequestOptions({ headers: headers });
    return this.httpservicenew.post(urlvalue, formdata, options);
  }

  //CSV Format RBM Order Download(FS10)
  downloadRbmOrder() {
    const rbmCode = sessionStorage.getItem("loginid");
    return this.http.post(API_URLS.ORDER_DOWNLOAD_RBM_URL, { rbmCode });
  }

  //CSV Format RBM Order Upload(FS10)
  RbmOrderUploadCsv(formdata) {
    console.log(formdata);
    let headers = new Headers();
    var urlvalue =
      GlobalVariable.UPLOAD_BASE_API_URL + "uploadRBMOrdersCSVFile";
    let options = new RequestOptions({ headers: headers });
    return this.httpservicenew.post(urlvalue, formdata, options);
  }

  //Admin Upload
  // angularAdminupload(formdata) {
  //   console.log(formdata);
  //   let headers = new Headers();
  //   var urlvalue = GlobalVariable.UPLOAD_BASE_API_URL + "uploadAnguSOFilePost";
  //   let options = new RequestOptions({ headers: headers });
  //   return this.httpservicenew.post(urlvalue, formdata, options);
  // }
  //Admin Upload End

  feedbackformgetvalue(data) {
    let postObject = {
      brand: data.brand,
      collection: data.collection,
      dealer_code: data.dealer_code,
      user_type: data.user_type,
    };
    return this.http.post(API_URLS.COLLECTION_FEEDBACKGET_URL, postObject);
  }

  //SAVE_COLLECTION_FEEDBACK_URL
  saveCollectionFeedback(data: any) {
    const userType = this.authService.getUserType();
    const userDetails = this.authService.getuserDetails();
    const usertype = sessionStorage.getItem("userType");
    const dealercodevalue = sessionStorage.getItem("dealercode");
    let postObject = {
      ...data,
      login_id: userDetails.loginId,
      so_name: userDetails.userName,
      user_type: userType,
      abm_name: "",
      rbm_name: "",
      dealer_name: "",
      dealer_code: dealercodevalue,
    };

    if (!this.authService.isGuest) {
      const selectedDealer = this.authService.getSelectedDealer();
      postObject = {
        ...postObject,
        abm_name: selectedDealer.abmcode, // doubt
        rbm_name: selectedDealer.rbmcode,
        dealer_name: selectedDealer.name,
        dealer_code: selectedDealer.userCode,
      };
    }
    return this.http.post(API_URLS.SAVE_COLLECTION_FEEDBACK_URL, postObject);
  }

  // SO Indent Summary Details report
  viewIndentDetailsReport() {
    const selectedDealer = this.authService.getSelectedDealer();
    const userSession = this.authService.getUserSession();
    const login_id = userSession.userDetails[0]["loginId"];

    return this.http.post(API_URLS.INDENT_DETAILS_REPORT_URL, { login_id });
  }

  // Thirumalesh 08-09-2020 for Indent Variant Details report
  indentVariantDetailsReport() {
    const userSession = this.authService.getUserSession();
    const selectedDealer = this.authService.getSelectedDealer();
    const login_id = userSession.userDetails[0]["loginId"];
    const userType = userSession.user_Type.userType;
    // alert(login_id+"User Type :"+userType);
    return this.http.post(API_URLS.INDENT_VARIANT_DETAILS_REPORT_URL, {
      login_id,
      userType,
    });
  }

  // Indent Variant Details report
  RMRSReportDetails() {
    const userSession = this.authService.getUserSession();
    const login_Id = userSession.userDetails[0]["loginId"];
    return this.http.post(API_URLS.RMRSINDENT_DETAILS_REPORT, { login_Id });
  }

  LFSMerchandiserReportDetails() {
    const userSession = this.authService.getUserSession();
    const login_Id = userSession.userDetails[0]["loginId"];
    return this.http.post(API_URLS.LFSMERCHANDISER_REPORT, { login_Id });
  }
  //SummaryLevel report for CFA Location
  SummaryLevelReport() {
    return this.http.get(API_URLS.SUMMARY_LEVEL_URL);
  }

  //CollectionLevelFeedbakDetailsReport
  collectionFeedbackDetailsReport() {
    const userSession = this.authService.getUserSession();
    const selectedDealer = this.authService.getSelectedDealer();

    // const userSession = JSON.parse(sessionStorage.getItem("userSession"));
    const login_id = userSession.userDetails[0]["loginId"];
    const userType = userSession.user_Type.userType;
    // alert(login_id+"User Type :"+userType);
    return this.http.post(API_URLS.COLLECTION_DETAILS_REPORT_URL, {
      login_id,
      userType,
    });
  }

  //Rating Report provided by SO/ABM/RBM
  ratingDetailsReport() {
    const userSession = this.authService.getUserSession();
    const login_Id = userSession.userDetails[0]["loginId"];
    return this.http.post(API_URLS.RATING_REPORT_URL, { login_Id });
  }

  // Thirumalesh 07-09-2020 // not used
  // pushFileToStorage(file: File): Observable<HttpEvent<any>> {
  //   const formdata: FormData = new FormData();
  //   const selectedDealer = this.authService.getSelectedDealer();
  //   const abmcode = selectedDealer.abmcode;
  //   const rsCode = selectedDealer.rsCode;
  //   const userType = selectedDealer.userType;
  //   const userSession = JSON.parse(sessionStorage.getItem("userSession"));
  //   const userName = userSession.userDetails[0]["userName"];
  //   formdata.append("file", file, file.name);
  //   // formdata.append('rsCode', rsCode);
  //   // formdata.append('abmcode', abmcode);
  //   // formdata.append('userType', userType);
  //   // formdata.append('userName', userName);

  //   // console.log("File Name : "+file.name)
  //   let headers = new HttpHeaders();
  //   headers.append("Content-Type", "multipart/form-data");
  //   // headers.append('Accept', 'application/json');
  //   // let options = { headers: headers };

  //   // alert("formdata"+abmcode+"rsCode"+rsCode+"userTYpe"+userType+"FileData"+file+"userName"+userName);
  //   console.log("formdata : " + formdata);
  //   // const req = null;
  //   // const req = new HttpRequest('POST', API_URLS.SOFILE_UPLOAD_URL, formdata, {
  //   const req = new HttpRequest(
  //     "POST",
  //     "http://localhost:8080/ProductPreLaunch/api/uploadSOFile",
  //     formdata,
  //     {
  //       reportProgress: true,
  //       headers: headers,
  //       responseType: "json",
  //     }
  //   );

  //   // console.log("Request : " + req.params.getAll);
  //   return this.http.request(req);
  // }
}
