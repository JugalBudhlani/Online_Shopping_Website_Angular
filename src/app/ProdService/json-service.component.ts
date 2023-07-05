import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnChanges, OnInit, ViewChild } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { LoginPopComponentComponent } from '../Navigation/login-pop-component.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../Service/login.service';

@Component({
  selector: 'app-json-service',
  templateUrl: './json-service.component.html',
  styleUrls: ['./json-service.component.css']
})



export class JsonServiceComponent implements AfterViewInit,OnInit,OnChanges{
  
  showModal!: boolean;
  registerForm!: FormGroup;
  submitted = false;
  isClassAdded=false;
  public loggedIn: boolean=false;
  public userData: any;

  @ViewChild('signUpButton') signUpButton!: ElementRef;
  @ViewChild('signInButton') signInButton!: ElementRef;
  @ViewChild('container1') container1!: ElementRef;

  constructor(private formBuilder: FormBuilder, public loginService:LoginService, private cdr: ChangeDetectorRef) {
    this.loggedIn = this.loginService.isLoggedIn();

    if (this.loggedIn) {
      this.userData = this.loginService.getUserData();
      console.log(this.userData);
    }
    console.log("In constructor, value of bool is: "+ this.loggedIn);

    
   }

   @HostListener('window:beforeunload', ['$event'])
  public onBeforeUnload(event: Event): void {
    this.logoutIfLoggedIn();
  }

  @HostListener('document:visibilitychange', ['$event'])
  public onVisibilityChange(event: Event): void {
    if (document.visibilityState === 'hidden') {
      this.logoutIfLoggedIn();
    }
  }

  refreshComponent(){
    
    this.cdr.detectChanges();
    console.log("In refreshcomponent, value of bool is: "+ this.loggedIn);
    console.log("In refreshcomponent, value of auth is: "+ this.loginService.authenticated$);
  }

  show()
  {
    
    this.showModal = true; // Show-Hide Modal Check
    
    
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });   
  this.refreshComponent();
      
  }

  ngAfterViewInit(): void {
      
  }
  

ngOnChanges(){
  this.signUpButton.nativeElement.addEventListener('click', () => {
    this.container1.nativeElement.classList.add("right-panel-active");
  });

  this.signInButton.nativeElement.addEventListener('click', () => {
    this.container1.nativeElement.classList.remove("right-panel-active");
  });

  this.loggedIn=this.loginService.isLoggedIn();
  console.log("In ngonchanges, value of bool is "+ this.loggedIn);

}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }
onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    if(this.submitted)
    {
      this.showModal = false;
    }
   
}

addClass() {
  this.isClassAdded = true;
}

removeClass() {
  this.isClassAdded = false;
}



  private logoutIfLoggedIn(): void {
    if (this.loginService.isLoggedIn()) {
      this.loginService.logout();
    }
  }

  async logout():Promise<void>{ 
    this.loginService.logout();
    this.loggedIn=false;
    this.loginService.authenticated$.next(false);

  }


}
