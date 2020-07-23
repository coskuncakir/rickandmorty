import { Component, OnInit } from '@angular/core';
import { TitleService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private titleService: TitleService) {}
  ngOnInit(): void {
    this.titleService.boot();
  }
}
