import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { getPosts } from "api";
import { useParams } from "react-router-dom";
import { getAlbums } from "api";

export default function DetailUser({ color }) {
  const columnsPost = [
    {
      title: "no",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "description",
      dataIndex: "body",
      key: "body",
    },
  ];
  const columnsAlbum = [
    {
      title: "no",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
  ];
  const [user, setUser] = useState([]);
  const [album, setAlbum] = useState([]);
  const { id } = useParams();
  const getPostByUser = async () => {
    try {
      const response = await getPosts(`?userId=${id}`);
      const detail = response.data;
      const transformedDetail = detail.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      }));
      setUser(transformedDetail);
    } catch (err) {
      console.log(err);
    }
  };
  const getAlbumByUser = async () => {
    try {
      const response = await getAlbums(`?userId=${id}`);
      const detail = response.data;
      const transformedDetail = detail.map((item) => ({
        id: item.id,
        title: item.title,
      }));
      setAlbum(transformedDetail);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPostByUser();
    getAlbumByUser();
  }, []);
  return (
    <>
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
              Post By Users {id}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <Table
            dataSource={user}
            scroll={{
              x: 1300,
            }}
            columns={columnsPost}
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
                Album By User {id} 
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <Table dataSource={album} columns={columnsAlbum} />
        </div>
      </div>
    </>
  );
}

