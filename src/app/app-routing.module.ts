import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./services/auth.guard";
import { LoginComponent } from "./login/login.component";
import { MapingDealerComponent } from "./maping-dealer/maping-dealer.component";
import { HomeComponent } from "./home/home.component";
import { CatalogueComponent } from "./catalogue/catalogue.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { CheckoutComponent } from "./product/checkout/checkout.component";
import { ReviewApprovalComponent } from "./review-approval/review-approval.component";
import { OrderSuccessComponent } from "./product/order-success/order-success.component";
import { IndentAbmApprovalComponent } from "./indent-abm-approval/indent-abm-approval.component";
import { RatFeedApprovalComponent } from "./rat-feed-approval/rat-feed-approval.component";
import { IndentAbmReportsComponent } from "./indent-abm-reports/indent-abm-reports.component";
import { FileUploadComponentComponent } from "./file-upload-component/file-upload-component.component";
import { CollectionLfeedbackComponent } from "./collection-lfeedback/collection-lfeedback.component";
import { IndentDetailsReportComponent } from "./indent-details-report/indent-details-report.component";
import { CollectionFeedbackDetailsReportComponent } from "./collection-feedback-details-report/collection-feedback-details-report.component";
import { RMRSFileUploadComponent } from "./rmrsfile-upload/rmrsfile-upload.component";
import { RMRSReportDetailsComponent } from "./rmrsreport-details/rmrsreport-details.component";
import { SummaryLevelReportComponent } from "./summary-level-report/summary-level-report.component";
import { LFSMarchandiserReportComponent } from "./lfsmarchandiser-report/lfsmarchandiser-report.component";
import { LFSIndentUploadComponent } from "./lfsindent-upload/lfsindent-upload.component";
import { AngularsouploadComponent } from "./angularsoupload/angularsoupload.component";
import { AngularrmsuploadComponent } from "./angularrmsupload/angularrmsupload.component";
import { AngularLFSUploadComponent } from "./angular-lfsupload/angular-lfsupload.component";
import { AngularECOMUploadComponent } from './angular-ecomupload/angular-ecomupload.component';
import { AngularAbmuploadComponent } from './angular-abmupload/angular-abmupload.component';
import { RatingReportComponent } from "./rating-report/rating-report.component";
import { UserManualComponent } from "./user-manual/user-manual.component";
import { ECOMIndentReportsComponent } from './ecom-indent-reports/ecom-indent-reports.component';
import { OrderDownloadAbmComponent } from './order-download-abm/order-download-abm.component';
import { OrderUploadAbmComponent } from './order-upload-abm/order-upload-abm.component';
import { OrderDownloadRbmComponent } from './order-download-rbm/order-download-rbm.component';
import { OrderUploadRbmComponent } from './order-upload-rbm/order-upload-rbm.component';
import { AdminUploadComponent } from './admin-upload/admin-upload.component';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full"},
  { path: "login", component: LoginComponent },
  { path: "user-selection", component: MapingDealerComponent },
  { path: "home", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "catalogue",
    component: CatalogueComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "catalogue/:cat/:name",
    component: CatalogueComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "product-detail/:variantNumber",
    component: ProductDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: "checkout", 
    component: CheckoutComponent, 
    canActivate: [AuthGuard],
  },
  {
    path: "order-success/:orderId",
    component: OrderSuccessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "indent-approval",
    component: IndentAbmApprovalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "feedback-approval",
    component: RatFeedApprovalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "review-approval",
    component: ReviewApprovalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "indent-reports",
    component: IndentAbmReportsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "so-upload",
    component: FileUploadComponentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "collectionl-fedback",
    component: CollectionLfeedbackComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "indent-Details",
    component: IndentDetailsReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "collectionDetailsReport",
    component: CollectionFeedbackDetailsReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "RMRSUpload",
    component: RMRSFileUploadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "RMRSReports",
    component: RMRSReportDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "SummaryLevelReport",
    component: SummaryLevelReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "LFSMerchandiserReport",
    component: LFSMarchandiserReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "LFSIndent",
    component: LFSIndentUploadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "AngupathsouploadComponent",
    component: AngularsouploadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "AngupathrmsuploadComponent",
    component: AngularrmsuploadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "AngupathlfsuploadComponent",
    component: AngularLFSUploadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "ECOMmerchandiserUpload",
    component: AngularECOMUploadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "AbmUpload",
    component: AngularAbmuploadComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "ratingReport",
    component: RatingReportComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "user-manual",
    component: UserManualComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "ecom-reports",
    component: ECOMIndentReportsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "abmOrderDownload",
    component: OrderDownloadAbmComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "abmOrderUpload",
    component: OrderUploadAbmComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "rbmOrderDownload",
    component: OrderDownloadRbmComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "rbmOrderUpload",
    component: OrderUploadRbmComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "adminUpload",
    component: AdminUploadComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
