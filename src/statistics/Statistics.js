import React, {useEffect, useState} from "react";
import Chart from "react-apexcharts";
import dayjs from "dayjs";
import Layout from "../Layout";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import axios from "axios";

const Statistics = () => {
    const [categories, setCategories] = useState([]);
    const [data, setData] = useState([]);
    const [series, setSeries] = useState([]);
    const [rows, setRows] = useState([]);

    const options = {
        chart: {
            id: "chart",
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        plotOptions: {
            bar: {
                columnWidth: "50%"
            }
        },
        stroke: {
            curve: "smooth",
            colors: ["#737373"],
            width: [2, 2, 2],
            dashArray: [0, 8, 5]
        },
        grid: {
            show: false
        },
        markers: {
            colors: ["#737373"],
            size: 2,
            strokeColors: ["#737373"],
            hover: {
                size: 5
            }
        },
        theme: { mode: "light" },
        // grid: { show: false },
        yaxis: { 
            tickAmount: 24,
            min: 0,
            max: 24,
            show: false
        },
        xaxis: {
            type: "datetime",
            categories: categories
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                gradientToColors: ["#19BE81"],
                inverseColors: true,
                opacityFrom: 0.7,
                opacityTo: 0.7,
                stops: [0, 100]
            },
        },
        tooltip: {
            x: {
                format: "yy/MM/dd"
            }
        },
        dataLabels: {
            enabled: false
        }
    };


    const updateSeries = () => {
        setSeries([
            {
                name: "시간",
                data: data
            }
        ]);
    };

    const generateDates = () => {
        const dates = [];
        for(let i = 30; i >= 0; i--) {
            dates.push(dayjs().subtract(i, "day").format("YYYY-MM-DD"));
        }
        return dates;
    };

    const createRow = (id, checkIn, checkOut, breaks) => {
        const date = dayjs(checkIn).format("MMM D");
        const checkInTime = dayjs(checkIn).format("hh:mm A");
        const checkOutTime = dayjs(checkOut).format("hh:mm A");

        const diffSec = dayjs(checkOut).diff(dayjs(checkIn), "second");

        const totalSec = diffSec - breaks; // 총 초에서 breaks 초를 뺌
        const totalHours = totalSec / 3600; // 총 초를 시간으로 변환
        const breakHours = breaks / 3600;
        return {id, date, checkInTime, checkOutTime, breaks: breakHours.toFixed(2), total: totalHours.toFixed(2)};
    };

    const getDaysAgo = (startDate) => {
        const today = dayjs();
        return today.diff(dayjs(startDate), "day") + 1;
    };

    useEffect(() => {
        updateSeries();
    }, [data]);

    useEffect(() => {
        setCategories(generateDates());
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/timerecords`, {
                params: {
                    range: 30
                }
            })
            .then(res => {
                const arr = [];
                const dataArr = new Array(30).fill(0);
                res.data.map(item => {
                    const row = createRow(item.id, item.startedAt, item.endedAt, item.breakTimes);
                    arr.push(row);
                    dataArr[30 - getDaysAgo(item.startedAt)] += parseFloat(row.total);
                });
                setRows(arr);
                setData(dataArr);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <Layout>
            <div className={"statistics_wrapper"} style={{justifyContent: "center", alignItems: "center", padding: "20px", marginTop: "100px", marginLeft: "300px"}}>
                <h2 align={"left"}>Statistics</h2>
                <Chart
                    type="area"
                    series={series}
                    options={options}
                    width="800"
                    height="350"
                    />
                <h2 align={"left"}>Daily summary</h2>
                <TableContainer component={Paper} sx={{width: 800, borderRadius: 2, border: "2px solid #19BE81", overflow: "hidden"}}>
                    <Table sx={{borderCollapse: "collapse"}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Check-in</TableCell>
                                <TableCell>Check-out</TableCell>
                                <TableCell>Breaks</TableCell>
                                <TableCell>Total hours</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow sx={{backgroundColor: "#48daa5"}} key={row.id}>
                                    <TableCell component={"th"}>{row.date}</TableCell>
                                    <TableCell>{row.checkInTime}</TableCell>
                                    <TableCell>{row.checkOutTime}</TableCell>
                                    <TableCell>{row.breaks} hour</TableCell>
                                    <TableCell>{row.total} hour</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Layout>
    );
};

export default Statistics;



// const options = {
//     theme: { mode: "dark" },
//     chart: {
//         height: 300,
//         width: 500,
//         toolbar: { show: false },
//         background: "transparent",
//     },
//     stroke: { curve: "smooth", width: 4 },
//     grid: { show: false },
//     yaxis: { show: false },
//     xaxis: {
//         // labels: { show: false },
//         // axisTicks: { show: false },
//         // axisBorder: { show: false },
//         categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//         // type: "datetime",
//     },
//     fill: {
//         type: "gradient",
//             gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
//     },
//     colors: ["#0fbcf9"],
//     tooltip: {show: false}
// };