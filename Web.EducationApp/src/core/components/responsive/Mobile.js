const Mobile = ({ children, ...props }) => (
  <div className="d-lg-none" {...props}>
    {children}
  </div>
);

export default Mobile;
