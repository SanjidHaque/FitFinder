import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {DataStorageService} from '../services/data-storage.service';
import {Observable} from 'rxjs';
import {WithdrawnReason} from '../models/withdrawn-reason.model';

@Injectable({
  providedIn: 'root'
})
export class WithdrawnReasonResolverService implements Resolve<WithdrawnReason[]> {

  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<WithdrawnReason[]> | Promise<WithdrawnReason[]> | WithdrawnReason[] {
    return this.dataStorageService.getAllWithdrawnReason();
  }
}
