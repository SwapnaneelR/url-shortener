import { FloatingNav } from "./ui/floating-navbar";

const Navbar = ( ) => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Dashboard", link: "/dashboard" },
  ];

  return (
    <div>
      <FloatingNav navItems={navItems} />
    </div>
  );
};

export default Navbar;