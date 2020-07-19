import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HeaderComponent } from './components/header/header.component';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    // Modules
    CommonModule,
    RouterModule,
    // Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule,
  ],
  exports: [
    // Modules
    CommonModule,
    RouterModule,
    // Components
    HeaderComponent,
    // Material
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDividerModule,
  ],
})
export class SharedModule {}
