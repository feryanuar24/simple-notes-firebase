import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { onValue, ref, push, remove, set } from "firebase/database";
import firebase, { database } from "../../firebase";

export const registerUserAPI = (data) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    createUserWithEmailAndPassword(firebase, data.email, data.password)
      .then((res) => {
        console.log("Success Register: ", res);
        dispatch({ type: "CHANGE_LOADING", value: false });
        resolve(true);
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        reject(false);
      });
  });
};

export const loginUserAPI = (data) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: "CHANGE_LOADING", value: true });
    signInWithEmailAndPassword(firebase, data.email, data.password)
      .then((res) => {
        console.log("Success Login: ", res);
        const dataUser = {
          email: res.user.email,
          uid: res.user.uid,
          emailVerified: res.user.emailVerified,
          refreshToken: res.user.refreshToken,
        };
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: true });
        dispatch({ type: "CHANGE_USER", value: dataUser });
        resolve(dataUser);
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch({ type: "CHANGE_LOADING", value: false });
        dispatch({ type: "CHANGE_ISLOGIN", value: false });
        reject(false);
      });
  });
};

export const addDataToAPI = (data) => {
  push(ref(database, "notes/" + data.userId), {
    title: data.title,
    content: data.content,
    date: data.date,
  });
};

export const getDataFromAPI = (userId) => (dispatch) => {
  const urlNotes = ref(database, "notes/" + userId);
  return new Promise(() => {
    onValue(urlNotes, (snapshot) => {
      const data = [];
      Object.keys(snapshot.val()).map((key) => {
        data.push({
          id: key,
          data: snapshot.val()[key],
        });
      });
      dispatch({ type: "SET_NOTES", value: data });
    });
  });
};

export const updateDataAPI = (data) => {
  const urlNotes = ref(database, `notes/${data.userId}/${data.noteId}`);
  set(urlNotes, {
    title: data.title,
    content: data.content,
    date: data.date,
  });
};

export const deleteDataAPI = (data) => {
  const urlNotes = ref(database, `notes/${data.userId}/${data.noteId}`);
  remove(urlNotes);
};
