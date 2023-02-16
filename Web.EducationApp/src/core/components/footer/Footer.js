const Footer = () => {
  return (
    <footer className="footer">
      <p>
              Copyright © {(new Date().getFullYear()) + " "}
        <a href="/" target="_blank">
          Education System
        </a>
        . All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
