import React, { useState, useEffect } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useFormik } from "formik";
import { GoDotFill } from "react-icons/go";
import NavBar from "../Components/NavBar";
const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [addForm, setAddForm] = useState([
        {
            title: "Air Jorden 1 Shoes",
            date: "2024-10-01",
            status: "Active",
            positive: 10,
            negative: 2,
            total: 12,
        },
        {
            title: "Samsung Galaxy S22",
            date: "2024-10-02",
            status: "Offline",
            positive: 5,
            negative: 1,
            total: 6,
        },
        {
            title: "IPad Pro 2022",
            date: "2024-10-03",
            status: "Active",
            positive: 8,
            negative: 3,
            total: 11,
        },
    ]);
    const [showEditPop, setShowEditPop] = useState(false);

    const { values, handleChange, handleSubmit, handleBlur, setValues } = useFormik({
        initialValues: {
            title: "",
            date: "",
            status: "Active",
            positive: "",
            negative: "",
            total: "",
        },
        onSubmit: (values, { resetForm }) => {
            if (currentUser) {
                setAddForm((prevUsers) =>
                    prevUsers.map((user) =>
                        user.title === currentUser.title
                            ? {
                                ...user,
                                status: values.status,
                            }
                            : user
                    )
                );
                setShowEditPop(false);
            }
            resetForm();
            setCurrentUser(null);
        },
    });

    const getRowHeight = () => {
        if (window.innerWidth >= 500) return 110;
        return 60;
    };

    const calculateRowsPerPage = () => {
        const rowHeight = getRowHeight();
        setRowsPerPage(Math.floor(window.innerHeight / rowHeight));
    };

    useEffect(() => {
        calculateRowsPerPage();
        window.addEventListener("resize", calculateRowsPerPage);
        return () => window.removeEventListener("resize", calculateRowsPerPage);
    }, []);

    const filteredUsers = addForm.filter(
        (user) =>
            user.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setValues({
            title: user.title,
            date: user.date,
            status: user.status,
            positive: user.positive,
            negative: user.negative,
            total: user.total,
        });
        setShowEditPop(true);
    };

    const handleDelete = (title) => {
        setAddForm((prevUsers) => prevUsers.filter((user) => user.title !== title));
    };

    const getDotColor = (status) => {
        switch (status) {
            case "Active":
                return "#A3E635";
            case "Offline":
                return "red";
            default:
                return "gray";
        }
    };

    return (
        <div className="">
            <div><NavBar /></div>

            <div className="space-y-5 h-full flex flex-col justify-between">
                <div>
                    <div className="flex flex-col md:flex-row items-center justify-between  px-24 mt-10">
                        <div>
                            <h2 className=" flex text-4xl font-bold">Form Management</h2>
                        </div>
                        <div className="flex gap-20 items-center pr-0 md:pr-5 lg:pr-10 text-xs lg:text-base">
                            <div className="flex border border-gray-300 shadow-lg shadow-gray-300 px-3 py-1 rounded-lg">
                                <div>
                                    <input
                                        type="text"
                                        name="search"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="placeholder:text-gray-500 outline-none"
                                    />
                                </div>
                                <div className="text-gray-500 flex items-center">
                                    <RiSearch2Line />
                                </div>
                            </div>
                            <div>
                                <button className=" border-2 border-blue-400 px-3 py-1 font-semibold text-blue-400 rounded-lg hover:bg-blue-400 hover:text-white transition-all duration-300">
                                    Add Form
                                </button>
                            </div>
                        </div>
                    </div>
                    {showEditPop && (
                        <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center mx-auto">
                            <div className="flex bg-white px-10 py-5 w-[90%] lg:w-[45%] flex-col rounded-2xl space-y-5">
                                <div className="text-lg flex justify-between">
                                    <div className="text-xl font-bold">Edit Form</div>
                                    <div>
                                        <button
                                            onClick={() => {
                                                setShowEditPop(false);
                                                setCurrentUser(null);
                                            }}
                                        >
                                            <div className="bg-blue-400 text-white rounded-md p-2">
                                                <RxCross1 />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col items-center mx-autos w-[90%] md:w-3/4 mx-auto space-y-8"
                                >
                                    <div className="flex gap-5 md:gap-20 w-full">
                                        <div className="flex flex-col w-full">
                                            <label>Title</label>
                                            <input
                                                type="text"
                                                placeholder="User Title"
                                                name="title"
                                                className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200"
                                                value={values.title}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-5 md:gap-20 w-full">
                                        <div className="flex flex-col w-full">
                                            <label>Status</label>
                                            <select
                                                name="status"
                                                className="border border-gray-300 shadow-md rounded-md w-full p-2 outline-none bg-gray-200"
                                                value={values.status}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Offline">Offline</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="flex items-center mx-auto pb-10 pt-4 w-full">
                                        <button
                                            className="bg-blue-400 text-white px-10 py-3 rounded-lg text-sm"
                                            type="submit"
                                        >
                                            Update Status
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    <div className="font-semibold mt-10 grid grid-cols-7 px-3 md:px-20 bg-black text-white text-[8px] md:text-md lg:text-lg">
                        <div className="flex items-center justify-start">Title</div>
                        <div className="flex items-center mx-auto">Starting Date</div>
                        <div className="flex items-center mx-auto">+ Reviews</div>
                        <div className="flex items-center mx-auto">- Reviews</div>
                        <div className="flex items-center mx-auto">Total Reviews</div>
                        <div className="flex items-center mx-auto">Status</div>
                        <div className="flex items-center mx-auto">Actions</div>
                    </div>
                    <div className=" px-3 md:px-20">
                        {currentRows.map((user) => (
                            <div key={user.title} className="grid grid-cols-7    py-5 border-b border-gray-300">
                                <div className="flex items-center justify-start">{user.title}</div>
                                <div className="flex items-center mx-auto">{user.date}</div>
                                <div className="flex items-center mx-auto">{user.positive}</div>
                                <div className="flex items-center mx-auto">{user.negative}</div>
                                <div className="flex items-center mx-auto">{user.total}</div>
                                <div className="flex gap-2 items-center mx-auto">
                                    <GoDotFill style={{ color: getDotColor(user.status) }} /> {user.status}
                                </div>
                                <div className="flex items-center mx-auto space-x-2">
                                    <button onClick={() => handleEdit(user)} title="Edit Form" className="text-2xl text-blue-500">
                                        <FaRegEdit />
                                    </button>
                                    <button onClick={() => handleDelete(user.title)} title="DeleteForm" className="text-2xl text-red-500">
                                        <RiDeleteBinLine />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div >
                    <div className="fixed bottom-0 left-0 w-full bg-white ">
                        <div className="flex justify-between px-16 py-4  ">
                            <button
                                className="flex gap-2 items-center"
                                disabled={currentPage === 1}
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                <IoIosArrowBack /> Back
                            </button>
                            <span>{currentPage}</span>
                            <button
                                className="flex gap-2 items-center"
                                disabled={currentPage === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
