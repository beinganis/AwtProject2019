import { Component, OnInit } from '@angular/core';
import { Thesis } from '../model/thesis';
import { MainService } from '../share/main.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {
  thesis:Thesis={title:'', description: '',professor_id:0};
  constructor(private activeRoute: ActivatedRoute,public mainService: MainService ) { }

  ngOnInit() {
    this.thesis.professor_id = this.mainService.getId();

}
  sendData(){
this.mainService.saveThesis(this.thesis).subscribe(val =>{
console.log(val);
    },err =>{
      console.log(err);
    })
  }

}
