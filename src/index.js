import express from "express";
import cors from 'cors'
// import { verifyAuth } from "./config/jwt.js";
// import AuthController from "./app/Controllers/AuthController.js";
// import UserController from "./app/Controllers/UserController.js";
import TicketController from "./app/Controllers/TicketController.js";

const router = express();

const port = process.env.SERVER_PORT || 8080

router.use(express.json());
router.use(cors())

router.get('/', (req, res, next) => res.status(200).json({ hello: 'world!' }))

router.get('/api/ticket/u/', TicketController.show)
router.post('/api/ticket/u/:ticket_id/:costumer/:telephone', TicketController.create)
router.put('/api/ticket/u/:ticket_id/', TicketController.paid)
router.get('/api/ticket/limit', TicketController.limit)
router.put('/api/ticket/limit/:number', TicketController.updateLimit)

router.listen(port, (req, res, next) => console.log(`RUNNING ON HTTP://LOCALHOST:${port}`));