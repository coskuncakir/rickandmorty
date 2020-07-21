import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IReqEpisodes } from 'src/app/core/http/episode/episode.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor() {}

  @Output() filterChanged = new EventEmitter();

  options = {
    name: '',
    episode: '',
  };

  formParams = {
    ...this.options,
  };

  applyFilter(): void {
    const params: IReqEpisodes = {};

    if (this.formParams.name) {
      params.name = this.formParams.name;
    }

    if (this.formParams.episode) {
      params.episode = this.formParams.episode;
    }

    this.filterChanged.next(params);
  }

  clearFilter(): void {
    this.formParams = {
      ...this.options,
    };
    this.applyFilter();
  }

  ngOnInit(): void {}
}
