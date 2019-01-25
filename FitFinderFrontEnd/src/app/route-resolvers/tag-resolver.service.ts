import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Department} from '../models/department.model';
import {DataStorageService} from '../services/data-storage.service';
import {Observable} from 'rxjs';
import {Tag} from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagResolverService implements Resolve<Tag[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag[]>
    | Promise<Tag[]> | Tag[] {
    return this.dataStorageService.getAllTag();
  }
}
