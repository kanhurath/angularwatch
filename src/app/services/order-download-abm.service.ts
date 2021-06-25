import { Injectable } from "@angular/core";

@Injectable()
export class OrderDownloadAbmService {
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
  
  // downloadFile(data, filename = "data") {
  //   let csvData = this.ConvertToCSV(data, [
  //     "order_Number",
  //     "order_Date",
  //     "socode",
  //     "abmCode",
  //     "rbmCode",
  //     "variant",
  //     "totalQty",
  //   ]);
  //   console.log(csvData);
  //   csvData = csvData.replace(/null/g, '"0"');
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

  // ConvertToCSV(objArray, headerList) {
  //   let array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  //   let str = "";
  //   for (let index in headerList) {
  //     str += headerList[index] + ",";
  //   }
  //   str += "\r\n";
  //   for (let i = 0; i < array.length; i++) {
  //     let line = i + 1 + "";
  //     for (let index in headerList) {
  //       let head = headerList[index];
  //       str += array[i][head] + ",";
  //     }
  //     str += "\r\n";
  //   }
  //   return str;
  // }

}
