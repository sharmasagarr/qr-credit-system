import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import getUserById from "../utils/getUserById.js";
import CreditTransaction from "../models/CreditTransaction.js";

// create admin
export async function createAdmin (req, res) {
  try {
      const { name, id, password } = req.body;

      if (!name || !id || !password) {
          return res.status(400).json({ error: 'Name, ID, and password are required' });
      }

      const existingAdmin = await Admin.findOne({ id });

      if (existingAdmin) {
          return res.status(409).json({ error: 'Admin already exists' });
      }

      const newAdmin = new Admin({
          name,
          id,
          password,
          role: "admin"
      });

      await newAdmin.save();
      console.log("Admin user created");

      res.status(201).json({ success: true, message: 'Admin created successfully', admin: newAdmin });
  } catch (error) {
      console.error("Error creating admin:", error);
      res.status(500).json({ error: 'Internal server error' });
  }
}

// issue credits
export async function issueCredits(req, res) {
  try {
    const { userObjId, amount, expiry } = req.body;

    if (!userObjId || !amount || !expiry) {
      return res.status(400).json({ error: "userObjId, amount, and expiry are required" });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: "Amount must be a positive number" });
    }

    // Convert expiry date from string to Date object
    const expiryDate = new Date(expiry);
    if (isNaN(expiryDate.getTime())) {
      return res.status(400).json({ error: "Invalid expiry date format" });
    }

    // Get user object by userObjId
    const objectId = new mongoose.Types.ObjectId(userObjId);
    const user = await getUserById(objectId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const previousCredits = user.credits;
    const creditDifference = amount - previousCredits;

    let message = "";
    if (creditDifference > 0) {
      message = `Credited new ${creditDifference} credits to ${user.name} with expiry ${expiryDate.toDateString()}`;
    } else if (creditDifference < 0) {
      message = `Debited ${Math.abs(creditDifference)} credits from ${user.name}'s account with expiry ${expiryDate.toDateString()}`;
    } else {
      message = `No credits issued as the current balance and requested amount are the same`;
    }

    // Create a credit transaction only if there is a change
    if (creditDifference !== 0) {
      await CreditTransaction.create({
        performer: {
          userObjId: "system",
          role: "superadmin",
          previousBalance: -1,
          updatedBalance: -1
        },
        targetUser: {
          userObjId: user._id,
          role: user.role,
          previousBalance: previousCredits,
          updatedBalance: amount
        },
        intendedAmount: amount,  // requested amount
        actualAmount: Math.abs(creditDifference), // real change applied
        type: creditDifference > 0 ? "issue" : "reclaim",
        description: message,
      });
    }

    // Update the user’s credits and expiry
    user.credits = amount;
    user.creditExpiry = expiryDate;
    await user.save();

    res.status(201).json({
      success: true,
      message,
      userCredits: user.credits,
      creditExpiry: user.creditExpiry,
    });

  } catch (error) {
    console.error("Error issuing credits:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// function to get report
export async function getReport(req, res) {
  try {
    const admins = await Admin.find();

    const report = [];

    for (const admin of admins) {
      const totalCredits = admin.credits || 0;
      const creditExpiry = admin.creditExpiry || null;

      // Fetch all transactions where admin is the sender
      const transactions = await CreditTransaction.find({
        "from.userObjId": admin._id,
      });

      // Separate totals based on type
      const totalAllocated = transactions
        .filter(tx => tx.type === "allocation")
        .reduce((sum, tx) => sum + (tx.amount || 0), 0);

      const totalUsed = transactions
        .filter(tx => tx.type === "use")
        .reduce((sum, tx) => sum + (tx.amount || 0), 0);

      report.push({
        objectId: admin._id,
        name: admin.name,
        id: admin.id,
        credits: totalCredits,
        creditExpiry,
        totalAllocated,
        totalUsed,
        totalIssued: totalCredits + totalAllocated + totalUsed, 
      });
    }

    res.status(200).json({
      success: true,
      report,
    });

  } catch (err) {
    console.error("Error generating report:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

// extend expiry
export async function extendCreditExpiryForAdmin(req, res) {
  try {
    const { adminObjectId, newExpiry } = req.body;

    if (!adminObjectId || !newExpiry) {
      return res.status(400).json({ error: "adminObjectId and newExpiry are required." });
    }

    const expiryDate = new Date(newExpiry);
    if (isNaN(expiryDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format for newExpiry." });
    }

    const admin = await Admin.findById(adminObjectId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found." });
    }

    // Update admin's expiry
    admin.creditExpiry = expiryDate;
    await admin.save();

    res.status(200).json({
      success: true,
      message: `Credit expiry updated to ${expiryDate.toISOString()} for admin ${admin.id}.`,
    });

  } catch (err) {
    console.error("Error extending expiry for admin hierarchy:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}