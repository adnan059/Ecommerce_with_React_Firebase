import { collection, getDocs, query } from "firebase/firestore";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { fireDB } from "../config/firebase";
import { useMyContext } from "../context/myState";

const UserDetail = () => {
  const { getAllUsers, setGetAllUsers, loading, setLoading } = useMyContext();

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "user"));

      const querySnapshot = await getDocs(q);
      let usersArray = [];
      querySnapshot.forEach((doc) => {
        usersArray.push({ ...doc.data(), id: doc.id });
      });
      setGetAllUsers(usersArray);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  console.log(getAllUsers);
  return (
    <div>
      <div>
        <div className="py-5 flex justify-between items-center">
          {/* text  */}
          <h1 className=" text-xl text-green-300 font-bold">All User</h1>
        </div>

        {/* table  */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border border-collapse sm:border-separate border-green-100 text-green-400">
            <tbody>
              <tr>
                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  S.No.
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  Name
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  Email
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  Uid
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  Role
                </th>

                <th
                  scope="col"
                  className="h-12 px-6 text-md border-l first:border-l-0 border-green-100 text-slate-700 bg-slate-100 font-bold fontPara"
                >
                  Date
                </th>
              </tr>
              {getAllUsers.map((value, index) => {
                return (
                  <tr key={index} className="text-green-300">
                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 ">
                      {index + 1}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 first-letter:uppercase ">
                      {value.name}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 cursor-pointer ">
                      {value.email}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700  cursor-pointer ">
                      {value.uid}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700  cursor-pointer ">
                      {value.role}
                    </td>

                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-green-100 stroke-slate-500 text-green-700 cursor-pointer ">
                      {value.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
