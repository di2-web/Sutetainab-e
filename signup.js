// Firebaseのライブラリをインポート
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy , where } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebaseの設定
const firebaseConfig = {
  apiKey: "AIzaSyD3IlNR5d97zzGmxHDaTGFp6110X-14xuk",
  authDomain: "sutetainab-e.firebaseapp.com",
  projectId: "sutetainab-e",
  storageBucket: "sutetainab-e.firebasestorage.app",
  messagingSenderId: "618471725173",
  appId: "1:618471725173:web:8c60289d5d51a7dce6c03c",
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// データを追加する関数

async function addUser(username, password) {

    try {
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
  
      if(querySnapshot.empty){
        await addDoc(collection(db, "users"), {
            username: username,
            password: password,
            points : 0,
          });
          alert("ユーザーが追加されました！");
          window.location.href = 'signin.html';
      }else{
        alert("ユーザーが既に存在します");
      }
  
    } catch (error) {
      console.error("クエリエラー:", error);
    }
  }
  

// フォームの送信イベントリスナー
const signupForm = document.getElementById("signupForm");
if(signupForm){
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    addUser(username, password);
  });
}

// ダークモードのトグル状態をローカルストレージに保存/読み込みする関数
function syncDarkMode() {
  const htmlElement = document.documentElement;
  const darkModeToggle = document.getElementById('darkModeToggle');

  // ローカルストレージからダークモード状態を読み込み
  const isDarkMode = localStorage.getItem('darkMode') === 'true';

  if (isDarkMode) {
      htmlElement.setAttribute('theme', 'dark-mode');
      darkModeToggle.style.backgroundImage = "url('sun.png')";
  } else {
      htmlElement.removeAttribute('theme');
      darkModeToggle.style.backgroundImage = "url('moon.png')";
  }
}

// ページ読み込み時にダークモードを同期
window.addEventListener('load', syncDarkMode);

// ダークモードトグルボタンのクリックイベントリスナー
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', () => {
  const htmlElement = document.documentElement;
  const isDarkMode = htmlElement.hasAttribute('theme');

  // ダークモード状態をローカルストレージに保存
  localStorage.setItem('darkMode', !isDarkMode);

  // ダークモードを同期
  syncDarkMode();
});