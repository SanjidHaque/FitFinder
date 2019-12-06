import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {RejectedReason} from '../models/settings/rejected-reason.model';
import {Observable} from 'rxjs';
import {SettingsDataStorageService} from '../services/data-storage-services/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RejectedReasonsResolverService implements Resolve<RejectedReason[]>{

  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(): Observable<RejectedReason[]> | Promise<RejectedReason[]> | RejectedReason[] {
    return this.settingsDataStorageService.getAllRejectedReason();
  }
}
