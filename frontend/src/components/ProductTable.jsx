import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchData, fetchSearchData } from "../apiService";
import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Search from "./Search";
import ProductDialog from "./ProductDialog";
import authService from "../authService";
import { jwtDecode } from "jwt-decode";
import EditDialog from "./EditDialog";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "manufacturer", label: "Manufacturer", minWidth: 170 },
  { id: "details", label: "Details", minWidth: 100 },
];

export default function ProductTable() {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(location.state?.page || 1);

  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [query, setQuery] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = authService.getCurrentUser();
    const userRoles = jwtDecode(token);
    setUserRole(userRoles.role[0].authority);

    const fetchProductData = async () => {
      setIsLoading(true);
      try {
        let data;
        if (query) {
          console.log("Query is present");
          data = await fetchSearchData(query);
        } else {
          const sortParam = `${sortConfig.key},${sortConfig.direction}`;
          data = await fetchData(page - 1, 10, sortParam);
        }
        setData(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductData();
  }, [page, sortConfig, query]);

  const handleUpdateProduct = (updatedProduct) => {
    setData((prevData) =>
      prevData.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const resetQuery = () => {
    setQuery("");
    setPage(1);
  };

  const handleSort = (columnId) => {
    let direction = "asc";
    if (sortConfig.key === columnId) {
      direction = sortConfig.direction === "asc" ? "desc" : "asc";
    }
    setSortConfig({ key: columnId, direction });
    setPage(1);
  };

  const handleChangePage = (event, value) => {
    console.log("Page changed to:", value);
    setPage(value);
  };

  const renderSortIcon = (columnId) => {
    if (sortConfig.key === columnId) {
      return sortConfig.direction === "asc" ? (
        <ArrowDownwardIcon fontSize="small" />
      ) : (
        <ArrowUpwardIcon fontSize="small" />
      );
    } else {
      return <ArrowUpwardIcon fontSize="small" color="disabled" />;
    }
  };

  return (
    <>
      <Box sx={{ mb: 4 }}>
        <Search setQuery={setQuery} resetQuery={resetQuery} />
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: 20,
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) =>
                      column.id !== "details" ? (
                        <TableCell
                          key={column.id}
                          style={{
                            minWidth: column.minWidth,
                            cursor: "pointer",
                            fontWeight: "bold",
                            backgroundColor: "#f5f5f5",
                            color: "#333",
                            //borderBottom: "2px solid #ddd",
                          }}
                          onClick={() => handleSort(column.id)}
                        >
                          {column.label} {renderSortIcon(column.id)}
                        </TableCell>
                      ) : (
                        <TableCell
                          key={column.id}
                          style={{
                            minWidth: column.minWidth,
                            fontWeight: "bold",
                            backgroundColor: "#f5f5f5",
                            color: "#333",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => (
                        <TableCell key={column.id}>
                          {column.id !== "details" ? (
                            row[column.id]
                          ) : (
                            <Box sx={{ display: "flex", gap: "10px" }}>
                              <ProductDialog
                                product={row}
                                text="Show Details"
                              />
                              {userRole === "ROLE_ADMIN" && (
                                <EditDialog
                                  product={row}
                                  text="Edit"
                                  onUpdate={handleUpdateProduct}
                                />
                              )}
                            </Box>
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChangePage}
              color="primary"
              sx={{ display: "flex", justifyContent: "center", padding: 2 }}
            />
          </>
        )}
      </Paper>
    </>
  );
}
