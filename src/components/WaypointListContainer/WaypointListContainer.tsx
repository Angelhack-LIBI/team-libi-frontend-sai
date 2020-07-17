import React, { ReactNode } from "react";
import { Waypoint } from "react-waypoint";

export interface IWaypointListContainerProps {
  children: ReactNode;
  onLoad: (args: any) => void;
  isLastPage: boolean;
  isLoading: boolean;
  loadingComponent: ReactNode;
  isActive: boolean;
}

const WaypointListContainer = ({
  children,
  onLoad,
  isLastPage,
  isLoading,
  loadingComponent,
  isActive,
}: IWaypointListContainerProps) => {
  console.log('isActive', isActive)
  console.log('onEnter', isActive ? onLoad : () => {})

  return (
    <div>
      {children}
      {isLoading && loadingComponent}
      {!isLastPage && !isLoading && (
        <div className="col-xs-12">
          <Waypoint onEnter={isActive ? onLoad : () => {}} />
        </div>
      )}
    </div>
  );
};

export default WaypointListContainer;
