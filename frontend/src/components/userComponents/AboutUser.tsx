import { IUser } from "../../models/IUser";

interface IAboutUserProps {
  user: IUser;
}

export const AboutUser = (props: IAboutUserProps) => {
  return (
    <div className="account__section account__section--user">
        <h3>User section</h3>
      <span>{props.user.firstName}</span>
    </div>
  );
};
