const userRouter = require("express").Router();
const client = require("../connection.js");

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

userRouter.post("/", async (req, res, next) => {
  const user = req.body;
  console.log("here", user);
  try {
    let insertQuery = `insert into users (email, full_name, pwd_hash) values ('${user.email}', '${user.fullName}', '${user.pwdHash}')`;
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
