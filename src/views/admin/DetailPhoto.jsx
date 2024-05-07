import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import { getPosts } from "api";
import { useParams } from "react-router-dom";
import { getAlbums } from "api";
import { getPhotos } from "api";

export default function DetailPhoto({ color }) {
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
  const [photo, setPhoto] = useState({});
  const { id } = useParams();
  const getPhotoId = async () => {
    try {
      const response = await getPhotos(`/${id}`);
      const detail = response.data;
      setPhoto(detail);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPhotoId();
  }, []);
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words p-5 w-full mb-6 shadow-lg rounded " +
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
                Detail Photo {id}
              </h3>
            </div>
          </div>
        </div>
        <div className="block my-5">
          Thumbnail:
          <img
            alt="Photo"
            src={photo.thumbnailUrl}
            style={{ maxWidth: "150px", maxHeight: "150px" }} // Adjust dimensions as needed
          />
        </div>
        <div className="block my-5">
          Photo:
          <img
            alt="Photo"
            src={photo.url}
            style={{ maxWidth: "150px", maxHeight: "150px" }} // Adjust dimensions as needed
          />
        </div>
        <h3
          className={
            "font-semibold text-lg " +
            (color === "light" ? "text-blueGray-700" : "text-white")
          }
        >
          title: {photo.title}{" "}
        </h3>
      </div>
    </>
  );
}
