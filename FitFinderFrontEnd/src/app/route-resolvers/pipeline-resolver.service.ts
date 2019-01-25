import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {DataStorageService} from '../services/data-storage.service';
import {Observable} from 'rxjs/index';
import {Pipeline} from '../models/pipeline.model';

@Injectable({
  providedIn: 'root'
})
export class PipelineResolverService implements Resolve<Pipeline[]> {
  constructor(private dataStorageService: DataStorageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<Pipeline[]> | Promise<Pipeline[]> | Pipeline[] {
    return this.dataStorageService.getAllPipeline();
  }
}
