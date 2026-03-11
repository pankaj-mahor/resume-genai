const express = require("express");
const interviewRouter = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controller/interview.controller");

/**
 * @route POST /api/interview/generate-interview-report
 * @description Generate an interview report for a candidate on basis of job description and resume
 * @access Private
 * @returns {Object} 200 - Interview report generated successfully
 * @returns {Object} 400 - Bad request
 * @returns {Object} 500 - Internal server error
 *
 */
interviewRouter.post(
  "/generate-interview-report",
  authMiddleware.authenticateToken,
  interviewController.generateInterviewReportController,
);

module.exports = interviewRouter;
