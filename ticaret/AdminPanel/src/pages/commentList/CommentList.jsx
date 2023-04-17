import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./commentList.css"
import { delComments, getComments } from "../../redux/apiCalls";

export default function UserList() {

    const dispatch = useDispatch();
    const comments = useSelector((state) => state.comment.comments)
    console.log(comments)

    useEffect(() => {
        getComments(dispatch);
    }, [dispatch]);
      
    const handleDelete = (id) => {
        delComments(id, dispatch)
    }

    const columns = [
        { field: "_id", headerName: "ID", width: 250 },
        {
            field: "username",
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
        {
            field: "comments",
            headerName: "Yorum",
            width: 250,
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
            headerName: "İşlemler",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/comment/" + params.row._id}>
                            <button className="commentListEdit">Görüntüle</button>
                        </Link>
                        <AiOutlineDelete
                            className="commentListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="commentList">
            <DataGrid
                rows={comments}
                disableSelectionOnClick
                columns={columns}
                getRowId={(row) => row._id}
                pageSize={8}
                checkboxSelection
            />
        </div>
    );
}


