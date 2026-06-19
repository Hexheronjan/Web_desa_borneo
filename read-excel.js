const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const excelPath = path.join(__dirname, '..', 'tabel web.xlsx');

try {
  const workbook = XLSX.readFile(excelPath);
  const sheetNames = workbook.SheetNames;

  console.log('=== Excel File Contents ===\n');

  sheetNames.forEach((sheetName, index) => {
    console.log(`\n--- Sheet ${index + 1}: ${sheetName} ---`);
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    data.forEach((row, rowIndex) => {
      if (row.length > 0) {
        console.log(`Row ${rowIndex + 1}:`, row.join(' | '));
      }
    });
  });

} catch (error) {
  console.error('Error reading Excel file:', error.message);
}
