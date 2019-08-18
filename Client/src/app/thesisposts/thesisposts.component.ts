import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thesisposts',
  templateUrl: './thesisposts.component.html',
  styleUrls: ['./thesisposts.component.css']
})
export class ThesispostsComponent implements OnInit {

  newPost = '';
  constructor() { }

  onAddPost(postInput: HTMLTextAreaElement) {
    console.dir(postInput)
    this.newPost = postInput.value;
    alert('Thesis Published ');
  }



  ngOnInit() {


  }

}
