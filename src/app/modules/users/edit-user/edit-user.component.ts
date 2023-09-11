import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { userSchema } from '../users.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{

  user:userSchema={}
  originalUser:any={}

  constructor(private route:ActivatedRoute, private api:ApiService){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const {id} = res
      console.log(res); 
      this.existinguser(id)
    })
  }

  existinguser(id:any){
    this.api.getexistinguser(id).subscribe({
      next:(res:userSchema)=>{
        console.log(res);
        this.user = res
      },
      error:(err:any)=>{
        console.log(err);
        alert("Cannot perform action now.. please try after some times")
      }
    })
  }

  updateUser(){
    this.api.updateuser(this.user.id,this.user).subscribe({
      next:(res:any)=>{
        console.log(res);
        alert("User Details updated successfully")
      },
      error:(err:any)=>{
        console.log(err);
        alert("cannot perform the action now... please try after some time")
      }
    })
  }

  cancelUpdate(userId:any){
    console.log("cancel clicked");
    this.existinguser(userId)  
  }
}
