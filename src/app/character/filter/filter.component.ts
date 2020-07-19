import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IReqCharacters } from 'src/app/core/services/character/character.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  constructor() {}

  @Output() filterChanged = new EventEmitter();

  statusOptions = {
    alive: 'Alive',
    dead: 'Dead',
    unknown: 'Unknown',
  };

  genderOptions = {
    female: 'Female',
    male: 'Male',
    genderless: 'Genderless',
    unknown: 'Unknown',
  };

  formParams = {
    name: '',
    status: '',
    gender: '',
  };

  applyFilter(): void {
    const params: IReqCharacters = {};

    if (this.formParams.name) {
      params.name = this.formParams.name;
    }

    if (this.formParams.status) {
      params.status = this.formParams.status;
    }

    if (this.formParams.gender) {
      params.gender = this.formParams.gender;
    }

    this.filterChanged.next(params);
  }

  ngOnInit(): void {}
}
