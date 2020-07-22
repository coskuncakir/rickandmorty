import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CharacterService } from '../../../core/http';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(
    private characterService: CharacterService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  characters = null;
  subscription: Subscription = null;
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
    this.subscription = this.characterService
      .characters(this.request, this.pageEvent)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response) => {
        this.characters = response;
        this.loading = false;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
