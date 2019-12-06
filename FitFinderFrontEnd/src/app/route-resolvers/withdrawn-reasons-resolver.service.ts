import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {WithdrawnReason} from '../models/settings/withdrawn-reason.model';
import {SettingsDataStorageService} from '../services/data-storage-services/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WithdrawnReasonsResolverService implements Resolve<WithdrawnReason[]> {

  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(): Observable<WithdrawnReason[]> | Promise<WithdrawnReason[]> | WithdrawnReason[] {
    return this.settingsDataStorageService.getAllWithdrawnReason();
  }
}
