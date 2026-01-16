// src/pages/Patients.jsx

import { useState, useMemo, useEffect } from "react";
import { Box, Typography } from "@mui/material";

import PatientsNavbar from "../components/Navbar/PatientsNavbar";
import MobileSidebar from "../components/Navbar/MobileSidebar";
import PatientsTable from "../components/Table/PatientsTable";
import PatientFormModal from "../components/Modal/PatientFormModal";
import App from "../data/app";

import {
  fetchPatients,
  createPatient,
  updatePatient,
  deletePatient,
} from "../data/patientsMockData.js";

const Patients = () => {
  // ==============================
  // STATE
  // ==============================
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // add | edit
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Mobile sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ==============================
  // API FETCH
  // ==============================
  const loadPatients = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPatients();
      setPatients(data);
    } catch (err) {
      setError(err.message || "Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  // ==============================
  // SEARCH
  // ==============================
  const filteredPatients = useMemo(() => {
    if (!searchTerm.trim()) return patients;

    const searchLower = searchTerm.toLowerCase();
    const normalizedSearch = searchTerm.replace(/\D/g, "");

    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.provider.toLowerCase().includes(searchLower) ||
        (p.email || "").toLowerCase().includes(searchLower) ||
        p.phone.replace(/\D/g, "").includes(normalizedSearch)
    );
  }, [searchTerm, patients]);

  // ==============================
  // PAGINATION (client-side for now)
  // ==============================
  const paginatedPatients = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredPatients.slice(start, start + rowsPerPage);
  }, [filteredPatients, page, rowsPerPage]);

  // ==============================
  // HANDLERS
  // ==============================
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setPage(0);
    loadPatients();
  };

  const handleDownload = () => {
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

  // ==============================
  // MODAL
  // ==============================
  const handleAddPatient = () => {
    setModalMode("add");
    setSelectedPatient(null);
    setModalOpen(true);
  };

  const handleEditPatient = (patient) => {
    setModalMode("edit");
    setSelectedPatient(patient);
    setModalOpen(true);
  };

  const handleDeletePatient = async (patient) => {
    if (!window.confirm(`Delete ${patient.name}?`)) return;

    await deletePatient(patient.id);
    setPatients((prev) => prev.filter((p) => p.id !== patient.id));
  };

  const handleSavePatient = async (formData) => {
    if (modalMode === "add") {
      const payload = {
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

      const saved = await createPatient(payload);
      setPatients((prev) => [...prev, saved]);
    } else {
      const updated = {
        ...selectedPatient,
        name: `${formData.lastName}, ${formData.firstName}`,
        phone: formData.mobile || formData.phone,
        email: formData.email,
        provider: formData.provider,
      };

      await updatePatient(selectedPatient.id, updated);
      setPatients((prev) =>
        prev.map((p) => (p.id === selectedPatient.id ? updated : p))
      );
    }

    setModalOpen(false);
    setSelectedPatient(null);
  };

  // ==============================
  // MOBILE SIDEBAR
  // ==============================
  const handleMenuClick = () => setSidebarOpen(true);
  const handleSidebarClose = () => setSidebarOpen(false);

  // ==============================
  // RENDER STATES
  // ==============================
  if (loading) {
    return <Box p={3}>Loading patients…</Box>;
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // ==============================
  // UI
  // ==============================
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
      }}
    >
      <PatientsNavbar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onRefresh={handleRefresh}
        onDownload={handleDownload}
        onAddPatient={handleAddPatient}
        onMenuClick={handleMenuClick}
      />

      <MobileSidebar
        open={sidebarOpen}
        onClose={handleSidebarClose}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onAddPatient={handleAddPatient}
        onRefresh={handleRefresh}
        onDownload={handleDownload}
      />

      <Box sx={{ flexGrow: 1, p: { xs: 1, sm: 2, md: 3 } }}>
        <PatientsTable
          patients={paginatedPatients}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={filteredPatients.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onEditPatient={handleEditPatient}
          onDeletePatient={handleDeletePatient}
        />
      </Box>

      <PatientFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        patient={selectedPatient}
        onSave={handleSavePatient}
        mode={modalMode}
      />
    </Box>
  );
};

export default Patients;
