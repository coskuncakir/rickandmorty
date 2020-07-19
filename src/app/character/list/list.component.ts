import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CharacterService } from '../../core/services';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from '../detail/detail.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(
    private characterService: CharacterService,
    public dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'id',
    'avatar',
    'name',
    'gender',
    'species',
    'status',
    'origin',
    'location',
  ];

  dataSource = null;
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
    this.subscription = this.characterService
      .characters(this.request, this.pageEvent)
      .subscribe((response) => {
        this.dataSource = response;
        this.loading = false;
      });
  }

  origin(url: string): void {
    console.log(url);
  }

  location(url: string): void {
    console.log(url);
  }

  detail(item: any): void {
    this.dialog.open(DetailComponent, {
      data: item,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
