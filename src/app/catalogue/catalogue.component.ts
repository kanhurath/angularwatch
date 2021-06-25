import { Component, OnInit } from "@angular/core";
import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  RoutesRecognized,
} from "@angular/router";
import { filter, pairwise } from "rxjs/operators";
import { CatalogueProductService } from "../services/catalogue-product.service";
import { PagerService } from "../services/pagination.service";
// import { Product } from "../models/catalogue";

@Component({
  selector: "app-catalogue",
  templateUrl: "./catalogue.component.html",
  styleUrls: ["./catalogue.component.scss"],
})
export class CatalogueComponent implements OnInit {
  public isLoading: boolean;
  // public stars = [1, 2, 3, 4, 5];
  public initialProducts: any[];
  public products: any[];
  public currPage = 0;
  public totalPages = 1;
  public pageSize = 12;
  public pagedItems: any[];

  public brands: any[] = [];
  public selectedBrands: any[] = [];
  public initialCollections: any[] = [];
  public collections: any[] = [];
  public selectedCollections: any[] = [];
  public loadingMore = false;
  isShow = false;

  toggleDisplay() {
    this.isShow = !this.isShow;
  }

  constructor(
    private router: Router,
    private catalogueProductService: CatalogueProductService,
    private route: ActivatedRoute,
    private pagerService: PagerService
  ) {
    // this.router.events
    //   .pipe(filter((event) => event instanceof NavigationEnd))
    //   .subscribe((event: NavigationEnd) => {
    //     console.log("prev:", event.url);
    //     console.log("prev:", event);
    //     // this.previousUrl = event.url;
    //   });
  }

  ngOnInit(): void {
    this.getProducts();
    this.getFilters();

    if (sessionStorage.getItem("selectedBrands")) {
      this.selectedBrands = JSON.parse(
        sessionStorage.getItem("selectedBrands")
      );
    }
    if (sessionStorage.getItem("selectedCollections")) {
      this.selectedCollections = JSON.parse(
        sessionStorage.getItem("selectedCollections")
      );
    }

    setTimeout(() => {
      this.filterProducts();
    }, 1000);

    // this.router.events
    //   .pipe(
    //     filter((evt: any) => evt instanceof RoutesRecognized),
    //     pairwise()
    //   )
    //   .subscribe((events: RoutesRecognized[]) => {
    //     const previousUrl = events[0].urlAfterRedirects;
    //     // alert(previousUrl.includes('product-detail'));
    //     if(previousUrl.includes('product-detail')) {
    //       if (sessionStorage.getItem("selectedBrands")) {
    //         this.selectedBrands = JSON.parse(
    //           sessionStorage.getItem("selectedBrands")
    //         );
    //       }
    //       if (sessionStorage.getItem("selectedCollections")) {
    //         this.selectedCollections = JSON.parse(
    //           sessionStorage.getItem("selectedCollections")
    //         );
    //       }
    //     }
    //   });
  }

  private getProducts() {
    this.isLoading = true;
    this.catalogueProductService
      .getProducts()
      .toPromise()
      .then((data: any) => {
        this.isLoading = false;
        this.initialProducts = data.brandNames;
        this.products = [...this.initialProducts];
        this.totalPages = Math.ceil(this.products.length / this.pageSize);
        // this.loadMore();
        this.filterProducts();
      });
  }

  private getFilters() {
    this.catalogueProductService.getSlidebarMenu().subscribe((data: any) => {
      this.brands = data.brandNamesList.brandNames;
      this.initialCollections = data.collectionsList.collectionsNames;
      this.collections = [...this.initialCollections];
    });
  }

  public loadMore() {
    this.loadingMore = true;
    this.currPage++;
    const endIndex = this.pageSize * this.currPage;
    this.pagedItems = this.products.slice(0, endIndex);
    this.loadingMore = false;
  }

  trackByMethod(index: number, el: any): number {
    return el.id;
  }

  public onChangeBrand(brandName: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedBrands.push(brandName);
    } else {
      let index = this.selectedBrands.indexOf(brandName);
      this.selectedBrands.splice(index, 1);
    }
    sessionStorage.setItem(
      "selectedBrands",
      JSON.stringify(this.selectedBrands)
    );

    this.collections = this.initialCollections.filter((el) => {
      if (
        this.selectedBrands.length === 0 ||
        this.selectedBrands.includes(el.brandName)
      ) {
        return el;
      }
    });

    this.filterProducts();
  }

  public onChangeCollection(collectionName: string, isChecked: boolean) {
    if (isChecked) {
      this.selectedCollections.push(collectionName);
    } else {
      let index = this.selectedCollections.indexOf(collectionName);
      this.selectedCollections.splice(index, 1);
    }
    sessionStorage.setItem(
      "selectedCollections",
      JSON.stringify(this.selectedCollections)
    );
    this.filterProducts();
  }

  private filterProducts() {
    this.loadingMore = true;
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

    // Load more code start
    this.currPage = 0;
    this.totalPages = Math.ceil(this.products.length / this.pageSize);
    this.loadMore();
  }

  public resetFilter() {
    this.selectedBrands = [];
    this.selectedCollections = [];
    this.collections = [...this.initialCollections];
    sessionStorage.removeItem("selectedBrands");
    sessionStorage.removeItem("selectedCollections");
    this.filterProducts();
  }
}
