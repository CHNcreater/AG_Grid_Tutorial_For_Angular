import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from 'ag-grid-community';
import { MyCellComponent } from './myCellComponent';

ModuleRegistry.registerModules([AllCommunityModule]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular],
  template: `
    <ag-grid-angular
      [theme]="themeQuartz"
      style="height: 500px;"
      [enableCellSpan]="true"
      [pagination]="pagination"
      [paginationPageSize]="paginationPageSize"
      [paginationPageSizeSelector]="paginationPageSizeSelector"
      [rowClassRules]="rowClassRules"
      rowSelection="multiple"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
    />
  `,
  styleUrl: './app.css',
})
export class App {
  pagination = true;
  paginationPageSize = 10;
  paginationPageSizeSelector = [10, 20];
  themeQuartz = themeQuartz;

  rowClassRules = {
    'green-row': (params: any) => {
      return params.data.electric === true;
    },
  };

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000, electric: false },
    { make: 'Toyota', model: 'Camry', price: 45000, electric: false },
    { make: 'Ford', model: 'Mondeo', price: 32000, electric: false },
    { make: 'Porsche', model: 'Boxster', price: 72000, electric: false },
    { make: 'Tesla', model: 'Model S', price: 80000, electric: true },
    { make: 'Nissan', model: 'Leaf', price: 29000, electric: true },
    { make: 'BMW', model: '330i', price: 45000, electric: false },
    { make: 'Audi', model: 'A4', price: 50000, electric: false },
    { make: 'Honda', model: 'Civic', price: 28000, electric: false },
    { make: 'Hyundai', model: 'Ioniq 5', price: 55000, electric: true },
    { make: 'Volkswagen', model: 'ID.4', price: 52000, electric: true },
    { make: 'Chevrolet', model: 'Bolt', price: 42000, electric: true },
    { make: 'Mercedes', model: 'C-Class', price: 65000, electric: false },
    { make: 'Volvo', model: 'XC60', price: 68000, electric: false },
    { make: 'Jaguar', model: 'I-PACE', price: 84000, electric: true },
    { make: 'Lucid', model: 'Air', price: 95000, electric: true },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    editable: true,
  };

  columnDefs: ColDef[] = [
    {
      field: 'make',
      headerName: 'Manufacturer',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Toyota', 'Ford', 'Porsche', 'Tesla'],
      },
      cellRenderer: MyCellComponent,
      checkboxSelection: true,
      flex: 2,
    },
    { field: 'model' },
    {
      field: 'price',
      valueFormatter: (params) => '$' + params.value.toLocaleString(),
      cellClassRules: {
        'price-high': (params) => params.value > 70000,
      },
    },
    { field: 'electric' },
    {
      valueGetter: (params) => params.data.make + ' ' + params.data.model,
      headerName: 'Full Name',
      flex: 2,
    },
  ];
}
