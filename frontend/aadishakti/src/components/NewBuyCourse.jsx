// src/components/BuyCourse.jsx

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import axios from "axios";

const NewBuyCourse = ({ courseList}) => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const course = courseList.find((c) => c.courseId === courseId);

  useEffect(() => {
    if (!course) {
      alert("Course not found!");
      navigate("/courses");
    }
  }, [course, navigate]);

  const handleConfirmPurchase = async () => {
    try {
      const response = await axios.post(
        "https://your-backend.com/api/transactions",
        {
          userId: user.id,
          email: user.email,
          name: user.name,
          courseId: course.courseId,
          courseTitle: course.title,
          price: course.price,
          timestamp: new Date(),
        }
      );

      if (response.status === 200) {
        alert("Purchase successful!");
        navigate(`/courses/${course.courseId}`);
      } else {
        alert("Transaction failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error occurred during purchase.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Purchase Summary</h2>

      {course && (
        <>
          <div style={{ marginTop: "1.5rem" }}>
            <h3>📚 Course Information</h3>
            <p>
              <strong>Title:</strong> {course.title}
            </p>
            <p>
              <strong>Course ID:</strong> {course.courseId}
            </p>
            <p>
              <strong>Price:</strong> ₹{course.price}
            </p>
          </div>

          <button
            onClick={handleConfirmPurchase}
            style={{
              marginTop: "2rem",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ✅ Confirm and Pay
          </button>
        </>
      )}
    </div>
  );
};

export default NewBuyCourse;
