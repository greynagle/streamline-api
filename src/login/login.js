const { API_TOKEN } = require("../config");
const logger = require("../logger");
const LoginService = require("./login-service")

function loginAuth(req, res, next) {
    const authToken = req.get("Authorization");
    logger.error(`Unauthorized request to path: ${req.path}`);

    if (!authToken || authToken.split(" ")[1] !== API_TOKEN) {
        return res.status(401).json({ error: "Unauthorized request" });
    }

    const userName = req.get("Authentication").slice("Bearer ".length + 1);

    LoginService.findByUsername(userName).then((user) => {
        if (user && anyInCommon(user.roles, roles)) {
            req.user = user;
            next();
        } else {
            res.status(401).json({});
        }
    });
    next();
}

module.exports = loginAuth;


