declare module 'pdfmake/build/pdfmake' {
  const pdfMake: any;
  export default pdfMake;
}

declare module 'pdfmake/build/vfs_fonts' {
  const vfs: any;
  export default vfs;
}

declare module 'html2pdf.js'{
  const html2pdf: any;
  export default html2pdf;
}


import "jspdf";

declare module "jspdf" {
  interface jsPDF {
    getNumberOfPages(): number;
    setPage(pageNumber: number): jsPDF;
    lastAutoTable?: {
      finalY: number;
    };
  }
}