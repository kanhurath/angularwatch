import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CatalogueProductService } from "../services/catalogue-product.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-collection-lfeedback",
  templateUrl: "./collection-lfeedback.component.html",
  styleUrls: ["./collection-lfeedback.component.scss"],
})
export class CollectionLfeedbackComponent implements OnInit {
  public brands: any[] = [];
  public selectedBrand = "";
  public initialCollections: any[] = [];
  public collections: any[] = [];
  public allVariant: any[] = [];
  public guestsubmitted = false;
  public collectionFeedbackForm: FormGroup;
  public formSubmitted = false;
  public collectionfeedbackSuccessMsg: string;
  public usertype = sessionStorage.getItem("userType");
  public dealercodevalue = sessionStorage.getItem("dealercode");
  public variantImage: string;

  public products: any[] = [];
  public initialProducts: any[];
  public selectedBrands: any[] = [];
  public selectedCollections: any[] = [];
  public allProduct: any[];

  @ViewChild("selectedBrand") brand: ElementRef;
  brandnamevalue: any;
  collectionname: any;
  variantnumber: any;
  lookretrivevalue: any;
  priceretrivevalue: any;
  othersretrivevalue: any;
  fetchVarientsInProgress = false;
  submitInProgress = false;

  constructor(
    private catalogueProductService: CatalogueProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.catalogueProductService.getSlidebarMenu().subscribe((data: any) => {
      console.log("product details", data);
      this.brands = data.brandNamesList.brandNames;
      this.initialCollections = data.collectionsList.collectionsNames;
    });

    this.collectionFeedbackForm = this.fb.group({
      brand: ["", [Validators.required]],
      collection: ["", [Validators.required]],
      variant_number: [""],
      price: [""],
      look: [""],
      others: [""],
    });
  }

  setCollection(event) {
    this.selectedBrands = [];
    this.brandnamevalue = event;
    this.selectedBrands.push(this.brandnamevalue);
    const brandName = this.brand.nativeElement.value;
    this.collections = this.initialCollections.filter((el) => {
      if (el.brandName === brandName) {
        return el;
      }
    });
  }

  setVariant(event) {
    this.collectionname = event;
    this.selectedCollections = [];
    this.collectionname = event;
    this.selectedCollections.push(this.collectionname);
    this.catalogueProductService
      .getProducts()
      .toPromise()
      .then((data: any) => {
        this.initialProducts = data.brandNames;
        this.products = [...this.initialProducts];
        this.filterProducts();
      });
  }

  filterProducts() {
    this.products = this.initialProducts.filter((p) => {
      let brandFilterPassed = true;
      let collectionFilterPassed = true;
      if (this.selectedBrands.length) {
        brandFilterPassed = this.selectedBrands.includes(p.name);
      }
      if (this.selectedCollections.length) {
        collectionFilterPassed = this.selectedCollections.includes(
          p.collection
        );
      }
      if (brandFilterPassed && collectionFilterPassed) {
        return p;
      }
    });

    this.getAllvariant();
  }

  displayImage(event) {
    console.log(this.allVariant);
    console.log(event);
    for (let variant of this.allVariant) {
      if (variant.variantNumber == event) {
        this.variantImage = variant.imageLocation;
        break;
      }
    }
    console.log(this.variantImage);
  }
  getAllvariant() {
    this.allVariant = this.products;
    this.getcollection();
  }

  getcollection() {
    //this.variantnumber = event;
    this.allVariant = this.products;

    const data: {
      dealer_code: any;
      user_type: any;
      brand: any;
      collection: any;
      variant_number: any;
    } = {
      dealer_code: this.dealercodevalue,
      user_type: this.usertype,
      brand: this.brandnamevalue,
      collection: this.collectionname,
      variant_number: this.variantnumber,
    };
    console.log("data", data);
    this.fetchVarientsInProgress = true;
    this.catalogueProductService.feedbackformgetvalue(data).subscribe(
      (data) => {
        this.fetchVarientsInProgress = false;
        var arrayvalue = data["collectionFeedback"];

        if (arrayvalue.length == 1) {
          this.lookretrivevalue = arrayvalue[0].look;
          this.othersretrivevalue = arrayvalue[0].others;
          this.priceretrivevalue = arrayvalue[0].price;
          this.variantnumber = arrayvalue[0].variant_number;
          this.collectionFeedbackForm.controls["variant_number"].patchValue(
            arrayvalue[0].variant_number
          );
        } else {
          this.lookretrivevalue = null;
          this.othersretrivevalue = null;
          this.priceretrivevalue = null;
          this.variantnumber = "";
          this.variantImage = "";
        }
      },
      (error) => {
        this.fetchVarientsInProgress = false;
        console.log(error);
      }
    );
  }
  //Calculation L Feedback
  public saveCollectionFeedback() {
    this.formSubmitted = true;
    if (this.collectionFeedbackForm.valid) {
      const catalogueProductServiceData = {
        ...this.collectionFeedbackForm.value,
      };
      this.submitInProgress = true;
      this.catalogueProductService
        .saveCollectionFeedback(catalogueProductServiceData)
        .subscribe((response) => {
          this.submitInProgress = false;
          this.collectionfeedbackSuccessMsg =
            "Collection Feedback Submitted Successfully!";
          setTimeout(() => {
            this.collectionfeedbackSuccessMsg = "";
          }, 5000);
          this.formSubmitted = true;
          this.collectionFeedbackForm.reset({
            brand: "",
            collection: "",
          });
          this.collections = [];
          this.formSubmitted = false;
        });
    }
  }

  get f() {
    return this.collectionFeedbackForm.controls;
  }
}
