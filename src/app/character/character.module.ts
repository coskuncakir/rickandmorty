import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './character.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [CharacterComponent, ListComponent],
  imports: [SharedModule, CharacterRoutingModule],
})
export class CharacterModule {}
