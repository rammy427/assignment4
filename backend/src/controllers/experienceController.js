const experienceService = require("../services/experienceService");

exports.getExperiencesByUser = async (req, res) =>
{
    const exps = await experienceService.getExperiencesByUser(req.params.userId, res);
    return exps;
}

exports.getExperienceById = async (req, res) =>
{
    const exp = await experienceService.getExperienceById(req.params.id, req.params.userId, res);
    return exp;
}

exports.addExperienceToUser = async (req, res) =>
{
    const newExp = await experienceService.addExperienceToUser(req.params.userId, req.body, res);
    return newExp;
}

exports.updateExperience = async (req, res) =>
{
    const updatedExp = await experienceService.updateExperience(req.params.id, req.params.userId, req.body, res);
    return updatedExp;
}

exports.deleteExperience = async (req, res) =>
{
    const deletedExp = await experienceService.deleteExperience(req.params.id, req.params.userId, res);
    return deletedExp;
}