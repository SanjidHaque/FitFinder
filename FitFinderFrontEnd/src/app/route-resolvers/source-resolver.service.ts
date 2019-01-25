import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Department} from '../models/department.model';
import {DataStorageService} from '../services/data-storage.service';
import {Observable} from 'rxjs';
import {Source} from '../models/source.model';

@Injectable({
  providedIn: 'root'
})
export class SourceResolverService implements Resolve<Source[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Source[]>
    | Promise<Source[]> | Source[] {
    return this.dataStorageService.getAllSource();
  }
}
