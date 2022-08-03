## [Component interaction](https://angular.io/guide/component-interaction)

### Pass data from parent to child with input binding
Use `@Input()` decorator for this:
```typescript
@Component({
  ...
})
export class HeroChildComponent {
  @Input() hero!: Hero;
  // Aliases the child component property name masterName as 'master'.
  @Input('master') masterName = '';
}
```

### Intercept input property changes with a setter
Use an input property setter to intercept and act upon a `value` from the parent.

The setter of the `name` input property in the child `NameChildComponent` trims the whitespace
from a name and replaces an empty value with default text.
```typescript
@Component({
  ...
})
export class NameChildComponent {
  @Input()
  get name(): string { return this._name; }
  set name(name: string) {
    this._name = (name && name.trim()) || '<no name set>';
  }
  private _name = '';
}
```

### Intercept input property changes with `ngOnChanges()`
Detect and act upon changes to input property values with the `ngOnChanges()` method of
the `OnChanges` lifecycle hook interface.
> You might prefer this approach to the property setter when watching multiple,
interacting input properties.

```typescript
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  ...
})
export class VersionChildComponent implements OnChanges {
  @Input() major = 0;
  @Input() minor = 0;
  changeLog: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    const log: string[] = [];
    Object.entries(changes).forEach(([key, value]) => {
      log.push(`${key} changed from ${changedProp.previousValue} to ${changedProp.currentValue}`)
    });
    this.changeLog.push(log.join(', '));
  }
}
```

### Parent listens for child event
The child component exposes an `EventEmitter` property with which it `emits` events when
something happens. The parent binds to that event property and reacts to those events.

The child's `EventEmitter` property is an _output property_, typically adorned with an `@Output()`decorator

```typescript
@Component({
  ...
})
export class VoterComponent {
  @Input()  name = '';
  @Output() voted = new EventEmitter<boolean>();

  vote(agreed: boolean) {
    this.voted.emit(agreed);
  }
}
```

### Parent interacts with child using local variable
A parent component cannot use data binding to read child properties or invoke child methods.
Do both by creating a template reference variable for the child element and then reference
that variable within the parent template.

```typescript
@Component({
  selector: 'app-countdown-timer',
  template: '<p>{{message}}</p>'
})
export class CountdownTimerComponent implements OnDestroy {

  intervalId = 0;
  message = '';
  seconds = 11;

  ngOnDestroy() { this.clearTimer(); }

  start() { this.countDown(); }
  stop()  {
    this.clearTimer();
    this.message = `Holding at T-${this.seconds} seconds`;
  }

  private clearTimer() { clearInterval(this.intervalId); }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'Blast off!';
      } else {
        if (this.seconds < 0) { this.seconds = 10; } // reset
        this.message = `T-${this.seconds} seconds and counting`;
      }
    }, 1000);
  }
}

@Component({
  selector: 'app-countdown-parent-lv',
  template: `
    <h3>Countdown to Liftoff (via local variable)</h3>
    <button type="button" (click)="timer.start()">Start</button>
    <button type="button" (click)="timer.stop()">Stop</button>
    <div class="seconds">{{timer.seconds}}</div>
    <app-countdown-timer #timer></app-countdown-timer>
  `,
  styleUrls: ['../assets/demo.css']
})
export class CountdownLocalVarParentComponent { }
```

### Parent calls an @ViewChild()
The local variable approach is straightforward. But it is limited because the parent-child
wiring must be done entirely within the parent template. The parent component itself has
no access to the child.

You can't use the local variable technique if the parent component's class relies on the child
component's class. The parent-child relationship of the components is not established within
each component`s respective class with the local variable technique. Because the class
instances are not connected to one another, the parent class cannot access the child
class properties and methods.

When the parent component class requires that kind of access, inject the child component
into the parent as a ViewChild.

```typescript
@Component({
  selector: 'app-countdown-parent-vc',
  template: `
    <h3>Countdown to Liftoff (via ViewChild)</h3>
    <button type="button" (click)="start()">Start</button>
    <button type="button" (click)="stop()">Stop</button>
    <div class="seconds">{{ seconds() }}</div>
    <app-countdown-timer></app-countdown-timer>
  `,
  styleUrls: ['../assets/demo.css']
})
export class CountdownViewChildParentComponent implements AfterViewInit {

  @ViewChild(CountdownTimerComponent)
  private timerComponent!: CountdownTimerComponent;

  seconds() { return 0; }

  ngAfterViewInit() {
    // Redefine `seconds()` to get from the `CountdownTimerComponent.seconds` ...
    // but wait a tick first to avoid one-time devMode
    // unidirectional-data-flow-violation error
    setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
  }

  start() { this.timerComponent.start(); }
  stop() { this.timerComponent.stop(); }
}
```

### Parent and children communicate using a service
A parent component and its children share a service whose interface enables bi-directional
communication within the family.

The scope of the service instance is the parent component and its children. Components
outside this component subtree have no access to the service or their communications.

```typescript
@Injectable()
export class MissionService {

  // Observable string sources
  private missionAnnouncedSource = new Subject<string>();
  private missionConfirmedSource = new Subject<string>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  announceMission(mission: string) {
    this.missionAnnouncedSource.next(mission);
  }

  confirmMission(astronaut: string) {
    this.missionConfirmedSource.next(astronaut);
  }
}
```

