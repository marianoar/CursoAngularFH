import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchResponse } from "../interfaces/gifs.interface";

@Injectable({providedIn: 'root'})
export class GifsService{

    public gifsList: Gif[]=[];
    private _tagsHistory: string[]=[];
    private apiKey :    string = '5HGm6sm00TqH312izF7O3jFTxNnvvfAV';
    private url:        string = "https://api.giphy.com/v1/gifs";
    
    constructor(private http: HttpClient) {
        this.loadLocalStorage();
    }

    get tagsHistory(){
        return [...this._tagsHistory];
    }

    async searchTag(tag: string): Promise<void>{

        if(tag.length==0) return;
        this.organizeHistory(tag);

        const params = new HttpParams().set('api_key', this.apiKey)
                                        .set('limit', '10')
                                        .set('q', tag);
        // this._tagsHistory.unshift(tag);
        this.http.get<SearchResponse>(`${this.url}/search`,{params})
        .subscribe(resp=>{
            this.gifsList = resp.data;
            console.log(this.gifsList);
        })
    }

    private organizeHistory(tag : string){
        tag = tag.toLowerCase();

        if( this._tagsHistory.includes(tag)){
            this._tagsHistory = this._tagsHistory.filter((oldTag => oldTag != tag));
        }
        this._tagsHistory.unshift(tag);
        this._tagsHistory = this.tagsHistory.splice(0,10);
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void{
        localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }

    private loadLocalStorage():void{
        if(!localStorage.getItem('history')) return;
       this._tagsHistory = JSON.parse(localStorage.getItem('history')!); // ! not null operator

       if(this._tagsHistory.length === 0) return;

       this.searchTag(this._tagsHistory[0]);
    }
}