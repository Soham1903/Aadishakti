import { useParams } from "react-router-dom";
import { useUser } from "../UserContext";
import Certificate from "./Certificate";
import coursesData from "../data/courses.json";

const CertificateWrapper = () => {
  const { courseId } = useParams();
  const course = Array.isArray(coursesData)
    ? coursesData.find((course) => course.courseId === courseId)
    : coursesData.courseId === courseId
    ? coursesData
    : null;
  const { user } = useUser();

  // You can also fetch course data by courseId here if needed
  const courseName = course.title; // Replace with actual logic
  const date = new Date().toLocaleDateString();

  return <Certificate name={user.name} course={courseName} date={date} />;
};

export default CertificateWrapper;
