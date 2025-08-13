# 文字转语音（TTS）演示项目

这是一个基于FastAPI后端和React前端的文字转语音演示应用。

## 功能特性

- 🎯 多语言文字转语音支持（中文、英文、日文、韩文、法文、西班牙文等）
- 🚀 基于FastAPI的高性能后端API
- 💻 现代化React前端界面
- 🎵 实时音频生成和播放
- 📱 响应式设计，支持移动端

## 技术栈

### 后端
- **FastAPI** - 现代化Python Web框架
- **gTTS** - Google文字转语音库
- **uvicorn** - ASGI服务器

### 前端
- **React 18** - 用户界面库
- **Axios** - HTTP客户端
- **CSS3** - 现代化样式设计

## 项目结构

```
sst-demo/
├── server/                 # FastAPI后端
│   ├── main.py            # 主应用文件
│   ├── requirements.txt   # Python依赖
│   └── temp/              # 临时音频文件目录
├── client/                # React前端
│   ├── src/
│   │   ├── components/
│   │   │   ├── TTSTest.js    # TTS主组件
│   │   │   └── TTSTest.css   # 组件样式
│   │   ├── App.js         # 应用主组件
│   │   └── index.js       # 入口文件
│   ├── package.json       # Node.js依赖
│   └── public/            # 静态资源
└── README_TTS.md          # 项目说明文档
```

## 安装和运行

### 1. 后端设置

```bash
# 进入服务器目录
cd server

# 创建虚拟环境（推荐）
python -m venv venv
source venv/bin/activate  # macOS/Linux
# 或 venv\Scripts\activate  # Windows

# 安装依赖
pip install -r requirements.txt

# 启动FastAPI服务器
python main.py
```

后端服务将在 `http://localhost:8000` 启动

### 2. 前端设置

```bash
# 进入客户端目录
cd client

# 安装依赖
npm install

# 启动开发服务器
npm start
```

前端应用将在 `http://localhost:3000` 启动

## API接口文档

### POST /tts
文字转语音接口

**请求体：**
```json
{
  "text": "要转换的文本",
  "lang": "zh"
}
```

**响应：** 返回MP3音频文件

### GET /languages
获取支持的语言列表

**响应：**
```json
{
  "languages": {
    "zh": "中文",
    "en": "English",
    "ja": "日本語",
    "ko": "한국어",
    "fr": "Français",
    "es": "Español"
  }
}
```

## 支持的语言

| 语言代码 | 语言名称 |
|---------|---------|
| zh      | 中文     |
| en      | English |
| ja      | 日本語   |
| ko      | 한국어   |
| fr      | Français |
| es      | Español |
| de      | Deutsch |
| it      | Italiano |
| ru      | Русский |
| ar      | العربية  |

## 使用说明

1. 在文本框中输入要转换的文本（最多1000字符）
2. 选择合适的语言
3. 点击"生成语音"按钮
4. 等待音频生成完成
5. 使用音频播放器播放生成的语音

## 开发说明

### 后端开发
- 使用FastAPI的自动文档功能：访问 `http://localhost:8000/docs`
- 音频文件临时存储在 `temp/` 目录
- 支持CORS跨域请求

### 前端开发
- 使用React Hooks进行状态管理
- 响应式设计，适配不同屏幕尺寸
- 错误处理和用户反馈

## 故障排除

### 常见问题

1. **音频无法播放**
   - 检查浏览器是否支持MP3格式
   - 确认后端服务正常运行

2. **网络连接错误**
   - 确认后端服务在8000端口运行
   - 检查防火墙设置

3. **语音质量问题**
   - 选择正确的语言代码
   - 确保文本内容适合所选语言

### 依赖问题
如果遇到依赖安装问题：

```bash
# 后端
pip install --upgrade pip
pip install -r requirements.txt

# 前端
npm cache clean --force
npm install
```
## 许可证

MIT License
