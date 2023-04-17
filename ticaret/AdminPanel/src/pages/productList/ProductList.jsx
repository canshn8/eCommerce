import "./productList.css"
import { DataGrid } from '@mui/x-data-grid';
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";



export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products);
  console.log(products);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Ürün",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "desc",
      headerName: "Açıklama",
      width: 160,
      editable: true,
    },
    {
      field: "price",
      headerName: "Fiyat",
      width: 100,
    },
    {
      field: "size",
      headerName: "Beden",
      width: 100,
    },
    {
      field: "color",
      headerName: "Renk",
      width: 150,
    },
    { field: "inStock", headerName: "Stokta", width: 100 },
    {
      field: "action",
      headerName: "İşlemler",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <AiOutlineDelete
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}