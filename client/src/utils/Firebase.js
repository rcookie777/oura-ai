// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDGH_Xu0LPe3vvNlnedarzW9T_1EY-Ndo8",
    authDomain: "colony-378b4.firebaseapp.com",
    projectId: "colony-378b4",
    storageBucket: "colony-378b4.appspot.com",
    messagingSenderId: "791676838029",
    appId: "1:791676838029:web:9cd86554cf95ed06f202c4",
    measurementId: "G-55PGB682EV"
  };
  
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
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
  
  // Checks firebase if user is logged in
  
  const isUser = (user) => {
    if (user) {
      return true;
    }
    return false;
  };