import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { editPost } from "api";
import { Input } from "antd";

export default function FormPost({ color }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const history = useHistory();
  const { id } = useParams();
  const postData = async (e) => {
    try {
      e.preventDefault();
      const response = await editPost(`/${id}`, {
        title,
        body,
      });
      setTimeout(() => {
        history.push("/admin");
      }, 2000);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg p-5 rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <h3
          className={
            "font-semibold text-lg " +
            (color === "light" ? "text-blueGray-700" : "text-white")
          }
        >
          Edit Post {id}
        </h3>
        <form onSubmit={postData}>
          <div className="relative mb-3">
            <label
              className="block uppercase text-slate-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Title
            </label>
            <Input
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-slate-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Body
            </label>
            <Input
              placeholder="Body"
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="text-center mt-6">
            <button
              className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="submit"
            >
              {id ? "Edit" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
