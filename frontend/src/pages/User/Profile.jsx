import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { useProfileMutation } from "../../redux/api/usersApiSLice";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated successfully!");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4 ">
        <div className="md:w-1/3">
          <h2 className="text-4xl font-bold mb-4">Update Profile</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label className="block text-xl font-medium text-black">
                Name
              </label>
              <input
                type="text"
                className="form-input mt-1 p-2 border-2 rounded-sm w-full border-solid border-black focus:border-none text-xl"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl font-medium text-black">
                Email
              </label>
              <input
                type="email"
                className="form-input mt-1 p-2 border-2 rounded-sm w-full border-solid border-black focus:border-none text-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl font-medium text-black">
                Password
              </label>
              <input
                type="password"
                className="form-input mt-1 p-2 border-2 rounded-sm w-full border-solid border-black focus:border-none text-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl font-medium text-black">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-input mt-1 p-2 border-2 rounded-sm w-full border-solid border-black focus:border-none text-xl"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-zinc-700 text-xl font-bold text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-zinc-900"
              >
                Update
              </button>
              <Link
                to="/user-orders"
                className="bg-zinc-700 text-xl font-bold text-white px-4 py-2 rounded cursor-pointer my-[1rem] hover:bg-zinc-900"
              >
                My Orders
              </Link>
            </div>
          </form>
        </div>
        {loadingUpdateProfile && <Loader />}
      </div>
    </div>
  );
};

export default Profile;
