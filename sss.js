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

// フォームの送信イベントリスナーを設定
document.getElementById("signupForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  addData(username);
});

// Firestoreからデータをクエリして取得する関数
async function queryData() {
  const resultList = document.getElementById("resultList");
  resultList.innerHTML = "";

  try {
    const q = query(collection(db, "users")); // trashコレクションをクエリ
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement("li");
      listItem.textContent = `username: ${data.username},points: ${data.points}`;
      resultList.appendChild(listItem);
      console.log(data.iconImage, data.lat, data.lng, data.type);
      
    });
  } catch (error) {
    console.error("クエリエラー:", error);
  }
}

// クエリボタンのクリックイベントリスナーを設定
document.getElementById("queryDataButton").addEventListener("click", queryData);