import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../core/services';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private characterService: CharacterService) {}

  characters = {};

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.characterService.characters().subscribe((response) => {
      this.characters = response;
    });
  }
}
