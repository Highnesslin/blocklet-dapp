import type { RequestHandler } from 'express';
import User from '../models/user';

export const getUserInfo: RequestHandler = (req, res) => res.json(req.user || {});

export const login: RequestHandler = async (req, res) => {
  const { did, fullName } = req.user!;

  const exist = await User.asyncDb.findOne({
    did,
  });
  if (exist) {
    res.success(exist);
  } else {
    const doc = await User.asyncDb.insert({
      did,
      fullName,
      phone: '',
      email: '',
    });
    res.success(doc);
  }
};

export const editUser: RequestHandler = async (req, res) => {
  const { did, fullName, phone, email } = req.body;

  const ret = await User.asyncDb.update(
    {
      did,
    },
    {
      $set: {
        // @ts-ignore
        fullName,
        phone,
        email,
      },
    }
  );
  if (ret) {
    const newData = await User.asyncDb.findOne({
      did,
    });
    res.success(newData);
  } else {
    throw new Error('更新失败');
  }
};
