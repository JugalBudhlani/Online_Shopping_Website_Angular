import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../ProdService/products';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../Service/user.service';



@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form!: FormGroup;
    loading = false;
    submitted = false;
    readonly user_URL = 'http://localhost:3000/users';
    addUserData: User[] = []
    user:User[]=[]
    firstName!: string;
    lastName!: string;
    username!: string;
    password!: string;
    email!: string;

  

  registerUser(): void {
    this.userService.registerUser(this.firstName, this.lastName, this.username, this.password, this.email);
    // if(this.userService.getSuccess()){
      this.routeObj.navigate(['/home']);
    // }
  }
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private routeObj: Router,
        private http: HttpClient,
        private userService:UserService,
        
        
    ) {
        // redirect to home if already logged in
        // if (this.accountService.userValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            email:['',[Validators.required,Validators.email]]
        });

        // this.getMaxIdFromUsers();
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        // this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        // this.accountService.register(this.form.value)
        //     .pipe(first())
        //     .subscribe(
        //         data => {
        //             this.alertService.success('Registration successful', { keepAfterRouteChange: true });
        //             this.router.navigate(['../login'], { relativeTo: this.route });
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }


    // circularReviver(key: string, value: any): any {
    //   if (typeof value === 'object' && value !== null) {
    //     if (value.hasOwnProperty('$$circularRef')) {
    //       return '[Circular]';
    //     }
    //     value.$$circularRef = true;
    //   }
    //   return value;
    // }

  //   getMaxIdFromUsers(): number{
  //     let maxId=-1;
  //     this.http.get('http://localhost:3000/users', { responseType: 'text' }).subscribe(response => {
  //   const users = JSON.parse(response, this.circularReviver);
  //   const ids = users.map((user: {
  //     userid: any; }) => user.userid);
  //   maxId = Math.max(...ids);
    
  // });
  //     return maxId;
      
  //   }
//  addUser(){
//   // const userid=  1;
//   const Name = this.f['firstName'] + ' ' + this.f['lastName'];
//   const username= this.f['username'];
//   const Password=this.f['password'];
//   const Email=this.f['email'];
//   const user1 = { Name,username , Password, Email, cart: [] };
//   // const user2=JSON.stringify(user1);

//   this.http.post(this.user_URL,user1).subscribe(response => 
//     {
//       alert("Registration successful");
//     },
//     error=>{
//       console.log(error);
//       alert("Registrstion failed");
//     });
  
//  }
 
//  registerUser(){

//  }
}
