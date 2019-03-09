import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Train } from 'src/app/models/GoApiResponse';

@Component({
  selector: 'imtd-train-status-row',
  templateUrl: './train-status-row.component.html',
  styleUrls: ['./train-status-row.component.scss']
})
export class TrainStatusRowComponent implements AfterViewInit {

  @Input() train: Train;
  name: string;

  constructor() { }

  ngAfterViewInit() { }
}
