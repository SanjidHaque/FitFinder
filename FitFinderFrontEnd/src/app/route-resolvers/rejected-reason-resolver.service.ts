import { Injectable } from '@angular/core';
import {DataStorageService} from '../services/data-storage.service';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {RejectedReason} from '../models/rejected-reason.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RejectedReasonResolverService implements Resolve<RejectedReason[]>{

  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<RejectedReason[]> | Promise<RejectedReason[]> | RejectedReason[] {
    return this.dataStorageService.getAllRejectedReason();
  }
}
