// Firebaseのライブラリをインポート
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebaseの設定オブジェクト
const firebaseConfig = {
  apiKey: "AIzaSyD3IlNR5d97zzGmxHDaTGFp6110X-14xuk",
  authDomain: "sutetainab-e.firebaseapp.com",
  projectId: "sutetainab-e",
  storageBucket: "sutetainab-e.firebasestorage.app",
  messagingSenderId: "618471725173",
  appId: "1:618471725173:web:8c60289d5d51a7dce6c03c",
  measurementId: "G-TMHJLQ3QDL"
};

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);
// Firestoreデータベースのインスタンスを取得
const db = getFirestore(app);

// Firestoreにデータを追加する関数
async function addData(username) {
  if (queryData(username)) {
    alert("ユーザーが既に存在します")
  }else
  {
    try {
      await addDoc(collection(db, "users"), {
        username: username,
        points : 0,
      });
      alert("ユーザーが追加されました！");
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  }
}

// フォームの送信イベントリスナーを設定
document.getElementById("signupForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  if (!username) {
    alert("ユーザー名を入力してください。");
  } else {
    addData(username);
    window.location.href = 'signin.html';
  }
});

// Firestoreからデータをクエリして取得する関数
async function queryData(usernameD) {
  var result = false;

    const docRef = doc(db, "users", usernameD);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        result = true;
    } else {
        result = false;
    }

  return result;
}
