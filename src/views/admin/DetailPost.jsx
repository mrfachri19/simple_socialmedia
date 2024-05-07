import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { getPosts } from "api";
import { useParams } from "react-router-dom";
import { getAlbums } from "api";

export default function DetailPost({ color }) {
  const columnsPhoto = [
    {
      title: "no",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "title",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "description",
      dataIndex: "body",
      key: "body",
    },
  ];
  const [photo, setPhoto] = useState([]);
  const { id } = useParams();
  const getPostByUser = async () => {
    try {
      const response = await getPosts(`/${id}/comments`);
      const detail = response.data;
      const transformedDetail = detail.map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        thumbnailUrl: item.thumbnailUrl,
      }));
      setPhoto(transformedDetail);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPostByUser();
  }, []);
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg p-5 rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <form>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-slate-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Name
            </label>
            <input
              type="email"
              className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Name"
              // onChange={(e) => setnama(e.target.value)}
            />
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-slate-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Username
            </label>
            <input
              type="email"
              className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Name"
              // onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-slate-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Email
            </label>
            <input
              type="email"
              className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Email"
              // onChange={(e) => setemail(e.target.value)}
            />
          </div>

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-slate-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Password
            </label>
            <input
              type="password"
              className="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Password"
              // onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="text-center mt-6">
            <button
              className="bg-slate-800 text-white active:bg-slate-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="button"
              // onClick={Register}
            >
              Create Account
            </button>
          </div>
        </form>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Add Post
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <Table
            dataSource={photo}
            scroll={{
              x: 1300,
            }}
            columns={columnsPhoto}
          />
        </div>
      </div>

      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Post Detail by Id {id} and its Comment
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <Table
            dataSource={photo}
            scroll={{
              x: 1300,
            }}
            columns={columnsPhoto}
          />
        </div>
      </div>
    </>
  );
}
