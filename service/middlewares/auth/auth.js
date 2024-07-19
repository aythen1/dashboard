const jwt = require("jsonwebtoken");
const { ClientError } = require("../../utils/err/errors");

const { getVector } = require("../../services/lancedb");

const encodeVector = (id) => {
  const str = `${id}`;
  const base64Str = btoa(str);
  return base64Str;
};

const nano = require('nano')('http://admin:1234@127.0.0.1:5984'); // Cambia las credenciales y la URL según tu configuración


const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      throw new ClientError("Authorization token missing", 401);
    }

    const decodedToken = jwt.verify(
      token,
      "keySecret156754asdas897fav45646xz4c65z899sa4fa654fas65f4sa65sadasf" // nfc
    );

    const ID = "test/test";
    const path = encodeVector(ID);
    /*
    const options = [
      { field: "id", operator: "=", value: decodedToken.id },
      { field: "user", operator: "=", value: decodedToken.user },
      { field: "isverified", operator: "=", value: true },
    ];


    // const resp = await getVector(path, "users", [0, 0], options);
    const resp = await getVector(path, "accounts", [0, 0], options);
    */

    const query = {
      "selector": {
        "_id": decodedToken._id,
        "user": decodedToken.user,
        "isverified": true
      }
    };

    let db_account = await connectDB(`db_account`)
    const resp = await db_account.find(query)

    if(resp.docs.length == 0){
      throw new ClientError("User not found", 404);
      // return res.status(501).send("Invalid token");
    }

    const user = resp.docs[0]

    delete user.avatar;
    delete user.banner;


    // if (resp.length == 0) {
    //   throw new ClientError("User not found", 404);
    // }

    req.user = user;
    next();
  } catch (error) {
    console.log("Invalid token: ", error);
    return res.status(501).send("Invalid token");
  }
};

module.exports = { authenticateToken: authenticateToken };




const connectDB = async (tableName) => {
  let db
  try {
    // Verificar si la base de datos existe
    await nano.db.get(tableName);
    db = nano.db.use(tableName);
    return db
    // console.log('La base de datos existe:', tableName);
  } catch (error) {
    if (error.statusCode === 404) {
      try {
        await nano.db.create(tableName);
        db = nano.db.use(tableName);
        console.log('Base de datos creada:', tableName);
        return db
      } catch (createError) {
        console.error('Error al crear la base de datos:', createError);
        throw createError;
      }
    } else {
      console.error('Error al obtener información de la base de datos:', error);
      throw error;
    }
  }
}