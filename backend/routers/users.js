const userRouter = require("express").Router();
const client = require("../connection.js");

userRouter.get("/", async (req, res) => {
  try {
    const resDB = await client.query(`Select * from users`);
    res.send(resDB.rows);
  } catch (error) {
    next(error);
  } finally {
    await client.end();
  }
});

userRouter.get("/:id", (req, res) => {
  try {
    client.query(
      `Select * from users where id=${req.params.id}`,
      (err, resDB) => {
        res.send(resDB.rows);
      }
    );
    client.end;
  } catch (exception) {
    next(exception);
  }
});

userRouter.post("/users", (req, res) => {
  const user = req.body;
  let insertQuery = `insert into users(user_id, full_name, assigned_task) 
                         values(${user.id}, '${user.fName}', '${user.task}')`;

  client.query(insertQuery, (err, resDB) => {
    if (!err) {
      res.send("Insertion was successful");
    } else {
      console.log(`ERROR:: ${err.message}`);
    }
  });
  client.end;
});

userRouter.put("/users/:id", (req, res) => {
  let user = req.body;
  let id = req.params.id;
  let updateQuery = `update users
                         set full_name = '${user.fName}',
                         assigned_task = '${user.task}'
                         where user_id = ${id}`;

  client.query(updateQuery, (err, resDB) => {
    if (!err) {
      res.send("Update was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

userRouter.delete("/users/:id", (req, res) => {
  let deleteQuery = `delete from users where user_id=${req.params.id}`;

  client.query(deleteQuery, (err, result) => {
    if (!err) {
      res.send("Deletion was successful");
    } else {
      console.log(err.message);
    }
  });
  client.end;
});

// client.connect();

module.exports = userRouter;
