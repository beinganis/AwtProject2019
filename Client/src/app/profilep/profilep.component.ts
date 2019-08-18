import { AfterViewInit, Component, OnInit, Input, EventEmitter } from '@angular/core';
import {ActivatedRoute, Params } from '@angular/router';
import {MainService} from '../share/main.service';
import { Thesis } from '../model/thesis';

const uri = 'http://localhost:3000/media/upload';
@Component({
  selector: 'app-profilep',
  templateUrl: './profilep.component.html',
  styleUrls: ['./profilep.component.css']
})


export class ProfilepComponent implements OnInit {

  
  attachmentList:any=[];
  desc:string;
  professors: { id: number, name: string,email:string, description: string, image: string };
  id:number;
  showCourseDesc: boolean;
  thesises:Thesis[];
  cvref:string;

  constructor(private activeRoute: ActivatedRoute, private mainService: MainService) {

  }

  ngOnInit() {
      this.desc='';
      this.showCourseDesc = false;
      this.activeRoute.params.subscribe((params: Params) => {
          this.id = +params['id'];
          this.professors = this.mainService.getProfessor(this.id);
          console.log(this.professors);

          this.mainService.getThesis(this.id).subscribe(
            (res) =>{
              this.thesises = res['thesis'];
              console.log(this.thesises);}
          );
      });

  }
  showDescription(e){
    console.log(e);
    this.desc = e;
  }

  sendLink(){
    console.log(this.cvref);
    this.mainService.upload(this.cvref,this.professors.email).subscribe(val=>{

    },err=>{
      console.log('errororo')
      console.log(err)
    })
  }
  courseDescription() {
      this.showCourseDesc = !this.showCourseDesc;
  }




}
