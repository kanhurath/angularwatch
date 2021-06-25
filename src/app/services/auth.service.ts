import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_URLS } from '../constants/app-constants';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const currentUser = userDetails ? userDetails : {};
    this.currentUserSubject = new BehaviorSubject<User>(currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  //Get ContactUs api 
  getContactUsDetails() {
    return this.http.get(API_URLS.CONTACTUS_DETAILS_URL);
  }
  //Get ContactUs api END
  public login(loginData: { login_id: string; password: string }) {
    return this.http.post(API_URLS.LOGIN_URL, loginData);
  }

  public onLogout(postObj) {
    return this.http.post(API_URLS.LOGOUT_URL, postObj);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get isLoggedIn() {
    if (sessionStorage.getItem('userSession')) {
      return true;
    }
    return false;
  }
//DealersList
  // public get dealersList() {
  //   if (sessionStorage.getItem('dealersList')) {
  //     return true;
  //   }
  //   return false;
  // }
  // public getDealersList() {
  //   if (sessionStorage.getItem('dealersList')) {
  //     const dealersList = JSON.parse(sessionStorage.getItem('dealersList'));
  //     return dealersList;
  //   }
  //   return null;
  // }
  //Retail Merchandiser Login
  public loginUserType() {
    let loginResponse = this.loginResponsive();
    const param = {'loginId':loginResponse.userDetails[0].loginId}; 
    return this.http.post(API_URLS.USER_TYPE_URL, param);
  }
  
  //Guest Login
  public get isGuest() {
    const userType = this.getUserType();
    if (userType  && userType === 'GUEST') {
      return true;
    }
    return false;
  }

  public getUserId() {
    if (sessionStorage.getItem('userDetails')) {
      const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
      return userDetails.loginId;
    }
    return null;
  }

  public getUserType() {
    if (sessionStorage.getItem('userType')) {
      return sessionStorage.getItem('userType');
    }
    return null;
  }

  public getUserSession() {
    if (sessionStorage.getItem('userSession')) {
      const userSession = JSON.parse(sessionStorage.getItem('userSession'));
      return userSession;
    }
    return null;
  }

  public getuserDetails() {
    if (sessionStorage.getItem('userDetails')) {
      const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
      return userDetails;
    }
    return null;
  }
  public loginResponsive() {
    if (sessionStorage.getItem('loginResponse')) {
      const userDetails = JSON.parse(sessionStorage.getItem('loginResponse'));
      return userDetails;
    }
    return null;
  }
  public getSelectedDealer() {
    if (sessionStorage.getItem('selectedDealer')) {
      const selectedDealer = JSON.parse(sessionStorage.getItem('selectedDealer'));
      return selectedDealer;
    }
    return null;
  }

  // Guest Login
  public guestLoginOTP(mobileNumber: number) {
    return this.http.post(API_URLS.GUEST_GENERATE_OTP_URL, {mobileNumber});
  }
  public guestValidateOtp(guestValidateData: { mobileNumber: number, otpnum: number }) {
    return this.http.post(API_URLS.GUEST_VALIDATE_OTP_URL, guestValidateData);
  }
  public guestDetails(mobileNumber: number) {
    return this.http.post(API_URLS.GUEST_DETAILS_URL, {mobileNumber});
  }
  
}
