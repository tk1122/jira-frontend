import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Notification} from "../../../../../shared/model/notification";
import {map} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {deleteNotification, loadNotification, markAsRead, markAsReceived} from "../../notification.action";
import {notifications, notificationsLoaded} from "../../notification.selector";
import {userId} from "../../../auth/auth.selectors";

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent implements OnInit {
  private notifCollection?: AngularFirestoreCollection<Notification>;
  notifs$: Observable<(Notification | {timestamp: string})[] > = of([]);
  count: number = 0;
  initLoading = true;
  loadingMore = false;
  checked = true
  data: any[] = [];
  constructor(
    private readonly afs: AngularFirestore,
    private readonly store: Store
  ) {
    this.store.pipe(
      select(userId)
    ).subscribe(id => {
      if (id) {
        this.notifCollection = afs.collection<Notification>(id.toString());
        this.notifCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Notification;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        ).subscribe(notifications => {
          this.store.dispatch(loadNotification({notifications}));
          this.count = notifications.filter(notification => notification.status === 0).length;
        });
      }
    })
  }

  ngOnInit(): void {
   this.notifs$ = this.store.pipe(select(notificationsLoaded))
    this.initLoading = false;

  }

  markAsReceived(): void {
    this.store.dispatch(markAsReceived())
  }

  markAsRead(id?: string): void {
    this.store.dispatch(markAsRead({id}))
  }

  deleteNotification(id: string): void {
    this.store.dispatch(deleteNotification({id}))
  }

  edit(item: any): void {
    // this.msg.success(item.email);
  }

  // ngAfterViewInit() {
  //   this.notifCollection.stateChanges(['added']).pipe(
  //     map(actions => actions.map(a => {
  //       const data = a.payload.doc.data() as Notification;
  //       const id = a.payload.doc.id;
  //       return { id, ...data };
  //     }))
  //   ).subscribe(x => console.log(x))
  // }
}
