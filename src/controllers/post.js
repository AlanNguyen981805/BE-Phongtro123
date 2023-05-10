import * as services from "../services/post";

export const getPosts = async (req, res) => {
  try {
    const response = await services.getPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller" + error,
    });
  }
};

export const getPostsLimit = async (req, res) => {
  const { page, ...query } = req.query;
  try {
    const response = await services.getPostsLimitService(page, query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller" + error,
    });
  }
};

export const getDetailPost = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await services.getDetailPostService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller" + error,
    });
  }
};

export const getNewPosts = async (req, res) => {
  const { page, ...query } = req.query;
  console.log(query);
  try {
    const response = await services.getNewPostService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller" + error,
    });
  }
};

export const createPost = async (req, res) => {
  try {
    const response = await services.createPostService(req);
    console.log({response})
    return res.status(200).json(response);
  } catch (error) {
    console.log({error})
    return res.status(500).json(error);
  }
};

//admin

export const getPostsLimitByAdmin = async (req, res) => {
  const { page, ...query } = req.query;
  const { id } = req.user;
  try {
    if (!id) {
      return res.status(400).json({
        err: 1,
        msg: "Missing input",
      });
    }
    const response = await services.getPostsAdminService(page, id, query);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at category controller" + error,
    });
  }
};


export const updatePost = async (req, res) => {
  try {
    const response = await services.updatePostService(req);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await services.deletePostService(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};
