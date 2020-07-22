import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { CharacterRoutingModule } from './character-routing.module';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [ListComponent, DetailComponent, FilterComponent],
  imports: [SharedModule, CharacterRoutingModule],
})
export class CharacterModule {}
