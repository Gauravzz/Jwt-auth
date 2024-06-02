const registerUser = expressAsyncHandler(async (req, res) => {

    const {
        first_name,
        middle_name,
        last_name,
        gender,
        email,
        mobile,
        password,
        pic,
        pic_key,
      } = req.body;
    
      if (!first_name || !last_name || !email || !mobile || !password) {
        return res.status(400).send({
          error:
            "At least first name, last name, email, mobile, and password are required!",
        });
      }
    
      
      const userExistEmail = await User.findOne({ email });
      const userExistMobile = await User.findOne({ mobile });
    
      if (userExistEmail) {
        res.status(400).send({ error: "User already exists with this email" });
        return;
      } else if (userExistMobile) {
        res.status(400).send({ error: "User already exists with this mobile" });
        return;
      }
    
    
      const user = await User.create({
        platform_user_id : platform_doc.platform_id_prefix+platform_doc.platform_id_counter,
        first_name,
        middle_name,
        last_name,
        gender,
        email,
        mobile,
        password,
        pic,
        pic_key,
      });
    
      
      const token_expiry = "15/06/2024"
      
      if (user) {
        res.status(201).json({
          _id: user._id,
          platform_user_id: user.platform_user_id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
          token_expiry,
          pic_key: user.pic_key,
        });
      } else {
        res.status(400).send({ error: "Failed to create user" });
      }
    });


    // Assuming you have a UserCollection (e.g., MongoDB collection)
const UserCollection = require('./path/to/userCollection');

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserCollection.findOne({ email });

    // If user is not found
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored password
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // If email and password are valid
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = loginHandler;