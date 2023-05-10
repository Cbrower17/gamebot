import { Navbar, TextInput } from "flowbite-react";

export default function NavigationBar() {

  return(
  <Navbar fluid={true} rounded={true}>
    <Navbar.Brand href="https://flowbite.com/">
      <img
        src="gamespot-website-favicon-color.png"
        className="mr-6 h-10 sm:h-20"
        alt="Flowbite Logo"
      />
      <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        GameSpot
      </span>
    </Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Navbar.Link href="/home" active={true}>
        Home
      </Navbar.Link>
      <Navbar.Link href="/about">About</Navbar.Link>
      
    </Navbar.Collapse>
  </Navbar>
  );
}
