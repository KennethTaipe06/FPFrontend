import React from 'react';
import "./AdminLayout.css";
import { TopMenu } from "../../components/admin/TopMenu/TopMenu";

export function AdminLayout(props) {
  const { children } = props;

  return (
    <div className="admin-layout">
      {/* Menú superior */}
      <div className="admin-layout__menu">
        <TopMenu />
      </div>

      {/* Contenido principal */}
      <div className="admin-layout__main-content">
        {children}
      </div>
    </div>
  );
}
