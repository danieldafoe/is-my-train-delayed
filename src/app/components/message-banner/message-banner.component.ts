import { Component, Input, AfterViewInit } from '@angular/core';
import { GoApiResponseFailure } from 'src/app/models/GoApiResponse';

@Component({
  selector: 'imtd-message-banner',
  templateUrl: './message-banner.component.html',
  styleUrls: ['./message-banner.component.scss']
})
export class MessageBannerComponent implements AfterViewInit {

  @Input() error: GoApiResponseFailure;
  errorType: string;

  constructor() { }

  ngAfterViewInit() {
    console.log(this.error);
    this.errorType = this.error.name;
  }

}
