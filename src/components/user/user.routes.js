/*

In this file is where we put all the routes, here we put the endpoints and information that has to do with the http protocol

  - GET - Collect information from the server.
  - POST - Add information to the server.
  - PUT - Replace information on the server.
  - PATCH - Update part of the information.
  - DELETE - Delete information from the server.
  - OPTIONS - Ask for information about methods (know if we can execute any of the previous methods).

  - CODE INDEX

    1 [POST] ( CREATE ) USER
    2 [PUT] ( UPDATE ) USER
    3 [PUT] ( UPDATE ) USER IMAGE
    4 [DELETE] ( DELETE ) USER
    5 [GET] ( SHOW ) ALL USERS
    6 [GET] ( SHOW ) USER BY ID

  - MODULE EXPORTS

*/

const express = require("express");
const response = require("../../network/response");
const controller = require("./user.controller");
const router = express.Router();

//------------------------------------------------------------------------------------------------
//CODE INDEX
//------------------------------------------------------------------------------------------------
//1 ( CREATE ) USER
//------------------------------------------------------------------------------------------------

router.post("/registro", async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const user = await controller.createUser(fullname, email, password);
    response.success(req, res, user, 201);
  } catch (error) {
    response.error(req, res, error.message, 400, error);
  }
});

//------------------------------------------------------------------------------------------------
//2 ( UPDATE ) USER
//------------------------------------------------------------------------------------------------

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body: user } = req;
  user._id = id;
  try {
    const data = await controller.updateUser(user);
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error.message, 400, error);
  }
});

//------------------------------------------------------------------------------------------------
//3 ( UPDATE ) USER IMAGE
//------------------------------------------------------------------------------------------------

router.post("/editimage/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userImage = await controller.editUserImage(id, req.file);
    response.success(req, res, userImage, 201);
  } catch (error) {
    response.error(req, res, error.message, 400, error);
  }
});

//------------------------------------------------------------------------------------------------
//4 ( DELETE ) USER
//------------------------------------------------------------------------------------------------

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await controller.deleteUser(id);
    response.success(res, res, `User ${id} has been removed`);
  } catch (error) {
    response.error(req, res, error.message, 400, error);
  }
});

//------------------------------------------------------------------------------------------------
//5 ( SHOW ) ALL USERS
//------------------------------------------------------------------------------------------------

router.get("/", async (req, res) => {
  try {
    const data = await controller.getAllUsers();
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, "Something wrong happend", 500, error);
  }
});

//------------------------------------------------------------------------------------------------
//6 ( SHOW ) USER BY ID
//------------------------------------------------------------------------------------------------

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await controller.getOneUserById(id);
    response.success(req, res, data, 200);
  } catch (error) {
    response.error(req, res, error.message, 400);
  }
});

//------------------------------------------------------------------------------------------------
//MODULE EXPORTS
//------------------------------------------------------------------------------------------------

module.exports = router;
