import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
    concat,
    fromEvent,
    interval,
    noop,
    observable,
    Observable,
    of,
    timer,
    merge,
    Subject,
    BehaviorSubject,
    AsyncSubject,
    ReplaySubject
} from 'rxjs';
import {delayWhen, filter, map, take, timeout} from 'rxjs/operators';

@Component({
    selector: 'about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    ngOnInit() {
      // const interval$ = timer(3000, 1000);
      // const sub = interval$.subscribe(val => console.log("stream 1: " + val));

      // const click$ = fromEvent(document, "click");
      // click$.subscribe((evt) => {
      //   console.log('Unsubscribing from stream');
      //   sub.unsubscribe();
      //   console.log(evt)
      // })

      const http$ = createHttpObservable("/api/courses")

      http$.subscribe(
        courses => console.log({ courses }),
        noop,
        () => console.log('Completed')
      )


    }


}

function createHttpObservable(url: string) {
  return Observable.create((observer) => {
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((body) => {
        observer.next(body);
        observer.complete();
      })
      .catch((err) => {
        observer.error(err);
      });
  });
}






