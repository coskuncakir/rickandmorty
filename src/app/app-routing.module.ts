import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'character',
    pathMatch: 'full',
  },
  {
    path: 'character',
    loadChildren: () =>
      import('./modules/character/character.module').then(
        (m) => m.CharacterModule
      ),
  },
  {
    path: 'location',
    loadChildren: () =>
      import('./modules/location/location.module').then(
        (m) => m.LocationModule
      ),
  },
  {
    path: 'episode',
    loadChildren: () =>
      import('./modules/episode/episode.module').then((m) => m.EpisodeModule),
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
