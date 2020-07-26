import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService, EpisodeService } from '@core/http';
import { concatMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { TitleService } from '@app/core/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private characterService: CharacterService,
    private episodeService: EpisodeService,
    private titleService: TitleService
  ) {}

  characterId = +this.route.snapshot.paramMap.get('characterId');
  loading = true;
  character = null;
  episodes = [];

  ngOnInit(): void {
    this.getCharacter();
  }

  getCharacter(): void {
    this.characterService
      .character(this.characterId)
      .pipe(untilDestroyed(this))
      .subscribe((character) => {
        this.character = character;
        this.titleService.setTitle(character.name);
        this.getEpisodes(character.episode);
      });
  }

  getEpisodes(episodes): void {
    const episodeIds: number[] = episodes.map(
      (item) => item.split('episode/')[1]
    );
    let reqCount = 0;
    from(episodeIds)
      .pipe(untilDestroyed(this))
      .pipe(concatMap((i) => this.episodeService.episode(i)))
      .subscribe((resident) => {
        reqCount++;
        this.episodes.push(resident);
        if (reqCount === episodeIds.length) {
          this.loading = false;
        }
      });
  }

  goToEpisodeDetail(episodeId: number): void {
    this.router.navigate(['/episode/', episodeId]);
  }

  goToLocationDetail(locationUrl: string): void {
    const locationId = locationUrl.split('location/')[1];
    this.router.navigate(['/location/', locationId]);
  }
}
