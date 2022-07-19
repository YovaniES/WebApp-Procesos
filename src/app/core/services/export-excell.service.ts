import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root',
})
export class ExportExcellService {

  constructor() {}

  exportarExcel(json: any[], excelFileName: string){
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const wb: XLSX.WorkBook = {
          Sheets    : {'data': ws},
          SheetNames: ['data']
    };

    const excelBuffer: any = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});

    // Llammamos al metodo - buffer anf filename
    this.guardarArchExcel(excelBuffer, excelFileName)
  }


  guardarArchExcel(buffer: any, fileName: string){
    const EXCEL_TYPE       = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION  = '.xlsx'

    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_'+ new Date().getTime() + EXCEL_EXTENSION);
    }


  //excel button click functionality
  // exportExcel() {
  //   import('xlsx').then((xlsx) => {
  //     const worksheet = xlsx.utils.json_to_sheet(this.sales); // Sale Data
  //     const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
  //     const excelBuffer: any = xlsx.write(workbook, {
  //       bookType: 'xlsx',
  //       type: 'array',
  //     });
  //     this.saveAsExcelFile(excelBuffer, 'sales');
  //   });
  // }
  // saveAsExcelFile(buffer: any, fileName: string): void {


  //   import('file-saver').then((FileSaver) => {
  //     let EXCEL_TYPE =
  //       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  //     let EXCEL_EXTENSION = '.xlsx';

  //     const data: Blob = new Blob([buffer], {
  //       type: EXCEL_TYPE,
  //     });
  //     FileSaver.saveAs(
  //       data,
  //       fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
  //     );
  //   });
  // }
}
