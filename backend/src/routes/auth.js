const express = require('express');
const admin = require('firebase-admin');
const validator = require('validator');
const router = express.Router();

// Create a new user
router.post("/register", async (req, res) => {
  const { email, displayName, password, role, createdAt, updatedAt, isActive } = req.body;

  // Check for missing fields
  if (!displayName || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const auth = admin.auth();
    const db = admin.firestore();

    // Create user in Firebase Authentication
    const userRecord = await auth.createUser({
      email: email,
      password: password,
      //phoneNumber: phoneNumber,
    });

    // ✅ Assign a default role "user" to the newly created user
    await auth.setCustomUserClaims(userRecord.uid, { role: role ? role : "user" });

    // ✅ Store user data in Firestore
    await db.collection("users").doc(userRecord.uid).set({
      uid: userRecord.uid,
      name: displayName,
      email: email,
      role: role ? role : "user" ,
      createdAt: createdAt,
      updatedAt: updatedAt,
      isActive: isActive,
    });


    res.status(200).json({ message: "User created successfully", uid: userRecord.uid });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
