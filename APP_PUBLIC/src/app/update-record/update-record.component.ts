import { Component, OnInit } from '@angular/core';
import { Music } from '../music';
import { MusicServiceService } from '../music-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-update-record',
  templateUrl: './update-record.component.html',
  styleUrls: ['./update-record.component.css'],
  providers: [MusicServiceService]
})
export class UpdateRecordComponent implements OnInit {
music: Music = new Music()

    public newMusic = {
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
formData: any;

  constructor(private musicService: MusicServiceService, private route: ActivatedRoute,
    private router: Router
) { }
errorPage = {
    statusText: '',
    status: '',
  };

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let id = params.get('musicId') || '0';
          return this.musicService.getSingleMusic(id);
        })
      )
.subscribe(
        (music: any) => {
          this.music = music;
          this.newMusic._id = this.music._id;
          this.newMusic.songname = this.music.songname;
          this.newMusic.songlength = this.music.songlength;
          this.newMusic.description = this.music.description;
          this.newMusic.genre = this.music.genre;
          this.newMusic.artist.name = this.music.artist.name;
          this.newMusic.artist.birthdate = this.music.artist.birthdate;
        },
        (error) => {
          this.errorPage = {
            statusText: error.statusText,
            status: error.status,
          };
        }
      );

  }

  public updateMusicDetail(newMusic: Music, _id: string): void {
    this.musicService.updateMusicDetail(newMusic, this.newMusic._id);
    setTimeout(() => {
      alert('Redirecting you to list page');
      this.router.navigate(['/']);
    }, 500);
  }


}
