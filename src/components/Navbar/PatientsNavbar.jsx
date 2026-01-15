// src/components/Navbar/PatientsNavbar.jsx

import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  InputAdornment,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccessibleIcon from '@mui/icons-material/Accessible';

import {
  Search,
  Add,
  FilterList,
  Refresh,
  Download,
  People,
  PersonAdd,
  Menu as MenuIcon,

} from "@mui/icons-material";

const PatientsNavbar = ({
  searchTerm,

  onSearchChange,
  onRefresh,
  onDownload,
  onAddPatient,
  onMenuClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#004a94",
        color: "white",
        padding: { xs: "10px 16px", md: "12px 24px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        gap: 2,
      }}
    >
      {/* LEFT SIDE - Title with Mobile Menu */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {isMobile && (
          <IconButton
            onClick={onMenuClick}
            aria-label="Toggle navigation menu"
            sx={{
              color: "white",
              mr: 1,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <AccessibleIcon sx={{ fontSize: { xs: 24, md: 28 } }} />
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, display: { xs: "none", sm: "block" } }}
        >
          Patients
        </Typography>
      </Box>

      {/* RIGHT SIDE - Controls (Desktop Only) */}
      {!isMobile && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          {/* Search Input */}
          <TextField
            size="small"
            placeholder="Search by Name, Email, Phone"
            value={searchTerm}
            onChange={onSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "rgba(0,0,0,0.54)" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: 200,
              backgroundColor: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(0,0,0,0.23)",
                },
              },
            }}
          />
          {/* Service Provider Dropdown */}
          <Select
            size="small"
            defaultValue="all"
            sx={{
              minWidth: 100,
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.3)",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            <MenuItem value="all">Service Provider</MenuItem>
            <MenuItem value="hussain">Hussain, Muzzaffar</MenuItem>
            <MenuItem value="ali">Ali, Mujtaba</MenuItem>
          </Select>
          {/* Status Dropdown */}
          <Select
            size="small"
            defaultValue="active"
            sx={{
              minWidth: 100,
              backgroundColor: "black",
              color: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.3)",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
          >
            <MenuItem value="active">ACTIVE</MenuItem>
            <MenuItem value="inactive">INACTIVE</MenuItem>
          </Select>
          {/* Patient Type Dropdown */}
          <Select
            size="small"
            defaultValue="all"
            sx={{
              minWidth: 100,
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.3)",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            <MenuItem value="all">Patient Type</MenuItem>
            <MenuItem value="rpm">RPM</MenuItem>
            <MenuItem value="ccm">CCM</MenuItem>
          </Select>

          {/* Add Button */}
          <Button
            variant="contained"
            startIcon={<PersonAdd />}
            onClick={onAddPatient}
            sx={{
              backgroundColor: "black",
              color: "white",
              fontWeight: 600,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#333333",
              },
            }}
          >
            Add
          </Button>

          {/* Filter By Dropdown */}
          <Select
            size="small"
            defaultValue="all"
            sx={{
              minWidth: 100,
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "white",
              borderRadius: 1,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(255,255,255,0.3)",
              },
              "& .MuiSvgIcon-root": {
                color: "white",
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.3)",
              },
            }}
          >
            <MenuItem value="all">Filter By</MenuItem>
            <MenuItem value="option1">Option 1</MenuItem>
            <MenuItem value="option2">Option 2</MenuItem>
          </Select>
          {/* Refresh Icon Button */}
          <Button
            variant="contained"
            onClick={onRefresh}
            aria-label="Refresh patient data"
            sx={{
              minWidth: "auto",
              padding: "6px 12px",
              backgroundColor: "#4caf50",
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#45a049",
              },
            }}
          >
            <Refresh />
          </Button>
          {/* Download Icon Button */}
          <Button
            variant="contained"
            onClick={onDownload}
            aria-label="Download patient data"
            sx={{
              minWidth: "auto",
              padding: "6px 12px",
              backgroundColor: "#0099ff",
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#008cff",
              },
            }}
          >
            <Download />
          </Button>
        </Box>
      )}

      {/* Mobile - Right Side Icons */}
      {isMobile && (
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            onClick={onRefresh}
            aria-label="Refresh patient data"
            sx={{
              backgroundColor: "#4caf50",
              color: "white",
              padding: "8px",
              "&:hover": {
                backgroundColor: "#45a049",
              },
            }}
          >
            <Refresh fontSize="small" />
          </IconButton>
          <IconButton
            onClick={onDownload}
            aria-label="Download patient data"
            sx={{
              backgroundColor: "#ff9800",
              color: "white",
              padding: "8px",
              "&:hover": {
                backgroundColor: "#e68900",
              },
            }}
          >
            <Download fontSize="small" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
};

export default PatientsNavbar;
