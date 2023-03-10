import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const useIsComponentMounted = function () {
    const isComponentMounted = useRef(false);

    useEffect(() => {
        isComponentMounted.current = true;
        return () => {
            isComponentMounted.current = false;
        };
    }, []);

    return isComponentMounted;
}

// Function to generate chars
const funcUniqueKey = function (length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const exportPDFUsingJSPDF = (filename, title, headers, parseDynamicData) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    //const title = "My Awesome Report";
    //const headers = [["NAME", "PROFESSION"]];
    //const dynamicData = [
    //    { name: "Keanu Reeves", profession: "Actor" },
    //    { name: "Lionel Messi", profession: "Football Player" },
    //    { name: "Cristiano Ronaldo", profession: "Football Player" },
    //    { name: "Jack Nicklaus", profession: "Golf Player" },
    //];
    //const parseDynamicData = dynamicData.map(elt => [elt.name, elt.profession]);

    let content = {
        startY: 50,
        head: headers,
        body: parseDynamicData
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(filename + ".pdf")
}

const exportCSVDefault = (filename, headers, dynamicData) => {
    //const dummyData = "rahul,delhi,accountsdept\n";
    //const csvContent = `data:text/pdf;charset=utf-8,${dummyData}`;
    //const encodedURI = encodeURI(csvContent);
    //await window.open(encodedURI);

    //create CSV file data in an array
    //var csvFileData = [
    //    ['Alan Walker', 'Singer'],
    //    ['Cristiano Ronaldo', 'Footballer'],
    //    ['Saina Nehwal', 'Badminton Player'],
    //    ['Arijit Singh', 'Singer'],
    //    ['Terence Lewis', 'Dancer']
    //];
    var csvFileData = dynamicData;
    //define the heading for each row of the data
    var csv = headers;//'Name,Profession\n';

    //merge the data with CSV
    csvFileData.forEach(function (row) {
        csv += row.join(',');
        csv += "\n";
    });


    ////display the created CSV data on the web browser 
    //document.write(csv);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    //hiddenElement.target = '_blank';

    //provide the name for the CSV file to be downloaded
    hiddenElement.download = filename + '.csv';
    hiddenElement.click();
}

const exportExcelUsingXlsxUtil = (fileName, headers ,dynamicData) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const wb = XLSX.utils.book_new();

    //const headers = [
    //    ['Sr No', 'User Name', 'Department', 'Bank', 'Country', 'Region', 'Amount']
    //];
    //let dynamicData = [
    //    ['Alan Walker', 'Singer'],
    //    ['Cristiano Ronaldo', 'Footballer'],
    //    ['Saina Nehwal', 'Badminton Player'],
    //    ['Arijit Singh', 'Singer'],
    //    ['Terence Lewis', 'Dancer']
    //]

    // creating sheet and adding data from 2nd row of column A.
    // leaving first row to add headers
    const ws = XLSX.utils.json_to_sheet(dynamicData, { origin: 'A2', skipHeader: true });

    // adding headers to the first row of the created sheet.
    // sheet already have contents from above statement.
    XLSX.utils.sheet_add_aoa(ws, headers, { origin: 'A1' });

    // appending sheet with a name
    XLSX.utils.book_append_sheet(wb, ws, 'Records');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
}

export default { funcUniqueKey, useIsComponentMounted, exportPDFUsingJSPDF, exportCSVDefault, exportExcelUsingXlsxUtil};