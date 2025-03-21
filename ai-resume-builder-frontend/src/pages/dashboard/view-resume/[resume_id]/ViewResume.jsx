import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getResumeData } from "@/Services/resumeAPI";
import ResumePreview from "../../edit-resume/components/PreviewPage";
import { useDispatch } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { RWebShare } from "react-web-share";
import { toast } from "sonner";
import Payments from "@/components/Payment";

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState({});
  const { resume_id } = useParams();
  const dispatch = useDispatch();
  const [isPaid, setIsPaid] = useState(false); // Track payment status
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Track form visibility

  useEffect(() => {
    fetchResumeInfo();
  }, []);

  const fetchResumeInfo = async () => {
    const response = await getResumeData(resume_id);
    dispatch(addResumeData(response.data));
  };

  const HandleDownload = () => {
    window.print();
  };

  const HandlePayment = () => {
    setShowPaymentForm(true); // Show the payment form first
  };

  const HandlePaymentCompletion = () => {
    const paymentWindow = window.open(
      "https://www.paypal.com/ncp/payment/GV8MEW7JK7K56",
      "_blank"
    );

    const checkPaymentStatus = setInterval(() => {
      if (paymentWindow?.closed) {
        clearInterval(checkPaymentStatus);
        toast.success("Payment Successful! You can now download your resume.");
        setIsPaid(true);
        setShowPaymentForm(false); // Hide the form after payment
      }
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div id="noPrint">
          <div className="my-10 mx-10 md:mx-20 lg:mx-36">
            <h2 className="text-center text-2xl font-medium">
              Congrats! Your Ultimate AI-generated Resume is ready!
            </h2>
            <p className="text-center text-gray-400">
              Now you can download your resume and share the unique URL with your friends and family.
            </p>
            <div className="flex justify-between px-44 my-10">
              {!isPaid && !showPaymentForm && <Button onClick={HandlePayment}>Pay</Button>}
              {isPaid && <Button onClick={HandleDownload}>Download</Button>}
              <RWebShare
                data={{
                  text: "Hello, this is my resume",
                  url: import.meta.env.VITE_BASE_URL + "/dashboard/view-resume/" + resume_id,
                  title: "Flamingos",
                }}
                onClick={() => toast("Resume Shared Successfully")}
              >
                <Button>Share</Button>
              </RWebShare>
            </div>
          </div>
        </div>

        {showPaymentForm && <Payments onPaymentComplete={HandlePaymentCompletion} />}

        <div className="bg-white rounded-lg p-8 print-area" style={{ width: "210mm", height: "297mm" }}>
          <div className="print">
            <ResumePreview />
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewResume;
