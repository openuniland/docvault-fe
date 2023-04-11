import React from "react";
import { Sidebar } from "app/components/Sidebar";

const withSidebar = (WrappedComponent: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    return (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div
          style={{
            flex: 1,
            height: "calc(100vh - 110px)",
            overflow: "auto",
            backgroundColor: "var(--primary-background)",
          }}
        >
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };
};

export default withSidebar;
