import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CharacterService } from 'src/app/core/http';
import { from } from 'rxjs';
import { concatMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss'],
})
export class ResidentsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private characterService: CharacterService
  ) {}

  loading = true;
  residents = [];

  ngOnInit(): void {
    const residentIds: number[] = this.data.residents.map(
      (item) => item.split('character/')[1]
    );
    let reqCount = 0;
    from(residentIds)
      .pipe(concatMap((i) => this.characterService.character(i)))
      .subscribe((resident) => {
        reqCount++;
        this.residents.push(resident);
        if (reqCount === residentIds.length) {
          this.loading = false;
        }
      });
  }

  goToCharacterDetail(): void {
    // TODO
  }
}
