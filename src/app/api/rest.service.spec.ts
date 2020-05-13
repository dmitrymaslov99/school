import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RestService } from './rest.service';
import { AppComponent } from '../app.component';
import { HttpClientModule } from '@angular/common/http';

// тестирование сервсиа для взаимодействия с главным компонентом и педачи данных туда
describe('PopupService', () => {
  let service: RestService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
      ],
    }).compileComponents();
  });
  // done нужно, чтобы тест не завершился до получения данных
  it('subscribe for opening works', (done: DoneFn) => {
    // вызываем метод open
    service.open(AppComponent, [{ title: 'app заголовок', message: 'Успешно' }]);
    // при изменении значения popupDialog$ должен сработать subscribe
    service.popupDialog$.subscribe((data) => {
      expect(data.popupEvent).toBe('open');
      done();
    });

  });
  it('subscribe for closing works', (done: DoneFn) => {
    service.close();
    service.popupDialog$.subscribe((data) => {
      expect(data.popupEvent).toBe('close');
      done();
    });
  });
});
