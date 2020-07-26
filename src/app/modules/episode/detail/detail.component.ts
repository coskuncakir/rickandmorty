import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService, EpisodeService } from '@app/core/http';
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
    private characterService: CharacterService,
    private episodeService: EpisodeService,
    private router: Router,
    private titleService: TitleService
  ) {}

  episodeId = +this.route.snapshot.paramMap.get('episodeId');
  loading = true;
  episode = null;
  characters = [];

  ngOnInit(): void {
    this.getEpisode();
  }

  getEpisode(): void {
    this.episodeService
      .episode(this.episodeId)
      .pipe(untilDestroyed(this))
      .subscribe((episode) => {
        this.episode = episode;
        this.titleService.setTitle(episode.name);
        this.getCharacters(episode.characters);
      });
  }

  getCharacters(characters): void {
    const characterIds: number[] = characters.map(
      (item) => item.split('character/')[1]
    );
    let reqCount = 0;
    from(characterIds)
      .pipe(concatMap((i) => this.characterService.character(i)))
      .pipe(untilDestroyed(this))
      .subscribe((resident) => {
        reqCount++;
        this.characters.push(resident);
        if (reqCount === characterIds.length) {
          this.loading = false;
        }
      });
  }

  goToCharacterDetail(characterId: number): void {
    this.router.navigate(['/character/', characterId]);
  }
}
