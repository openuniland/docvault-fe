import React from "react";
import { Sidebar } from "app/components/Sidebar";

const withSidebar = (WrappedComponent: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    return (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <WrappedComponent {...props} />
      </div>
    );
  };
};

export default withSidebar;
