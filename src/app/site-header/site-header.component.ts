import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'bot-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {

  user: IUser | null = null;
  showSignOutMenu: boolean = false;

  constructor(private userService: UserService,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {this.user = user}
    });
  }

  toogleSignOutMenu(){
    this.showSignOutMenu = !this.showSignOutMenu;
  }

  signOut(){
    this.userService.signOut();
    this.showSignOutMenu = false;
    this.router.navigate(['/'])
  }

}
