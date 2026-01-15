// src/components/Modal/PatientFormModal.jsx

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Grid,
  IconButton,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";

const PatientFormModal = ({ open, onClose, patient, onSave, mode = "add" }) => {
  // Form state
  const [formData, setFormData] = useState({
    patId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    race: "",
    provider: "",
    consent: "",
    patientType: "",
    chronicConditions: "",
    home: "",
    mobile: "",
    active: true,
    alerts: false,
    photo: null,
  });

  // Initialize form with patient data in edit mode
  useEffect(() => {
    if (patient && mode === "edit") {
      const nameParts = patient.name
        ? patient.name.split(",").map((n) => n.trim())
        : ["", ""];
      const firstNameFromSplit = nameParts[0] || "";
      const lastNameFromSplit = nameParts[1] || "";
      setFormData({
        patId: patient.patId || "",
        firstName: lastNameFromSplit,
        lastName: firstNameFromSplit,
        email: patient.email || "",
        phone: patient.phone || "",
        gender: patient.gender || "",
        dateOfBirth: patient.dateOfBirth || "",
        address: patient.address || "",
        zipCode: patient.zipCode || "",
        city: patient.city || "",
        state: patient.state || "",
        race: patient.race || "",
        provider: patient.provider || "",
        consent: patient.consent || "",
        patientType: patient.patientType || "",
        chronicConditions: patient.chronicConditions || "",
        home: patient.home || "",
        mobile: patient.mobile || "",
        active: patient.active ?? true,
        alerts: patient.alerts ?? false,
        photo: patient.photo || null,
      });
    } else if (mode === "add") {
      // Reset form for add mode
      setFormData({
        patId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        address: "",
        zipCode: "",
        city: "",
        state: "",
        race: "",
        provider: "",
        consent: "",
        patientType: "",
        chronicConditions: "",
        home: "",
        mobile: "",
        active: true,
        alerts: false,
        photo: null,
      });
    }
  }, [patient, mode, open]);

  const handleChange = useCallback(
    (field) => (event) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    },
    []
  );

  const handleSwitchChange = useCallback(
    (field) => (event) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.checked,
      }));
    },
    []
  );

  const handlePhotoUpload = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    onSave(formData);
    onClose();
  }, [formData, onSave, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "8px",
          maxHeight: "90vh",
        },
      }}
    >
      {/* DIALOG HEADER */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontWeight: 200,
          fontSize: "1rem",
          pb: 1,
          pb: 2,
          mb: 3,
          px: 3,
          backgroundColor: mode === "edit" ? "#0050a0" : "#0050a0",
          color: mode === "edit" ? "#fff" : "#ffffff",
        }}
      >
        {mode === "add" ? "Add Patient" : "Edit Patient"}
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: mode === "edit" ? "#fff" : "#ffffff",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      {/* DIALOG CONTENT */}
      <DialogContent sx={{ px: 3, pt: 3, pb: 2 }}>
        {/* MAIN LAYOUT: TWO COLUMNS WITH DIVIDER */}
        <Box sx={{ display: "flex", gap: 3 }}>
          {/* LEFT COLUMN */}
          <Box sx={{ flex: 1, pr: 1, borderRight: "0px solid #e0e0e0" }}>
            {/* Photo Upload */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1.5,
              }}
            >
              {/* User Icon / Avatar - Keep original */}
              <Avatar
                src={formData.photo}
                sx={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#e0e0e0",
                  border: "2px solid #ddd",
                }}
              />

              {/* File Upload Field - Smaller version */}
              <Box sx={{ flex: 1 }}>
                <fieldset
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "0.0rem 0.75rem",
                    height: "50px", // Match avatar height
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    margin: 0,
                  }}
                >
                  <legend
                    style={{
                      fontSize: "0.7rem",
                      color: "#555",
                      padding: "0 0.25rem",
                      fontWeight: 400,
                      marginLeft: "0.1px",
                    }}
                  >
                    Patient Photo
                  </legend>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    {/* Choose File Button */}
                    <Button
                      variant="outlined"
                      component="label"
                      size="small"
                      sx={{
                        textTransform: "none",
                        fontSize: "0.7rem",
                        py: 0.25,
                        px: 1.5,
                        borderColor: "#ccc",
                        color: "#555",
                        backgroundColor: "#fff",
                        minWidth: "100px",
                        height: "24px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        "&:hover": {
                          borderColor: "#999",
                          backgroundColor: "#f8f8f8",
                        },
                      }}
                    >
                      Choose File
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handlePhotoUpload}
                      />
                    </Button>

                    {/* File Status Text */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#999",
                        fontSize: "0.7rem",
                        fontStyle: "italic",
                        paddingleft: "9px",
                      }}
                    >
                      {formData.photo ? "Image selected" : "No file chosen"}
                    </Typography>
                  </Box>
                </fieldset>
              </Box>
            </Box>

            {/* Left Column Fields */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="First Name *"
                value={formData.firstName}
                onChange={handleChange("firstName")}
                size="small"
              />

              <FormControl fullWidth size="small">
                <InputLabel>Gender *</InputLabel>
                <Select
                  value={formData.gender}
                  onChange={handleChange("gender")}
                  label="Gender *"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              {mode === "edit" && (
                <TextField
                  fullWidth
                  label="Address *"
                  value={formData.address}
                  onChange={handleChange("address")}
                  size="small"
                />
              )}

              <TextField
                fullWidth
                label="Zip Code *"
                value={formData.zipCode}
                onChange={handleChange("zipCode")}
                size="small"
              />

              <FormControl fullWidth size="small">
                <InputLabel>Select State *</InputLabel>
                <Select
                  value={formData.state}
                  onChange={handleChange("state")}
                  label="Select State *"
                >
                  <MenuItem value="Texas">Texas</MenuItem>
                  <MenuItem value="California">California</MenuItem>
                  <MenuItem value="New York">New York</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: "flex", gap: 0.8, alignItems: "center" }}>
                <TextField
                  fullWidth
                  label="Select Service Provider *"
                  value={formData.provider}
                  onChange={handleChange("provider")}
                  size="small"
                />
                <IconButton
                  size="small"
                  sx={{
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #ddd",
                    width: 38,
                    height: 38,
                    flexShrink: 0,
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>

              <FormControl fullWidth size="small">
                <InputLabel>Patient Type *</InputLabel>
                <Select
                  value={formData.patientType}
                  onChange={handleChange("patientType")}
                  label="Patient Type *"
                >
                  <MenuItem value="RPM">RPM</MenuItem>
                  <MenuItem value="CCM">CCM</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Home"
                value={formData.home}
                onChange={handleChange("home")}
                size="small"
              />
            </Box>
          </Box>

          {/* RIGHT COLUMN */}
          <Box sx={{ flex: 1, pl: 2 }}>
            {/* Email Field at Top */}
            <Box sx={{ mb: 2.5 }}>
              <TextField
                fullWidth
                label="Email Address *"
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
                size="small"
              />
            </Box>

            {/* Right Column Fields */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Last Name *"
                value={formData.lastName}
                onChange={handleChange("lastName")}
                size="small"
              />

              <TextField
                fullWidth
                label="Date of Birth *"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange("dateOfBirth")}
                size="small"
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                fullWidth
                label="City *"
                value={formData.city}
                onChange={handleChange("city")}
                size="small"
              />

              <FormControl fullWidth size="small">
                <InputLabel>Race *</InputLabel>
                <Select
                  value={formData.race}
                  onChange={handleChange("race")}
                  label="Race *"
                >
                  <MenuItem value="Asian">Asian</MenuItem>
                  <MenuItem value="White">White</MenuItem>
                  <MenuItem value="Black">Black</MenuItem>
                  <MenuItem value="Other Race">Other Race</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Consent *</InputLabel>
                <Select
                  value={formData.consent}
                  onChange={handleChange("consent")}
                  label="Consent *"
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                  <MenuItem value="Not Specified">Not Specified</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Chronic Conditions *</InputLabel>
                <Select
                  value={formData.chronicConditions}
                  onChange={handleChange("chronicConditions")}
                  label="Chronic Conditions *"
                >
                  <MenuItem value="Diabetes">Diabetes</MenuItem>
                  <MenuItem value="Hypertension">Hypertension</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Mobile"
                value={formData.mobile}
                onChange={handleChange("mobile")}
                size="small"
              />
            </Box>
          </Box>
        </Box>

        {/* SPACER - removed old grid */}
        <Box sx={{ display: "none" }}>
          <Grid container spacing={2}></Grid>
        </Box>
      </DialogContent>
      {/* DIALOG FOOTER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 2,
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "#fafafa",
        }}
      >
        {/* Left: Toggles */}
        <Box sx={{ display: "flex", gap: 2.5, alignItems: "center" }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.active}
                onChange={handleSwitchChange("active")}
                size="small"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#767777",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#767777",
                  },
                }}
              />
            }
            label={
              <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                Active
              </span>
            }
            sx={{ m: 0 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.alerts}
                onChange={handleSwitchChange("alerts")}
                size="small"
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#767777",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#767777",
                  },
                }}
              />
            }
            label={
              <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                Alerts
              </span>
            }
            sx={{ m: 0 }}
          />
        </Box>

        {/* Right: Action Buttons */}
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            size="medium"
            sx={{
              fontSize: "0.8rem",
              px: 3,
              py: 0.8,
              textTransform: "uppercase",
              fontWeight: 600,
              borderColor: "#ccc",
              color: "#555",
              "&:hover": {
                borderColor: "#999",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            size="medium"
            sx={{
              fontSize: "0.8rem",
              px: 3,
              py: 0.8,
              textTransform: "uppercase",
              fontWeight: 600,
              backgroundColor: "#333",
              "&:hover": {
                backgroundColor: "#555",
              },
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default PatientFormModal;
