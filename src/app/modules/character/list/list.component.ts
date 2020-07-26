import { Component, OnInit, ViewChild } from '@angular/core';
import { CharacterService, EpisodeService } from '@core/http';
import { from } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { finalize, concatMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private characterService: CharacterService,
    private episodeService: EpisodeService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  characters = null;
  loading = false;
  pageEvent: PageEvent;
  request = {};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadTable();
  }

  loadTable(): void {
    this.loading = true;
    this.characters = null;
    this.characterService
      .characters(this.request, this.pageEvent)
      .pipe(finalize(() => (this.loading = false)))
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        const firstEpisodes = [];
        response.results.forEach((item, index, arr) => {
          if (item.location.url) {
            const locationId = item.location.url.split('location/')[1];
            const firstEpisode = item.episode[0].split('episode/')[1];
            arr[index].locationId = locationId;
            arr[index].firstEpisode = firstEpisode;
            firstEpisodes.push(firstEpisode);
          }
        });

        let reqCount = 0;
        from(firstEpisodes)
          .pipe(concatMap((i) => this.episodeService.episode(i)))
          .pipe(untilDestroyed(this))
          .subscribe((episode) => {
            response.results[reqCount].firstSeenIn = episode.name;
            reqCount++;
            if (reqCount === firstEpisodes.length) {
              this.loading = false;
              this.characters = response;
            }
          });
      });
  }

  detail(characterId: number): void {
    this.router.navigate(['/character/', characterId]);
  }

  applyFilter(event: Event): void {
    this.request = event;
    if (this.pageEvent) {
      this.paginator.firstPage();
    }
    this.loadTable();
  }
}
