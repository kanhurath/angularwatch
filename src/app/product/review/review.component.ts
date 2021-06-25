import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";

import { CatalogueProductService } from "../../services/catalogue-product.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"],
})
export class ReviewComponent implements OnInit {
  @Input() variantNumber: string;
   // stars: number[] = [1, 2, 3, 4, 5];
  stars: number[] = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  feedbackRating = 0;
  charLimit = 250;
  formSubmitted = false;
  isProcessing = false;
  feedbackSuccessMsg: string;
  userType: string = "GUEST";
  feedbackForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private catalogueProductService: CatalogueProductService,
    private authService: AuthService
  ) {
    this.stars = this.stars.reverse();
  }

  ngOnInit(): void {
    this.userType = this.authService.getUserType();
    // if(!this.userType || this.userType === 'GUEST') {
    this.feedbackForm = this.fb.group({
      rating: ["", [Validators.required]],
      feedback: [""],
    });
    // } else {
    //   this.feedbackForm = this.fb.group({
    //     rating: ['', [Validators.required]],
    //     feedback: ['', [Validators.required, Validators.minLength(10)]],
    //   });
    // }
  }

  public submitFeedback() {
    this.formSubmitted = true;
    if (this.feedbackForm.valid) {
      this.isProcessing = true;
      const feedbackData = {
        ...this.feedbackForm.value,
        variantNumber: this.variantNumber,
      };
      this.catalogueProductService
        .submitFeedback(feedbackData)
        .subscribe((response) => {
          // this.feedbackForm.reset();
          this.formSubmitted = false;
          this.isProcessing = false;
          // this.feedbackRating = 0;
          this.feedbackSuccessMsg = "Feedback Submitted Successfully!";
          setTimeout(() => {
            this.feedbackSuccessMsg = "";
          }, 5000);
        });
    }
  }
  get f() {
    return this.feedbackForm.controls;
  }

  setRating(value: number) {
    this.feedbackRating = value;
    this.feedbackForm.patchValue({
      rating: value,
    });
  }
}


