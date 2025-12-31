
import Ticket from "../models/Ticket.js";

export const createTicket = async (req, res) => {
  try {
    const data = {
      title: req.body.title,
      description: req.body.description
    };

    // attach user ONLY if normal user
    if (req.user.role === "user") {
      data.user = req.user.id;
    }

    // admin may optionally set status
    if (req.user.role === "admin" && req.body.status) {
      data.status = req.body.status;
    }

    const ticket = await Ticket.create(data);
    res.json(ticket);

  } catch (err) {
    console.error("CREATE TICKET ERROR:", err);
    res.status(500).json({ message: "Failed to create ticket" });
  }
};

export const getMyTickets = async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id });
  res.json(tickets);
};

export const getAllTickets = async (req, res) => {
  const tickets = await Ticket.find().sort({ createdAt: -1 });
  res.json(tickets);
};

export const updateTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) return res.status(404).json({ message: "Not found" });

  ticket.status = req.body.status || ticket.status;
  ticket.title = req.body.title || ticket.title;
  ticket.description = req.body.description || ticket.description;

  await ticket.save();
  res.json(ticket);
};

export const deleteTicket = async (req, res) => {
  await Ticket.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};
