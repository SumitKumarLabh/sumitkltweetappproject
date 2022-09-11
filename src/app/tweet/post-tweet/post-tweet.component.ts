import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetService } from 'src/app/service/tweet.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post-tweet',
  templateUrl: './post-tweet.component.html',
  styleUrls: ['./post-tweet.component.scss']
})
export class PostTweetComponent implements OnInit {
  tweetPostForm = this._lf.group({
    message: ['']    
  });

  displayError = false;
  displayLoading = false;
  isShowPostSuccess = false;
  isShowInputField= false;

  constructor(
    private _lf: FormBuilder,
    public _tweetService: TweetService,
    public _userservice: UserService,
    private _router: Router
  ) {
  }

  newPost(){
    this.isShowInputField = true;
    this.isShowPostSuccess = false;
  }
  newPostcancal(){
    this.isShowInputField = false;
    this.displayError = false;
    this.isShowPostSuccess = false;
  }
  
  submit() {
    this.displayLoading = true;

    this._tweetService
      .PostTweet(this.tweetPostForm.value.message).subscribe(
        async (result:any) => {
          this.displayLoading = false;
          this.isShowPostSuccess = true;
          if(this.isShowPostSuccess == true)
          {
            Swal.fire({
              icon: 'success',
              title: 'Great!',
              text: 'Tweet Added'
            });
          }
          this.isShowInputField = false;
          this._userservice.updateIsReloadTweet(true);

          //below will redirect to home and reload tweets -- code will be refined
          await new Promise(f => setTimeout(f, 1000));
          this._router.navigateByUrl('login');
        },
        (err: any) => {
          this.displayError = true;
          if(this.displayError == true)
          {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Oops Cant Post'
            });
          }
          this.displayLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.error.description
          });
        }
      );
  }

  ngOnInit(): void {
    this.tweetPostForm.valueChanges.subscribe((value) => {
      this.displayError = false;
    });
  }

}
