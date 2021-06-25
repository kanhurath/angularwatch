import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss']
})
export class OrderSuccessComponent implements OnInit {
  orderId: string;
  user: any;

  constructor(private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = params.orderId;
    });
    const userSession = this.authService.getUserSession();
    this.user = userSession.userDetails[0];
  }

}
