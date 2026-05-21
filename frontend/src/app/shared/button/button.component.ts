import { Component, input, output } from '@angular/core';
import { Button } from '../models/button.model';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  btnData = input<Button | null>(null);
  isActive = input<boolean>(false);
  groupName = input<string>('btn-group');
  
  select = output<void>();
}
