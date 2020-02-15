import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SharedVarService } from './sharedvar';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  debounce: Subject<string> = new Subject<string>();

  constructor(private service: SharedVarService) {
  }

  ngOnInit(): void {   
    this.debounce
      .pipe(debounceTime(500))
      .subscribe(value => {
        this.service.setValue(value);
      });

  }    
  ngOnDestroy(): void {
      this.debounce.unsubscribe();
  }
}
