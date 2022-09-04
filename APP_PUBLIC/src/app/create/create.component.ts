import { Component, OnInit } from '@angular/core';
import { Music } from '../music';
import { MusicServiceService } from '../music-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  newMusic:Music={
    _id:'',
    songname:'',
    songlength: '',
    description:'',
    genre: '',
    artist: {
      name: '',
      birthdate: ''
    }
  };
  constructor(private musicService: MusicServiceService, private router: Router ) { }

  ngOnInit(): void {
  }
  createNewMusic(newMusic: Music): void {
    console.log('new music ', newMusic);
    this.musicService.createNewMusic(newMusic);
  }
}
