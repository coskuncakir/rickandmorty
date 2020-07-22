import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LocationService } from '../../../core/http';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CharactersDialogComponent } from '../../../shared/components/characters-dialog/characters-dialog.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(
    private locationService: LocationService,
    public dialog: MatDialog
  ) {}

  displayedColumns = ['id', 'name', 'type', 'dimension', 'residents'];

  locations = null;
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
    this.locations = null;
    this.subscription = this.locationService
      .locations(this.request, this.pageEvent)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response) => {
        this.locations = response;
        this.loading = false;
      });
  }

  residents(location): void {
    this.dialog.open(CharactersDialogComponent, {
      data: {
        characters: location.residents,
        title: `${location.name} Residents`,
      },
    });
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
    this.dialog.closeAll();
  }
}
