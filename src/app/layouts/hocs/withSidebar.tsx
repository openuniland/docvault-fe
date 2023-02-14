import React from 'react';
import { Sidebar } from 'app/components/Sidebar';

const withSidebar = (WrappedComponent: React.ComponentType) => {
  return (props: JSX.IntrinsicAttributes) => {
    return (
      <>
        <Sidebar />
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withSidebar;
