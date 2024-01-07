import { RouteService } from './../../services/route.service';
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DefSelect } from '../../interfaces/default-select.interface';
import { DefaultSelectComponent } from '../default-select/default-select.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../../app-routing.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    DefaultSelectComponent,
    CommonModule,
    AppRoutingModule,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private translate: TranslateService,
    public routeService: RouteService
  ) {
    this.translate.setDefaultLang('en');
  }
  public languages: DefSelect[] = [
    { value: 'en', name: 'English' },
    { value: 'ru', name: 'Русский' },
  ];

  public switchLanguage(language: string): void {
    this.translate.use(language);
  }
}
