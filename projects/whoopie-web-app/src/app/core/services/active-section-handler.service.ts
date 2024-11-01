import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActiveSectionHandlerService {
  private _activeSection = signal('home');
  public activeSection = computed(this._activeSection);

  private _showLightColor = signal(true);
  public showLightColor = computed(this._showLightColor);

  public setActiveSection(section: string) {
    this._activeSection.set(section);
  }

  public setShowLightColor(bool: boolean){
    this._showLightColor.set(bool);
  }

  constructor() { }
}
