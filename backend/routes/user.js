const express=require('express');
const { register, login,  logout, updatePassword, updateProfile, deleteProfile, myProfile, getUserProfile, getAllUsers, forgotPassword, resetPassword, getMyPosts, getUserPosts, createQuiz, getUserQuizzes } = require('../controllers/user');
const {isAuthenticated}=require("../middlewares/auth");
const { checkAdmin } = require('../middlewares/checkAdmin');
const { createGroup } = require('../controllers/user');
const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/update/password").put(isAuthenticated,updatePassword);
router.route("/update/profile").put(isAuthenticated,updateProfile);

router.route("/delete/me").delete(isAuthenticated,deleteProfile);

router.route("/me").get(isAuthenticated,myProfile);

router.route("/user/:id").get(isAuthenticated,getUserProfile);
router.route("/users").get(isAuthenticated,getAllUsers);

router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/admin/createQuiz").post(isAuthenticated,checkAdmin,createQuiz);
router.route("/admin/createGroup").post(isAuthenticated,checkAdmin,createGroup);     //Added recently for creating groups

router.route('/getUserQuizzes/:userId').get(getUserQuizzes);

module.exports=router;