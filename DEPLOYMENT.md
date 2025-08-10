# Hướng dẫn Deploy lên GitHub Pages

## Cách 1: Deploy tự động với GitHub Actions (Khuyến nghị)

1. **Push code lên GitHub:**

   ```bash
   git add .
   git commit -m "Update GitHub Pages deployment workflow"
   git push origin main
   ```

2. **Bật GitHub Pages:**

   - Vào repository trên GitHub
   - Vào Settings > Pages
   - Source: GitHub Actions
   - Click Save

3. **GitHub Actions sẽ tự động:**
   - Build project
   - Deploy lên GitHub Pages
   - Website sẽ có sẵn tại: `https://[username].github.io/bo-noi-vu/`

## Cách 2: Deploy thủ công (nếu cần)

1. **Build project:**

   ```bash
   pnpm run build
   ```

2. **Deploy lên GitHub Pages:**
   - Sử dụng GitHub Actions workflow tự động
   - Hoặc upload thủ công thư mục `dist/` lên branch `gh-pages`

## Lưu ý quan trọng

- **Base URL:** Đã cấu hình trong `vite.config.ts` là `/bo-noi-vu/` (chỉ khi build production)
- **Build output:** Thư mục `dist/`
- **Deploy method:** GitHub Actions (không cần branch gh-pages)
- **Tự động deploy:** Mỗi khi push lên branch `main`

## Workflow mới

Workflow sử dụng GitHub Actions chính thức:

- `actions/configure-pages@v4`
- `actions/upload-pages-artifact@v3`
- `actions/deploy-pages@v4`

## Troubleshooting

- Nếu website không load được, kiểm tra base URL trong `vite.config.ts`
- Đảm bảo repository có quyền truy cập GitHub Pages
- Kiểm tra GitHub Actions logs trong tab Actions
- Đảm bảo đã bật GitHub Pages với source "GitHub Actions"
