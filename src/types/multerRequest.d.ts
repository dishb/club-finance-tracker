import express from "express";

export default interface MulterRequest extends express.Request {
  file?: Express.Multer.File;
}
