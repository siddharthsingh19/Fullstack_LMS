import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Box,
  Paper,
  Button,
  Avatar,
} from "@mui/material";
import axios from "axios";
import { useStateContext } from "../../../context/StateContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { FaSortAlphaDown } from "react-icons/fa";
import OfficeWiseTopPerformer from "../../../component/OfficeWiseTopPerformer";
import { HiOutlineDocumentReport } from "react-icons/hi";
import TableComponent from "../../../component/TableComponent";
import {useDispatch} from 'react-redux'
import {logout} from '../../../redux/authSlice'

const ReportCards = () => {
  const baseUrl = import.meta.env.VITE_API;
  const [allCounsData, setAllCounsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [CounstopPerformer, setCounsTopPerformer] = useState();
  // const { office, setOffice } = useStateContext();
  const [sortDes, setSortDes] = useState(true);
  const [searchBy, setSearchBy] = useState("all");
  const [data, setData] = useState();
  console.log(searchBy);
  const [loading, setLoading] = useState();
  const [searchTermNoida, setSearchTermNoida] = useState("");
  const [searchTermKanpur, setSearchTermKanpur] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getAvatarUrl = (name) => {
    return `https://avatars.dicebear.com/api/avataaars/${name}.svg`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await toast.promise(
          axios.get(`${baseUrl}/getCounsellorsWithStudents`,{withCredentials:true}).catch(err=>{
            if(err?.response?.status == 401){
              dispatch(logout())
            }
          }),

          {
            loading: "Fetching Data ...",
            success: "Data fetched Successfully",
            error: "Failed to fetch Data",
          }
        );
        setAllCounsData(response.data);
        console.log(response.data, "all couns data in admin report table");
      } catch (err) {
        console.log(err, "error");
      }
    };

    fetchData();
  }, [baseUrl]);

  // const handleSearchChangeNoida = (event) => {
  //   setSearchTermNoida(event.target.value);
  // };

  // const handleSearchChangeKanpur = (event) => {
  //   setSearchTermKanpur(event.target.value);
  // };

  //  const filteredNoidaData = allCounsData.filter((item) => {
  //    item.counsellor.counsellor_id.charAt(2).toLowerCase() == "n" &&
  //    item.counsellor.name.toLowerCase().includes(searchTermNoida)},[searchTermNoida]
  //  );

  //  const filteredKanpurData = allCounsData.filter((item) =>
  //    item.counsellor.counsellor_id.charAt(2).toLowerCase() === "k" &&
  //    item.counsellor.name.toLowerCase().includes(searchTermKanpur.toLowerCase())
  //  );

  const filteredData = allCounsData.filter((item) =>
    item.counsellor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

    // filteredData = allCounsData.filter(
    //   (item) => item.counsellor.name == event.target.value
    // );
  };

  // console.log(filteredNoidaData);
  // console.log(filteredKanpurData);

  const countPaidCounsellingByCounsellor = (students) =>{
    let totalPaidCounselling = 0;
    students.forEach((student) =>{
      if(student.remarks && student.remarks.FollowUp3.length > 0){
        if(student.remarks.FollowUp3[student.remarks.FollowUp3.length -1].subject.includes("Paid")){
          totalPaidCounselling +=1;
        }
      }
    })

    return totalPaidCounselling
  }

  const countAssociateCollegeByCounsellor = (students) =>{
    let totalAssociateCollege = 0;
    students.forEach((student) =>{
      if(student.remarks && student.remarks.FollowUp3.length > 0){
        if(student.remarks.FollowUp3[student.remarks.FollowUp3.length -1].subject.includes("Associate")){
          totalAssociateCollege +=1;
        }
      }
    })

    return totalAssociateCollege
  }

  const countColdCallsByCounsellor = (students) => {
    let totalColdCalls = 0;
    students.forEach((student) => {
      if (student.remarks && student.remarks.FollowUp2.length > 0 && student.remarks.FollowUp3.length ==0) {
        if (
          student.remarks.FollowUp2[
            student.remarks.FollowUp2.length - 1
          ].subject.includes("Cold")
        ) {
          totalColdCalls += 1;
        }
      }
      // if (student.remarks.FollowUp2 && student.remarks.FollowUp2.length>0) {
      //   const lastFollowUp =
      //     student.remarks.FollowUp2[student.remarks.FollowUp2.length - 1];
      //   if (lastFollowUp && lastFollowUp.subject.includes("Cold Call Done")) {
      //     totalColdCalls += 1;
      //   }
      // }
    });
    return totalColdCalls;
  };

  const countHotCallsByCounsellor = (students) => {
    let totalHotLeads = 0;
    students.forEach((student) => {
      if (student.remarks && student.remarks.FollowUp2.length > 0 && student.remarks.FollowUp3.length ==0) {
        if (
          student.remarks.FollowUp2[
            student.remarks.FollowUp2.length - 1
          ].subject.includes("Hot")
        ) {
          totalHotLeads += 1;
        }
        // const hotCallCount = student.remarks.FollowUp2[student.remarks.FollowUp2.length - 1].subject.includes("Hot")
        // const hotCallCount = student.remarks.FollowUp2.reduce(
        //   (count, followup) => {
        //     if (followup.subject.includes("Lead")) {
        //       return count + 1;
        //     }
        //     return count;
        //   },
        //   0
        // );
        // totalHotLeads += hotCallCount;
      }
    });
    return totalHotLeads;
  };

  const countWarmCallsByCounsellor = (students) => {
    let totalWarmCalls = 0;
    students.forEach((student) => {
      if (student.remarks && student.remarks.FollowUp2.length > 0 && student.remarks.FollowUp3.length ==0) {
        if (
          student.remarks.FollowUp2[
            student.remarks.FollowUp2.length - 1
          ].subject.includes("Warm")
        ) {
          totalWarmCalls += 1;
        }
        // const warmCallCount = student.remarks.FollowUp2.reduce(
        //   (count, followup) => {
        //     if (followup.subject.includes("Warm")) {
        //       return count + 1;
        //     }
        //     return count;
        //   },
        //   0
        // );
        // totalWarmCalls += warmCallCount;
      }
    });
    return totalWarmCalls;
  };

  const touchedLeads = (students) => {
    let totalLeadsUnlocked = 0;
    students.forEach((student) => {
      if (student.remarks.FollowUp1 && student.remarks.FollowUp1.length > 0) {
        totalLeadsUnlocked += 1;
      }
    });
    return totalLeadsUnlocked;
  };

  const untouchedLeads = (students) =>{
    let totalUntouchedLeads = 0;
    students.forEach((student) =>{
      if(student.remarks && student.remarks.FollowUp1.length === 0){
        totalUntouchedLeads += 1;
      }
    })

    return totalUntouchedLeads;
  }

  const totalCallsDone = (students) => {
    let totalCallsDone = 0;
    students.forEach((student) => {
      if (
        student.remarks &&
        student.remarks.FollowUp2.length === 0 &&
        student.remarks.FollowUp1 &&
        student.remarks.FollowUp1.length > 0
      ) {
        if (
          student.remarks.FollowUp1[
            student.remarks.FollowUp1.length - 1
          ].subject.includes("First")
        ) {
          totalCallsDone += 1;
        }
        // const totalCallsCount = student.remarks.FollowUp1.reduce(
        //   (count, followup) => {
        //     if (followup.subject.includes("First")) {
        //       return count + 1;
        //     }
        //     return count;
        //   },
        //   0
        // );
        // totalCallsDone += totalCallsCount;
      }
    });
    return totalCallsDone;
  };

  
  const noidaCounsData = filteredData.filter((item) => {
    return item.counsellor.counsellor_id.toLowerCase().includes("ckn");
  });
  const kanpurCounsData = filteredData.filter((item) => {
    return item.counsellor.counsellor_id.toLowerCase().includes("ckk");
  });

  console.log(kanpurCounsData, "kan");
  console.log(noidaCounsData, "noid");

  const getTopPerformers = (data) => {
    return (
      data
        .map((item) => ({
          name: item.counsellor.name,
          leads: leadsUnlocked(item.students) + totalCallsDone(item.students), // Example metric
          avatar: getAvatarUrl(item.counsellor.name), // Get cartoon avatar URL
        }))
        // .sort((a, b) => b.leads - a.leads)  // Sort by leads in descending order
        .slice(0, 10)
    ); // Get top 10
  };

  useEffect(() => {
    topPerformer();
  }, []);

  const topPerformer = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/getTopPerformer`,{withCredentials:true});
      const totalPerformance = data.totalPerformance;
      const sortedPerformance = [...totalPerformance].sort(
        (a, b) => b.admission - a.admission
      );
      setCounsTopPerformer(sortedPerformance);
      setData(sortedPerformance);
      setLoading(false);
      console.log(sortedPerformance);
    } catch (error) {
      toast("Error in fetching");
    }
  };

  // const handleShowReport = (title) => {
  //   if (title === "Noida Office Leads") {
  //     setOffice("N");

  //   } else if (title === "Kanpur Office Leads") {
  //     setOffice("K");
  //   }
  // };

  

  const handleButtonClick = () => {
    if (searchBy === "all") {
      setCounsTopPerformer(data);
    } else {
      const prefix = searchBy === "noida" ? "ckn" : "ckk";
      console.log(prefix);
      const a = data.filter((item) => item.id.toLowerCase().startsWith(prefix));
      setCounsTopPerformer(a);
    }
  };

  const countFollowUp3 = (students) =>{
    let totalFollowUp3 = 0;
    let totalAdmissions = 0;
    let paidCounselling = 0;
    let associateCollege = 0;

    students.forEach((student) =>{
      let hasPreBookingAmount = false;
      let hasFollowUp3 = student.remarks.FollowUp3 && student.remarks.FollowUp3.length > 0
      if(hasFollowUp3){
        totalFollowUp3++;

        student.remarks.FollowUp3.forEach((followup, index) =>{
          const preBookingAmount = parseFloat(followup.preBookingAmount || 0);
          if(preBookingAmount > 0){
            hasPreBookingAmount = true;
          }

          if(index === student.remarks.FollowUp3.length - 1){
            if(followup.subject.includes("Paid")){
              paidCounselling++;
            } else if(followup.subject.includes("Associate")){
              associateCollege++
            }
          }

        })

        if(hasPreBookingAmount){
          totalAdmissions++
        }
      }
    })

    return {totalFollowUp3, totalAdmissions, paidCounselling, associateCollege}
  }


  const getCounsellorReport = (students) =>{
      let totalRevenue = 0;
      let totalAdmissions = 0;
      let totalFollowUp1 = 0;
      let totalFollowUp2 = 0;
      let totalFollowUp3 = 0;
      let paidCounselling = 0;
      let associateCollege = 0;
      let hotLead = 0;
      let warmLead = 0;
      let coldLead = 0;
      let switchOff = 0;
      let notReachable = 0;
      let disconnect = 0;
      let networkIssue = 0;
      let firstCallDone = 0;
      let incomingNotAvailable = 0;
      let notReceived = 0;
      let untouchedLeads = 0;
      let touchedLeads = 0;

      let pendingAmounts = [];

      students.forEach((student) => {
        let hasPreBookingAmount = false;
        let hasFollowUp3 =
          student.remarks.FollowUp3 && student.remarks.FollowUp3.length > 0;
        let hasFollowUp2 =
          student.remarks.FollowUp2 && student.remarks.FollowUp2.length > 0;
        let hasFollowUp1 =
          student.remarks.FollowUp1 && student.remarks.FollowUp1.length > 0;

        if(hasFollowUp1){
          touchedLeads++;
        }

        if (hasFollowUp3) {
          totalFollowUp3++;
          let totalPaid = 0;
          let packageAmount = 0;

          student.remarks.FollowUp3.forEach((followUp, index) => {
            const preBookingAmount = parseFloat(followUp.preBookingAmount || 0);
            totalPaid += preBookingAmount;
            totalRevenue += preBookingAmount;

            if (preBookingAmount > 0) {
              hasPreBookingAmount = true;
            }
            // Calculate paid counselling and associate college based on latest remark
            if (index === student.remarks.FollowUp3.length - 1) {
              const packageAmountMatch = followUp.additionalOption.match(/\d+/);
              packageAmount = packageAmountMatch
                ? parseInt(packageAmountMatch[0]) * 1000
                : 0;

              if (followUp.subject.includes("Paid Counselling")) {
                paidCounselling++;
              } else if (followUp.subject.includes("Associate College")) {
                associateCollege++;
              }
            }
          });

          if (hasPreBookingAmount) {
            totalAdmissions++;
          }

          const pendingAmount = packageAmount - totalPaid;
          if (pendingAmount > 0) {
            pendingAmounts.push({
              studentId: student._id,
              name: student.name,
              packageAmount,
              totalPaid,
              pendingAmount,
            });
          }
        } else if (hasFollowUp2) {
          totalFollowUp2++;

          // Calculate hot, warm, and cold leads based on latest remark in FollowUp2
          const latestFollowUp2 =
            student.remarks.FollowUp2[student.remarks.FollowUp2.length - 1];
          if (latestFollowUp2.subject.includes("Hot")) {
            hotLead++;
          } else if (latestFollowUp2.subject.includes("Warm")) {
            warmLead++;
          } else if (latestFollowUp2.subject.includes("Cold")) {
            coldLead++;
          }
        } else if (hasFollowUp1) {
          totalFollowUp1++;

          const latestFollowUp1 =
            student.remarks.FollowUp1[student.remarks.FollowUp1.length - 1];
          if (latestFollowUp1.subject.includes("Switch Off")) {
            switchOff++;
          } else if (latestFollowUp1.subject.includes("Not Reachable")) {
            notReachable++;
          } else if (latestFollowUp1.subject.includes("Disconnect")) {
            disconnect++;
          } else if (latestFollowUp1.subject.includes("Network Issue")) {
            networkIssue++;
          } else if (latestFollowUp1.subject.includes("First Call Done")) {
            firstCallDone++;
          } else if (latestFollowUp1.subject.includes("Not Received")) {
            notReceived++;
          } else if (
            latestFollowUp1.subject.includes("Incoming Not Available")
          ) {
            incomingNotAvailable++;
          }
        } else{
          untouchedLeads++;
        }
      });


      return {totalAdmissions, totalFollowUp1, totalFollowUp2, totalFollowUp3, firstCallDone, touchedLeads, untouchedLeads}

  }


  return (
    <Box sx={{ display: "flex", p: 0, height: "100vh" }}>
      <Box
        sx={{
          width: "300px",
          mr: 2,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Paper
          sx={{
            p: 2,
            bgcolor: "#f5f5f5",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            height: "100%",
            overflowY: "hidden",
            overflowX: "hidden",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            textAlign="center"
            sx={{ mb: 2, color: "#333" }}
          >
            Top Performers
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            textAlign="center"
            display="flex"
            alignItems="center"
            sx={{ mb: 2, color: "#333" }}
          >
            <select
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
              name=""
              id=""
              className="p-2"
            >
              <option value="all">All</option>
              <option value="noida">Noida</option>
              <option value="kanpur">Kanpur</option>
            </select>
            <button
              onClick={handleButtonClick}
              className="text-sm bg-blue-800 text-white p-2"
            >
              Filter
            </button>
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ height: "calc(100% - 48px)" }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {/* <TableCell>Picture</TableCell> */}
                  <TableCell>Name</TableCell>
                  <TableCell
                    display="flex"
                    align="left"
                    justifyContent="center"
                    padding="0px"
                    cursor="pointer"
                    alignItems="center"
                  >
                    Addmission
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="cursor-pointer">
                {loading
                  ? "Loading...."
                  : CounstopPerformer?.map((performer, index) => (
                      // <Link to={`/counsellorDashboard/${performer.id}`}>
                      <TableRow
                        key={index}
                        onClick={() =>
                          navigate(`/counsellorDashboard/${performer.objectId}`)
                        }
                      >
                        <TableCell>{performer.name}</TableCell>
                        <TableCell align="left">
                          {performer.admission}
                        </TableCell>
                      </TableRow>
                      // </Link>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <TextField
          label="Search by Counsellor Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          sx={{
            mb: 2,
            bgcolor: "#e0e0e0",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
          }}
        />
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          textAlign="center"
          sx={{ bgcolor: "#f5f5f5", p: 1, borderRadius: 1, color: "#333" }}
        >
          Report
        </Typography>
        <Box sx={{ overflowY: "auto", maxHeight: "calc(100% - 128px)" }}>
          {/* {renderTable(noidaCounsData, "Noida Office Leads")}
          {renderTable(kanpurCounsData, "Kanpur Office Leads")} */}

          {noidaCounsData.length > 0 && (
            <TableComponent
              data={noidaCounsData}
              title="Noida Office Leads"
              counsellorReport={getCounsellorReport}
              // touchedLeads={touchedLeads}
              // untouchedLeads={untouchedLeads}
              // countFollowUp3 = {countFollowUp3}
              // paidCounselling = {countPaidCounsellingByCounsellor}
              // associateCollege = {countAssociateCollegeByCounsellor}
              // totalCallsDone={totalCallsDone}
              // countHotCallsByCounsellor={countHotCallsByCounsellor}
              // countColdCallsByCounsellor={countColdCallsByCounsellor}
              // countWarmCallsByCounsellor={countWarmCallsByCounsellor}
            />
          )}
          {kanpurCounsData.length > 0 && (
            <TableComponent
              data={kanpurCounsData}
              title="Kanpur Office Leads"
              counsellorReport={getCounsellorReport}
              // touchedLeads={touchedLeads}
              // untouchedLeads={untouchedLeads}
              // countFollowUp3={countFollowUp3}
              // paidCounselling = {countPaidCounsellingByCounsellor}
              // associateCollege = {countAssociateCollegeByCounsellor}
              // totalCallsDone={totalCallsDone}
              // countHotCallsByCounsellor={countHotCallsByCounsellor}
              // countColdCallsByCounsellor={countColdCallsByCounsellor}
              // countWarmCallsByCounsellor={countWarmCallsByCounsellor}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ReportCards;
