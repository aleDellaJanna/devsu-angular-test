import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call searchTermChanged when model change and emit searchTerm value', fakeAsync(() => {
    const searchTerm = 'Test';

    const emitSpy = jest.spyOn(component.searchTermChanged, 'emit')
    component.searchTerm = searchTerm;
    component.searchTermChanged.emit(searchTerm);
    expect(emitSpy).toHaveBeenCalledWith(searchTerm);
  }))
});
