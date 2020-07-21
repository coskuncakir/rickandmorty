import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CharacterService } from 'src/app/core/http';
import { from } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private characterService: CharacterService
  ) {}

  loading = true;
  characters = [];

  ngOnInit(): void {
    const characterIds: number[] = this.data.characters.map(
      (item) => item.split('character/')[1]
    );
    let reqCount = 0;
    from(characterIds)
      .pipe(concatMap((i) => this.characterService.character(i)))
      .subscribe((resident) => {
        reqCount++;
        this.characters.push(resident);
        if (reqCount === characterIds.length) {
          this.loading = false;
        }
      });
  }

  goToCharacterDetail(): void {
    // TODO
  }
}
