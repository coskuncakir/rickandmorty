import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './character.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [CharacterComponent, ListComponent, DetailComponent],
  imports: [SharedModule, CharacterRoutingModule],
})
export class CharacterModule {}
