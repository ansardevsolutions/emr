// src/components/Table/PatientsTable.jsx

import {
  Box,
  Card,
  CardContent,
  IconButton,
  Paper,
  TablePagination,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Info as InfoIcon,
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
} from "@mui/icons-material";
import PropTypes from "prop-types";

const PatientsTable = ({
  patients,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  onViewPatient,
  onEditPatient,
  onDeletePatient,
  onInfoPatient,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

  TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
  };

  const CustomPagination = () => {
    return (
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        ActionsComponent={TablePaginationActions}
        slotProps={{
          select: {
            inputProps: {
             
              "aria-label": "rows per page",
            },
            native: true,
          },
        }}
      />
    );
  };

  // Shared Action Buttons Component
  const ActionButtons = ({ patient }) => (
    <Box sx={{ display: "flex", gap: "0.1px" }}>
      <Tooltip title="View Patient" arrow>
        <IconButton
          size="small"
          onClick={() => onViewPatient(patient)}
          aria-label="View Patient"
          sx={{
          
            color: "#797979",
            "&:hover": { backgroundColor: "#e3f2fd" },
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Edit Patient" arrow>
        <IconButton
          size="small"
          onClick={() => onEditPatient(patient)}
          aria-label="Edit Patient"
          sx={{
            color: "#969696",
            "&:hover": { backgroundColor: "#fff3e0" },
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Patient" arrow>
        <IconButton
          size="small"
          onClick={() => onDeletePatient(patient)}
          aria-label="Delete Patient"
          sx={{
            color: "#f44336",
            "&:hover": { backgroundColor: "#ffebee" },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Patient Info" arrow>
        <IconButton
          size="small"
          onClick={() => onInfoPatient(patient)}
          aria-label="Patient Info"
          sx={{
            color: "#9e9e9e",
            "&:hover": { backgroundColor: "#f5f5f5" },
          }}
        >
          <InfoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  ActionButtons.propTypes = {
    patient: PropTypes.object.isRequired,
  };

  // Empty State Component
  const EmptyState = () => (
    <Box
      sx={{ textAlign: "center", py: 4, color: theme.palette.text.secondary }}
    >
      <Typography variant="h6">No patients found</Typography>
      <Typography variant="body2">
        Try adjusting your search or filters.
      </Typography>
    </Box>
  );

  if (patients.length === 0) {
    return <EmptyState />;
  }

  if (isMobile) {
    return (
      <Box>
        {patients.map((patient) => (
          <Card
            key={patient.id}
            sx={{
              mb: 2,
              boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
              "&:hover": {
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              },
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  {patient.name}
                </Typography>
                <Typography
                  sx={{
                    backgroundColor: "#e3f2fd",
                    color: "#1976d2",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontWeight: 600,
                  }}
                >
                  {patient.readingsCount}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  <strong>PatID:</strong> {patient.patId}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  <strong>Phone:</strong> {patient.phone}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  <strong>Email:</strong> {patient.email || "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  <strong>Provider:</strong> {patient.provider}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  <strong>Device Added:</strong> {patient.deviceAdded}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  <strong>First Reading:</strong> {patient.firstReading}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>RPM Comm Time:</strong> {patient.rpmCommTime}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <ActionButtons patient={patient} />
              </Box>
            </CardContent>
          </Card>
        ))}
        <Paper sx={{ mt: 2 }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            ActionsComponent={TablePaginationActions}
            slotProps={{
              select: {
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              },
            }}
            sx={{
              ".MuiTablePagination-toolbar": {
                padding: 2,
              },
            }}
          />
        </Paper>
      </Box>
    );
  }

  // Desktop DataGrid View
  const columns = [
    {
      field: "actions",
      headerName: "Action",
      minWidth: 100,
      align: "left",
      renderCell: (params) => <ActionButtons patient={params.row} />,
      sortable: false,
    },
    {
      field: "srNo",
      headerName: "Sr No",
      width: 60,
      align: "center",
      renderCell: (params) => params.row.id,
      sortable: false,
    },
    { field: "patId", headerName: "PatID", width: 80, sortable: true },
    { field: "name", headerName: "Name", width: 150, sortable: true },
    { field: "phone", headerName: "Phone", width: 120, sortable: true },
    { field: "email", headerName: "Email", width: 200, sortable: true },
    { field: "provider", headerName: "Provider", width: 150, sortable: true },
    {
      field: "deviceAdded",
      headerName: "DeviceA..",
      width: 100,
      sortable: true,
    },
    {
      field: "firstReading",
      headerName: "FirstRea..",
      width: 100,
      sortable: true,
    },
    {
      field: "rpmCommTime",
      headerName: "RpmCommT..",
      width: 100,
      sortable: true,
    },
    {
      field: "readingsCount",
      headerName: "Readin..",
      width: 80,
      align: "left",
      renderCell: (params) => params.value,
      sortable: true,
    },
  ];

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", borderRadius: "4px" }}>
      <DataGrid
        rows={patients}
        columns={columns}
        pageSize={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        rowCount={totalCount}
        paginationMode="server"
        page={page}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        autoHeight
        slots={{
          pagination: CustomPagination,
        }}
        sx={{
          border: 0,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            color: "#666",
            fontWeight: 600,
            borderBottom: "2px solid #e0e0e0",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "0.875rem",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#f9f9f9",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f0f0f0",
            color: "#333",
            fontSize: "0.875rem",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "white",
          },
        }}
      />
    </Paper>
  );
};

PatientsTable.propTypes = {
  patients: PropTypes.arrayOf(PropTypes.object).isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onViewPatient: PropTypes.func.isRequired,
  onEditPatient: PropTypes.func.isRequired,
  onDeletePatient: PropTypes.func.isRequired,
  onInfoPatient: PropTypes.func,
};

PatientsTable.defaultProps = {
  onInfoPatient: () => {},
};

export default PatientsTable;
