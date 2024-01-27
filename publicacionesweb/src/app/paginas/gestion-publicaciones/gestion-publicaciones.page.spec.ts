import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionPublicacionesPage } from './gestion-publicaciones.page';

describe('GestionPublicacionesPage', () => {
  let component: GestionPublicacionesPage;
  let fixture: ComponentFixture<GestionPublicacionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GestionPublicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
