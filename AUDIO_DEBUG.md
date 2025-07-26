# 音频播放问题调试指南

## 常见问题及解决方案

### 1. 无法播放录音

#### 可能原因：
- 浏览器不支持音频格式
- 录音文件损坏
- 权限问题
- 音频编码问题

#### 解决步骤：

1. **检查浏览器控制台**
   ```javascript
   // 在浏览器控制台中运行
   console.log("支持的音频格式:");
   console.log("WebM:", MediaRecorder.isTypeSupported("audio/webm"));
   console.log("WAV:", MediaRecorder.isTypeSupported("audio/wav"));
   console.log("OGG:", MediaRecorder.isTypeSupported("audio/ogg"));
   ```

2. **检查录音文件**
   ```javascript
   // 检查录音文件信息
   console.log("文件类型:", audioFile.type);
   console.log("文件大小:", audioFile.size);
   console.log("文件名:", audioFile.name);
   ```

3. **测试原生音频播放**
   ```javascript
   // 创建测试音频
   const audio = new Audio();
   audio.src = URL.createObjectURL(audioFile);
   audio.onloadedmetadata = () => console.log("音频加载成功");
   audio.onerror = (e) => console.error("音频加载失败:", e);
   ```

### 2. 录音没有声音

#### 可能原因：
- 麦克风权限被拒绝
- 设备麦克风问题
- 录音设置问题

#### 解决步骤：

1. **检查麦克风权限**
   ```javascript
   navigator.permissions.query({ name: 'microphone' })
     .then(result => console.log("麦克风权限:", result.state));
   ```

2. **测试麦克风访问**
   ```javascript
   navigator.mediaDevices.getUserMedia({ audio: true })
     .then(stream => {
       console.log("麦克风访问成功");
       stream.getTracks().forEach(track => track.stop());
     })
     .catch(err => console.error("麦克风访问失败:", err));
   ```

### 3. 浏览器兼容性问题

#### 支持的浏览器：
- Chrome 47+ ✅
- Firefox 44+ ✅
- Safari 14+ ✅
- Edge 79+ ✅

#### 不支持的浏览器：
- IE ❌
- 旧版 Safari ❌

### 4. 音频格式问题

#### 推荐格式：
- **WebM (推荐)**: 最佳兼容性
- **WAV**: 无损但文件大
- **OGG**: 开源格式

#### 格式检测：
```javascript
function checkAudioSupport() {
  const formats = [
    'audio/webm',
    'audio/wav', 
    'audio/ogg',
    'audio/mp4'
  ];
  
  formats.forEach(format => {
    const supported = MediaRecorder.isTypeSupported(format);
    console.log(`${format}: ${supported ? '✅' : '❌'}`);
  });
}
```

## 调试工具

### 1. 使用测试页面
访问 `/audio-test` 路由进行测试

### 2. 浏览器开发者工具
- **Console**: 查看错误信息
- **Network**: 检查文件加载
- **Application**: 查看存储的音频文件

### 3. 音频分析工具
```javascript
// 分析音频文件
function analyzeAudio(audioFile) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const arrayBuffer = e.target.result;
    console.log("音频文件分析:", {
      size: audioFile.size,
      type: audioFile.type,
      arrayBuffer: arrayBuffer
    });
  };
  reader.readAsArrayBuffer(audioFile);
}
```

## 常见错误及解决方案

### 错误: "NotAllowedError"
**原因**: 麦克风权限被拒绝
**解决**: 在浏览器设置中允许麦克风权限

### 错误: "NotSupportedError" 
**原因**: 浏览器不支持录音功能
**解决**: 使用支持的浏览器

### 错误: "NotFoundError"
**原因**: 没有找到麦克风设备
**解决**: 检查设备麦克风是否正常工作

### 错误: "NotReadableError"
**原因**: 麦克风被其他应用占用
**解决**: 关闭其他使用麦克风的应用

## 测试步骤

1. **基础测试**
   - 打开 `/audio-test` 页面
   - 点击录音按钮
   - 说话几秒钟
   - 点击停止录音
   - 检查是否显示播放器

2. **播放测试**
   - 点击播放按钮
   - 检查是否有声音
   - 检查进度条是否正常

3. **错误测试**
   - 拒绝麦克风权限
   - 检查错误提示
   - 重新授权后测试

## 性能优化

### 1. 文件大小优化
```javascript
// 降低音频质量以减少文件大小
const recorder = new RecordRTCPromisesHandler(stream, {
  type: "audio",
  mimeType: "audio/webm",
  numberOfAudioChannels: 1,  // 单声道
  desiredSampRate: 8000,     // 降低采样率
});
```

### 2. 内存管理
```javascript
// 及时清理资源
useEffect(() => {
  return () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  };
}, [audioUrl]);
```

## 联系支持

如果问题仍然存在，请提供以下信息：
1. 浏览器版本
2. 操作系统
3. 错误信息截图
4. 控制台日志
5. 录音文件信息 