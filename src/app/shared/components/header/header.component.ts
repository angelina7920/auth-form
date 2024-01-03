import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DefSelect } from '../../interfaces/default-select.interface';
import { DefaultSelectComponent } from '../default-select/default-select.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DefaultSelectComponent, CommonModule, AppRoutingModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  constructor(
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.translate.setDefaultLang('en');
  }
  languages: DefSelect[] = [
    { value: 'en', name: 'English' },
    { value: 'ru', name: 'Русский' },
  ];
  switchLanguage(language: string) {
    this.translate.use(language);
  }

}
