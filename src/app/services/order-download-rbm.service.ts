import { Injectable } from "@angular/core";

@Injectable()
export class OrderDownloadRbmService {

public downloadFile(data: any, filename = "data") {
    const replacer = (key, value) => (value === null ? "" : value); 
    const header = Object.keys(data[0]);
    const csv = data.map((row) =>
      header
        .map((fieldName) => JSON.stringify(row[fieldName], replacer))
        .join(",")
    );
    csv.unshift(header.join(","));
    const csvArray = csv.join("\r\n");

    const a = document.createElement("a");
    const blob = new Blob([csvArray], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = filename + ".csv";
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  
  // public downloadFile(data, filename = "data") {
  //   const headers = [
  //     "order_Number",
  //     "order_Date",
  //     "socode",
  //     "abmCode",
  //     "rbmCode",
  //     "variant",
  //     "totalQty",
  //   ];
  //   let csvData = this.convertToCSV(data, headers);
  //   console.log(csvData);
  //   csvData = csvData.replace(/null/g, '"0"');
  //   // Start File Download
  //   let blob = new Blob(["\ufeff" + csvData], {
  //     type: "text/csv;charset=utf-8;",
  //   });
  //   let dwldLink = document.createElement("a");
  //   let url = URL.createObjectURL(blob);
  //   let isSafariBrowser =
  //     navigator.userAgent.indexOf("Safari") != -1 &&
  //     navigator.userAgent.indexOf("Chrome") == -1;
  //   if (isSafariBrowser) {
  //     //if Safari open in new window to save file with random filename.
  //     dwldLink.setAttribute("target", "_blank");
  //   }
  //   dwldLink.setAttribute("href", url);
  //   dwldLink.setAttribute("download", filename + ".csv");
  //   dwldLink.style.visibility = "hidden";
  //   document.body.appendChild(dwldLink);
  //   dwldLink.click();
  //   document.body.removeChild(dwldLink);
  // }

  //private convertToCSV(objArray, headers) {
  //console.log(objArray);
  //console.log(headers);
  // const colsCount = headers.length - 1;
  // let items = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  // let str = "";

  // // Start Header
  // for (let index in headers) {
  //   let separater = +index < colsCount ? "," : "";
  //   str += headers[index] + separater;
  // }
  // str += "\n";

  // // Start Actual Data
  // for (let i = 0; i < items.length; i++) {
  //   for (let index in headers) {
  //     let key = headers[index];
  //     let separater = +index < colsCount ? "," : "";
  //     const value =
  //       items[i][key] != undefined && items[i][key] != null
  //         ? items[i][key]
  //         : "";
  //     str += value + separater;
  //   }
  //   str += "\n";
  // }

  // return str;

}
