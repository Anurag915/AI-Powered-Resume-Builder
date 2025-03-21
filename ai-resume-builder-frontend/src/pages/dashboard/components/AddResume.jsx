import React, { useState } from "react";
import { CopyPlus, Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createNewResume } from "@/Services/resumeAPI";
import { useNavigate } from "react-router-dom";

function AddResume() {
  const [isDialogOpen, setOpenDialog] = useState(false);
  const [resumetitle, setResumetitle] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createResume = async () => {
    if (!resumetitle.trim()) {
      return console.log("Please add a title to your resume");
    }

    setLoading(true);
    const data = {
      data: {
        title: resumetitle.trim(),
        themeColor: "#000000",
      },
    };

    try {
      console.log(`Creating Resume: ${resumetitle}`);
      const res = await createNewResume(data);
      navigate(`/dashboard/edit-resume/${res.data.resume._id}`);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error creating resume:", error);
    } finally {
      setLoading(false);
      setResumetitle("");
    }
  };

  return (
    <>
      {/* Resume Card */}
      <div
        className="p-10 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 bg-secondary/50 rounded-lg h-[350px] hover:scale-105 transition-transform duration-300 cursor-pointer hover:shadow-lg transform-gpu"
        onClick={() => setOpenDialog(true)}
      >
        <CopyPlus className="text-gray-600 text-4xl transition-transform duration-300 hover:scale-110" />
        <p className="mt-2 text-sm text-gray-700">Create New Resume</p>
      </div>

      {/* Dialog Modal */}
      <Dialog open={isDialogOpen} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-md mx-auto p-6 rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Create a New Resume
            </DialogTitle>
            <DialogDescription>
              Enter a title for your new resume
            </DialogDescription>
          </DialogHeader>

          {/* Input Field */}
          <Input
            className="my-4 border-gray-300 focus:ring-2 focus:ring-indigo-500 transition"
            type="text"
            placeholder="Ex: Backend Resume"
            value={resumetitle}
            onChange={(e) => setResumetitle(e.target.value)}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button onClick={createResume} disabled={!resumetitle || loading} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              {loading ? <Loader className="animate-spin" /> : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddResume;
