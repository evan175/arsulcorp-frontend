import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf'


@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { 
    
  }

  genPDF(id: string, name: string, email: string, phoneNum: string) {
    const doc = new jsPDF();
    
    doc.setFontSize(18)
    doc.text('Arsul Corporation', 10, 10);
    doc.setFontSize(12)
    doc.text(`Name: ${name}`, 10, 20)

    return doc
  }

  savePDF(doc: jsPDF, name: string){
    doc.save(name + ' application.pdf')
  }

}
