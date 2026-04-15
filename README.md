# Hướng dẫn Cài đặt Hệ thống Đăng ký Tuyển sinh Trực tuyến

Chào bạn, đây là hướng dẫn chi tiết để bạn triển khai trang web tuyển sinh trực tuyến trên nền tảng **Google Apps Script**.

## Bước 1: Chuẩn bị Google Drive và Google Sheets
1. Mở [Google Drive](https://drive.google.com).
2. **Tạo một thư mục mới** để chứa các file hồ sơ học sinh tải lên (ví dụ: `HoSoTuyenSinh_2026_2027`).
3. Mở thư mục vừa tạo, nhìn lên thanh địa chỉ trình duyệt, bạn sẽ thấy một đoạn mã ID. Ví dụ: `https://drive.google.com/drive/folders/1A2B3C4D5E6F...` -> ID của thư mục là `1A2B3C4D5E6F...`. **Hãy copy lại ID này.**
4. **Tạo một file Google Sheets mới** (để lưu dữ liệu người đăng ký). Đặt tên tùy ý (ví dụ: `DuLieuTuyenSinh`).
5. Mở file Sheets đó, nhìn lên thanh địa chỉ. Ví dụ: `https://docs.google.com/spreadsheets/d/1X2Y3Z4W.../edit` -> ID của file Sheets là `1X2Y3Z4W...`. **Hãy copy lại ID này.**

## Bước 2: Đưa mã nguồn lên Google Apps Script
1. Mở [Google Apps Script](https://script.google.com) và nhấp vào nút **Dự án mới (New Project)**.
2. Đặt tên cho dự án (ví dụ: `Web_TuyenSinh`).
3. Trong trình soạn thảo, bạn sẽ thấy file mặc định là `Mã.gs` (hoặc `Code.gs`). Xóa toàn bộ nội dung trong đó và **copy toàn bộ nội dung của file `Code.js`** trong dự án này dán vào.
4. Chú ý dòng 1 và 2 của file `Code.gs`:
   ```javascript
   const SHEET_ID = 'ĐIỀN_SHEET_ID_CỦA_BẠN_VÀO_ĐÂY';
   const FOLDER_ID = 'ĐIỀN_FOLDER_ID_CỦA_BẠN_VÀO_ĐÂY';
   ```
   **Thay thế** hai dòng chữ trên bằng ID Sheets và ID Folder bạn đã copy ở Bước 1.
5. Tiếp theo, tạo một file HTML mới: Nhấn vào biểu tượng dấu cộng `+` bên cạnh phần "Tệp" (Files) -> Chọn **HTML**.
6. Đặt tên file bắt buộc là **Index** (chữ I viết hoa).
7. Xóa mã HTML có sẵn, sau đó **copy toàn bộ nội dung của file `Index.html`** dán vào đó.
8. Nhấn nút **Lưu (Save)** biểu tượng đĩa mềm.

## Bước 3: Triển khai thành Trang Web (Deploy)
1. Ở góc trên cùng bên phải, nhấp vào nút **Triển khai (Deploy)** -> Chọn **Triển khai mới (New deployment)**.
2. Ở mục "Chọn loại" (Select type), nhấp vào biểu tượng bánh răng và chọn **Ứng dụng web (Web app)**.
3. Điền các thông tin:
   - Mô tả: `Phiên bản 1`
   - Chạy dưới dạng: Chọn **Tôi (Me - Email của bạn)**.
   - Người có quyền truy cập: Chọn **Bất kỳ ai (Anyone)**.
4. Nhấn nút **Triển khai (Deploy)**.
5. Google sẽ yêu cầu bạn cấp quyền truy cập.
   - Nhấn **Ủy quyền truy cập (Authorize access)**.
   - Chọn tài khoản Google của bạn.
   - Nếu có cảnh báo "Google chưa xác minh ứng dụng này", hãy nhấn vào **Nâng cao (Advanced)** -> Chọn **Đi tới ... (không an toàn) (Go to ... unsafe)**.
   - Nhấn **Cho phép (Allow)**.
6. Sau khi hoàn tất, bạn sẽ nhận được một đường link (URL) của ứng dụng web. Đây chính là link để học sinh có thể vào đăng ký! Copy link này và chia sẻ lên website/fanpage của Trung tâm.

## Lưu ý:
- Lần đầu tiên có người nộp biểu mẫu, mã sẽ tự động tạo tiêu đề (Header) cho các cột trong Google Sheets của bạn.
- Các file đính kèm sẽ được lưu trong thư mục bạn tạo, với tên file được tự động gán theo cấu trúc: `Tên Học Sinh - Loại giấy tờ` để bạn dễ quản lý.
- Mọi dữ liệu (bao gồm cả link xem trực tiếp các file ảnh/pdf) sẽ nằm chung trên 1 dòng tương ứng của học sinh đó trong Sheets.

Chúc bạn thành công!