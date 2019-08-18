export class Media{


  constructor(filePath = '', fileName = '', fileType = '', fileSize = '',_fileUploadDate= Date) {
      this.filePath = filePath;
      this.fileName = fileName;
      this.fileType = fileType;
      this.fileSize = fileSize;
      this._fileUploadDate = new Date(Date.now());
  }

  filePath: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  _fileUploadDate:Date;
}




