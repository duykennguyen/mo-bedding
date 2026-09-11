# Mô Bedding — website demo

Bản dựng thử website cho **Mô Bedding** (Mô Đi Phê), theo cấu trúc nội dung trong tài liệu outline, giao diện lấy cảm hứng từ Parachute Home.

Trang tĩnh (HTML/CSS/JS thuần), song ngữ Việt / Anh.

## Các trang

| Trang | File |
|---|---|
| Trang chủ (13 khối theo outline) | `index.html` |
| Sản phẩm (lọc theo loại / bộ sưu tập / màu) | `shop.html` |
| Bộ sưu tập | `collections.html` |
| Chuyện của Mô · Lụa tre · Nghệ thuật làm giường | `about.html` |
| Mô Bedding Story (kho bài viết) | `stories.html` |
| Bài viết mẫu | `story.html` |

## Chạy trên máy

```bash
python -m http.server 5520
```

Rồi mở http://localhost:5520

## Lưu ý

- Ảnh thật của Mô: `assets/img/`. Các ảnh còn lại là ảnh minh hoạ từ Unsplash, sẽ thay bằng ảnh của Mô.
- Giá, tên màu và nội dung quảng cáo đang là nội dung tạm.
- Các trang có thẻ `noindex` để Google không lập chỉ mục bản demo — xoá khi lên web chính thức.
