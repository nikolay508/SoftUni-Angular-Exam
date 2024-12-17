import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserForAuth as User } from '../../types/user'; // Use the correct interface

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const user = this.userService.user;
    this.user = user;
  }
}
