
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { User } from '../ProdService/products';
import { Observable} from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-pop-component',
  templateUrl: './login-pop-component.component.html',
  styleUrls: ['./login-pop-component.component.css']
})
export class LoginPopComponentComponent implements OnInit{
  

  users!: Observable<User[]>
  readonly users_URL = 'http://localhost:3000/users';
  form!:FormGroup;
  input_un!:any;
  input_pd  !:any;
  un:string[]=[];
  pd:string[]=[];
  wr_log:boolean=false;
  
  get f() { return this.form.controls; }
  
  constructor(private formBuilder: FormBuilder,private http: HttpClient, private route: ActivatedRoute, private routeObj:Router,
    private router: Router, public activeModal: NgbActiveModal){
    this.getAllUsers();
   }

  getAllUsers() {
    this.users = this.http.get<User[]>(this.users_URL);
    // console.log(this.users);
  }
  
  getValues(){
    this.users.subscribe((userArray:User[]) => {
      userArray.forEach((user:User) => {
        this.un.push(user.username,user.Password);
        // this.pd.push(user.Password);
      });
    });
  }

  loginUser(){
    this.http.get('http://localhost:3000/users?username=' + this.input_un).subscribe((response:any)=> {
        if(response.length>0 && response[0].Password=== this.input_pd){
          this.routeObj.navigate(['/home']);
        }
    })
  }

  ngOnInit(){
    this.getAllUsers();
    // this.getValues();
    
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });  
  }

  onSubmit(){
    this.input_un=this.form.controls['username'].value;
    this.input_pd=this.form.controls['password'].value;
    // this.routeObj.navigate(['/home']);
    this.loginUser();
    // if(this.un.includes(this.input_un,this.input_pd)){
    //   console.log("ABCD");
    //   // this.routeObj.navigate(['/home']);
    //   this.wr_log=false;
      
    //   // this.router.navigate(['/home'], {relativeTo:this.route});
    // }
    // else{
    //   this.wr_log=true;
    // }
  }


}
