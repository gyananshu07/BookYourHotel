import "./mailList.css";

const MailList = () => {
  return (
    <div className="mail container mx-auto text-center">
      <h1 className="mailTitle text-white">Save time, save money!</h1>
      <span className="mailDesc">
        Sign up and we'll send the best deals to you
      </span>
      <div className="mailInputContainer mx-auto text-center">
        <input type="text" placeholder="Your Email" />
        <button className="subscribe">Subscribe</button>
      </div>
    </div>
  );
};

export default MailList;
