import { getHistorys, deleteHistory } from "../lib/helper";
import { useQuery, useQueryClient } from "react-query";
import { AiOutlineClose } from "react-icons/ai";
import styles from "../styles/History.module.css";

const History = () => {
  const queryClient = useQueryClient();

  const onDelete = async (id) => {
    try {
      await deleteHistory(id);
      queryClient.invalidateQueries("historys");
      queryClient.refetchQueries("historys");
    } catch (error) {
      console.error("Error deleting history:", error);
    }
  };

  const { isLoading, isError, data, error } = useQuery("historys", getHistorys);

  if (isLoading) return <div>History is loading...</div>;
  if (isError) return <div>Error retrieving history: {error.message}</div>;
  if (!data) return <div>No history data available.</div>; // Handle case when data is null or undefined

  // Check if data is an array before mapping over it
  if (!Array.isArray(data)) {
    console.error("Data is not an array:", data);
    return <div>Network error.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20 p-5 m-5">
        {data.map((obj, i) => (
          <div
            className="shadow-md rounded-xl text-right text-[27px] py-5 px-4 cursor-pointer dark:bg-[#000000] bg-white font-bold"
            key={i}
          >
            <AiOutlineClose
              className={`dark:bg-[#1b1c1e] ${styles.closeIcon} `}
              onClick={() => onDelete(obj._id)}
            />
            <div className="">{obj.Surah_name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default History;
