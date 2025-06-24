import Session from "../model/session.model.js";

const create = async (data) => {
  const session = await Session.create(data);
  return session;
};

const get = async (userId) => {
  const sessions = await Session.find({ userId }).sort({ createdAt: -1 }); // sort by createdAt (descending)
  return sessions;
};

const destroy = async (id) => {
  const session = await Session.findByIdAndDelete(id);
  return session;
};

export default { create, get, destroy };
