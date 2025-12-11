# Product Requirements Document (PRD) - Kho Tổng Vệ Sinh Việt

## 1. Giới thiệu
"Kho Tổng Vệ Sinh Việt" là một ứng dụng web (Web App) phục vụ mục đích thương mại điện tử và dự toán chi phí xây dựng. Ứng dụng cung cấp giao diện trực quan cho người dùng tìm kiếm sản phẩm, xem chi tiết, và quản lý giỏ hàng/dự toán. Ngoài ra, hệ thống còn bao gồm trang quản trị dành cho admin.

## 2. Công Nghệ Sử Dụng
- **Frontend**:
  - **Framework**: React (với TypeScript) build bằng Vite.
  - **Styling**: Tailwind CSS.
  - **State Management**: React Context API.
- **Backend**:
  - **Framework**: FastAPI (Python).
  - **Database**: SQLite (Development) / PostgreSQL (Production) + SQLModel (ORM).
  - **Package Manager**: UV (Quản lý dependency và môi trường Python).
- **DevOps & Tooling**:
  - **Make**: Tự động hóa các tác vụ.
    - `make install`: Cài đặt toàn bộ thư viện.
    - `make dev`: Chạy chế độ phát triển (Frontend + Backend).
    - `make prd`: Build và chạy chế độ sản phẩm (Preview).
  - **Docker**: (Dự kiến) Containerization.

## 3. Cấu Trúc Dự Án
Dự án được tổ chức theo mô hình Client-Server tách biệt:
```
shop_vesinh/
├── frontend/       # Source code React (Giao diện người dùng)
├── backend/        # Source code FastAPI (Xử lý logic, API, Database)
├── Makefile        # File lệnh quản lý dự án
└── prd.md          # Tài liệu yêu cầu sản phẩm
```

## 4. Kiến Trúc Hệ Thống (Mới)
### 4.1. Frontend (`/frontend`)
- Gọi API từ Backend thay vì sử dụng Mock Data cục bộ.
- Trang Admin sẽ được xác thực qua API.
- Các Context (Cart, Product) sẽ được cập nhật để sync dữ liệu với Server.

### 4.2. Backend (`/backend`)
- **API Endpoints**:
  - `GET /api/products`: Lấy danh sách sản phẩm.
  - `POST /api/orders`: Gửi đơn hàng/dự toán.
  - `GET /api/admin/dashboard`: Dữ liệu cho trang quản trị.
- **Data Model**: Sử dụng SQLModel để định nghĩa Schema cho Product, Order.

## 6. Hướng Dẫn Chạy Thủ Công (Windows)
Nếu bạn không muốn sử dụng `make`, hãy làm theo các bước sau để chạy từng phần:

### 6.1. Chạy Backend (API Server)
Mở một cửa sổ Terminal (PowerShell/CMD) mới:
1.  Di chuyển vào thư mục backend:
    ```powershell
    cd backend
    ```
2.  Cài đặt thư viện (chỉ cần làm lần đầu):
    ```powershell
    uv sync
    ```
3.  **Kích hoạt môi trường ảo (.venv)**:
    ```powershell
    .venv\Scripts\activate
    ```
    *(Sau khi gõ, bạn sẽ thấy dòng chữ `(.venv)` xuất hiện ở đầu dòng lệnh)*
4.  Chạy Server:
    ```powershell
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```
    ✅ Lúc này Backend đã chạy tại: http://localhost:8000 (Xem tài liệu API tại http://localhost:8000/docs)

### 6.2. Chạy Frontend (Giao Diện Web)
Mở một cửa sổ Terminal **khác**:
1.  Di chuyển vào thư mục frontend:
    ```powershell
    cd frontend
    ```
2.  Chạy Web App:
    ```powershell
    npm run dev
    ```
    ✅ Frontend chạy tại: http://localhost:3000

---
*Văn bản này được cập nhật tự động dựa trên phân tích mã nguồn hiện tại (`App.tsx` và cấu trúc dự án).*