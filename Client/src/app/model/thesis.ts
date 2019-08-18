export class Thesis{


  constructor(title = '', description = '', professorid=0 ) {
      this.title = title;
      this.description = description;
      this.professor_id = professorid;
  }

  title: string;
  description: string;
  professor_id: number;
}
