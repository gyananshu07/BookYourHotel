export const userColumns = [
  {
    field: "user",
    headerName: "User",
    width: 260,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.profileImage ||
              "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 260,
  },
  {
    field: "country",
    headerName: "Country",
    width: 140,
  },
  {
    field: "city",
    headerName: "City",
    width: 130,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Title",
    width: 282,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 250,
  },
  {
    field: "price",
    headerName: "Price",
    width: 120,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 120,
  },
];
