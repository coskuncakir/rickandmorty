import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterService, EpisodeService } from '@app/core/http';
import { take, concatMap } from 'rxjs/operators';
import { from } from 'rxjs';
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
    private router: Router
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
      .pipe(take(1))
      .subscribe((episode) => {
        this.episode = episode;
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
