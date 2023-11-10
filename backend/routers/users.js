const userRouter = require("express").Router();
const client = require("../connection.js");
const bcrypt = require("bcrypt");

userRouter.get("/", async (req, res, next) => {
  try {
    const resDB = await client.query(`Select * from users`);
    res.send(resDB.rows);
  } catch (error) {
    next(error);
  } finally {
    await client.end;
  }
});

userRouter.get("/:id", async (req, res, next) => {
  try {
    const resDB = await client.query(
      `Select * from users where id=${req.params.id}`
    );
    res.send(resDB.rows);
  } catch (error) {
    next(error);
  } finally {
    await client.end;
  }
});

// Sign up Route
userRouter.post("/", async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (password.length < 4) {
    return res.status(400).send("Password cannot be less then 4 characters");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  try {
    let insertQuery = `insert into users (email, full_name, pwd_hash) values ('${email}', '${fullName}', '${passwordHash}')`;
    const resDB = await client.query(insertQuery);
    res.send(resDB);
  } catch (error) {
    next(error);
  } finally {
    await client.end;
  }
});

// Need to recheck the below  Route code.
userRouter.put("/:id", async (req, res, next) => {
  let user = req.body;
  let idToUpdate = req.params.id;
  console.log(user);
  let updateQuery = `update users
                         set full_name = '${user.fullName}',
                         email = '${user.email}',
                         phone = '${user.phone}',
                         where id = '${idToUpdate}'`;

  try {
    const resDB = await client.query(updateQuery);
    // need to check what will be it's returned value.
    console.log("response after update", resDB);
  } catch (error) {
    next(error);
  } finally {
    await client.end;
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  let deleteQuery = `delete from users where id=${req.params.id}`;

  try {
    const resDB = await client.query(deleteQuery);
    console.log("returned after deletion", resDB);
  } catch (error) {
    next(error);
  } finally {
    await client.end;
  }
});

module.exports = userRouter;
