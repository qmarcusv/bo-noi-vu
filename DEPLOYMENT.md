# Hướng dẫn Deploy lên GitHub Pages

## Cách 1: Deploy tự động với GitHub Actions (Khuyến nghị)

1. **Push code lên GitHub:**

   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

2. **Bật GitHub Pages:**

   - Vào repository trên GitHub
   - Vào Settings > Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)
   - Click Save

3. **GitHub Actions sẽ tự động:**
   - Build project
   - Deploy lên branch gh-pages
   - Website sẽ có sẵn tại: `https://[username].github.io/bo-noi-vu/`

## Cách 2: Deploy thủ công

1. **Build project:**

   ```bash
   pnpm run build
   ```

2. **Deploy lên GitHub Pages:**

   ```bash
   pnpm run deploy
   ```

3. **Push branch gh-pages:**
   ```bash
   git push origin gh-pages
   ```

## Lưu ý quan trọng

- **Base URL:** Đã cấu hình trong `vite.config.ts` là `/bo-noi-vu/`
- **Build output:** Thư mục `dist/`
- **Branch deploy:** `gh-pages`
- **Tự động deploy:** Mỗi khi push lên branch `main`

## Troubleshooting

- Nếu website không load được, kiểm tra base URL trong `vite.config.ts`
- Đảm bảo repository có quyền truy cập GitHub Pages
- Kiểm tra GitHub Actions logs nếu có lỗi
