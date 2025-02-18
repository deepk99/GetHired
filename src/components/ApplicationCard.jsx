import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import { space } from "postcss/lib/list";
import { updateApplicationStatus } from "@/api/apiApplications";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function ApplicationCard({ application, isCandidate = false }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const {
    loading: loadingHiringStatus,
    fn: fnHiringStatus,
  } = useFetch(updateApplicationStatus, {
    job_id: application.job_id,
  });

  const handleStatusChange = (status) => {
    fnHiringStatus(status);
  };

  return (
    <Card>
      {loadingHiringStatus && (
        <BarLoader className="mb-4" width={"100%"} color="blue" />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between items-center font-bold">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}

          <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between ">
          <div className="flex gap-2 items-center">
            <BriefcaseBusiness />
            {application?.experience} years of experience
          </div>
          <div className="flex gap-2 items-center">
            <School />
            {application?.education}
          </div>
          <div className="flex gap-2 items-center">
            <Boxes />
            Skills: {application?.skills}
          </div>
        </div>
        <hr />
      </CardContent>
      <CardFooter className="flex justify-between">
        <span>{new Date(application?.created_at).toLocaleString()}</span>
        {isCandidate ? (
          <span className="capitalize font-bold">
            Status: {application?.status}
          </span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application.status}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hired</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
}

export default ApplicationCard;

//agar isCandidate true raha toh suppose user ne login kia hai toh usko konse job ko apply kia hai woh dikhega
//and isCandidate false raha toh and recruiter ne login kia hai toh usko kis bande ne job ko apply kia hai woh dikhega
