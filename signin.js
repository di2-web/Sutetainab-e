// Firebaseのライブラリをインポート
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, where, orderBy } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

// Firestoreからデータを取得して表示する関数
async function signIn(username, password) {

    try {
      const q = query(collection(db, "users"), where("username", "==", username));
      const querySnapshot = await getDocs(q);
  
      if(querySnapshot.empty){
        alert("ユーザーが存在しません");
      }else{
        // const querySnapshot = await getDocs(q);
  
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const Fpassword = data.password;
  
          if (Fpassword === password) {
            alert("ログイン成功");
            localStorage.setItem('username', username);
            window.location.href = 'mypage.html';
          } else {
            alert("パスワードが違います");
          }
        });
      }
  
    } catch (error) {
      console.error("クエリエラー:", error);
    }
  }
  
  
  const signInForm = document.getElementById("signInForm");
  if(signInForm){
    signInForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      signIn(username, password);
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