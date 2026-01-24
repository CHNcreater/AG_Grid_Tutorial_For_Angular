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
} from 'ag-grid-community';

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  RowSelectionModule,
  RowApiModule,
]);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AgGridAngular],
  template: `
    <h1>Data operation</h1>
    <div style="display: flex; gap: 8px; margin-bottom: 4px;">
      <button (click)="addItems(undefined)">Add Items</button>
      <button (click)="addItems(2)">Add Items addIndex=2</button>
      <button (click)="updateItems()">Update Top 2</button>
      <button (click)="onRemoveSelected()">Remove Selected</button>
      <button (click)="getRowData()">Get Row Data</button>
      <button (click)="clearData()">Clear Data</button>
    </div>
    <ag-grid-angular
      style="width: 100%; height: 600px;"
      [rowSelection]="rowSelection"
      [rowData]="rowData"
      [columnDefs]="columnDefs"
      [defaultColDef]="defaultColDef"
      (gridReady)="onGridReady($event)"
      [getRowId]="getRowId"
    />
  `,
  styleUrl: './app.css',
})
export class App {
  rowData = [
    {
      make: 'Toyota',
      model: 'Camry',
      price: 45000,
      electric: false,
    },
    {
      make: 'Toyota',
      model: 'Bz50',
      price: 48000,
      electric: true,
    },
    {
      make: 'Ford',
      model: 'Mondeo',
      price: 32000,
      electric: false,
    },
    {
      make: 'Porsche',
      model: 'Boxster',
      price: 72000,
      electric: false,
    },
    {
      make: 'Porsche',
      model: 'Taycan',
      price: 150000,
      electric: true,
    },
    {
      make: 'Tesla',
      model: 'Model S',
      price: 80000,
      electric: true,
    },
    {
      make: 'Tesla',
      model: 'Model 3',
      price: 40000,
      electric: true,
    },
    {
      make: 'BMW',
      model: '330i',
      price: 45000,
      electric: false,
    },
    {
      make: 'BMW',
      model: 'i4',
      price: 60000,
      electric: true,
    },
    {
      make: 'Audi',
      model: 'A4',
      price: 50000,
      electric: false,
    },
    {
      make: 'Audi',
      model: 'Avant e-tron',
      price: 70000,
      electric: true,
    },
    {
      make: 'Honda',
      model: 'Civic',
      price: 28000,
      electric: false,
    },
    {
      make: 'Volvo',
      model: 'XC60',
      price: 68000,
      electric: false,
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
      editable: true,
      valueSetter: (params) => {
        const newValue = Number(params.newValue);
        console.log('Parsed value:', newValue);
        if (isNaN(newValue) || newValue < 0) {
          console.log('Invalid value, rejecting change.');
          return false; // don't set invalid values
        }
        params.data.price = newValue;
        console.log('Value set to:', newValue);
        return true;
      },
      valueParser: (params) => {
        return isNaN(Number(params.newValue))
          ? params.oldValue
          : params.newValue;
      },
    },
    { field: 'electric', editable: true },
  ];

  rowSelection: RowSelectionOptions | 'single' | 'multiple' = {
    mode: 'multiRow',
  };

  getRowId = (params: GetRowIdParams) => {
    return String(params.data.make + '-' + params.data.model);
  };

  private gridApi!: GridApi;

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
  }

  public addItems(addIndex: number | undefined): void {
    const newItems = [
      {
        make: 'New',
        model: 'Car ' + Math.floor(Math.random() * 1000),
        price: Math.floor(Math.random() * 100000),
        electric: Math.random() < 0.5,
      },
    ];
    this.gridApi.applyTransaction({
      add: newItems,
      addIndex: addIndex,
    });
  }

  public updateItems(): void {
    // update the first 2 items
    const itemsToUpdate: any[] = [];
    this.gridApi.forEachNodeAfterFilterAndSort(function (rowNode, index) {
      // only do first 2
      if (index >= 2) {
        return;
      }
      const data = rowNode.data;
      // put on a tariff of 10%
      data.price = data.price * 1.1;
      itemsToUpdate.push(data);
    });
    const res = this.gridApi.applyTransaction({ update: itemsToUpdate })!;
    console.log('Updated ' + res.update.length + ' items');
  }

  public onRemoveSelected(): void {
    const selectedNode = this.gridApi.getSelectedRows();
    const result = this.gridApi.applyTransaction({
      remove: selectedNode,
    });
    console.log('Removed ' + result!.remove.length + ' items');
  }

  public getRowData(): void {
    const rowData: any[] = [];
    this.gridApi.forEachNode(function (node) {
      rowData.push(node.data);
    });
    console.log('Row Data:');
    console.table(rowData);
  }

  public clearData(): void {
    this.rowData = [];
  }
}
