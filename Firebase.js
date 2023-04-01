import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQIF-Nv29vExXn2m9OJZ3c8JRWF_s2_AU",
    authDomain: "oura-ai.firebaseapp.com",
    databaseURL: "https://oura-ai-default-rtdb.firebaseio.com",
    projectId: "oura-ai",
    storageBucket: "oura-ai.appspot.com",
    messagingSenderId: "385586703455",
    appId: "1:385586703455:web:054cfe7b31ddc5c7b3ffea",
    measurementId: "G-7PNRG0FXKB"
  };

  const app = initializeApp(firebaseConfig);
  
  // Initialize Firebase
  const auth = getAuth(app);
  
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();
  
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const { user } = res;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          isKYC: false,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  
  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  
  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const { user } = res;
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
        isKYC: false,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      // eslint-disable-next-line no-alert
      alert(err.message);
    }
  };
  
  const logout = () => {
    signOut(auth);
  };
  const setName = async (name) => {
    const user = auth.currentUser;
    await user.updateProfile({
      displayName: name,
    });
  };
  // Checks firebase if user is logged in
  
  const isUser = (user) => {
    if (user) {
      return true;
    }
    return false;
  };

  export { db, auth, signInWithGoogle, logInWithEmailAndPassword, registerWithEmailAndPassword, sendPasswordReset, logout, isUser, setName };