import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CharacterService } from '../../core/services';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  constructor(private characterService: CharacterService) {}

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
  loading = true;
  pageEvent: PageEvent;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.subscription = this.characterService
      .characters()
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
