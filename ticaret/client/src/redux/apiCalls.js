import { loginFailure, loginStart, loginSuccess,registerStart, registerSuccess, registerFailure, updateUserStart, updateUserSuccess, updateUserFailure } from "./userRedux";
import { getProductFailure, getProductStart, getProductSuccess} from "./cartRedux";
import { publicRequest,userRequest } from "../requestMethods";
import { addCommentSuccess, getCommentSuccess } from "./commentRedux";


export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await userRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const logout = async (dispatch, user) => {
  try {
    const res = await userRequest.post("/auth/logout", user);
    dispatch(logout(res.data));
  } catch{}
};

export const updateUser = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    // update
    const res = await userRequest.put(`/users/${id}`,user);
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const addComment = async (comment, dispatch) => {
  try {
    const res = await userRequest.post(`/comment`, comment);
    dispatch(addCommentSuccess(res.data));
  } catch{}
};

export const getComments = async (dispatch) => {
  try {
    const res = await publicRequest.get("/comment");
    dispatch(getCommentSuccess(res.data));
  } catch{}
};

