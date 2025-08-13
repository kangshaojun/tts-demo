import os
import uuid
from gtts import gTTS
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="文字转语音API")

# 添加CORS中间件，允许前端访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生产环境中应该设置为特定的域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 创建临时目录用于存储生成的音频文件
os.makedirs("temp", exist_ok=True)

# 定义请求数据模型
class TTSRequest(BaseModel):
    text: str
    lang: str = "zh"  # 默认中文

@app.get("/")
async def root():
    return {"message": "文字转语音API服务正在运行"}

@app.post("/tts")
async def text_to_speech(request: TTSRequest):
    try:
        if not request.text.strip():
            raise HTTPException(status_code=400, detail="文本内容不能为空")
        
        print(f"开始转换文本: {request.text[:50]}...")
        print(f"语言: {request.lang}")
        
        # 使用gTTS生成语音
        tts = gTTS(text=request.text, lang=request.lang, slow=False)
        
        # 生成唯一的文件名
        audio_filename = f"tts_{uuid.uuid4().hex}.mp3"
        audio_file_path = os.path.join("temp", audio_filename)
        
        # 保存音频文件
        tts.save(audio_file_path)
        
        print(f"音频文件已生成: {audio_file_path}")
        
        # 返回音频文件
        return FileResponse(
            path=audio_file_path,
            media_type="audio/mpeg",
            filename=audio_filename,
            headers={"Content-Disposition": f"attachment; filename={audio_filename}"}
        )
        
    except Exception as e:
        error_message = str(e)
        print(f"TTS转换过程中出错: {error_message}")
        raise HTTPException(status_code=500, detail=f"TTS转换失败: {error_message}")

@app.get("/languages")
async def get_supported_languages():
    """获取支持的语言列表"""
    languages = {
        "zh": "中文",
        "en": "English",
        "ja": "日本語", 
        "ko": "한국어",
        "fr": "Français",
        "es": "Español",
        "de": "Deutsch",
        "it": "Italiano",
        "ru": "Русский",
        "ar": "العربية"
    }
    return {"languages": languages}

if __name__ == "__main__":
    print("启动文字转语音服务...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
