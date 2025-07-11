import Transaction from "../model/transactionSchema.js";
import User from "../model/userSchema.js";
import Course from "../model/courseSchema.js";
import PromoCode from "../model/promocodeSchema.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import {
  sendAdminNotification,
  sendCustomerConfirmation,
} from "../services/emailService.js";

export const createTransaction = async (req, res) => {
  // Add unique request ID for tracking
  const requestId = Math.random().toString(36).substring(7);
  console.log(`[${requestId}] Transaction creation started`);

  try {
    const {
      customerName,
      phoneNumber,
      courseTitle,
      courseId,
      courses,
      promoCode,
      finalPrice,
      cartTotal,
    } = req.body;

    // Handle array data from FormData
    let courseTitlesArray = req.body.courseTitle;
    let courseIdsArray = req.body.courseId;

    // Convert single values to arrays for consistency
    if (courseTitlesArray && !Array.isArray(courseTitlesArray)) {
      courseTitlesArray = [courseTitlesArray];
    }
    if (courseIdsArray && !Array.isArray(courseIdsArray)) {
      courseIdsArray = [courseIdsArray];
    }

    console.log(`[${requestId}] Processed arrays:`, {
      courseTitlesArray,
      courseIdsArray,
      courseTitlesLength: courseTitlesArray?.length,
      courseIdsLength: courseIdsArray?.length,
    });

    // Parse courses JSON string if it exists
    let parsedCourses = null;
    if (courses) {
      try {
        parsedCourses = JSON.parse(courses);
        console.log(`[${requestId}] Parsed courses:`, parsedCourses);
      } catch (error) {
        console.log(`[${requestId}] JSON parse error:`, error);
        return res.status(400).json({
          success: false,
          message: "Invalid courses data format",
        });
      }
    }

    // Validate required fields
    if (!customerName || !phoneNumber || !finalPrice || !req.file) {
      console.log(`[${requestId}] Missing required fields`);
      return res.status(400).json({
        success: false,
        message:
          "Customer name, phone number, final price, and screenshot are required",
      });
    }

    // Determine transaction type with detailed logging
    const isSingleCourse =
      (courseTitle && courseId && !parsedCourses && !courseTitlesArray) ||
      (courseTitlesArray && courseTitlesArray.length === 1);
    const isMultipleCourses =
      (parsedCourses &&
        Array.isArray(parsedCourses) &&
        parsedCourses.length > 0) ||
      (courseTitlesArray && courseTitlesArray.length > 1);
    const isFormDataArray = courseTitlesArray && courseIdsArray;

    console.log(`[${requestId}] Transaction type analysis:`, {
      isSingleCourse,
      isMultipleCourses,
      isFormDataArray,
    });

    if (!isSingleCourse && !isMultipleCourses) {
      console.log(`[${requestId}] No valid transaction type determined`);
      return res.status(400).json({
        success: false,
        message: "Either single course or multiple courses data is required",
      });
    }

    // Check if transaction already exists (prevent duplicates)
    const existingTransaction = await Transaction.findOne({
      customerName,
      phoneNumber,
      finalPrice,
      createdAt: { $gte: new Date(Date.now() - 60000) }, // Within last minute
    });

    if (existingTransaction) {
      console.log(
        `[${requestId}] Duplicate transaction detected:`,
        existingTransaction._id
      );
      return res.status(409).json({
        success: false,
        message: "Transaction already exists",
        existingTransaction: existingTransaction._id,
      });
    }

    // 1. Find and validate user exists
    const user = await User.findOne({ phoneno: phoneNumber });
    if (!user) {
      console.log(`[${requestId}] User not found for phone:`, phoneNumber);
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log(`[${requestId}] User found:`, user._id);

    // 2. Process courses based on transaction type
    let courseTitles = [];
    let courseIds = [];
    let courseDetails = [];
    let calculatedTotal = 0;

    // Helper function to validate and find course
    const findCourseById = async (id, title) => {
      console.log(`[${requestId}] Finding course:`, { id, title });
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const course = await Course.findById(id);
          if (course) {
            console.log(`[${requestId}] Course found by ObjectId:`, course._id);
            return course;
          }
        }

        const course = await Course.findOne({
          $or: [
            { courseNumber: id },
            { id: id },
            { slug: id },
            { courseId: id },
          ],
        });

        if (course) {
          console.log(
            `[${requestId}] Course found by alternative field:`,
            course._id
          );
        } else {
          console.log(`[${requestId}] Course not found for ID:`, id);
        }

        return course;
      } catch (error) {
        console.error(
          `[${requestId}] Error finding course with ID ${id}:`,
          error
        );
        return null;
      }
    };

    // Process courses based on the transaction type
    if (isFormDataArray) {
      console.log(`[${requestId}] Processing FormData arrays`);

      if (courseTitlesArray.length !== courseIdsArray.length) {
        console.log(`[${requestId}] Array length mismatch`);
        return res.status(400).json({
          success: false,
          message: "Course titles and IDs arrays must have the same length",
        });
      }

      for (let i = 0; i < courseTitlesArray.length; i++) {
        const cTitle = courseTitlesArray[i];
        const cId = courseIdsArray[i];

        const course = await findCourseById(cId, cTitle);
        if (!course) {
          console.log(`[${requestId}] Course not found:`, { cTitle, cId });
          return res.status(404).json({
            success: false,
            message: `Course not found: ${cTitle} (ID: ${cId})`,
          });
        }

        courseTitles.push(cTitle);
        courseIds.push(course._id);
        courseDetails.push({
          courseId: course._id,
          courseTitle: cTitle,
          price: course.price || 0,
        });

        calculatedTotal += course.price || 0;
      }
    } else if (isSingleCourse) {
      console.log(`[${requestId}] Processing single course`);

      const course = await findCourseById(courseId, courseTitle);
      if (!course) {
        console.log(`[${requestId}] Single course not found:`, {
          courseTitle,
          courseId,
        });
        return res.status(404).json({
          success: false,
          message: `Course not found: ${courseTitle} (ID: ${courseId})`,
        });
      }

      courseTitles = [courseTitle];
      courseIds = [course._id];
      courseDetails = [
        {
          courseId: course._id,
          courseTitle,
          price: course.price || finalPrice,
        },
      ];
      calculatedTotal = course.price || finalPrice;
    } else {
      console.log(`[${requestId}] Processing multiple courses from JSON`);

      for (const courseItem of parsedCourses) {
        const { courseId: cId, courseTitle: cTitle, price } = courseItem;

        const course = await findCourseById(cId, cTitle);
        if (!course) {
          console.log(`[${requestId}] JSON course not found:`, { cTitle, cId });
          return res.status(404).json({
            success: false,
            message: `Course not found: ${cTitle} (ID: ${cId})`,
          });
        }

        courseTitles.push(cTitle);
        courseIds.push(course._id);
        courseDetails.push({
          courseId: course._id,
          courseTitle: cTitle,
          price: parseFloat(price),
        });

        calculatedTotal += parseFloat(price);
      }
    }

    console.log(`[${requestId}] Course processing complete:`, {
      courseTitles,
      courseIds,
      calculatedTotal,
    });

    // 3. Initialize price variables
    let originalPrice = cartTotal || calculatedTotal;
    let discountApplied = 0;
    let validPromoCode = null;

    // 4. Validate and apply promo code if provided
    if (promoCode) {
      const promo = await PromoCode.findOne({ code: promoCode });
      if (promo && promo.isActive) {
        validPromoCode = promo;
        discountApplied = (originalPrice * promo.discountPercentage) / 100;

        // Verify final price matches expected discounted price
        const expectedFinalPrice = originalPrice - discountApplied;
        if (Math.abs(finalPrice - expectedFinalPrice) > 0.01) {
          console.log(`[${requestId}] Price calculation mismatch`);
          return res.status(400).json({
            success: false,
            message: "Price calculation mismatch",
          });
        }
      } else {
        console.log(`[${requestId}] Invalid promo code:`, promoCode);
        return res.status(400).json({
          success: false,
          message: "Invalid or inactive promo code",
        });
      }
    }

    // 5. Process payment proof
    const paymentProof = {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
      imageBase64: req.file.buffer.toString("base64"),
    };

    console.log(`[${requestId}] Payment proof processed:`, {
      filename: paymentProof.filename,
      contentType: paymentProof.contentType,
      imageSize: paymentProof.imageBase64.length,
    });

    // Before creating transaction, log the attempt
    console.log(`[${requestId}] About to create transaction with data:`, {
      customerName,
      phoneNumber,
      courseTitles,
      courseIdsLength: courseIds.length,
      finalPrice,
      userId: user._id,
    });

    // 6. Create transaction record with proper handling for single/multiple courses
    const transactionData = {
      customerName,
      phoneNumber,
      courseTitle: courseTitles,
      paymentProof,
      transactionId: uuidv4(),
      promoCode: promoCode,
      originalPrice,
      finalPrice,
      user: user._id,
      // Enhanced courses array with proper ObjectIds
      courses: courseDetails.map((detail) => ({
        courseId: detail.courseId, // This is already an ObjectId
        courseTitle: detail.courseTitle,
        price: detail.price,
      })),
      // Array of course ObjectIds for easy querying
      courseIds: courseIds, // This is already an array of ObjectIds
    };

    // For single course - populate legacy fields for backward compatibility
    if (courseIds.length === 1) {
      transactionData.courseId = courseIds[0].toString();
      transactionData.course = courseIds[0];
    }

    const newTransaction = new Transaction(transactionData);

    // 7. Save transaction
    await newTransaction.save();
    console.log(
      `[${requestId}] Transaction created successfully:`,
      newTransaction._id
    );

    // 8. IMMEDIATELY SEND EMAIL NOTIFICATIONS
    console.log(`[${requestId}] Starting immediate email notifications...`);

    // Create a promise that resolves immediately to ensure emails are sent
    const sendEmailsImmediately = async () => {
      try {
        // Populate user data for email - Use lean() for faster query
        const populatedTransaction = await Transaction.findById(
          newTransaction._id
        )
          .populate("user", "email name")
          .lean()
          .exec();

        console.log(`[${requestId}] Transaction populated for email:`, {
          transactionId: populatedTransaction._id,
          userEmail: populatedTransaction.user?.email,
          userName: populatedTransaction.user?.name,
        });

        // Send both emails concurrently for faster delivery
        const [adminResult, customerResult] = await Promise.allSettled([
          // Send admin notification
          sendAdminNotification(populatedTransaction, courseDetails),
          // Send customer confirmation (if user has email)
          populatedTransaction.user && populatedTransaction.user.email
            ? sendCustomerConfirmation(populatedTransaction, courseDetails)
            : Promise.resolve({ success: false, error: "No customer email" }),
        ]);

        // Log admin email result
        if (adminResult.status === "fulfilled" && adminResult.value.success) {
          console.log(
            `[${requestId}] ✅ Admin notification email sent successfully`
          );
        } else {
          console.error(
            `[${requestId}] ❌ Admin email failed:`,
            adminResult.status === "fulfilled"
              ? adminResult.value.error
              : adminResult.reason
          );
        }

        // Log customer email result
        if (
          customerResult.status === "fulfilled" &&
          customerResult.value.success
        ) {
          console.log(
            `[${requestId}] ✅ Customer confirmation email sent successfully`
          );
        } else if (
          populatedTransaction.user &&
          populatedTransaction.user.email
        ) {
          console.error(
            `[${requestId}] ❌ Customer email failed:`,
            customerResult.status === "fulfilled"
              ? customerResult.value.error
              : customerResult.reason
          );
        } else {
          console.log(
            `[${requestId}] ℹ️ No customer email found, skipping customer notification`
          );
        }

        return {
          adminSuccess:
            adminResult.status === "fulfilled" && adminResult.value.success,
          customerSuccess:
            customerResult.status === "fulfilled" &&
            customerResult.value.success,
          emailsSent: true,
        };
      } catch (emailError) {
        console.error(
          `[${requestId}] ❌ Critical error in email sending:`,
          emailError
        );
        return {
          adminSuccess: false,
          customerSuccess: false,
          emailsSent: false,
          error: emailError.message,
        };
      }
    };

    // Execute email sending immediately (don't wait for completion)
    const emailResults = await sendEmailsImmediately();

    console.log(`[${requestId}] Email notification results:`, emailResults);

    // 9. Success response with email status
    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction: newTransaction,
      emailNotifications: {
        adminEmailSent: emailResults.adminSuccess,
        customerEmailSent: emailResults.customerSuccess,
        emailProcessed: emailResults.emailsSent,
      },
      requestId, // Include for debugging
    });
  } catch (error) {
    console.error(`[${requestId}] ❌ Error creating transaction:`, error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
      requestId,
    });
  }
};

export const toggleVerification = async (req, res) => {
  try {
    const { isVerified } = req.body;
    const transactionId = req.params.id;

    console.log("Debug transaction ID:", transactionId);

    if (typeof isVerified !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "isVerified must be a boolean value",
      });
    }

    // 1. Find transaction
    const transaction = await Transaction.findById(transactionId).populate(
      "user",
      "courses"
    );
    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found",
      });
    }

    // 2. Update verification
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      {
        isVerified,
        verifiedAt: isVerified ? new Date() : null,
      },
      { new: true }
    );

    // 3. If verified, update user and promocode
    if (isVerified && transaction.phoneNumber) {
      const user = await User.findOne({ phoneno: transaction.phoneNumber });

      // Handle multiple courses
      const coursesToAdd = [];

      // Get course IDs - handle different possible structures
      let courseIds = [];

      // NEW: Handle courseIds array (from updated transaction creation)
      if (transaction.courseIds && Array.isArray(transaction.courseIds)) {
        courseIds = transaction.courseIds;
        console.log("Found courseIds array:", transaction.courseIds);
      } else if (transaction.courseId && Array.isArray(transaction.courseId)) {
        // Handle courseId as array
        courseIds = transaction.courseId;
        console.log("Found courseId as array:", transaction.courseId);
      } else if (transaction.course && Array.isArray(transaction.course)) {
        // Handle course as array
        courseIds = transaction.course;
        console.log("Found course as array:", transaction.course);
      } else if (transaction.courses && Array.isArray(transaction.courses)) {
        // Handle courses stored as array of objects
        courseIds = transaction.courses
          .map((course) => course.courseId)
          .filter(Boolean);
        console.log("Found courses array:", transaction.courses);
      } else if (
        transaction.courses &&
        typeof transaction.courses === "string"
      ) {
        // Handle courses as JSON string (fallback)
        try {
          const coursesData = JSON.parse(transaction.courses);
          courseIds = coursesData
            .map((course) => course.courseId)
            .filter(Boolean);
          console.log("Parsed courses from JSON string:", coursesData);
        } catch (error) {
          console.error("Error parsing courses JSON:", error);
        }
      } else if (
        Array.isArray(transaction.courseTitle) &&
        transaction.courseTitle.length > 1
      ) {
        // LEGACY: Multiple course titles but single courseId (your current situation)
        console.log(
          "Legacy format: Multiple course titles detected, finding courses by title..."
        );

        // Find courses by their titles
        const courseTitles = transaction.courseTitle;
        for (const title of courseTitles) {
          const courseObj = await Course.findOne({ title: title });
          if (courseObj) {
            courseIds.push(courseObj._id);
            console.log(`Found course by title "${title}":`, courseObj._id);
          } else {
            console.error(`Course not found by title: "${title}"`);
          }
        }
      } else if (transaction.courseId) {
        // Single course fallback
        courseIds = [transaction.courseId];
      } else if (transaction.course) {
        // Single course fallback
        courseIds = [transaction.course];
      }
      console.log("Course IDs to process:", courseIds);

      // Find all courses
      for (const courseId of courseIds) {
        let courseObj = null;

        // Method 1: If courseId is stored as ObjectId
        try {
          courseObj = await Course.findById(courseId);
          console.log("Found course by ObjectId:", courseObj?._id);
        } catch (error) {
          console.log("Not a valid ObjectId:", courseId);
        }

        // Method 2: If courseId is stored as a string identifier
        if (!courseObj) {
          courseObj = await Course.findOne({
            $or: [
              { courseId: courseId },
              { courseNumber: courseId },
              { id: courseId },
              { slug: courseId },
            ],
          });
          console.log("Found course by identifier:", courseObj?._id);
        }

        if (courseObj) {
          coursesToAdd.push(courseObj);
        } else {
          console.error("Course not found:", courseId);
        }
      }

      if (coursesToAdd.length === 0) {
        console.error("No courses found. Debug info:", {
          transactionId: transaction._id,
          courseId: transaction.courseId,
          course: transaction.course,
          courses: transaction.courses,
          courseIds: transaction.courseIds,
          items: transaction.items,
        });

        return res.status(404).json({
          success: false,
          message: "No courses found for this transaction",
        });
      }

      // Add courses to user if not already added
      if (user) {
        let coursesAdded = 0;
        for (const courseObj of coursesToAdd) {
          if (!user.courses.includes(courseObj._id)) {
            user.courses.push(courseObj._id);
            coursesAdded++;
            console.log("Course added to user:", courseObj._id);
          } else {
            console.log(
              "Course already exists in user account:",
              courseObj._id
            );
          }
        }

        if (coursesAdded > 0) {
          await user.save();
          console.log(`${coursesAdded} courses added to user account`);
        }
      }

      // Update promo code usage
      if (transaction.promoCode) {
        await PromoCode.findOneAndUpdate(
          { code: transaction.promoCode },
          { $inc: { totalRedemptions: 1 } }
        );
        console.log("Promo code usage updated:", transaction.promoCode);
      }
    }

    res.json({
      success: true,
      updatedTransaction,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    console.log("Query params:", req.query);

    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 50, 100);
    const skip = (page - 1) * limit;

    console.log("Pagination:", { page, limit, skip });

    // Check total count first
    const total = await Transaction.countDocuments();
    console.log("Total documents:", total);

    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    console.log("Found transactions:", transactions.length);

    res.json({
      transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Transaction fetch error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
