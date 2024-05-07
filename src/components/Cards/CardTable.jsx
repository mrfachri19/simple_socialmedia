import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Input } from "antd";
import { getUsers } from "api";
import { getPosts } from "api";
import { useHistory } from "react-router-dom";
import { getPhotos } from "api";
import { getAlbums } from "api";

export default function CardTable({ color }) {
  const history = useHistory();
  const columns = [
    {
      title: "no",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Action",
      render: (user) => <a href={`/admin/user/${user.id}`}>Detail</a>,
    },
  ];
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
    {
      title: "Action",
      render: (user) => <a href={`/admin/post/${user.id}`}>Detail</a>,
    },
    {
      title: "Action",
      render: (user) => <a href={`/admin/post/edit/${user.id}`}>Edit</a>,
    },
    {
      title: "Action",
      render: (user) => <a href={`/admin/post/${user.id}`}>Delete</a>,
    },
  ];
  const columnsPhoto = [
    {
      title: "No",
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
          style={{ maxWidth: "150px", maxHeight: "150px" }} 
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
    {
      title: "Action",
      render: (user) => <a href={`/admin/photo/${user.id}`}>Detail</a>,
    },
  ];

  const columnsALbum = [
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
      title: "Action",
      render: (user) => <a href={`/admin/album/${user.id}`}>Detail</a>,
    },
  ];

  const [user, setUser] = useState([]);
  const [post, setpost] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [album, setAlbum] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await getUsers();
      const detail = response.data;
      const transformedDetail = detail.map((item) => ({
        id: item.id,
        name: item.name,
        username: item.username,
        address: item.address.city,
        email: item.email,
        phone: item.phone,
        company: item.company.name,
      }));
      setUser(transformedDetail);
    } catch (err) {
      console.log(err);
    }
  };
  const getAllPosts = async () => {
    try {
      const response = await getPosts();
      const detail = response.data;
      const transformedDetail = detail.map((item) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      }));
      setpost(transformedDetail);
    } catch (err) {
      console.log(err);
    }
  };

  const getAllPhotos = async () => {
    try {
      const response = await getPhotos();
      const photoData = response.data;
      const transformedPhotos = photoData.map((photo) => ({
        id: photo.id,
        title: photo.title,
        url: photo.url,
        thumbnailUrl: photo.thumbnailUrl,
      }));
      setPhoto(transformedPhotos);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const getAllAlbum = async () => {
    try {
      const response = await getAlbums();
      const photoData = response.data;
      const transformedData = photoData.map((album) => ({
        id: album.id,
        title: album.title,
      }));
      setAlbum(transformedData);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllPosts();
    getAllPhotos();
    getAllAlbum();
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
                List All Users
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
            columns={columns}
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
                List All Posts
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <Table dataSource={post} columns={columnsPost} />
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
                List All Photos
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <Table dataSource={photo} columns={columnsPhoto} />
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
                List All Albums
              </h3>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <Table dataSource={album} columns={columnsALbum} />
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
