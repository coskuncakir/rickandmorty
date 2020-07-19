import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    // Modules
    CommonModule,
    RouterModule,
    FormsModule,
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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  exports: [
    // Modules
    CommonModule,
    RouterModule,
    FormsModule,
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
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class SharedModule {}
