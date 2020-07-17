import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterRoutingModule } from './character-routing.module';
import { CharacterComponent } from './character.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [CharacterComponent, ListComponent],
  imports: [CommonModule, CharacterRoutingModule],
})
export class CharacterModule {}
