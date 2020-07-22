import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationRoutingModule } from './location-routing.module';

import { ListComponent } from './list/list.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [ListComponent, FilterComponent],
  imports: [SharedModule, LocationRoutingModule],
})
export class LocationModule {}
