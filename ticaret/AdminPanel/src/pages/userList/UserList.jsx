import { deleteUser, getUser } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./userList.css"

export default function UserList() {

  const dispatch = useDispatch();
  const users = useSelector((state) => state.user?.users);
  console.log(users)


  useEffect(() => {
    getUser(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteUser(id, dispatch);
  };


  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "user",
      headerName: "Kullanici",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "password",
      headerName: "Parola",
      width: 250,
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 100,
    },
    {
      field: "createdAt",
      headerName: "Oluşturulma Tarihi",
      width: 250,
    },
    {
      field: "updatedAt",
      headerName: "Güncelleme Tarihi",
      width: 250,
    },
    {
      field: "action",
      headerName: "Islem",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <AiOutlineDelete
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}


