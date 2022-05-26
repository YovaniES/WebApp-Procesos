import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/core/models/menu.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bandeja-fact',
  templateUrl: './bandeja-fact.component.html',
  styleUrls: ['./bandeja-fact.component.scss']
})
export class BandejaFactComponent implements OnInit {


  constructor(){}

  ngOnInit(): void {
  }

}
