import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  totalPokemons: number = 0;
  pokemonFavorite: string = "";

  constructor(
    private dataService: DataService

  ) { }

  ngOnInit(): void {
    this.getPokemons();
    localStorage.clear();

  }

  getPokemons(){
    this.dataService.getPokemon(8,this.page + 0)
    .subscribe((response: any) => {
      this.totalPokemons = response.count;

      response.results.forEach((result: any) => {
        this.dataService.getMoreData(result.name)
        .subscribe((uniqResponse: any) => {
          this.pokemons.push(uniqResponse);
          console.log(this.pokemons);
        });
      });
    });
  }

  getFavorite() {
    let favorito = localStorage.getItem('pokeFav');
    this.pokemonFavorite = favorito?favorito:"";
  }

  setFavorite(nomePoke: string) {
    localStorage.setItem("pokeFav", nomePoke);
    this.getFavorite();
  }
}
