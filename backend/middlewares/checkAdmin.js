const User=require("../models/User");
exports.checkAdmin=async(req, res, next)=> {
    if (!req.user) {
        return res.status(401).json({ message: 'Authentication required.' });
    }

    try {
        // Assuming req.user is already populated by previous authentication middleware
        // and contains all necessary information including the isAdmin property.
        const user = req.user;

        // If you need to ensure the user's data is the latest, uncomment the following line:
        // const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }

        if (!user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Only admin users allowed.' });
        }

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while checking admin status.' });
    }
  }
  