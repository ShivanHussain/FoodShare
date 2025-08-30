import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:4000/api/v1/admin";

// ---------------- USER + NGO ----------------

// 1. Get all users
export const fetchAllUsers = createAsyncThunk(
  "admin/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/users`, {
        withCredentials: true,
      });
      return res.data.users;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch users";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 2. Get all NGOs
export const fetchAllNgos = createAsyncThunk(
  "admin/fetchAllNgos",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/ngos`, {
        withCredentials: true,
      });
      return res.data.ngos;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch NGOs";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 3. Get single user/ngo by ID
export const fetchUserById = createAsyncThunk(
  "admin/fetchUserById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/${id}`, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch user";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 4. Delete user/ngo by ID
export const deleteUserById = createAsyncThunk(
  "admin/deleteUserById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/users/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message || "User deleted successfully");
      return id; // return deleted user id
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete user";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 5. Update user/ngo role
export const updateUserRole = createAsyncThunk(
  "admin/updateUserRole",
  async ({ id, role }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/users/${id}/role`,
        { role },
        { withCredentials: true }
      );
      toast.success(res.data.message || "User role updated successfully");
      return res.data.user;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update role";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


// 3. Get single user/ngo by ID (with populated details)
export const fetchUserByIdWithDetails = createAsyncThunk(
  "admin/fetchUserByIdWithDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/users/details/${id}`, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch user details";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);



// Update user/ngo verified status
export const updateVerifiedStatus = createAsyncThunk(
  "admin/updateVerifiedStatus",
  async ({ id, isVerified }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${BASE_URL}/users/${id}/verify`,
        { isVerified },
        { withCredentials: true }
      );
      toast.success(res.data.message || "Verification status updated");
      return res.data.user; // updated user/ngo
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to update verification status";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);



// ---------------- DONATION ----------------

// 6. Get all donations
export const fetchAllDonations = createAsyncThunk(
  "admin/fetchAllDonations",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/donations`, {
        withCredentials: true,
      });
      return res.data.donations;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to fetch donations";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 7. Get donation by ID  not used currently
export const fetchDonationById = createAsyncThunk(
  "admin/fetchDonationById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/donations/details/${id}`, {
        withCredentials: true,
      });
      return res.data.donation;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch donation";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 8. Delete donation by ID
export const deleteDonationById = createAsyncThunk(
  "admin/deleteDonationById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/donations/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message || "Donation deleted successfully");
      return id;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to delete donation";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 9. Update donation status & expiry date
export const updateDonationStatus = createAsyncThunk(
  "admin/updateDonationStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${BASE_URL}/donations/${id}`,
        { status },
        { withCredentials: true }
      );
      toast.success(res.data.message || "Donation updated successfully");
      return res.data.donation;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to update donation";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


// 10. Get all feedbacks
export const fetchAllFeedbacks = createAsyncThunk(
  "admin/fetchAllFeedbacks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/feedbacks`, {
        withCredentials: true,
      });
      return res.data.feedbacks;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch feedbacks";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


// 11. Get all contacts
export const fetchAllContacts = createAsyncThunk(
  "admin/fetchAllContacts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/contact-messages`, {
        withCredentials: true,
      });
      return res.data.contacts;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch contacts";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 12. Get all newsletters
export const fetchAllNewsletters = createAsyncThunk(
  "admin/fetchAllNewsletters",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/newsletters`, {
        withCredentials: true,
      });
      return res.data.newsletters;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to fetch newsletters";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);



// ---------------- SLICE ----------------
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    ngos: [],
    donations: [],
    feedbacks: [],
    contacts: [],
    newsletters: [],
    selectedUser: null,
    selectedDonation: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearAdminState(state) {
      state.users = [];
      state.ngos = [];
      state.donations = [];
      state.feedbacks = [];
      state.contacts = [];
      state.newsletters = [];
      state.selectedUser = null;
      state.selectedDonation = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchAllUsers
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchAllNgos
      .addCase(fetchAllNgos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllNgos.fulfilled, (state, action) => {
        state.loading = false;
        state.ngos = action.payload;
      })
      .addCase(fetchAllNgos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchUserById
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteUserById
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((u) => u._id !== action.payload);
        state.ngos = state.ngos.filter((n) => n._id !== action.payload);
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchUserByIdWithDetails
      .addCase(fetchUserByIdWithDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByIdWithDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload; // user with populated data
      })
      .addCase(fetchUserByIdWithDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateUserRole
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false;
        // Update user or NGO role in state
        const updatedUser = action.payload;
        state.users = state.users.map((u) =>
          u._id === updatedUser._id ? updatedUser : u
        );
        state.ngos = state.ngos.map((n) =>
          n._id === updatedUser._id ? updatedUser : n
        );
      })

      // fetchAllDonations
      .addCase(fetchAllDonations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllDonations.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = action.payload;
      })
      .addCase(fetchAllDonations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchDonationById
      .addCase(fetchDonationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDonationById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDonation = action.payload;
      })
      .addCase(fetchDonationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleteDonationById
      .addCase(deleteDonationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDonationById.fulfilled, (state, action) => {
        state.loading = false;
        state.donations = state.donations.filter(
          (d) => d._id !== action.payload
        );
      })
      .addCase(deleteDonationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // updateDonationStatus
      .addCase(updateDonationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDonation = action.payload;
        state.donations = state.donations.map((d) =>
          d._id === updatedDonation._id ? updatedDonation : d
        );
        if (
          state.selectedDonation &&
          state.selectedDonation._id === updatedDonation._id
        ) {
          state.selectedDonation = updatedDonation;
        }

      })

      // fetchAllFeedbacks
      .addCase(fetchAllFeedbacks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(fetchAllFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchAllContacts
      .addCase(fetchAllContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchAllNewsletters
      .addCase(fetchAllNewsletters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllNewsletters.fulfilled, (state, action) => {
        state.loading = false;
        state.newsletters = action.payload;
      })
      .addCase(fetchAllNewsletters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // updateVerifiedStatus
      .addCase(updateVerifiedStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateVerifiedStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;

        // update inside users
        state.users = state.users.map((u) =>
          u._id === updatedUser._id ? updatedUser : u
        );

        // update inside ngos
        state.ngos = state.ngos.map((n) =>
          n._id === updatedUser._id ? updatedUser : n
        );

        // update selectedUser (agar profile khula ho)
        if (state.selectedUser && state.selectedUser._id === updatedUser._id) {
          state.selectedUser = updatedUser;
        }
      })
      .addCase(updateVerifiedStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


  },

});

export const { clearAdminState } = adminSlice.actions;

export default adminSlice.reducer;
