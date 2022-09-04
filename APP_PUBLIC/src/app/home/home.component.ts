import { Component, OnInit } from '@angular/core';
import { Music } from '../music';
import { MusicServiceService } from '../music-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MusicServiceService]
})
export class HomeComponent implements OnInit {
  music: Music[] = [];
  constructor(private musicService: MusicServiceService) { }

  ngOnInit(): void {
    this.musicService
      .getMusics()
      .then(musics => {
        this.music = musics as Music[]
      });
  }

}
