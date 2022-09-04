import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Music } from '../music';
import { MusicServiceService } from '../music-service.service';
import { switchMap } from 'rxjs';
import {Router} from '@angular/router'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [MusicServiceService]
})
export class DetailsComponent implements OnInit {

  music:Music={
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

  constructor(
    private musicService: MusicServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap((params: Params) => {
        return this.musicService.getSingleMusic(params["musicId"]);
      })
    )
    .subscribe((music: any) => {
      this.music = music;
    });
  }
  deleteMusic(musicId: string) {
    this.musicService.deleteMusic(musicId)
  }

  public async redirectUpdate(musicId: string) {
    this.router.navigate([`/update/${musicId}`]);
  }

}
