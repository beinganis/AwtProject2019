import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs';
import {User} from "../model/user";
import { Thesis } from '../model/thesis';
import {Media} from '../model/media';


@Injectable({
    providedIn: 'root'
})
export class MainService {
    open: EventEmitter<any> = new EventEmitter();
    readonly URL_API = 'http://localhost:3000/api/';
    professor: { id: number, name: string,email:string, description: string, image: string };
    logedinuser:User;

    public departments:
        {
            id: number,
            name: string,
            description: string,
            subdepartments:
                {
                    id: number, name: string, description: string,
                    professors: { id: number, name: string,email:string, description: string, image: string }[]
                }[]
        }[] = [
        {
            id: 1, name: 'Enginreeng', description: 'Enginreeng Enginreeng',
            subdepartments: [{
                id: 1,
                name: 'Computer Sience',
                description: 'Computer Sience',
                professors: [
                    {
                        id: 1,
                        name: 'professor chatti',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'Professor of Computrer Science Department',
                        image: '../../assets/img/index12.png'
                    },
                    {
                        id: 2,
                        name: 'mester kamal',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'phd of computrer',
                        image: '../../assets/images/index12.png'
                    },
                    {
                        id: 3,
                       
                        name: 'mester hamed',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'phd of computrer',
                        image: '../../assets/images/index12.png'
                    }]
            }, {
                id: 2,
                name: 'Power Sience',
                description: 'Power Sience',
                professors: [
                    {
                        id: 4,
                        name: 'mester jons',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'phd of computrer',
                        image: '../../assets/images/index12.png'
                    },
                    {
                        id: 5, 
                        name: 'mester wiliam', 
                        email:'anilsriram.eshop@gmail.com',
                        description: 'phd of VR', 
                        image: '../../assets/images/index12.png'},
                    {
                        id: 6,
                        name: 'mester herbert',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'phd of art inteligent',
                        image: '../../assets/images/index12.png'
                    },
                    {
                        id: 7,
                        name: 'mester khar',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'phd of programing in C++',
                        image: '../../assets/images/index12.png'
                    }]
            }]
        },
        {
            id: 2,
            name: 'Art', description: 'Art Art Art',
            subdepartments: [{
                id: 3,
                name: 'Paint',
                description: 'paint paint',
                professors: [
                    {
                        id: 8,
                        name: 'mester koman',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'master in paint 1',
                        image: '../../assets/images/index12.png'
                    },
                    {
                        id: 9,
                        name: 'mester hazard',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'master in paint 1',
                        image: '../../assets/images/index12.png'
                    },
                    {
                        id: 10,
                        name: 'mester ronaldo',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'master in paint 2',
                       
                        image: '../../assets/images/index12.png'
                    },
                    {
                        id: 11,
                        name: 'mester messi',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'joniur in paint 1',
                    
                        image: '../../assets/images/index12.png'
                    },
                    {
                        id: 12,
                        name: 'mester nani',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'middle in ABrang',

                        image: '../../assets/images/index12.png'
                    },
                    {
                        id: 13,
                        name: 'mester zare',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'phd of tamam',
                        image: '../../assets/images/index12.png'
                    }]
            }, {
                id: 4,
                name: 'Music',
                description: 'Music Music',
                professors: [
                    {
                        id: 14,
                        name: 'mester misha',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'Rock Musisian',
                        image: '../../assets/images/index12.png'
                    },
                    {
                        id: 15,
                        name: 'mester kolom',
                        email:'anilsriram.eshop@gmail.com',
                        description: 'Opera singer',
                        image: '../../assets/images/index12.png'
                    }]
            }]
        },
    ];

    constructor(private http: HttpClient) {
    }

    register(user: User) {
        return this.http.post(this.URL_API+'register',user,{headers:{"content-type":"application/json"}});
    }
    login(user: User, callback){
        return this.http.post(this.URL_API+'authenticate', user,
        {headers:{"content-type":"application/json"}}).subscribe(
            (data) => {
              this.setToken(data, user.email);

               callback(null,data)},  //changed
               (err)=>{console.log(err); callback(err,null);},
               ()=>console.log("Done")
        );
    }
    logout(){
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
    }

    setToken(user, email)
    {
        console.log(user);
        localStorage.setItem('token', user.token);
        localStorage.setItem('userType', user.userType);
        if( this.getProfessorByName(user.name))
            localStorage.setItem('userid', this.getProfessorByName(user.name).id.toString());
    }


    getToken()
    {
        return localStorage.getItem('token');
    }

    getId(){
      return +localStorage.getItem('userid');
    }

    isLogin()
    {
        return localStorage.getItem('token')!= undefined;
    }

    saveThesis(thesis: Thesis){
      return this.http.post(this.URL_API + 'setThesis',thesis,
      {headers:{"content-type":"application/json"}});
    }

    getThesis(id)
    {
        return this.http.get(this.URL_API + 'getThesis?id='+id);
    }

    upload(cvref,email)
    {
        return this.http.get(this.URL_API + 'uploads?cvref='+cvref+'&email='+email);
    }
    getUserType()
    {
        return localStorage.getItem('userType') == "true" ;
    }

    getProfessor(id): { id: number, name: string,email:string, description: string, image: string } {
        this.departments.forEach(value => {
            value.subdepartments.forEach(value1 => {
                value1.professors.forEach(value2 => {
                    if (value2.id === id) {
                        this.professor = value2;
                    }
                });
            });
        });
        return this.professor;
    }

    getProfessorByName(name:string): { id: number, name: string, description: string, image: string } {
        this.departments.forEach(value => {
            value.subdepartments.forEach(value1 => {
                value1.professors.forEach(value2 => {
                    if (value2.name === name) {
                        this.professor = value2;
                    }
                });
            });
        });
        return this.professor;
    }

// File Upload 
    saveMedia(media: Media){
      return this.http.post(this.URL_API + 'media',media,
      {headers:{"content-type":"application/json"}});
    }
}


