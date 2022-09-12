import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}) 
export class TweetService {

  constructor(private _http: HttpClient) { }

  PostTweet(message: string):Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('JwtToken') || 'error' });

    let userName = localStorage.getItem('userName');
    let texts = "";
    let options = { headers: headers }; 
    const body = { message: message };
    return this._http.post('http://20.124.163.127/api/v1.0/tweets/'+userName+'/add',body, options);
  }

  updateTweet(tweetId: string, message: string):Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+ localStorage.getItem('JwtToken') || 'error' });
    let options = { headers: headers }; 
    let userName = localStorage.getItem('userName');
    const body = { message: message};
    return this._http.put('http://20.124.163.127/api/v1.0/tweets/'+userName+'/update/'+tweetId,body, options);
  }

  tweetReply(tId: string, msg: string):Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+localStorage.getItem('JwtToken') || 'error' });
    let options = { headers: headers }; 
    let userName = localStorage.getItem('userName');
    const body = {  message: msg };
    return this._http.post('http://20.124.163.127/api/v1.0/tweets/'+userName+'/reply/'+tId,body, options);
  }

  tweetLike(tId: string, like: boolean):Observable<any> {
    let headers = new HttpHeaders({      
      'Authorization': 'Bearer '+ localStorage.getItem('JwtToken') || 'error' });
    let userName = localStorage.getItem('userName');
    let options = { headers: headers };    
    return this._http.put('http://20.124.163.127/api/v1.0/tweets/'+userName+'/like/'+tId,{}, options);
  }

  tweetDelete(tId:string):Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('JwtToken') || 'error' });
    let options = { headers: headers};
    let userName = localStorage.getItem('userName');
    return this._http.delete('http://20.124.163.127/api/v1.0/tweets/'+userName+'/delete/'+tId, options);
  }

  allTweets():Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization':'Bearer '+ localStorage.getItem('JwtToken') || 'error' });
    let options = { headers: headers }; 
    
    return this._http.get(
      'http://20.124.163.127/api/v1.0/tweets/all', options);
  }

  MyTweets():Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('JwtToken') || 'error' });
    let options = { headers: headers }; 
    let username = localStorage.getItem('userName');
    return this._http.get(
      'http://20.124.163.127/api/v1.0/tweets/'+username, options);
  }

  loadReply(tweetId: String){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('JwtToken') || 'error' });
    let queries = new HttpParams().set('tweetId', tweetId.toString())
    let options = { headers: headers , params: queries}; 
    return this._http.get('http://20.124.163.127/api/v1/tweetboard', options);
  }

}
