import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { LocationRoutingModule } from './episode-routing.module';
import { EpisodeComponent } from './episode.component';
import { ListComponent } from './list/list.component';
import { FilterComponent } from './filter/filter.component';
import { CharactersComponent } from './characters/characters.component';

@NgModule({
  declarations: [
    EpisodeComponent,
    ListComponent,
    FilterComponent,
    CharactersComponent,
  ],
  imports: [SharedModule, LocationRoutingModule],
})
export class EpisodeModule {}
