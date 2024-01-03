import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DefSelect } from '../../interfaces/default-select.interface';
import { DefaultSelectComponent } from '../default-select/default-select.component';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../../app-routing.module';
import {  NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DefaultSelectComponent, CommonModule, AppRoutingModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private router: Router,
    private cdr: ChangeDetectorRef
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

  navLink: string = '';
  public navtext: string = '';
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event.url === '/') {
          this.navLink = '/authentication/registration';
          this.navtext = 'BUTTONS.AUTH';
          this.cdr.detectChanges();
        } else if (event.url === '/authentication/registration') {
          this.navLink = '/';
          this.navtext = 'BUTTONS.MAIN';
          this.cdr.detectChanges();
        }
      });
  }
}
