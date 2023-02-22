// todo
// controller for creating a notification based on users id in body?
// controller for getting all notification for user based on params
// controller for deleting all notifications for user based on params
// controller for deleting one notification for user based on params and notification id
import { Request, Response } from "express";
import Notification from "../models/NotificationModel";

//succes
const createNotification = async (req: Request, res: Response) => {
  try {
    const newNotification = await Notification.create(req.body);
    res.status(201).json({
      status: "succes",
      data: {
        bankingCard: newNotification,
      },
    });
  } catch (err: any) {
    res.status(400).json({
      status: err.status,
      message: err.message,
    });
  }
};

//succes
const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId });
    if (notifications.length === 0) {
      return res
        .status(200)
        .json({ status: "succes", message: "This user has 0 notifications" });
    }
    res.status(200).json({ status: "succes", data: notifications });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

//succes
const deleteOneNotification = async (req: Request, res: Response) => {
  try {
    const { receiverId, notificationId } = req.params;
    const deletedNotification = await Notification.deleteOne({
      receiverId,
      notificationId,
    });
    res.status(202).json({ status: "succes", deletedNotification });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

//succes
const deleteAllNotifications = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deletedNotifications = await Notification.deleteMany({ userId });
    res.status(202).json({ status: "succes", deletedNotifications });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

export {
  createNotification,
  getAllNotifications,
  deleteOneNotification,
  deleteAllNotifications,
};
