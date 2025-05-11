const portfolioService = require("../services/portfolioService");

exports.getPortfolioByUser = async (req, res) =>
{
    const portfolio = await portfolioService.getPortfolioByUser(req.params.userId, res);
    return portfolio;
}