import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'character',
    pathMatch: 'full',
  },
  {
    path: 'character',
    loadChildren: () =>
      import('./character/character.module').then((m) => m.CharacterModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
