// main
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

// models
import { Contact } from "../models/mongoose/Contact.models";

// types
import { ContactDoc, ContactIndexReturnData } from "../types/contact.types";

// permissions
import * as contactsPermissions from "../permissions/contact.permissions";

// utils
import ExpressError from "../utils/main/ExpressError.utils";

const contact = new Contact();

export const getAdminIndex = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page, limit } = req.query;

    const { contacts, pages } = (await contact.adminIndex(
      Number(page) || 1,
      Number(limit) || 15
    )) as ContactIndexReturnData;

    if (Number(page) > pages) throw new ExpressError("Page Not found!", 404);
    console.log("requested reached sending data phase");

    res.status(200).json({ success: true, data: { contacts, pages } });
  } catch (err) {
    next(err);
  }
};

export const getUserIndex = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { page, limit } = req.query;
    const { userID } = req.params;
    // const authUser = res.locals.user;

    const { contacts, pages } = (await contact.userIndex(
      userID,
      Number(page) || 1,
      Number(limit) || 15
    )) as ContactIndexReturnData;

    if (Number(page) > pages) throw new ExpressError("Page Not found!", 404);

    res.status(200).json({ success: true, data: { contacts, pages } });
  } catch (err) {
    next(err);
  }
};

export const getContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const foundContact = (await contact.getSingleContact(id)) as ContactDoc;

    const authorizedContact = contactsPermissions.canViewContact(
      foundContact,
      res.locals.user._id,
      res.locals.user.roles
    );

    res.status(201).json({ success: true, data: authorizedContact });
  } catch (err) {
    next(err);
  }
};

export const newContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    req.body.contactImage = res.locals.contactImagePath;

    const newContact = await contact.addContact(req.body, res.locals.user._id);

    if (newContact) {
      res.status(201).json({ success: true, data: newContact });
      return;
    }
    throw new ExpressError("something went wrong...!", 400);
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const isDeleteContact = await contactsPermissions.canDeleteContact(
      id,
      res.locals.user._id,
      res.locals.user.roles
    );

    if (isDeleteContact) {
      const deletedContactId = (await contact.delete(
        id
      )) as mongoose.Types.ObjectId;
      res.status(200).json({ success: true, data: deletedContactId });
    }
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const isUpdate = await contactsPermissions.canUpdateContact(
      res.locals.user._id,
      id
    );

    if (isUpdate) {
      const updatedContact = await contact.update(id, req.body);
      res.status(200).json({
        success: true,
        data: updatedContact,
      });
    }
  } catch (err) {
    next(err);
  }
};
