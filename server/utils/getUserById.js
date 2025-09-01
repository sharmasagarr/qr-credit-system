import Admin from "../models/Admin.js";
import TLM from "../models/TLM.js";
import SLM from "../models/SLM.js";
import FLM from "../models/FLM.js";
import MR from "../models/MR.js";

const getUserById = async (_id) => {
  const modelMap = [
    { model: Admin, role: "admin" },
    { model: TLM, role: "tlm" },
    { model: SLM, role: "slm" },
    { model: FLM, role: "flm" },
    { model: MR, role: "mr" },
  ];

  for (const { model, role } of modelMap) {
    const user = await model.findOne({ _id }); // KEEP as Mongoose document

    if (user) {
      user.role = role; // ✅ allowed, even on document

      if (role !== "admin" && user.admin) {
        const admin = await Admin.findById(user.admin);
        if (admin) {
          user.creditExpiry = admin.creditExpiry;
          user.services = admin.services;
        }
      }

      return user; // Still a full document with save() etc.
    }
  }

  return null;
};

export default getUserById;
