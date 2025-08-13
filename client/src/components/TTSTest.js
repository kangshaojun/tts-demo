import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TTSTest.css';

const TTSTest = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('zh');
  const [languages, setLanguages] = useState({});
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 获取支持的语言列表
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get('/languages');
        setLanguages(response.data.languages);
      } catch (error) {
        console.error('获取语言列表失败:', error);
        // 使用默认语言列表
        setLanguages({
          'zh': '中文',
          'en': 'English',
          'ja': '日本語',
          'ko': '한국어',
          'fr': 'Français',
          'es': 'Español'
        });
      }
    };
    fetchLanguages();
  }, []);

  const handleTextChange = (e) => {
    setText(e.target.value);
    setError('');
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!text.trim()) {
      setError('请输入要转换的文本');
      return;
    }

    setLoading(true);
    setError('');
    setAudioUrl('');

    try {
      const response = await axios.post('/tts', {
        text: text.trim(),
        lang: language,
      }, {
        responseType: 'blob', // 重要：指定响应类型为blob
      });

      // 创建音频URL
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'audio/mpeg' }));
      setAudioUrl(url);
      
    } catch (error) {
      console.error('TTS转换失败:', error);
      if (error.response && error.response.data) {
        // 如果是blob错误响应，需要转换为文本
        if (error.response.data instanceof Blob) {
          const errorText = await error.response.data.text();
          try {
            const errorData = JSON.parse(errorText);
            setError(errorData.detail || '转换失败，请重试');
          } catch {
            setError('转换失败，请重试');
          }
        } else {
          setError(error.response.data.detail || '转换失败，请重试');
        }
      } else {
        setError('网络错误，请检查服务器是否正常运行');
      }
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setText('');
    setAudioUrl('');
    setError('');
    if (audioUrl) {
      window.URL.revokeObjectURL(audioUrl);
    }
  };

  // 示例文本
  const exampleTexts = {
    'zh': '你好，这是一个文字转语音的演示。',
    'en': 'Hello, this is a text-to-speech demonstration.',
    'ja': 'こんにちは、これはテキスト読み上げのデモンストレーションです。',
    'ko': '안녕하세요, 이것은 텍스트 음성 변환 데모입니다.',
    'fr': 'Bonjour, ceci est une démonstration de synthèse vocale.',
    'es': 'Hola, esta es una demostración de texto a voz.'
  };

  const useExampleText = () => {
    setText(exampleTexts[language] || exampleTexts['zh']);
  };

  return (
    <div className="tts-container">
      <div className="input-section">
        <div className="form-group">
          <label htmlFor="text-input">输入文本：</label>
          <textarea
            id="text-input"
            value={text}
            onChange={handleTextChange}
            placeholder="请输入要转换为语音的文本..."
            rows={6}
            maxLength={1000}
          />
          <div className="text-counter">
            {text.length}/1000 字符
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="language-select">选择语言：</label>
          <select
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="button-group">
          <button
            type="button"
            className="example-button"
            onClick={useExampleText}
          >
            使用示例文本
          </button>
          <button
            type="submit"
            className="generate-button"
            onClick={handleSubmit}
            disabled={loading || !text.trim()}
          >
            {loading ? '生成中...' : '生成语音'}
          </button>
          <button
            type="button"
            className="clear-button"
            onClick={clearAll}
          >
            清空
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      )}

      {audioUrl && (
        <div className="audio-section">
          <h3>生成的语音：</h3>
          <audio controls className="audio-player">
            <source src={audioUrl} type="audio/mpeg" />
            您的浏览器不支持音频播放。
          </audio>
          <div className="audio-info">
            <p>语言: {languages[language] || language}</p>
            <p>文本长度: {text.length} 字符</p>
          </div>
        </div>
      )}

      <div className="usage-tips">
        <h4>使用提示：</h4>
        <ul>
          <li>支持多种语言的文字转语音</li>
          <li>文本长度限制为1000字符</li>
          <li>生成的音频可以直接播放和下载</li>
          <li>选择合适的语言以获得最佳效果</li>
        </ul>
      </div>
    </div>
  );
};

export default TTSTest;
