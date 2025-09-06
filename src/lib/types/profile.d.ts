declare type ProfileResponese = Omit<LoginResponse, "token">;
declare type PorfileInfo = Pick<LoginResponse, "user">;
declare type AccountForm = "profileInfo" | "changePassword";
declare type SetProfileForm = React.Dispatch<React.SetStateAction<AccountForm>>;
