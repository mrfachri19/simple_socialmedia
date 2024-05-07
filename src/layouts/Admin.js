import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Tables from "views/admin/Tables.js";
import DetailUser from "views/admin/DetailUser";
import DetailPost from "views/admin/DetailPost";
import DetailAlbum from "views/admin/DetailAlbum";
import DetailPhoto from "views/admin/DetailPhoto";
import FormPost from "views/admin/FormPost";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/user/:id" exact component={DetailUser} />
            <Route path="/admin/post/:id" exact component={DetailPost} />
            <Route path="/admin/post/create" exact component={FormPost} />
            <Route path="/admin/post/edit/:id" exact component={FormPost} />
            <Route path="/admin/album/:id" exact component={DetailAlbum} />
            <Route path="/admin/photo/:id" exact component={DetailPhoto} />
            <Route path="/admin/tables" exact component={Tables} />
            <Redirect from="/admin" to="/admin/tables" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
