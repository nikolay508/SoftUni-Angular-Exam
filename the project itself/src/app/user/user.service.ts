import { Injectable, OnDestroy } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);
  private user$ = this.user$$.asObservable();

  USER_KEY = '[user]';
  user: UserForAuth | null = null;
  userSubscription: Subscription | null = null;

  constructor(private http: HttpClient) {
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  get isLogged(): boolean {
    return !!this.user;
  }

  login(email: string, password: string) {
    return this.http
      .post<UserForAuth>('/api/login', { email, password })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<UserForAuth>('/api/register', {
        username,
        email,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http
      .post('/api/logout', {})
      .pipe(tap(() => this.user$$.next(null)));
  }

  getProfile() {
    return this.http
      .get<UserForAuth>('/api/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  isOwner(ownerId: string): boolean {
    return this.user?._id === ownerId;
  }

  getUserId(): string | null {
    return null; //this.user?._id || null;
  }

  getUser(): UserForAuth | null {
    return null; //this.user;
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
