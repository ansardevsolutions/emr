// src/pages/Patients.jsx

import { useState, useMemo } from "react";
import { Box } from "@mui/material";
import PatientsNavbar from "../components/Navbar/PatientsNavbar";
import MobileSidebar from "../components/Navbar/MobileSidebar";
import PatientsTable from "../components/Table/PatientsTable";
import PatientFormModal from "../components/Modal/PatientFormModal";
import { patientsMockData, TOTAL_PATIENTS } from "../data/patientsMockData";

const Patients = () => {
  // STATE MANAGEMENT
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [patients, setPatients] = useState(patientsMockData);

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mobile sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // SEARCH FUNCTIONALITY
  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) {
      return patients;
    }

    const searchLower = searchTerm.toLowerCase();
    const normalizedSearch = searchTerm.replace(/\D/g, "");
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(searchLower) ||
        patient.phone.replace(/\D/g, "").includes(normalizedSearch) ||
        patient.provider.toLowerCase().includes(searchLower) ||
        (patient.email || "").toLowerCase().includes(searchLower)
    );
  }, [searchTerm, patients]);

  // PAGINATION LOGIC
  const paginatedPatients = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredPatients.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredPatients, page, rowsPerPage]);

  // EVENT HANDLERS
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRefresh = () => {
    console.log("Refreshing patient data...");
    setSearchTerm("");
    setPage(0);
    // In real app: refetch from API
  };

  const handleDownload = () => {
    console.log("Downloading patient data...");

    const headers = [
      "PatID",
      "Name",
      "Phone",
      "Email",
      "Provider",
      "Device Added",
      "First Reading",
    ];
    const csvContent = [
      headers.join(","),
      ...patients.map(
        (p) =>
          `${p.patId},"${p.name}",${p.phone},"${p.email}","${p.provider}",${p.deviceAdded},${p.firstReading}`
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `patients_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  // MODAL HANDLERS
  const handleAddPatient = () => {
    setModalMode("add");
    setSelectedPatient(null);
    setModalOpen(true);
  };

  const handleEditPatient = (patient) => {
    console.log("Editing patient:", patient);
    setModalMode("edit");
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const handleViewPatient = (patient) => {
    console.log("Viewing patient:", patient);
    // Could open a different modal or navigate to detail page
  };

  const handleDeletePatient = (patient) => {
    console.log("Deleting patient:", patient);
    if (window.confirm(`Are you sure you want to delete ${patient.name}?`)) {
      setPatients(patients.filter((p) => p.id !== patient.id));
    }
  };

  const handleSavePatient = (formData) => {
    if (modalMode === "add") {
      // Add new patient
      const newPatient = {
        id: patients.length + 1,
        patId: Math.floor(Math.random() * 1000),
        name: `${formData.lastName}, ${formData.firstName}`,
        phone: formData.mobile || formData.phone,
        email: formData.email,
        provider: formData.provider,
        deviceAdded: new Date().toISOString().split("T")[0],
        firstReading: new Date().toISOString().split("T")[0],
        rpmCommTime: "0s",
        readingsCount: 0,
      };
      setPatients([...patients, newPatient]);
      console.log("Added new patient:", newPatient);
    } else {
      // Update existing patient
      setPatients(
        patients.map((p) =>
          p.id === selectedPatient.id
            ? {
                ...p,
                name: `${formData.lastName}, ${formData.firstName}`,
                phone: formData.mobile || formData.phone,
                email: formData.email,
                provider: formData.provider,
              }
            : p
        )
      );
      console.log("Updated patient:", selectedPatient.id);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedPatient(null);
  };

  // MOBILE SIDEBAR HANDLERS
  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      {/* NAVBAR */}
      <PatientsNavbar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onRefresh={handleRefresh}
        onDownload={handleDownload}
        onAddPatient={handleAddPatient}
        onMenuClick={handleMenuClick}
      />

      {/* MOBILE SIDEBAR */}
      <MobileSidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAddPatient={handleAddPatient}
        onRefresh={handleRefresh}
        onDownload={handleDownload}
      />

      {/* TABLE */}
      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: 1, sm: 2, md: 3 },
          overflow: "auto",
        }}
      >
        <PatientsTable
          patients={paginatedPatients}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={filteredPatients.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onViewPatient={handleViewPatient}
          onEditPatient={handleEditPatient}
          onDeletePatient={handleDeletePatient}
        />
      </Box>

      {/* PATIENT FORM MODAL */}
      <PatientFormModal
        open={modalOpen}
        onClose={handleModalClose}
        patient={selectedPatient}
        onSave={handleSavePatient}
        mode={modalMode}
      />
    </Box>
  );
};

export default Patients;
