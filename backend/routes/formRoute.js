import express from "express";

import { createStudentProfile, getAllStudentProfile, getTodos, createTodos, deleteTodos, insertUser, getStudentProfile, verifyLogin, assignAuto, getCounsellorDataList, loginLoad, renameKey, cleatAllAssignedCouns, getArnavCounsellorDataList, createFollowUp3, insertAgent, slotBook, bookedSlot, formToSheet, insertFromSheet, getAgentLeads, showSpecificLeads, updateAdminAvailableDays, getAdminAvailableDays, getCounsellorInfo, getCounsellorsWithStudents, getVisitLeads, getCounsellorNames, assignOfflineLeadsToCouncellor, dateSorting, getTopPerformer , getCounsellorRevenueDetails, getCoursesCounselled, getCounsellorLeadDetails, getCounsellorPendingAmount, getAssignedCounsellorStudents, getOfficeReport,removeCounsellor,getUnassignedLeads, updatePassword, getCounsellorByNumber, getAdmissionHeadCounsellors,showCounsCollegeLeads, getAdmissionHeadCounsellorsWithStudents} from "../controller/studentForm.js";
import { createCounsellor } from "../controller/counsellorDetail.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.route("/").get(loginLoad);
router.route("/form").post(createStudentProfile);
router.route("/formToSheet").post(formToSheet);
router.route("/insertAgent/:name/:password").get(insertAgent);
router.route("/dashboard").get(getAllStudentProfile);
router.route("/student/:id").get(getStudentProfile);
router.route('/counsoller').post(createCounsellor)

router.route("/getTodos/:id").get(getTodos)
router.route("/createTodos").post(createTodos)
router.route("/createFollowUp3").post(upload, createFollowUp3)

router.route("/deleteTodos/:id").delete(deleteTodos)

router.route("/register").post(insertUser);
router.route("/login").post(verifyLogin);
router.route("/autoassign").post(assignAuto);
router.route("/renameKey").post(renameKey);

// router.route("/upload-receipt/:id").post(upload, uploadPayReceipt);

router.route("/getCounsellorDataList/:id").get(getCounsellorDataList);
router.route("/getCounsellorInfo").get(getCounsellorInfo);
router.route("/getAgentLeads/:categoryName").get(getAgentLeads);
router.route("/cleatAllAssignedCouns").get(cleatAllAssignedCouns);
router.route("/slotBook").post(slotBook);
router.route("/bookedSlot").get(bookedSlot);
router.route("/insertFromSheet").post(insertFromSheet);
router.route("/updateAdminAvailableDays").post(updateAdminAvailableDays);
router.route("/getAdminAvailableDays").get(getAdminAvailableDays);

router.route("/showSpecificLeads/:id").get(showSpecificLeads);
router.route("/getCounsellorsWithStudents").get(getCounsellorsWithStudents);
router.route("/getVisitLeads").get(getVisitLeads);
router.route("/getCounsellorNames").get(getCounsellorNames);
router.route("/assignOfflineLeadsToCouncellor").post(assignOfflineLeadsToCouncellor);
router.route("/removeCounsellor/:id").delete(removeCounsellor);
router.route("/sortondate").post(dateSorting);

router.route("/getTopPerformer").get(getTopPerformer)

// router.route("/getTopPerformer").get(getTopPerformer)




router.route("/getCounsellorRevenueDetails/:id").get(getCounsellorRevenueDetails);
router.route("/getCoursesCounselled/:counsellerId").get(getCoursesCounselled);
router.route("/getCounsellorLeadDetails/:counsellerId").get(getCounsellorLeadDetails);
router.route("/getCounsellorPendingAmount/:counsellerId").get(getCounsellorPendingAmount);
router.route("/getAssignedCounsellorStudents/:counsellerId").get(getAssignedCounsellorStudents)
router.route("/getOfficeReport").get(getOfficeReport)
router.route("/getUnassignedLeads").get(getUnassignedLeads)
router.route("/updatePass").post(updatePassword)
router.route("/getCounsellorByNumber").post(getCounsellorByNumber)
router.route("/getAdmissionHeadCounsellors/:admissionHeadId").get(getAdmissionHeadCounsellors)
router.route("/getAdmissionHeadCounsellorsWithStudents/:admissionHeadId").get(getAdmissionHeadCounsellorsWithStudents)



router.route("/showCounsCollegeLeads/:id").get(showCounsCollegeLeads)
// router.route("/getCounsellorDataList/6672c48614be596e4ccb3b39").get(getArnavCounsellorDataList);


// router.route("/").get(tableFilter); mc




export default router;