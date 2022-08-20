import useFetch from "../../../hooks/useFetch";
import ReadMore from "../readmore/readmore";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const { data, loading } = useFetch("/api/hotels?featured=true&limit=4");

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
                <span className="fpPrice">₹ {data[i]?.cheapestPrice}</span>
                <div className="fpRating">
                  <button>{data[i]?.rating ? data[i].rating : 9.5}</button>
                  <span>
                    <ReadMore>{data[i]?.description}</ReadMore>
                  </span>
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
