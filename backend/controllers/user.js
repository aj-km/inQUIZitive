const User = require("../models/User");
const Quiz = require("../models/Quiz");
const Group = require("../models/Group");

const { sendEmail } = require("../middlewares/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.register = async (req, res) => {
    try {
        const { name, email, password, avatar } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User exists",
            });
        }
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
        });

        user = await User.create({
            name,
            email,
            password,
            avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
        });

        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(201).cookie("token", token, options).json({
            success: true,
            user,
            token,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        })
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email })
            .select("+password")

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }
        const token = await user.generateToken();

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.status(200).cookie("token", token, options).json({
            success: true,
            user,
            token,
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        })
    }
}

exports.logout = async (req, res) => {
    try {
        res.status(200)
            .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
            .json({
                success: true,
                message: "logged out",
            });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        })
    }
}

exports.updatePassword = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("+password");

        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide old and new password",
            })
        }

        const isMatch = await user.matchPassword(oldPassword);
        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Incorrect old Password",
            })
        }
        user.password = newPassword;

        await user.save();
        res.status(200).json({
            succes: true,
            message: "Password updated",
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        });
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const { name, email, avatar } = req.body;
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (avatar) {
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);
            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "avatars",
            })
            user.avatar.public_id = myCloud.public_id;
            user.avatar.url = myCloud.secure_url;
        }
        await user.save();
        res.status(200).json({
            success: true,
            message: "Profile updated,"
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        })
    }
}

exports.deleteProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        //removing photos from  cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        await user.deleteOne();
        //logout user after deleting profile
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
        });

        res.status(200).json({
            success: true,
            message: "Profile deleted",
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        })
    }
}

exports.myProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        res.status(200).json({
            success: true,
            user,
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message,
        })
    }
}


exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            })
        }
        res.status(200).json({
            success: true,
            user,
        })
    } catch (e) {
        res.status(500).json({
            success: true,
            message: e.message,
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({
            name: { $regex: req.query.name, $options: 'i' },
        });
        res.status(200).json({
            success: true,
            users,
        });
    } catch (e) {
        res.status(500).json({
            status: false,
            message: e.message,
        })
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const resetPasswordToken = user.getResetPasswordToken();

        await user.save();

        const resetUrl = `${req.protocol}://${req.get(
            "host"
        )}/password/reset/${resetPasswordToken}`;

        const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

        try {
            await sendEmail({
                email: user.email,
                subject: "Reset Password",
                message,
            });

            res.status(200).json({
                success: true,
                message: `Email sent to ${user.email}`,
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();

            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid or has expired",
            });
        }

        user.password = req.body.password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Updated",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.createQuiz = async (req, res) => {
    try {
      const { title, type, questions, duration } = req.body;
  
      const transformedQuestions = [];
  
      for (const frontendQuestion of questions) {
        let backendQuestion = {};
  
        if (type === 'MCQ' || type === 'T/F') {
          backendQuestion = {
            question: frontendQuestion.question,
            options: frontendQuestion.options,
            answer: frontendQuestion.answer,
          };
        } else if (type === 'Short Answer' || type === 'Long Answer') {
          backendQuestion = {
            question: frontendQuestion.question,
            answer: 'Ans', 
          };
        }
  
        transformedQuestions.push(backendQuestion);
      }
  
      const quiz = new Quiz({
        title,
        type,
        questions: transformedQuestions,
        duration,
      });
  
      await quiz.save();
  
      res.status(201).json(quiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'An error occurred while creating the quiz.',
      });
    }
  };

exports.getUserQuizzes = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate({
            path: 'quizzes.quizId' , 
            model: 'Quiz',
        });
        
        const quizzes=user.quizzes;
        res.status(200).json({
            success:true,
            quizzes,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createGroup = async (req, res) => {
    try {
      const { groupName, emailIds } = req.body;
  
      if (!groupName || !emailIds) {
        return res.status(400).json({ message: 'Group name and email IDs are required.' });
      }
  
      const existingGroup = await Group.findOne({ groupName });
      if (existingGroup) {
        return res.status(400).json({ message: 'A group with the same name already exists.' });
      }
  
      const newGroup = new Group({ groupName, emailIds });
      await newGroup.save();
  
      res.status(201).json({ message: 'Group created successfully.', group: newGroup });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };