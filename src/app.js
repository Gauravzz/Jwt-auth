const express = require("express")
require("../src/db/conn")
const jwt = require("jsonwebtoken")
const secretKey = "secretKey"

const UserCollection = require("../src/models/user")

const app = express()
const port = process.env.PORT || 3000

//to tell the system to use json 
app.use(express.json())

//create request = post
app.post("/users", async (req, res) => {
    try {
        console.log(req.body.first_name);

        if (!req.body.first_name || !req.body.email || !req.body.mobile || !req.body.last_name || !req.body.middle_name || !req.body.password || !req.body.pic) {
            return res.status(400).send({
                error: "Invalid credentials"
            })
        }

        const userExistEmail = await UserCollection.findOne({
            email: req.body.email
        })

        const userExistMobile = await UserCollection.findOne({
            mobile: req.body.mobile
        })

        if (userExistEmail) {
            console.log("user already exist");
            return res.send("user already exist")
        } else if (userExistMobile) {
            console.log("mobile no. already used");
            return res.send("mobile no. already used")
        }


        const user = await UserCollection.create({
            first_name: req.body.first_name,
            middle_name: req.body.middle_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password,
            pic: req.body.pic
        })

        return res.status(200).send("user Registered")


    } catch (e) {
        //to show its bad req
        res.status(400).send(e)
    }
})




app.post("/login", async (req, res) => {

    const user = await UserCollection.findOne({
        email: req.body.email
    })
    if (!user) {
        return res.status(400).send("User not found")
    }

    //compare the provided password with the stored password
    if (req.body.password !== user.password) {
        return res.status(400).send("Invalid password")
    }

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    const responseData = {
        token: token,
        message: 'loggedIn'
    }

    return res.status(200).json({ responseData });

})


async function findUserById(userId) {
    try {
        // 
        const user = await UserCollection.findById(userId);
        return user; // 
    } catch (error) {
        console.error('Error finding user by ID:', error);
        return null; // 
    }
}


app.get("/profile", async (req, res) => {

    try {    
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
          ) {
            //console.log(req.headers.authorization);
            const token = req.headers.authorization.split(" ")[1]


             //console.log(token);

        const decodedToken = jwt.verify(token, secretKey)
        const userId = decodedToken.userId


             const userDetail = await findUserById(userId);
             console.log(userDetail);
             res.send(userDetail)


          }else {
            return res.send('headers is not selected.')
          }
        
    } catch (error) {
        console.log("invalid", error);
    }
})

app.listen(port, () => {
    console.log(`connection on port ${port}`);
})








