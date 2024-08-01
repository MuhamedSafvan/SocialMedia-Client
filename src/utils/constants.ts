// export const baseUrl = "http://localhost:8000/api";
// export const assetBaseUrl = "http://localhost:8000/assets";
export const baseUrl = "https://ms-socialmedia.onrender.com/api";
export const assetBaseUrl = "https://ms-socialmedia.onrender.com/assets";

export interface IUser {
    firstName?: string;
    lastName?: string;
    name?: string;
    profilePic?: string;
    email?: string;
    location?: string;
    occupation?: string;
    _id: string;
  }