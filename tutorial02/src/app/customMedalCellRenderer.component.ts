import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import type { ICellRendererAngularComp } from 'ag-grid-angular';
import type { ICellRendererParams } from 'ag-grid-community';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span>
      {{ text }}
    </span>
  `,
})
export class CustomMedalCellRenderer implements ICellRendererAngularComp {
  public text: string = '';
  agInit(params: ICellRendererParams): void {
    this.text = params.value;
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }
}
