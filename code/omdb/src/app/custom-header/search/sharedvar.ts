import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharedVarService {
    private routerInfo: BehaviorSubject<string>;
    constructor() {
        this.routerInfo = new BehaviorSubject<string>('');
    }

    setValue(newValue): void {
        this.routerInfo.next(newValue);
    }

    getValue(): Observable<string> {
        return this.routerInfo.asObservable();
    }
}