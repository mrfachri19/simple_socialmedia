import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { getPosts } from "api";
import { useParams } from "react-router-dom";
import { getAlbums } from "api";
import { getPhotos } from "api";

export default function DetailAlbum({ color }) {
  const columnsPost = [
    {
      title: "no",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Photo",
      dataIndex: "url",
      key: "url",
      render: (url) => (
        <img
          alt="Photo"
          src={url}
          style={{ maxWidth: "150px", maxHeight: "150px" }} // Adjust dimensions as needed
        />
      ),
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      render: (thumbnailUrl) => (
        <img
          alt="Thumbnail"
          src={thumbnailUrl}
          style={{ maxWidth: "150px", maxHeight: "150px" }}
        />
      ),
    },
  ];
  const [album, setAlbum] = useState([]);
  const { id } = useParams();
  const getPostByUser = async () => {
    try {
      const response = await getPhotos(`?albumId=${id}`);
      const detail = response.data;
      const transformedDetail = detail.map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        thumbnailUrl: item.thumbnailUrl,
      }));
      setAlbum(transformedDetail);
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
                List Photos from album {id}
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <Table
            dataSource={album}
            scroll={{
              x: 1300,
            }}
            columns={columnsPost}
          />
        </div>
      </div>
    </>
  );
}
