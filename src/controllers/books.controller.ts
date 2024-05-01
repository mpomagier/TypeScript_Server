import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Book } from "@prisma/client";

const db = new PrismaClient();

export const getAllBooks = async (req: Request, res: Response) => {
  const books = await db.book.findMany();
  return res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const book = await db.book.findUnique({ where: { id } });

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.json(book);
};

export const createBook = async (req: Request, res: Response) => {
  const { title, author, price } = req.body;

  if (!title || !author || !price) {
    return res.status(400).json({ message: "Invalid book data" });
  }

  const bookData: Omit<Book, "id"> = { title, author, price };
  const createdBook = await db.book.create({ data: bookData });

  return res.json(createdBook);
};

export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, price } = req.body;

  if (!title || !author || !price) {
    return res.status(400).json({ message: "Invalid book data" });
  }

  const bookData: Omit<Book, "id"> = { title, author, price };
  const updatedBook = await db.book.update({ where: { id }, data: bookData });

  if (!updatedBook) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.json(updatedBook);
};

export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedBook = await db.book.delete({ where: { id } });

  if (!deletedBook) {
    return res.status(404).json({ message: "Book not found" });
  }

  return res.json(deletedBook);
};
