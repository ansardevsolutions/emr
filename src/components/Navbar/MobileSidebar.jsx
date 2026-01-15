// src/components/Navbar/MobileSidebar.jsx

import {
  Drawer,
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Divider,
} from "@mui/material";
import {
  Close,
  Search,
  Add,
  FilterList,
  Refresh,
  Download,
  People,
} from "@mui/icons-material";

const MobileSidebar = ({
  open,
  onClose,
  searchTerm,
  onSearchChange,
  onAddPatient,
  onRefresh,
  onDownload,
}) => {
  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          backgroundColor: "#1976d2",
          color: "white",
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <People sx={{ fontSize: 24 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Patients
            </Typography>
          </Box>
          <IconButton onClick={onClose} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)", mb: 2 }} />

        {/* SEARCH */}
        <TextField
          fullWidth
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={onSearchChange}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "rgba(0,0,0,0.54)" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 2,
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "transparent",
              },
            },
          }}
        />

        {/* SERVICE PROVIDER */}
        <Select
          fullWidth
          size="small"
          defaultValue="all"
          sx={{
            mb: 2,
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
          }}
        >
          <MenuItem value="all">Service Provider</MenuItem>
          <MenuItem value="hussain">Hussain, Muzzaffar</MenuItem>
          <MenuItem value="ali">Ali, Mujtaba</MenuItem>
        </Select>

        {/* STATUS */}
        <Select
          fullWidth
          size="small"
          defaultValue="active"
          sx={{
            mb: 2,
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255,255,255,0.3)",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>

        {/* PATIENT TYPE */}
        <Select
          fullWidth
          size="small"
          defaultValue="all"
          sx={{
            mb: 2,
            backgroundColor: "white",
            borderRadius: 1,
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "transparent",
            },
          }}
        >
          <MenuItem value="all">Patient Type</MenuItem>
          <MenuItem value="rpm">RPM</MenuItem>
          <MenuItem value="ccm">CCM</MenuItem>
        </Select>

        {/* ADD BUTTON */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            onAddPatient();
            onClose();
          }}
          sx={{
            mb: 2,
            backgroundColor: "#424242",
            color: "white",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Add
        </Button>

        {/* FILTER BY */}
        <Button
          fullWidth
          variant="outlined"
          startIcon={<FilterList />}
          sx={{
            mb: 2,
            borderColor: "white",
            color: "white",
            "&:hover": {
              borderColor: "white",
              backgroundColor: "rgba(255,255,255,0.1)",
            },
          }}
        >
          Filter By
        </Button>

        {/* REFRESH */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<Refresh />}
          onClick={onRefresh}
          sx={{
            mb: 2,
            backgroundColor: "#4caf50",
            "&:hover": {
              backgroundColor: "#45a049",
            },
          }}
        >
          Refresh
        </Button>

        {/* DOWNLOAD */}
        <Button
          fullWidth
          variant="contained"
          startIcon={<Download />}
          onClick={onDownload}
          sx={{
            backgroundColor: "#ff9800",
            "&:hover": {
              backgroundColor: "#e68900",
            },
          }}
        >
          Download
        </Button>
      </Box>
    </Drawer>
  );
};

export default MobileSidebar;
