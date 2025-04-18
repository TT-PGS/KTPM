// package com.example.account.firebaseAuth;

// import com.google.firebase.auth.FirebaseAuth;
// import com.google.firebase.auth.FirebaseToken;
// import com.google.firebase.auth.FirebaseAuthException;

// import org.springframework.stereotype.Service;

// import com.example.account.exception.UnauthorizedException;

// @Service
// public class FirebaseAuthService {
// public FirebaseToken verifyIdToken(String idToken) {
// try {
// return FirebaseAuth.getInstance().verifyIdToken(idToken);
// } catch (FirebaseAuthException e) {
// throw new UnauthorizedException("Invalid Firebase ID token");
// }
// }
// }
