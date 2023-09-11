import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { userSchema } from '../users.model';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  allUsers:userSchema[]=[]
  searchKey:string=""
  page : number = 1;
  count : number = 0;
  tableSize : number = 5;

  constructor(private api:ApiService){}

  //when userListComponent page is open call getUsersList
  ngOnInit(): void {
    this.getUsersList()
  }

  //when users list page open, display all users list from json file by making an api call frpm http:??localhost:3000/users/1
  getUsersList(){
    this.api.getallusers().subscribe({
      next:(result:any)=>{
        console.log(result);
        this.allUsers = result
        this.count = this.allUsers.length
      },
      error:(result:any)=>{
        console.log(result);
        alert("Error while fetching the data...please try again after some time")
      }
    })
  }

  deleteuser(id:any){
    this.api.deleteuser(id).subscribe({
      next:(res:any)=>{
        console.log("deleted successfully");
        this.getUsersList()
      },
      error:(err:any)=>{
        console.log(err);
        alert("cannot perform the action now... please try again after some time")
      }
    })
  }

  sortById(){
    this.allUsers.sort((a:any,b:any)=>a.id-b.id)
    console.log();
  }

  sortByName(){
    this.allUsers.sort((a:any,b:any)=>a["name"].localeCompare(b["name"]))
  }

  onTableDataChange(event:any){
    this.page = event;
  }

  generatePDF(){
    let pdf = new jspdf()
    let head = [['User Id', 'User Name', 'Email', 'Status']]
    let body:any = []
    this.allUsers.forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.active])
    })
    pdf.setFontSize(16)
    pdf.text("All Employee List", 10,10)
    autoTable(pdf,{head,body})
    pdf.output('dataurlnewwindow')
    pdf.save("allUsers.pdf")
  }
}
