import { CreateError } from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json("saved Video");
  } catch (err) {
    next(err);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(CreateError(404, "Video not Found"));

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(CreateError(403, "You can only update your videos"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(CreateError(404, "Video not Found"));

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted Successfully");
    } else {
      return next(CreateError(403, "You can only delete your videos"));
    }
  } catch (err) {
    next(err);
  }
};

export const getVideo = async (req, res, next) => {
  try {
    const video = await new Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (err) {
    next(err);
  }
};

export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { view: 1 },
    });
    res.status(200).json("The view has been increased");
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 });
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};

export const tags = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(2);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const search = req.query.q;
  console.log(search);
  try {
    const videos = await Video.find({
      title: { $regex: search, $options: "i" },
    }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};