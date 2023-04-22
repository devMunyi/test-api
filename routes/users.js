const router = require("express").Router();
const { requireSignin, checkToken } = require("../middlewares/user");
const { signUpUser, signInUser, currentUser } = require("../controllers/user")

router.post("/users/create-account", signUpUser);
router.post("/users/login", signInUser);
router.get("/users/current-user", checkToken, currentUser)

module.exports = router;