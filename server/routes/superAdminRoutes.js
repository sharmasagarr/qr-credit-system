import express from "express";
import { createAdmin, issueCredits, getReport, extendCreditExpiryForAdmin } from '../controllers/superAdminController.js';

const router = express.Router();

router.post('/createAdmin', createAdmin);
router.post('/issueCredits', issueCredits);
router.patch('/extendCreditExpiry', extendCreditExpiryForAdmin);
router.get('/getReport', getReport);

export default router;