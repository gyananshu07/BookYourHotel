import "./app.css";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/user/home/Home";
import List from "./pages/user/list/List";
import Hotel from "./pages/user/hotel/Hotel";
import LoginUser from "./pages/user/login/login";
import Register from "./components/user/registrationForm/register";

import { userInputs } from "./formSource";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";

import HomeAdmin from "./pages/admin/home/Home";
import LoginAdmin from "./pages/admin/login/login";
import ListAdmin from "./pages/admin/list/list";
import NewUserAdmin from "./pages/admin/new user/newUser";
import NewHotelAdmin from "./pages/admin/new hotels/newHotel";
import NewRoomAdmin from "./pages/admin/new rooms/newRoom";
import SingleAdmin from "./pages/admin/singleUser/single";
import SingleHotelAdmin from "./pages/admin/singleHotel/singleHotel";
import SingleRoomAdmin from "./pages/admin/singleRoom/singleRoom";
import EditUserAdmin from "./pages/admin/editUser/editUser";

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<List />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin">
            <Route path="login" element={<LoginAdmin />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <HomeAdmin />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route index element={<ListAdmin columns={userColumns} />} />
              <Route
                path=":usersId"
                element={
                  <ProtectedRoute>
                    <SingleAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewUserAdmin inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:userId"
                element={
                  <ProtectedRoute>
                    <EditUserAdmin inputs={userInputs} title="Edit User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route index element={<ListAdmin columns={hotelColumns} />} />
              <Route
                path=":hotelsId"
                element={
                  <ProtectedRoute>
                    <SingleHotelAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotelAdmin title="Add New Hotels" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:hotelId"
                element={
                  <ProtectedRoute>
                    <EditUserAdmin inputs={userInputs} title="Edit User" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:hotelId"
                element={
                  <ProtectedRoute>
                    <EditUserAdmin title="Edit Hotel" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route index element={<ListAdmin columns={roomColumns} />} />
              <Route
                path=":roomsId"
                element={
                  <ProtectedRoute>
                    <SingleRoomAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoomAdmin title="Add New Rooms" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="edit/:roomId"
                element={
                  <ProtectedRoute>
                    <EditUserAdmin title="Edit Room" />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
