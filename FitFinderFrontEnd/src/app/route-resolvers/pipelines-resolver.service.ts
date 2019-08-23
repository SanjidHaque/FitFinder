import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {Pipeline} from '../models/pipeline.model';
import {SettingsDataStorageService} from '../services/data-storage/settings-data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PipelinesResolverService implements Resolve<Pipeline[]> {
  constructor(private settingsDataStorageService: SettingsDataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Pipeline[]> | Promise<Pipeline[]> | Pipeline[] {
    return this.settingsDataStorageService.getAllPipeline();
  }
}
