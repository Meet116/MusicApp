import { Injectable } from '@angular/core';
import { Music } from './music';
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MusicServiceService {
  private musicsUrl = 'http://localhost:3000/api/music'
  constructor(private http: HttpClient) { }
  getMusics(): Promise<void | Music[]> {
    return this.http.get(this.musicsUrl)
      .toPromise()
      .then(response => response as Music[])
      .catch(this.handleError);
  }
  getSingleMusic(musicId: String): Promise<void | Music[]> {
    return this.http
      .get(this.musicsUrl + '/'+musicId)
      .toPromise()
      .then(response => response as Music[])
      .catch(this.handleError);
  }
  createNewMusic(NewFood: Music): Promise<void | Music[]> {
    return this.http
      .post(this.musicsUrl,NewFood)
      .toPromise()
      .then(response => response as Music[])
      .catch(this.handleError);
  }
  deleteMusic(musicId: String): Promise<void | Music[]> {
    return this.http
      .delete(this.musicsUrl + '/'+musicId)
      .toPromise()
      .then(response => response as Music[])
      .catch(this.handleError);
  }

public updateMusicDetail(music: any, id: string) {
    const url: string = `${this.musicsUrl}/${id}`;
    return this.http
      .put(url, music)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
 }
}
