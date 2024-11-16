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


async function userLoading() {

    if (localStorage.getItem('username') === null) {
      alert("ログインしてください");
      window.location.href = 'signin.html';

    } else {
    
        try {
            const username = localStorage.getItem('username');
            const q = query(collection(db, "users"), where("username", "==", username));
            const querySnapshot = await getDocs(q);   
            
            if(querySnapshot.empty){
                alert("ユーザーが存在しません");
            }else{
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const Fusername = data.username;
                    const Fpoints = data.points;

                    document.getElementById("username").textContent = "ユーザー名:" + Fusername;
                    document.getElementById("points").textContent = "現在のポイント:" + Fpoints + "pt";
                });
            }
        } 
        catch (error) {
            console.error("クエリエラー:", error);
        }
    }
}

function logout() {
    localStorage.removeItem('username');
    window.location.href = 'map.html';
}

document.getElementById("logoutButton").addEventListener("click", logout);

  userLoading();
