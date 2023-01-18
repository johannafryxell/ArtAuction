import { LoaderShimmer } from "./LoaderShimmer";
import { LoaderSkeleton } from "./LoaderSkeleton";

export const LoaderImage = () => {
  return (
    <>
      <div className="skeleton-wrapper">
        <div className="skeleton-image">
          <LoaderSkeleton type={"img"} />
        </div>
        <LoaderShimmer />
      </div>
    </>
  );
};
