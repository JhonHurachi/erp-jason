import { ExcelService } from './services/excel.service';
import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyecto1';
  registros$ = this.afs.collection<any>('productos', ref => ref.orderBy('abreviatura', 'asc'))
      .valueChanges().pipe(catchError(() => of([])))
      .pipe(
        map((datos: any[]) => datos.map(reg => ({
            ...reg
        })))
    );

  constructor(
    private afs: AngularFirestore,
    private xlsx: ExcelService
  ) {
  }

  exportar(registros: any[]) {
    this.xlsx.exportAsExcelFile(registros, 'reporte');
  }

}
