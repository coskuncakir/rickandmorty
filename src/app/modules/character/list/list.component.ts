import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CharacterService } from '../../../core/http';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from '../detail/detail.component';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy, OnChanges {
  constructor(
    private characterService: CharacterService,
    public dialog: MatDialog
  ) {}

  characters = null;
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
    this.characters = null;
    this.subscription = this.characterService
      .characters(this.request, this.pageEvent)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response) => {
        this.characters = response;
        this.loading = false;
      });
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
