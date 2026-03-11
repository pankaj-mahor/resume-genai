const interviewReportModel = require("../models/interviewReport.model");

const generateInterviewReportController = async (req, res) => {
  const { jobDescription, resume } = req.body;
  const interviewReport = await interviewReportModel.create({
    jobDescription,
    resume,
  });
  res.status(200).json({ interviewReport });
};

module.exports = {
  generateInterviewReportController,
};
