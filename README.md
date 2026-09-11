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

- Toàn bộ ảnh là ảnh thật của Mô (bộ ảnh bedding setup), nằm trong `assets/img/` và được đặt tên theo vị trí trên trang (`hero-1.jpg`, `coll-nha.jpg`, `p-nha-1.jpg`…). Muốn đổi ảnh chỉ cần thay file cùng tên.
- Tên sản phẩm, giá, màu lấy theo catalogue Mô Đi Phê; chính sách giao hàng / đổi trả theo file chính sách bán hàng.
- Các trang có thẻ `noindex` để Google không lập chỉ mục bản demo — xoá khi lên web chính thức.
