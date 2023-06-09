const router = require("express").Router();
const { requireSignin, checkToken } = require("../middlewares/user");
const { signUpUser, signInUser, findAllUsers, userInfo, currentUser, addSoftSkills, addTechnicalSkills } = require("../controllers/user")

router.post("/users/create-account", signUpUser);
router.post("/users/info", checkToken, userInfo);
router.get("/users/created-users", findAllUsers);
// router.get("/users/generate/submission/token");
router.post("/users/login", signInUser);
// router.get("/users/current-user", currentUser);
// router.post("/users/add-technical-skills", addTechnicalSkills);
// router.post("/users/add-soft-skills", addSoftSkills);
router.put("/users/update-technical-skills", checkToken, addTechnicalSkills);
// router.put("/users/update-soft-skills", checkToken, addSoftSkills);


module.exports = router;