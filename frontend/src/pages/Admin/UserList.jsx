import { useEffect, useState } from "react";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSLice";
import AdminMenu from "./AdminMenu";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserName, setEditableUserName] = useState("");
  const [editableUserEmail, setEditableUserEmail] = useState("");

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id);
        toast.success("User deleted successfully");
        refetch();
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };

  const toggleEdit = (id, username, email) => {
    setEditableUserId(id);
    setEditableUserName(username);
    setEditableUserEmail(email);
  };

  const updateHandler = async (id) => {
    try {
      await updateUser({
        userId: id,
        username: editableUserName,
        email: editableUserEmail,
      });
      setEditableUserId(null);
      toast.success("User updated successfully");
      refetch();
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  return (
    // <div className="py-5 px-36">
    //   <h1 className="mb-4 text-4xl font-bold">Users</h1>
    //   {isLoading ? (
    //     <Loader />
    //   ) : error ? (
    //     <Message variant="danger">
    //       {error?.data.message || error.message}
    //     </Message>
    //   ) : (
    //     users && (
    //       <div className="flex flex-col md:flex-row">
    //         <table className="w-full mx-auto md:w-4/5">
    //           <thead>
    //             <tr>
    //               <th className="px-4 py-2 text-left">ID</th>
    //               <th className="px-4 py-2 text-left">NAME</th>
    //               <th className="px-4 py-2 text-left">EMAIL</th>
    //               <th className="px-4 py-2 text-left">ADMIN</th>
    //               <th className="px-4 py-2 text-left"></th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {users.map((user) => (
    //               <tr key={user._id}>
    //                 <td className="px-4 py-2">{user._id}</td>
    //                 <td className="px-4 py-2">
    //                   {editableUserId === user._id ? (
    //                     <div className="flex items-center">
    //                       <input
    //                         type="text"
    //                         value={editableUserName}
    //                         onChange={(e) =>
    //                           setEditableUserName(e.target.value)
    //                         }
    //                         className="w-full p-2 border rounded-lg"
    //                       />
    //                       <button
    //                         onClick={() => updateHandler(user._id)}
    //                         className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"
    //                       >
    //                         <FaCheck />
    //                       </button>
    //                     </div>
    //                   ) : (
    //                     <div className="flex items-center">
    //                       {user.username}
    //                       <button
    //                         onClick={() =>
    //                           toggleEdit(user._id, user.username, user.email)
    //                         }
    //                       >
    //                         <FaEdit className="ml-[1rem]" />
    //                       </button>
    //                     </div>
    //                   )}
    //                 </td>
    //                 <td className="px-4 py-2">
    //                   {editableUserId === user._id ? (
    //                     <div className="flex items-center">
    //                       <input
    //                         type="text"
    //                         value={editableUserEmail}
    //                         onChange={(e) =>
    //                           setEditableUserEmail(e.target.value)
    //                         }
    //                         className="w-full p-2 border rounded-lg"
    //                       />
    //                       <button
    //                         onClick={() => updateHandler(user._id)}
    //                         className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg"
    //                       >
    //                         <FaCheck />
    //                       </button>
    //                     </div>
    //                   ) : (
    //                     <div className="flex items-center">
    //                       <p>{user.email}</p>
    //                       <button
    //                         onClick={() =>
    //                           toggleEdit(user._id, user.username, user.email)
    //                         }
    //                       >
    //                         <FaEdit className="ml-[1rem]" />
    //                       </button>
    //                     </div>
    //                   )}
    //                 </td>
    //                 <td className="px-4 py-2">
    //                   {user.isAdmin ? (
    //                     <FaCheck style={{ color: "green" }} />
    //                   ) : (
    //                     <FaTimes style={{ color: "red" }} />
    //                   )}
    //                 </td>
    //                 <td className="px-4 py-2">
    //                   {!user.isAdmin && (
    //                     <div className="flex">
    //                       <button
    //                         onClick={() => deleteHandler(user._id)}
    //                         className="px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700"
    //                       >
    //                         <FaTrash />
    //                       </button>
    //                     </div>
    //                   )}
    //                 </td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     )
    //   )}
    // </div>
    <div className="min-h-screen px-6 py-5 md:px-36">
      <h1 className="mb-6 text-4xl font-extrabold text-gray-800">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data.message || error.message}
        </Message>
      ) : (
        users && (
          <div className="overflow-x-auto">
            <AdminMenu />
            <table className="w-full mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-gray-600">ID</th>
                  <th className="px-4 py-3 text-left text-gray-600">NAME</th>
                  <th className="px-4 py-3 text-left text-gray-600">EMAIL</th>
                  <th className="px-4 py-3 text-left text-gray-600">ADMIN</th>
                  <th className="px-4 py-3 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition duration-200`}
                  >
                    <td className="px-4 py-3 border-b border-gray-200">
                      {user._id}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserName}
                            onChange={(e) =>
                              setEditableUserName(e.target.value)
                            }
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          {user.username}
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                            className="ml-4 text-blue-500 hover:text-blue-600"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200">
                      {editableUserId === user._id ? (
                        <div className="flex items-center">
                          <input
                            type="text"
                            value={editableUserEmail}
                            onChange={(e) =>
                              setEditableUserEmail(e.target.value)
                            }
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => updateHandler(user._id)}
                            className="px-4 py-2 ml-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                          >
                            <FaCheck />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <p>{user.email}</p>
                          <button
                            onClick={() =>
                              toggleEdit(user._id, user.username, user.email)
                            }
                            className="ml-4 text-blue-500 hover:text-blue-600"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200">
                      {user.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-200">
                      {!user.isAdmin && (
                        <div className="flex">
                          <button
                            onClick={() => deleteHandler(user._id)}
                            className="px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      )}
    </div>
  );
};

export default UserList;
