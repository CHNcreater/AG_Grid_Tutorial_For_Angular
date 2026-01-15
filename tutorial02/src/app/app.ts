import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  ClientSideRowModelModule,
  RowSelectionModule,
  ColTypeDef,
  EditableCallbackParams,
  CellClassParams,
  CellStyleModule,
  TextEditorModule,
  NumberEditorModule,
  RowApiModule,
} from 'ag-grid-community';
import { RowGroupingModule, RowGroupingPanelModule } from 'ag-grid-enterprise';

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  RowGroupingModule,
  RowGroupingPanelModule,
  RowSelectionModule,
  RowApiModule,
  CellStyleModule,
  TextEditorModule,
  NumberEditorModule,
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular],
  template: `
    <h1>Editing Mode</h1>
    <ag-grid-angular
      style="width: 100%; height: 600px;"
      rowSelection="multiple"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      [rowGroupPanelShow]="rowGroupPanelShow"
      [groupDefaultExpanded]="groupDefaultExpanded"
      [columnTypes]="columnTypes"
    />
  `,
  styleUrl: './app.css',
})
export class App {
  rowData = [
    {
      make: 'Toyota',
      model: 'Celica',
      price: 35000,
      electric: false,
      note: '',
      rate: '',
    },
    {
      make: 'Toyota',
      model: 'Camry',
      price: 45000,
      electric: false,
      note: '',
      rate: '',
    },
    {
      make: 'Toyota',
      model: 'Bz50',
      price: 48000,
      electric: true,
      note: '',
      rate: '',
    },
    {
      make: 'Ford',
      model: 'Mondeo',
      price: 32000,
      electric: false,
      note: '',
      rate: '',
    },
    {
      make: 'Ford',
      model: 'Focus',
      price: 29000,
      electric: false,
      note: '',
      rate: '',
    },
    {
      make: 'Porsche',
      model: 'Boxster',
      price: 72000,
      electric: false,
      note: '',
      rate: '',
    },
    {
      make: 'Porsche',
      model: 'Taycan',
      price: 150000,
      electric: true,
      note: '',
      rate: '',
    },
    {
      make: 'Tesla',
      model: 'Model S',
      price: 80000,
      electric: true,
      note: '',
      rate: '',
    },
    {
      make: 'Tesla',
      model: 'Model 3',
      price: 40000,
      electric: true,
      note: '',
      rate: '',
    },
    {
      make: 'BMW',
      model: '330i',
      price: 45000,
      electric: false,
      note: '',
      rate: '',
    },
    {
      make: 'BMW',
      model: 'i4',
      price: 60000,
      electric: true,
      note: '',
      rate: '',
    },
    {
      make: 'Audi',
      model: 'A4',
      price: 50000,
      electric: false,
      note: '',
      rate: '',
    },
    {
      make: 'Audi',
      model: 'Avant e-tron',
      price: 70000,
      electric: true,
      note: '',
      rate: '',
    },
    {
      make: 'Honda',
      model: 'Civic',
      price: 28000,
      electric: false,
      note: '',
      rate: '',
    },
    {
      make: 'Volvo',
      model: 'XC60',
      price: 68000,
      electric: false,
      note: '',
      rate: '',
    },
    {
      make: 'Volvo',
      model: 'XC70 Recharge',
      price: 75000,
      electric: true,
      note: '',
      rate: '',
    },
  ];

  defaultColDef: ColDef = {
    flex: 1,
  };

  columnDefs: ColDef[] = [
    {
      field: 'make',
      headerName: 'Manufacturer',
    },
    { field: 'model' },
    {
      field: 'price',
    },
    { field: 'electric' },
    { field: 'note', editable: true },
    {
      field: 'note',
      editable: (params) => params.data.electric === true,
      headerName: 'Electric Note',
    },
    { field: 'rate', headerName: 'favorite stars', type: 'editableColumn' },
    {
      field: 'note',
      headerName: 'pop up note',
      editable: true,
      // cellEditor: 'agTextCellEditor',
      cellEditorPopup: true,
      cellEditorPopupPosition: 'under',
    },
  ];

  rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'never';
  groupDefaultExpanded = 1;
  groupDisplayType: 'singleColumn' | 'multipleColumns' | 'groupRows' =
    'groupRows';

  columnTypes: { [key: string]: ColTypeDef } = {
    editableColumn: {
      editable: (params: EditableCallbackParams) => this.isEditable(params),
      cellStyle: (params: CellClassParams) => {
        if (this.isEditable(params)) {
          return { backgroundColor: '#2244CC44' };
        }
        return null;
      },
    },
  };

  private isEditable(params: any): boolean {
    return params.data.electric === true;
  }
}
