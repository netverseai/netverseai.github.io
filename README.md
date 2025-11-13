# Netverse Intelligence Website

## 部署到GitHub Pages

### 当前状态
✅ 网站已重构为组件化架构
✅ 支持多语言切换（简中、繁中、英语、日语、德语）
✅ 响应式设计，适配移动端
✅ 动态组件加载系统

### 部署步骤

1. **推送到GitHub仓库**
   ```bash
   git add .
   git commit -m "Component-based website with multi-language support"
   git push origin main
   ```

2. **启用GitHub Pages**
   - 进入GitHub仓库设置
   - 找到"Pages"选项
   - 选择源分支（通常是main）
   - 保存设置

3. **访问网站**
   - 网站将在 `https://[username].github.io/[repository-name]/` 上线

### 本地测试方法

由于使用了动态组件加载，本地测试需要HTTP服务器：

```bash
# 使用Python HTTP服务器
python3 -m http.server 8000

# 或使用Node.js http-server
npx http-server

# 然后访问 http://localhost:8000
```

### 文件结构
```
├── index.html              # 主页
├── gripper-i.html          # 产品页面
├── component-loader.js     # 组件加载器
├── scripts.js             # 语言管理和交互
├── styles.css             # 样式
├── components/            # 可复用组件
│   ├── head.html          # 头部组件
│   ├── top-bar.html       # 顶部栏组件
│   ├── navbar.html        # 导航栏组件
│   └── footer.html        # 页脚组件
├── lang/                  # 语言文件
│   ├── zh-cn.json         # 简体中文
│   ├── zh-tw.json         # 繁体中文
│   ├── en.json            # 英语
│   ├── ja.json            # 日语
│   └── de.json            # 德语
└── images/                # 图片资源
```

### 维护说明

- **更新组件**: 修改`components/`目录下的文件即可全站同步更新
- **添加语言**: 在`lang/`目录下添加新的语言文件
- **样式调整**: 主要修改`styles.css`文件