import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { LocationRoutingModule } from './episode-routing.module';
import { ListComponent } from './list/list.component';
import { FilterComponent } from './filter/filter.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [ListComponent, FilterComponent, DetailComponent],
  imports: [SharedModule, LocationRoutingModule],
})
export class EpisodeModule {}
