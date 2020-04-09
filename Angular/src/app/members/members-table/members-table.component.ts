import { Component } from '@angular/core';

import { MemberEntity } from '../models/member.model';
import { MembersApiService } from '../members-api.service';

@Component({
  selector: 'app-members-table',
  templateUrl: './members-table.component.html',
  styles: []
})
export class MembersTableComponent {
  members: MemberEntity[];
  organization = 'lemonconde';
  currentOrganization: string;

  constructor(private membersApi: MembersApiService) { }

  loadMembers(organization: string) {
    this.currentOrganization = this.getOrganization(organization);
    this.membersApi.getAllMembers(this.currentOrganization)
      .subscribe(
        (ms) => this.members = ms,
        (error) => console.log(error)
      );
  }

  getOrganization(organization): string {
    return organization ? organization : 'lemoncode';
  }

}
