import useFetch from "../../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "/api/hotels?featured=true&limit=4"
  );

  console.log(data);
  return (
    <div className="fp container">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data.map((item, i) => {
            return (
              <div className="fpItem" key={item._id}>
                <img src={item.photos[0]} alt="" className="fpImg" />
                <span className="fpName">{data[i]?.name}</span>
                <span className="fpCity">{data[i]?.city}</span>
                <span className="fpPrice">{data[i]?.cheapestPrice}</span>
                <div className="fpRating">
                  <button>8.9</button>
                  <span>{data[i]?.description}</span>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
