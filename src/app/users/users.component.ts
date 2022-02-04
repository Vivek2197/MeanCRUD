import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { UserModel } from './user.model';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  formValue !: FormGroup;
  userModelObj : UserModel = new UserModel();
  userData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id: [''],
      name: [''],
      country: [''],
      city: ['']
    })
    this.getAllUser();
  }

  clickAddUser(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;

  }

  postUserDetails() {
    this.userModelObj.id = this.formValue.value.id;
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.country = this.formValue.value.country;
    this.userModelObj.city = this.formValue.value.city;


    this.api.postUser(this.userModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Employee Added Sucessfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      },
        err => {
          alert("Something Went Wrong");
        })
  }
  getAllUser() {
    this.api.getUser()
      .subscribe(res => {
        this.userData = res;
      })
  }

  deleteUser(row: any) {
    this.api.deleteUser(row.id)
      .subscribe(res => {
        alert("Employee Deleted")
        this.getAllUser();
      })
  }
  onEdit(row: any) {
    
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = row.id;
   
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['country'].setValue(row.country);
    this.formValue.controls['city'].setValue(row.city);
  }
  updateUserDetails() {
    this.userModelObj.id = this.formValue.value.id;
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.country = this.formValue.value.country;
    this.userModelObj.city = this.formValue.value.city;

    this.api.updateUser(this.userModelObj, this.userModelObj.id)
      .subscribe(res=>{
        alert("Updated Sucessfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllUser();
      })


  }
}



