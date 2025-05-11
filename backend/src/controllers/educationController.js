const edService = require("../services/educationService");

exports.getEducation = async (req, res) =>
{
    const education = await edService.getAllEducation(res);
    return education;
}

exports.getDegrees = async (req, res) =>
{
    const degrees = await edService.getDegrees(res);
    return degrees;
}

exports.getEducationByUser = async (req, res) =>
{
    const education = await edService.getEducationByUser(req.params.userId, res);
    return education;
}

exports.addEducationToUser = async (req, res) =>
{
    const newEd = await edService.addEducationToUser(req.params.userId, req.body, res);
    return newEd;
}

exports.updateEducation = async (req, res) =>
{
    const updatedEd = await edService.updateEducation(req.params.id, req.params.userId, req.body, res);
    return updatedEd;
}

exports.deleteEducation = async (req, res) =>
{
    const deletedEd = await edService.deleteEducation(req.params.id, req.params.userId, res);
    return deletedEd;
}