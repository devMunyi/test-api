const router = require("express").Router();
const { requireSignin, checkToken } = require("../middlewares/user");
const { signUpUser, signInUser, currentUser, addSoftSkills, addTechnicalSkills } = require("../controllers/user")

router.post("/users/create-account", signUpUser);
router.post("/users/login", signInUser);
router.get("/users/current-user", checkToken, currentUser)
router.post("/users/add-technical-skills", checkToken, addTechnicalSkills)
router.post("/users/add-soft-skills", checkToken, addSoftSkills)
router.put("/users/update-technical-skills", checkToken, addTechnicalSkills)
router.put("/users/update-soft-skills", checkToken, addSoftSkills)


module.exports = router;