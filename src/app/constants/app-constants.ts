import { environment } from "../../environments/environment";

export const BASIC_AUTH = {
  username: "....",
  password: ".....",
};
export const API_URLS = {
  LOGIN_URL: environment.apiBaseUrl + "/loginSubmit",
  LOGOUT_URL: environment.apiBaseUrl + "/api/logout",
  GUEST_GENERATE_OTP_URL: environment.apiBaseUrl + "/api/generateOtp",
  GUEST_VALIDATE_OTP_URL: environment.apiBaseUrl + "/api/validateOtp",
  GUEST_DETAILS_URL: environment.apiBaseUrl + "/api/guestdetalis",
  USER_TYPE_URL: environment.apiBaseUrl + "/api/getUserType",
  
  SUBMENU_URL: environment.apiBaseUrl + "/api/submenuList",
  SIDEFILTER_URL: environment.apiBaseUrl + "/api/sideFilter",
  CATALOGUE_URL: environment.apiBaseUrl + "/api/variantDetails",
  SINGLEPRODUCT_URL: environment.apiBaseUrl + "/api/singleProductApi",
  PDF_SHOW_URL: environment.apiBaseUrl + "/api/pdfNamesList",
  VIDEO_SHOW_URL: environment.apiBaseUrl + "/api/videoList",
  FEEDBACK_URL: environment.apiBaseUrl + "/api/savefeedback",
  PLACE_ORDER_URL: environment.apiBaseUrl + "/api/indentingAPI",
  ORDERS_URL: environment.apiBaseUrl + "/api/indentingApprovalOrders",
  ORDER_DETAILS_URL:
    environment.apiBaseUrl + "/api/allOrderDetailsbyOrderNumber",
  ORDER_APPROVAL_URL: environment.apiBaseUrl + "/api/approveABM",
  FEEDBACK_LIST_URL: environment.apiBaseUrl + "/api/getfeedbackdetails",
  INDENT_DETAILS_REPORT_URL:
    environment.apiBaseUrl + "/api/indentDetailsReportAPI",
  SOFILE_UPLOAD_URL: environment.apiBaseUrl + "/api/uploadSOFile", //Pending
  SAVE_COLLECTION_FEEDBACK_URL:
    environment.apiBaseUrl + "/api/savecollectionfeedback",
  INDENT_VARIANT_DETAILS_REPORT_URL:
    environment.apiBaseUrl + "/api/indentDetailsReport",
  COLLECTION_DETAILS_REPORT_URL:
    environment.apiBaseUrl + "/api/collectionFeedbackReport",
  RMRSINDENT_DETAILS_REPORT: environment.apiBaseUrl + "/api/RMRSReport",
  COLLECTION_FEEDBACKGET_URL: environment.apiBaseUrl + "/api/collectionFeedbackData",
  SUMMARY_LEVEL_URL: environment.apiBaseUrl + "/api/summaryLevelData",
  LFSMERCHANDISER_REPORT: environment.apiBaseUrl + "/api/LFSMarchandiserReport",
  RATING_REPORT_URL : environment.apiBaseUrl + "/api/RatingReport",
  ECOM_REPORT_URL : environment.apiBaseUrl + "/api/ECOMMarchandiserReport",
  CONTACTUS_DETAILS_URL : environment.apiBaseUrl + "/api/ContactUsDetails",
  ORDER_DOWNLOAD_ABM_URL : environment.apiBaseUrl + "/api/ABMOrdersDownloadAPI", 
  ORDER_DOWNLOAD_RBM_URL : environment.apiBaseUrl + "/api/RBMOrdersDownloadAPI",     
};
