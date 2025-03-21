import { FaEye, FaEdit, FaTrashAlt, FaSpinner } from "react-icons/fa";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteThisResume } from "@/Services/resumeAPI";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const gradients = [
  "from-indigo-500 via-purple-500 to-pink-500",
  "from-green-400 via-blue-500 to-purple-600",
  "from-red-400 via-yellow-500 to-green-500",
  "from-blue-500 via-teal-400 to-green-300",
  "from-pink-500 via-red-500 to-yellow-500",
];

const getRandomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

function ResumeCard({ resume, refreshData }) {
  const [loading, setLoading] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const gradient = getRandomGradient();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteThisResume(resume._id);
      toast.success("Resume deleted successfully!");
    } catch (error) {
      toast.error("Error deleting resume: " + error.message);
    } finally {
      setLoading(false);
      setOpenAlert(false);
      refreshData();
    }
  };

  return (
    <div className={`relative p-6 bg-gradient-to-br ${gradient} rounded-xl shadow-xl transition transform hover:scale-105`}>
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center text-center p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-800">{resume.title}</h2>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-around bg-white p-4 rounded-lg shadow-md">
        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/view-resume/${resume._id}`)}
          className="hover:bg-gray-100 p-3 rounded-lg transition"
        >
          <FaEye className="text-blue-600 text-xl hover:scale-110 transition" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => navigate(`/dashboard/edit-resume/${resume._id}`)}
          className="hover:bg-gray-100 p-3 rounded-lg transition"
        >
          <FaEdit className="text-purple-600 text-xl hover:scale-110 transition" />
        </Button>
        <Button
          variant="ghost"
          onClick={() => setOpenAlert(true)}
          className="hover:bg-gray-100 p-3 rounded-lg transition"
        >
          <FaTrashAlt className="text-red-600 text-xl hover:scale-110 transition" />
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openAlert} onClose={() => setOpenAlert(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this resume? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenAlert(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={loading} className="bg-red-500 text-white hover:bg-red-600">
              {loading ? <FaSpinner className="animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ResumeCard;
