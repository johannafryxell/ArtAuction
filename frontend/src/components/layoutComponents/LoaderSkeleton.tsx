import { FC } from "react";

interface ILoaderSkeletonProps {
  type: string;
}

export const LoaderSkeleton: FC<ILoaderSkeletonProps> = ({ type }) => {
  const classes: string = `skeleton ${type}`;
  return (
    <>
      <div className={classes}></div>
    </>
  );
};
