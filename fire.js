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
async function addData(iconImage, lat, lng, type) {
  try {
    await addDoc(collection(db, "trash"), {
      iconImage: iconImage,
      lat: lat,
      lng: lng,
      type: type
    });
    alert("データが追加されました！");
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
}

// フォームの送信イベントリスナーを設定
document.getElementById("addDataForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const iconImage = document.getElementById("iconImage").value;
  const lat = parseFloat(document.getElementById("lat").value); // parseFloatで数値に変換
  const lng = parseFloat(document.getElementById("lng").value); // parseFloatで数値に変換
  const type = document.getElementById("type").value;
  addData(iconImage, lat, lng, type);
});

// Firestoreからデータをクエリして取得する関数
async function queryData() {
  const resultList = document.getElementById("resultList");
  resultList.innerHTML = "";

  try {
    const q = query(collection(db, "trash")); // trashコレクションをクエリ
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const listItem = document.createElement("li");
      listItem.textContent = `iconImage: ${data.iconImage}, lat: ${data.lat}, lng: ${data.lng}, type: ${data.type}`;
      resultList.appendChild(listItem);
      console.log(data.iconImage, data.lat, data.lng, data.type);
    });
  } catch (error) {
    console.error("クエリエラー:", error);
  }
}

// クエリボタンのクリックイベントリスナーを設定
document.getElementById("queryDataButton").addEventListener("click", queryData);