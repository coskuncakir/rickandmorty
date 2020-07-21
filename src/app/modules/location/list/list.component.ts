import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { LocationService } from '../../../core/http';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy, OnChanges {
  constructor(private locationService: LocationService) {}

  displayedColumns = ['id', 'name', 'type', 'dimension'];

  locations = null;
  subscription: Subscription = null;
  loading = false;
  pageEvent: PageEvent;
  @Input() request = {};

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.request.currentValue !== changes.request.previousValue) {
      this.loadTable();
    }
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
