import type { FileType } from '../interfaces/ui-interfaces';
/* eslint-disable @typescript-eslint/no-explicit-any */



export const generateDownload = (file: any, fileName: string, type: FileType): void => {
  const url = window.URL.createObjectURL(
    new Blob([file], { type: getType(type) })
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
};



const getType = (type: FileType) => {

  switch (type) {
    case "excel":
      return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

    case "csv":
      return "text/csv"

    case "doc":
      return "application/msword"

    default:
      return "application/pdf"
  }

}
