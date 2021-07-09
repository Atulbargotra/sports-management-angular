import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css'],
})
export class InviteComponent implements OnInit {
  token: string;
  constructor(
    private teamService: TeamService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      let re = /!/gi;
      this.token = res.get('token').replace(re, '=');
    });
    console.log(this.token);
    this.teamService.joinTeamFromInvite(this.token).subscribe(
      () => {
        this.toast.success('Joined to team');
      },
      () => {
        this.toast.error('Failed to Join');
      }
    );
  }
}
