const SHEET_ID = 'ĐIỀN_SHEET_ID_CỦA_BẠN_VÀO_ĐÂY';
const FOLDER_ID = 'ĐIỀN_FOLDER_ID_CỦA_BẠN_VÀO_ĐÂY';

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Đăng ký tuyển sinh Trung tâm GDNN-GDTX Đăk Tô')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function processForm(formObject) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    const folder = DriveApp.getFolderById(FOLDER_ID);

    // Nếu sheet trống, tạo header
    if (sheet.getLastRow() === 0) {
      const headers = [
        "Thời gian", "Họ và tên", "Ngày sinh", "Giới tính", "Nơi sinh", "Dân tộc", "Tôn giáo",
        "Hộ khẩu thường trú", "Chỗ ở hiện tại", "Số CCCD", "Ngày cấp", "Nơi cấp",
        "Năm TN THCS", "Trường TN THCS", "Điện thoại", "Lớp dự tuyển",
        "File: Giấy khai sinh", "File: CCCD", "File: Bằng TN/Giấy CN", "File: Học bạ THCS",
        "File: 02 Ảnh 3x4", "File: Học bạ 10/11", "File: Giấy chứng nhận ưu tiên", "File: Giấy XN không vi phạm PL"
      ];
      sheet.appendRow(headers);
      // Format header
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f3f3");
    }

    // Hàm upload file lên Drive và trả về URL
    function uploadFile(fileData, fileName) {
      if (!fileData || !fileName) return "";

      // fileData is expected to be a data URL: "data:image/jpeg;base64,/9j/4AAQ..."
      const commaIndex = fileData.indexOf(",");
      if (commaIndex === -1) return "";

      const contentType = fileData.substring(5, commaIndex).split(";")[0];
      const base64Data = fileData.substring(commaIndex + 1);

      const blob = Utilities.newBlob(Utilities.base64Decode(base64Data), contentType, fileName);
      const file = folder.createFile(blob);
      return file.getUrl();
    }

    const timestamp = new Date();
    const studentName = formObject.fullName;

    // Upload files
    const fileKhaiSinh = uploadFile(formObject.fileKhaiSinhData, studentName + " - Giay Khai Sinh");
    const fileCCCD = uploadFile(formObject.fileCCCDData, studentName + " - CCCD");
    const fileBangTN = uploadFile(formObject.fileBangTNData, studentName + " - Bang TN");
    const fileHocBaTHCS = uploadFile(formObject.fileHocBaTHCSData, studentName + " - Hoc Ba THCS");
    const fileAnh = uploadFile(formObject.fileAnhData, studentName + " - Anh 3x4");
    const fileHocBa1011 = uploadFile(formObject.fileHocBa1011Data, studentName + " - Hoc Ba 10_11");
    const fileUuTien = uploadFile(formObject.fileUuTienData, studentName + " - Giay Uu Tien");
    const fileXNVPL = uploadFile(formObject.fileXNVPLData, studentName + " - Giay XN khong VPPL");

    // Dữ liệu lưu vào sheet
    const rowData = [
      timestamp,
      formObject.fullName,
      formObject.dob,
      formObject.gender,
      formObject.placeOfBirth,
      formObject.ethnicity,
      formObject.religion,
      formObject.permanentAddress,
      formObject.currentAddress,
      formObject.cccdNumber,
      formObject.cccdDate,
      formObject.cccdPlace,
      formObject.graduationYear,
      formObject.schoolName,
      formObject.phoneNumber,
      formObject.classApplied,
      fileKhaiSinh,
      fileCCCD,
      fileBangTN,
      fileHocBaTHCS,
      fileAnh,
      fileHocBa1011,
      fileUuTien,
      fileXNVPL
    ];

    sheet.appendRow(rowData);

    return {
      success: true,
      message: "Hồ sơ của bạn đã được nộp thành công!"
    };

  } catch (error) {
    return {
      success: false,
      message: "Có lỗi xảy ra: " + error.message
    };
  }
}
