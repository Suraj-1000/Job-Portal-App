const router = require("express").Router();

router.use("/auth/login", require("./Login"));
router.use("/auth/signup", require("./Signups"));
router.use("/otp", require("./OTPRoutes"));
router.use("/users", require("./user.routes"));
router.use("/profile", require("./profile.routes"));
router.use("/categories", require("./jobCategoryRoutes"));
router.use("/industries", require("./industry.routes"));
router.use("/locations", require("./location.routes"));
router.use("/jobtitles", require("./jobtitle.routes"));
router.use("/public", require("./publicJobRoutes"));
router.use("/contact", require("./contactRoutes"));
router.use("/user-profile", require("./userProfileRoutes"));

module.exports = router;
