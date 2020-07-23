import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService, LocationService } from '@app/core/http';
import { take, concatMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { TitleService } from '@core/services';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService,
    private locationService: LocationService,
    private router: Router,
    private titleService: TitleService
  ) {}

  locationId = +this.route.snapshot.paramMap.get('locationId');
  loading = true;
  location = null;
  characters = [];

  ngOnInit(): void {
    this.getEpisode();
  }

  getEpisode(): void {
    this.locationService
      .location(this.locationId)
      .pipe(take(1))
      .subscribe((location) => {
        this.location = location;
        this.titleService.setTitle(location.name);
        if (location.residents.length > 0) {
          this.getResidents(location.residents);
        } else {
          this.loading = false;
        }
      });
  }

  getResidents(residents): void {
    const residentIds: number[] = residents.map(
      (item) => item.split('character/')[1]
    );
    let reqCount = 0;
    from(residentIds)
      .pipe(concatMap((i) => this.characterService.character(i)))
      .subscribe((resident) => {
        reqCount++;
        this.characters.push(resident);
        if (reqCount === residentIds.length) {
          this.loading = false;
        }
      });
  }

  goToCharacterDetail(characterId: number): void {
    this.router.navigate(['/character/', characterId]);
  }
}
