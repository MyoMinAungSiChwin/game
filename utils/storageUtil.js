// utils/storageUtil.js
import CryptoJS from 'crypto-js';

// 建议将密钥存储在更安全的地方，或者从服务器获取
const SECRET_KEY = 'BlackDiamod';

const storageUtil = {
  // 加密存储
  setSecureStorage(key, data) {
    try {
      const encrypted = {
        username: CryptoJS.AES.encrypt(data.username, SECRET_KEY).toString(),
        password: CryptoJS.AES.encrypt(data.password, SECRET_KEY).toString(),
        remember: data.remember
      };
      uni.setStorageSync(key, encrypted);
    } catch (e) {
      console.error('加密存储失败:', e);
    }
  },
  
  // 解密读取
  getSecureStorage(key) {
    try {
      const encrypted = uni.getStorageSync(key);
      if (!encrypted) return null;
      
      return {
        username: CryptoJS.AES.decrypt(encrypted.username, SECRET_KEY).toString(CryptoJS.enc.Utf8),
        password: CryptoJS.AES.decrypt(encrypted.password, SECRET_KEY).toString(CryptoJS.enc.Utf8),
        remember: encrypted.remember
      };
    } catch (e) {
      console.error('解密读取失败:', e);
      return null;
    }
  }
};

export default storageUtil;