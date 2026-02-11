import { Component } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  ClientSideRowModelModule,
  RowSelectionModule,
  RowApiModule,
  GridReadyEvent,
  GridApi,
  RowSelectionOptions,
  GetRowIdParams,
  TextFilterModule,
} from 'ag-grid-community';

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  RowSelectionModule,
  RowApiModule,
  TextFilterModule,
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular],
  template: `
    <ag-grid-angular
      style="width: 100%; height: 600px;"
      [rowSelection]="rowSelection"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      (gridReady)="onGridReady($event)"
      [getRowId]="getRowId"
      [multiSortKey]="'ctrl'"
    />
  `,
  styleUrl: './app.css',
})
export class App {
  private gridApi!: GridApi;

  rowData = [
    {
      make: 'Toyota',
      model: 'Camry',
      price: 45000,
      electric: false,
      publishDate: '01/01/2020',
      country: 'Japan',
      value: -72,
    },
    {
      make: 'Toyota',
      model: 'Bz50',
      price: 48000,
      electric: true,
      publishDate: '01/01/2021',
      country: 'Japan',
      value: -78,
    },
    {
      make: 'Ford',
      model: 'Mondeo',
      price: 32000,
      electric: false,
      publishDate: '01/01/2019',
      country: 'USA',
      value: 63,
    },
    {
      make: 'Porsche',
      model: 'Boxster',
      price: 72000,
      electric: false,
      publishDate: '01/07/2018',
      country: 'Germany',
      value: 90,
    },
    {
      make: 'Porsche',
      model: 'Taycan',
      price: 150000,
      electric: true,
      publishDate: '31/06/2020',
      country: 'Germany',
      value: 98,
    },
    {
      make: 'Tesla',
      model: 'Model S',
      price: 80000,
      electric: true,
      publishDate: '21/3/2018',
      country: 'USA',
      value: -95,
    },
    {
      make: 'Tesla',
      model: 'Model 3',
      price: 40000,
      electric: true,
      publishDate: '16/11/2019',
      country: 'USA',
      value: 88,
    },
    {
      make: 'BMW',
      model: '330i',
      price: 45000,
      electric: false,
      publishDate: '05/05/2017',
      country: 'Germany',
      value: 74,
    },
    {
      make: 'BMW',
      model: 'i4',
      price: 60000,
      electric: true,
      publishDate: '10/10/2021',
      country: 'Germany',
      value: 85,
    },
    {
      make: 'Audi',
      model: 'A4',
      price: 50000,
      electric: false,
      publishDate: '19/9/2016',
      country: 'Germany',
      value: 70,
    },
    {
      make: 'Audi',
      model: 'Avant e-tron',
      price: 70000,
      electric: true,
      publishDate: '08/08/2020',
      country: 'Germany',
      value: 84,
    },
    {
      make: 'Honda',
      model: 'Civic',
      price: 28000,
      electric: false,
      publishDate: '01/01/2015',
      country: 'Japan',
      value: 60,
    },
    {
      make: 'Volvo',
      model: 'XC60',
      price: 68000,
      electric: false,
      publishDate: '03/01/2018',
      country: 'Sweden',
      value: 82,
    },
  ];

  defaultColDef: ColDef = {
    flex: 1,
    sortable: false,
  };

  columnDefs: ColDef[] = [
    {
      field: 'make',
      headerName: 'Manufacturer',
      // filter: true,
      filter: 'agTextColumnFilter',
      filterParams: {
        buttons: ['apply', 'reset'],
        readonly: true,
      },
    },
    { field: 'model' },
    { field: 'country', headerName: 'Country' },
    {
      field: 'price',
      sortable: false,
    },
    {
      field: 'price',
      headerName: 'Tax-inclusive price',
      valueGetter: (params) => {
        return params.data.price * 1.06;
      },
      cellRenderer: (params: any) => {
        return '$' + params.value.toFixed(4);
      },
      comparator: (valueA: number, valueB: number) => {
        return valueA - valueB;
      },
    },
    { field: 'electric' },
    { field: 'publishDate', comparator: this.dateComparator },
    { field: 'value', sort: { direction: 'asc', type: 'absolute' } },
  ];

  rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'multiRow',
  };

  getRowId = (params: GetRowIdParams) => {
    return String(params.data.make + '-' + params.data.model);
  };

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    /**
     * Uncomment below to set default sort model on grid load
     */
    // const defaultSortModel: ColumnState[] = [
    //   { colId: 'make', sort: 'asc', sortIndex: 1 },
    //   { colId: 'model', sort: 'asc', sortIndex: 0 },
    // ];
    // this.gridApi.applyColumnState({
    //   state: defaultSortModel,
    //   applyOrder: true,
    // });
  }

  private dateComparator(date1: string, date2: string): number {
    const date1Parts = date1.split('/');
    const date2Parts = date2.split('/');
    const d1 = new Date(
      Number(date1Parts[2]),
      Number(date1Parts[1]) - 1,
      Number(date1Parts[0]),
    );
    const d2 = new Date(
      Number(date2Parts[2]),
      Number(date2Parts[1]) - 1,
      Number(date2Parts[0]),
    );
    return d1.getTime() - d2.getTime();
  }
}
