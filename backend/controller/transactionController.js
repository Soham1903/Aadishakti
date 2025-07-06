import Transaction from "../model/transactionSchema.js";
import User from "../model/userSchema.js";
import Course from "../model/courseSchema.js";
import PromoCode from "../model/promocodeSchema.js";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

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

    // Add detailed logging
    console.log(`[${requestId}] Raw request data:`, {
      customerName,
      phoneNumber,
      courseTitle,
      courseId,
      courses,
      promoCode,
      finalPrice,
      cartTotal,
      bodyKeys: Object.keys(req.body),
      courseTitleType: typeof req.body.courseTitle,
      courseIdType: typeof req.body.courseId,
    });

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
      conditions: {
        hasCourseTitleAndId: !!(courseTitle && courseId),
        noParsedCourses: !parsedCourses,
        noCourseTitlesArray: !courseTitlesArray,
        courseTitlesArrayLength1: courseTitlesArray?.length === 1,
        hasParsedCourses: !!(
          parsedCourses &&
          Array.isArray(parsedCourses) &&
          parsedCourses.length > 0
        ),
        courseTitlesArrayLengthGt1: courseTitlesArray?.length > 1,
      },
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

    // Process courses (your existing logic continues...)
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
      courseIds: courseIds[0],
      finalPrice,
      userId: user._id,
    });

    // 6. Create transaction record
    const newTransaction = new Transaction({
      customerName,
      phoneNumber,
      courseTitle: courseTitles,
      courseId: courseIds[0],
      course: courseIds[0],
      paymentProof,
      transactionId: uuidv4(),
      promoCode: promoCode,
      originalPrice,
      finalPrice,
      user: user._id,
    });

    // 7. Save transaction
    await newTransaction.save();
    console.log(
      `[${requestId}] Transaction created successfully:`,
      newTransaction._id
    );

    // 8. Success response
    return res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction: newTransaction,
      requestId, // Include for debugging
    });
  } catch (error) {
    console.error(`[${requestId}] Error creating transaction:`, error);
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

      // Handle course verification - Fix the course finding logic
      let courseObj = null;

      // Method 1: If courseId is stored as ObjectId (most likely case)
      if (transaction.courseId) {
        courseObj = await Course.findById(transaction.courseId);
        console.log("Found course by ObjectId:", courseObj);
      }

      // Method 2: If courseId is stored as a string identifier
      if (!courseObj && transaction.courseId) {
        courseObj = await Course.findOne({
          $or: [
            { courseId: transaction.courseId },
            { courseNumber: transaction.courseId },
            { id: transaction.courseId },
            { slug: transaction.courseId },
          ],
        });
        console.log("Found course by identifier:", courseObj);
      }

      // Method 3: If course is stored in the 'course' field
      if (!courseObj && transaction.course) {
        courseObj = await Course.findById(transaction.course);
        console.log("Found course by course field:", courseObj);
      }

      // If no course found, log details for debugging
      if (!courseObj) {
        console.error("Course not found. Debug info:", {
          transactionId: transaction._id,
          courseId: transaction.courseId,
          course: transaction.course,
          courseTitle: transaction.courseTitle,
        });

        return res.status(404).json({
          success: false,
          message: "Course not found for this transaction",
        });
      }

      // Add course to user if not already added
      if (user && !user.courses.includes(courseObj._id)) {
        user.courses.push(courseObj._id);
        await user.save();
        console.log("Course added to user:", courseObj._id);
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
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 50, 100); // Cap at 100
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance

    const total = await Transaction.countDocuments();

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
