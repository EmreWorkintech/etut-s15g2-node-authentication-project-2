const router = require("express").Router();
const { usernameVarmi, rolAdiGecerlimi } = require('./auth-middleware');
const { JWT_SECRET } = require("../secrets"); // bu secret'ı kullanın!
const UserModel = require("../users/users-model");
const bcrypt = require("bcryptjs")

router.post("/register", rolAdiGecerlimi, async (req, res, next) => {
  /**
    [POST] /api/auth/register { "username": "anna", "password": "1234", "role_name": "angel" }

    response:
    status: 201
    {
      "user"_id: 3,
      "username": "anna",
      "role_name": "angel"
    }
   */
  try {
    const {role_name} = req;
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 10);
    const newUser = await UserModel.ekle({ role_name, username, password:hash })
    res.status(201).json(
      newUser
    )
  } catch (err) {
    next(err)
  }
});


router.post("/login", usernameVarmi, (req, res, next) => {
  /**
    [POST] /api/auth/login { "username": "sue", "password": "1234" }

    response:
    status: 200
    {
      "mesaj": "sue geri geldi!",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ETC.ETC"
    }

    Token 1 gün sonra timeout olmalıdır ve aşağıdaki bilgiyi payloadında içermelidir:

    {
      "subject"  : 1       // giriş yapan kullanıcının user_id'si
      "username" : "bob"   // giriş yapan kullanıcının username'i
      "role_name": "admin" // giriş yapan kulanıcının role adı
    }
   */
  try {
    res.status(200).json({
      message: "login çalışıyor"
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;
