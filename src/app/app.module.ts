import { BrowserModule } from "@angular/platform-browser";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { ErrorHandler, NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { MDBBootstrapModule, DropdownModule } from "angular-bootstrap-md";
import { MatTreeModule } from "@angular/material/tree";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RootErrorHandler } from "./services/root.error-handler";
import { NgxImageZoomModule } from "ngx-image-zoom";
//import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ClickOutsideModule } from "ng-click-outside";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { BasicAuthInterceptor } from "./services/basicauth.interceptor";
//For refresh issue:
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { OrderDownloadAbmService } from './services/order-download-abm.service';
import { OrderDownloadRbmService} from './services/order-download-rbm.service';

import { LoginComponent } from "./login/login.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { ProductDetailComponent } from "./product/product-detail/product-detail.component";
import { CheckoutComponent } from "./product/checkout/checkout.component";
import { CatalogueComponent } from "./catalogue/catalogue.component";
import { ReviewComponent } from "./product/review/review.component";
import { MapingDealerComponent } from "./maping-dealer/maping-dealer.component";
import { ReviewApprovalComponent } from "./review-approval/review-approval.component";
import { ClickOutside } from "./directives/click-outside.directive";
import { OrderSuccessComponent } from "./product/order-success/order-success.component";
import { FormatPricePipe } from "./pipes/format-price.pipe";
import {
  IndentAbmApprovalComponent,
  OrderDetailsDialogComponent,
} from "./indent-abm-approval/indent-abm-approval.component";
import { RatFeedApprovalComponent } from "./rat-feed-approval/rat-feed-approval.component";
import { IndentAbmReportsComponent } from "./indent-abm-reports/indent-abm-reports.component";
//import {AgGridModule} from 'ag-grid-angular';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
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
import { AngularrmsuploadComponent } from './angularrmsupload/angularrmsupload.component';
import { AngularLFSUploadComponent } from './angular-lfsupload/angular-lfsupload.component';
import { AngularECOMUploadComponent } from './angular-ecomupload/angular-ecomupload.component';
import { RatingReportComponent } from './rating-report/rating-report.component';
import { UserManualComponent } from './user-manual/user-manual.component';
import { ECOMIndentReportsComponent } from './ecom-indent-reports/ecom-indent-reports.component';
import { AngularAbmuploadComponent } from './angular-abmupload/angular-abmupload.component';
import { OrderDownloadAbmComponent } from './order-download-abm/order-download-abm.component';
import { OrderUploadAbmComponent } from './order-upload-abm/order-upload-abm.component';
import { OrderDownloadRbmComponent } from './order-download-rbm/order-download-rbm.component';
import { OrderUploadRbmComponent } from './order-upload-rbm/order-upload-rbm.component';
import { AdminUploadComponent } from './admin-upload/admin-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailComponent,
    CatalogueComponent,
    ReviewComponent,
    MapingDealerComponent,
    CheckoutComponent,
    ReviewApprovalComponent,
    ClickOutside,
    OrderSuccessComponent,
    FormatPricePipe,
    IndentAbmApprovalComponent,
    OrderDetailsDialogComponent,
    RatFeedApprovalComponent,
    IndentAbmReportsComponent,
    FileUploadComponentComponent,
    CollectionLfeedbackComponent,
    IndentDetailsReportComponent,
    CollectionFeedbackDetailsReportComponent,
    RMRSFileUploadComponent,
    RMRSReportDetailsComponent,
    SummaryLevelReportComponent,
    LFSMarchandiserReportComponent,
    LFSIndentUploadComponent,
    AngularsouploadComponent,
    AngularrmsuploadComponent,
    AngularLFSUploadComponent,
    RatingReportComponent,
    UserManualComponent,
    AngularECOMUploadComponent,
    ECOMIndentReportsComponent,
    AngularAbmuploadComponent,
    OrderDownloadAbmComponent,
    OrderUploadAbmComponent,
    OrderDownloadRbmComponent,
    OrderUploadRbmComponent,
    AdminUploadComponent,
  ],
  imports: [
    BrowserModule,
    DragDropModule,
    PdfViewerModule,
    MDBBootstrapModule.forRoot(),
    DropdownModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    MatAutocompleteModule,
    MatInputModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    NgbModule,
    NgxImageZoomModule,
    ClickOutsideModule,
    MatSnackBarModule,
    MatDialogModule,
    //AgGridModule.withComponents([]),
    NgxDatatableModule,
  ],
  providers: [
    { provide: OrderDownloadAbmService },
    { provide: OrderDownloadRbmService },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RootErrorHandler, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  
  bootstrap: [AppComponent],
})
export class AppModule {}
