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

// データを追加する関数
async function addUser(username, password) {
  try {
    await addDoc(collection(db, "users"), {
      username: username,
      password: password,
      points : 0,
    });
    alert("ユーザーが追加されました！");
    window.location.href = 'signin.html';
  } catch (error) {
    console.error("エラーが発生しました:", error);
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