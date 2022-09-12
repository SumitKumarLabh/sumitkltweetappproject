import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { BehaviorSubject, observable, Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  public IsLoggedIn = new BehaviorSubject<boolean>(localStorage.getItem('JwtToken') != null);
  isLoggedIn = this.IsLoggedIn.asObservable();

  updateIsLoggedIn(isLoggedInState : boolean){
    this.IsLoggedIn.next(isLoggedInState);
  }
  getIsLoggedIn(){
    return this.IsLoggedIn.value;
  }
 
  public IsReloadTweet = new BehaviorSubject<boolean>(false);
  isReloadTweet = this.IsReloadTweet.asObservable();

  updateIsReloadTweet(isReloadTweetstate : boolean){
    this.IsReloadTweet.next(isReloadTweetstate);
  }
  getIsReloadTweet(){
    return this.IsReloadTweet.value;
  }

  logout():Observable<any>{
          localStorage.removeItem('JwtToken');
          localStorage.removeItem('name');
          localStorage.removeItem('userName');
          return of({success : "ok"});
  }

  login(userName: string, password: string):Observable<any> {
    const body = { username: userName, password: password };
    return this._http.post('http://20.124.163.127/api/v1.0/tweets/login',body);
  }

  register(
    username: string,
    firstName: string,
    lastName: string,    
    phoneNumber: string,
    password: string
    ):Observable<any> {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
         });
      let options = { headers: headers };  
      let textss = "";
    const body = { userName: username, firstName: firstName , lastName: lastName,  phoneNumber: phoneNumber,password: password };
    return this._http.post('http://20.124.163.127/api/v1.0/tweets/register',body,options);
  }

  forgotPassword(
    userName: string,
    phoneNumber: string
    ):Observable<any> {
      let queries = new HttpParams().set('userName', userName).set('contactNumber',phoneNumber);
  
    return this._http.get('http://20.124.163.127/api/v1.0/tweets/'+userName+'/Forgot',{params:queries});
  }

  allUser():Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('JwtToken') || 'error' });
    let options = { headers: headers }; 
    return this._http.get(
      'http://20.124.163.127/api/v1.0/tweets/users/all', options);
  }

  searchUser(name:string):Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('JwtToken') || 'error' });
    let queries = new HttpParams().set('username', name);
    let options = { headers: headers};
    return this._http.get(
      'http://20.124.163.127/api/v1.0/tweets/user/search/'+name, options);
  }
}
