import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAKFUI2PgAElC53s8XnwMS2OSFyyVQvxUk",
    authDomain: "spark-academy-1696b.firebaseapp.com",
    databaseURL: "https://spark-academy-1696b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "spark-academy-1696b",
    storageBucket: "spark-academy-1696b.firebasestorage.app",
    messagingSenderId: "199578567427",
    appId: "1:199578567427:web:023c8e75187538a9ca5f36",
    measurementId: "G-CLBZ06JJNT"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

let failedAttempts = 0;
let isLockedOut = false;
let lockoutTimer = null;

function triggerCooldown() {
    isLockedOut = true;
    let countdown = 60;
    const loginBtn = document.getElementById('login-submit-btn');
    const alertBox = document.getElementById('rate-limit-alert');
    
    alertBox.classList.remove('hidden');
    loginBtn.disabled = true;
    loginBtn.classList.add('opacity-50', 'cursor-not-allowed');

    lockoutTimer = setInterval(() => {
        countdown--;
        alertBox.innerText = `Too many failed attempts. Security cooldown active: ${countdown}s remaining.`;
        if (countdown <= 0) {
            clearInterval(lockoutTimer);
            isLockedOut = false;
            failedAttempts = 0;
            alertBox.classList.add('hidden');
            loginBtn.disabled = false;
            loginBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }, 1000);
}

window.handleLogin = async (e) => {
    e.preventDefault();
    if (isLockedOut) return;

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const loginError = document.getElementById('login-error');

    if (!email || !password) {
        loginError.innerText = 'Please enter both email and password.';
        loginError.classList.remove('hidden');
        return;
    }

    loginError.classList.add('hidden');

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        failedAttempts = 0;
        closeAuthModal();
        const guestBtn = document.getElementById('auth-guest-btn');
        const userMenu = document.getElementById('auth-user-menu');
        const userNameDisplay = document.getElementById('user-name-display');
        if (guestBtn) { guestBtn.classList.add('hidden'); guestBtn.style.display = 'none'; }
        if (userMenu) { userMenu.classList.remove('hidden'); userMenu.style.display = ''; }
        if (userNameDisplay) {
            const displayName = userCredential.user.displayName || userCredential.user.email.split('@')[0];
            userNameDisplay.innerText = `Hi, ${displayName}`;
        }
        showToast(`Welcome back, ${userCredential.user.displayName || 'Student'}!`, 'success');
    } catch (error) {
        failedAttempts++;
        const errorMessage = getFirebaseAuthErrorMessage(error.code);
        loginError.innerText = `Login Failed (${failedAttempts}/5): ${errorMessage}`;
        loginError.classList.remove('hidden');
        if (failedAttempts >= 5) {
            triggerCooldown();
        }
    }
};

window.handleRegister = async (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const course = document.getElementById('reg-course').value;
    const registerError = document.getElementById('register-error');

    if (!name || !email || !password || !course) {
        registerError.innerText = 'Please fill in all required fields.';
        registerError.classList.remove('hidden');
        return;
    }

    if (password.length < 6) {
        registerError.innerText = 'Password must be at least 6 characters.';
        registerError.classList.remove('hidden');
        return;
    }

    registerError.classList.add('hidden');

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: name });
        await set(ref(db, 'users/' + user.uid), {
            fullName: name,
            email: email,
            targetCourse: course,
            registeredAt: new Date().toISOString()
        });

        closeAuthModal();
        const guestBtn = document.getElementById('auth-guest-btn');
        const userMenu = document.getElementById('auth-user-menu');
        const userNameDisplay = document.getElementById('user-name-display');
        if (guestBtn) guestBtn.classList.add('hidden');
        if (userMenu) userMenu.classList.remove('hidden');
        if (userNameDisplay) userNameDisplay.innerText = `Hi, ${name}`;
        showToast(`Welcome, ${name}! Account registered successfully.`, 'success');
    } catch (error) {
        const errorMessage = getFirebaseAuthErrorMessage(error.code);
        registerError.innerText = `Registration Error: ${errorMessage}`;
        registerError.classList.remove('hidden');
    }
};

window.handleForgotPassword = async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value;
    const forgotError = document.getElementById('forgot-error');
    const forgotSuccess = document.getElementById('forgot-success');
    const btn = document.getElementById('forgot-submit-btn');
    const originalText = btn.innerText;

    if (!email) {
        forgotError.innerText = 'Please enter your email address.';
        forgotError.classList.remove('hidden');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        forgotError.innerText = 'Please enter a valid email address.';
        forgotError.classList.remove('hidden');
        return;
    }

    forgotError.classList.add('hidden');
    forgotSuccess.classList.add('hidden');
    btn.innerText = 'Sending...';
    btn.disabled = true;

    try {
        await sendPasswordResetEmail(auth, email);
        btn.innerText = originalText;
        btn.disabled = false;
        forgotSuccess.innerText = 'Password reset link sent! Check your inbox.';
        forgotSuccess.classList.remove('hidden');
        e.target.reset();
    } catch (error) {
        console.error('Forgot password error:', error);
        btn.innerText = originalText;
        btn.disabled = false;
        let msg = 'Failed to send reset link. Please try again.';
        if (error.code === 'auth/user-not-found') {
            msg = 'No account found with this email address.';
        } else if (error.code === 'auth/invalid-email') {
            msg = 'Invalid email address.';
        } else if (error.code === 'auth/too-many-requests') {
            msg = 'Too many requests. Try again later.';
        }
        forgotError.innerText = msg;
        forgotError.classList.remove('hidden');
    }
};

window.handleLogout = async () => {
    try {
        await signOut(auth);
        const guestBtn = document.getElementById('auth-guest-btn');
        const userMenu = document.getElementById('auth-user-menu');
        if (guestBtn) { guestBtn.classList.remove('hidden'); guestBtn.style.display = ''; }
        if (userMenu) { userMenu.classList.add('hidden'); userMenu.style.display = 'none'; }
        showToast("Logged out successfully.", 'success');
    } catch (error) {
        showToast("Logout failed. Please try again.", 'error');
    }
};

onAuthStateChanged(auth, (user) => {
    const guestBtn = document.getElementById('auth-guest-btn');
    const userMenu = document.getElementById('auth-user-menu');
    const userNameDisplay = document.getElementById('user-name-display');

    if (!guestBtn || !userMenu || !userNameDisplay) return;

    if (user) {
        const displayName = user.displayName || user.email.split('@')[0];
        guestBtn.classList.add('hidden');
        guestBtn.style.display = 'none';
        userMenu.classList.remove('hidden');
        userMenu.style.display = '';
        userNameDisplay.innerText = `Hi, ${displayName}`;
    } else {
        guestBtn.classList.remove('hidden');
        guestBtn.style.display = '';
        userMenu.classList.add('hidden');
        userMenu.style.display = 'none';
    }
});
