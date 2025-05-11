const skillService = require("../services/skillService");

exports.getSkills = async (req, res) =>
{
    const skills = await skillService.getAllSkills(res);
    return skills;
}

exports.getSkillsByUser = async (req, res) =>
{
    const skills = await skillService.getSkillsByUser(req.params.userId, res);
    return skills;
}

exports.addSkillToUser = async (req, res) =>
{
    const newSkill = await skillService.addSkillToUser(req.params.userId, req.body, res);
    return newSkill;
}

exports.updateSkill = async (req, res) =>
{
    const updatedSkill = await skillService.updateSkill(req.params.id, req.params.userId, req.body, res);
    return updatedSkill;
}

exports.deleteSkill = async (req, res) =>
{
    const deletedSkill = await skillService.deleteSkill(req.params.id, req.params.userId, res);
    return deletedSkill;
}