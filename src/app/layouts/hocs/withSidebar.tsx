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
            overflowY: "scroll",
            backgroundColor: "#161819",
          }}
        >
          <WrappedComponent {...props} />
        </div>
      </div>
    );
  };
};

export default withSidebar;
