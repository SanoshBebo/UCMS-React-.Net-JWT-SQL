import React, { useEffect, useState } from "react";
import {
  CreateVenue,
  DeleteVenue,
  GetVenueList,
  UpdateVenue,
} from "../../api/Venue";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";

const VenuePage = () => {
  const [venues, setVenues] = useState([]);
  const [venueName, setVenueName] = useState("");
  const [editVenueName, setEditVenueName] = useState("");
  const [venueLocation, setVenueLocation] = useState("");
  const [editVenueLocation, setEditVenueLocation] = useState("");
  const [editVenueId, setEditVenueId] = useState("");
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] =
    useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const openAddProductModal = () => {
    setIsAddProductModalOpen(true);
  };

  const openUpdateProductModal = (venue) => {
    setEditVenueName(venue.VenueName);
    setEditVenueLocation(venue.VenueLocation);
    setEditVenueId(venue.VenueId);
    setIsUpdateProductModalOpen(true);
  };

  const openDeleteConfirmation = (venue) => {
    setSelectedVenue(venue);
    setIsDeleteConfirmationOpen(true);
  };

  const closeModal = () => {
    setIsAddProductModalOpen(false);
    setIsUpdateProductModalOpen(false);
    setIsDeleteConfirmationOpen(false);
  };

  const addVenue = () => {
    const venueInfo = {
      venueName: venueName,
      venueLocation: venueLocation,
      lectures: [],
      venuesBooking: [],
    };

    CreateVenue(venueInfo)
      .then((response) => {
        closeModal();
        setRefresh(!refresh);
        toast.success("Venue Added");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  const updateVenueDetails = () => {
    const venueInfo = {
      venueId: editVenueId,
      venueName: editVenueName,
      venueLocation: editVenueLocation,
      lectures: [],
      venuesBooking: [],
    };

    UpdateVenue(venueInfo, editVenueId)
      .then((response) => {
        closeModal();
        setRefresh(!refresh);
        toast.success("Venue Updated");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  const deleteVenue = () => {
    if (selectedVenue) {
      DeleteVenue(selectedVenue.venueId)
        .then((response) => {
          closeModal();
          setRefresh(!refresh);
          toast.success("Venue Deleted");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
  };

  useEffect(() => {
    GetVenueList()
      .then((response) => {
        console.log(response);
        setVenues(response);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [refresh]);

  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "80vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Typography variant="h4">Venues</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={openAddProductModal}
        >
          Add New Venue
        </Button>
      </div>
      <Grid container spacing={3}>
        {venues.map((venue) => (
          <Grid item xs={12} sm={6} md={4} key={venue.venueId}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {venue.VenueName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Location: {venue.VenueLocation}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => openUpdateProductModal(venue)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => openDeleteConfirmation(venue)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={isDeleteConfirmationOpen} onClose={closeModal}>
        <DialogTitle>Delete Venue</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the venue "
            {selectedVenue?.venueName}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={deleteVenue} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isAddProductModalOpen} onClose={closeModal}>
        <DialogTitle>Add New Venue</DialogTitle>
        <DialogContent>
          <TextField
            label="Venue Name"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            value={venueLocation}
            onChange={(e) => setVenueLocation(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={addVenue} color="primary">
            Add Venue
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isUpdateProductModalOpen} onClose={closeModal}>
        <DialogTitle>Edit Venue</DialogTitle>
        <DialogContent>
          <TextField
            label="Venue Name"
            value={editVenueName}
            onChange={(e) => setEditVenueName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Location"
            value={editVenueLocation}
            onChange={(e) => setEditVenueLocation(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={updateVenueDetails} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer position="top-right" autoClose={5000} />
    </Container>
  );
};

export default VenuePage;
