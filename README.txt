
# tangliketiktok.io.vn — Landing Page DEMO

Hai cách deploy:

## Cách 1 — Kéo thả (nhanh nhất, không cần Git)
- Dùng thư mục **tangliketiktok-landing-static** (đã build tĩnh sẵn).
- Vào Netlify → Add new site → **Deploy manually** → kéo cả **thư mục** này vào hoặc chọn upload.
- Lưu ý: Netlify Functions sẽ **không hoạt động** với cách kéo-thả. Form vẫn chạy **chế độ demo**.

## Cách 2 — Từ Git (để bật Netlify Functions)
1. Tạo repo GitHub, push toàn bộ **tangliketiktok-netlify-git**.
2. Netlify → Add new site → Import from Git → chọn repo.
3. Build command: *(trống)*, Publish directory: `.` (theo `netlify.toml`). Netlify sẽ tự bundling functions trong `netlify/functions`.
4. Sau deploy, form sẽ gọi được `/.netlify/functions/create-order` & `/.netlify/functions/check-order`.

## Sửa nội dung
- Chỉnh text/bảng giá ở `index.html`.
- Màu sắc/layout ở `style.css`.
- Luồng form & progress ở `script.js`.

## Cảnh báo
Tăng follow tự động có thể vi phạm Điều khoản của TikTok. Project chỉ dùng cho mục đích học tập/demo.
