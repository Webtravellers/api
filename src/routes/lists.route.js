import { addToList, getFromList } from "../controllers/lists.controller.js";
import express from "express";

const listsRouter = new express.Router()

listsRouter.get('/', getFromList)
listsRouter.post('/', addToList)

export default listsRouter