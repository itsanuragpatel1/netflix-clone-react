
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth/cordova";
import { addDoc, collection, getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyD_lFJuihjAFZCGdp54w3R4MjHYTdWPcms",
  authDomain: "netflix-clone-270be.firebaseapp.com",
  projectId: "netflix-clone-270be",
  storageBucket: "netflix-clone-270be.firebasestorage.app",
  messagingSenderId: "58297769294",
  appId: "1:58297769294:web:95b95e10fed7bb381e121f"
};


const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
const db=getFirestore(app);


const signup=async (name,email,password)=>{
    try{
       const res= await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,'user'),{
            uid:user.uid,
            name,
            authProvider:'local',
            email
        })
    }catch(error){
        console.log(error);
        alert(error);
    }
}

const login=async (email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        alert(error);

    }
}

const logout=async()=>{
    await signOut(auth);
}

export {auth,db,login,signup,logout};