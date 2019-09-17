import { Component, OnInit } from '@angular/core';
import {Workflow} from '../../../../models/workflow.model';
import {ActivatedRoute, Data, Route} from '@angular/router';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css']
})
export class WorkflowListComponent implements OnInit {

  workflows: Workflow[] = [];


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        this.workflows = data['workflows'];
      }
    )
  }

}
