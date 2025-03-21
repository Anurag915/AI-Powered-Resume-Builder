import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllResumeData } from "@/Services/resumeAPI";
import AddResume from "./components/AddResume";
import ResumeCard from "./components/ResumeCard";

function Dashboard() {
  const user = useSelector((state) => state.editUser.userData);
  const [resumeList, setResumeList] = useState([]);

  const fetchAllResumeData = async () => {
    try {
      const resumes = await getAllResumeData();
      console.log("Resumes fetched from backend:", resumes.data);
      setResumeList(resumes.data);
    } catch (error) {
      console.error("Error fetching resumes:", error.message);
    }
  };

  useEffect(() => {
    fetchAllResumeData();
  }, [user]);

  return (
    <div className="p-10 md:px-20 lg:px-32 min-h-screen bg-gray-50">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-gray-900">My Resumes</h2>
        <p className="text-lg text-gray-600 mt-2">
          Create, manage, and refine your AI-generated resumes.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AddResume />
        {resumeList.length > 0 ? (
          resumeList.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              refreshData={fetchAllResumeData}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 mt-5">
            No resumes found. Start by creating one!
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
