"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { montserrat } from "@/utils/fonts";
import ClientAppointment from "@/components/user/pages/showroom/clientappointment";
import { Provider } from "react-redux";
import store from "@/app/redux/store";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [showInquiryPopup, setShowInquiryPopup] = useState(false);
  const [showVisitPopup, setShowVisitPopup] = useState(false);
  const pathname = usePathname();
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current); // Cancel closing if user comes back
    setActiveDropdown(index);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      if (!isHoveringDropdown) setActiveDropdown(null);
    }, 300); // 300ms delay before closing
  };
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDropdownToggle = (index: number) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };
  const navItems = [
    {
      title: "WHAT'S NEW",
      href: "/user/",
      submenu: [
        "Seminars",
        "Meeting",
        "Events",
        "Closed Deals",
        "Real Estate News",
        "Real Estate Tips",
        "On-Going Infrastructure",
        "Watch Videos",
      ],
    },
    {
      title: "PROPERTIES",
      href: "/user/property",
      submenu: [
        "New Project",
        "Pre-selling",
        "Ready for Occupancy",
        "Payment Channels",
      ],
    },
    {
      title: "OFFICES",
      href: "/user/office",
      submenu: ["For Lease", "For Rent", "For Sale"],
    },
    { title: "AGENT", href: "/user/agent", submenu: [] },
    {
      title: "CUSTOM SERVICES",
      href: "/user/service",
      submenu: ["Contact Us", "About Us", "Careers", "Privacy Policy"],
    },
    {
      title: "VISIT OUR SHOWROOM",
      href: "/user/property/all",
      submenu: [
        {
          label: "Schedule a Visit",
          href: "#",
          action: () => setShowVisitPopup(true),
        }, // ✅ Opens Visit popup
        {
          label: "Inquire a Property",
          href: "#",
          action: () => setShowInquiryPopup(true),
        }, // ✅ Opens Inquiry popup
      ],
    },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black shadow-md" : "bg-black"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 py-3">
          {/* ✅ Logo */}
          <div className="flex-shrink-0 w-32 sm:w-36 md:w-48">
            <Link href="/user">
              <Image
                src="/logo/megaworld-white.png"
                alt="MegaWorld Logo"
                width={200}
                height={50}
                priority
                className="w-full h-auto"
              />
            </Link>
          </div>

          {/* ✅ Desktop Navigation for medium screens and above */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <div key={index} className="relative group">
                {/* Menu Item */}
                <div
                  className="flex flex-col"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  <NavLink href={item.href} active={pathname === item.href}>
                    {item.title}
                  </NavLink>

                  {/* ✅ Dropdown Menu */}
                  {item.submenu.length > 0 && activeDropdown === index && (
                    <div
                      className="absolute top-full left-0 mt-1 w-56 bg-white shadow-lg rounded-lg border border-gray-200 transition-all duration-300 ease-in-out z-50 opacity-0 group-hover:opacity-100 group-hover:block"
                      onMouseEnter={() => setIsHoveringDropdown(true)}
                      onMouseLeave={() => {
                        setIsHoveringDropdown(false);
                        setActiveDropdown(null);
                      }}
                    >
                      {item.submenu.map((subItem, subIndex) =>
                        typeof subItem === "string" ? (
                          <Link
                            key={subIndex}
                            href={`${item.href}/${subItem
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            className="block px-5 py-3 text-gray-700 font-medium hover:bg-[#B8986E] hover:text-white transition-all duration-200 rounded-md"
                          >
                            {subItem}
                          </Link>
                        ) : (
                          <button
                            key={subIndex}
                            onClick={subItem.action}
                            className="block w-full text-left px-5 py-3 text-gray-700 font-medium hover:bg-[#B8986E] hover:text-white transition-all duration-200 rounded-md"
                          >
                            {subItem.label}
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </nav>

          {/* ✅ Hamburger Menu (Visible for Tablet and Below) */}
          <button
            className="lg:hidden text-xl text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* ✅ Mobile Navigation (Tablet and Below) */}
        {isOpen && (
          <nav className="lg:hidden flex flex-col bg-black text-white w-full px-6 py-3 absolute left-0 top-full transition-all duration-300 z-40">
            {navItems.map((item, index) => (
              <div key={index} className="relative w-full">
                <div className="flex justify-between items-center w-full">
                  {/* ✅ Clicking the Title Navigates */}
                  <Link
                    href={item.href}
                    className="block px-4 py-2 text-white hover:text-[#B8986E]"
                  >
                    {item.title}
                  </Link>

                  {/* ✅ Clicking the Arrow Toggles Dropdown */}
                  {item.submenu.length > 0 && (
                    <button
                      onClick={() => handleDropdownToggle(index)}
                      className="text-white hover:text-[#B8986E] focus:outline-none px-2"
                    >
                      {activeDropdown === index ? "▲" : "▼"}
                    </button>
                  )}
                </div>

                {/* ✅ Mobile Dropdown Menu */}
                {item.submenu.length > 0 && activeDropdown === index && (
                  <div className="flex flex-col bg-white text-black border border-gray-300 rounded-md mt-1 overflow-hidden">
                    {item.submenu.map((subItem, subIndex) =>
                      typeof subItem === "string" ? (
                        <Link
                          key={subIndex}
                          href={`${item.href}/${subItem
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-[#B8986E] hover:text-white transition-all"
                        >
                          {subItem}
                        </Link>
                      ) : (
                        <button
                          key={subIndex}
                          onClick={subItem.action}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-[#B8986E] hover:text-white transition-all"
                        >
                          {subItem.label}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        )}
      </header>

      <Provider store={store}>
        {showInquiryPopup && (
          <ClientAppointment
            type="Inquiry"
            onClose={() => setShowInquiryPopup(false)}
          />
        )}
        {showVisitPopup && (
          <ClientAppointment
            type="Visit"
            onClose={() => setShowVisitPopup(false)}
          />
        )}
      </Provider>
    </>
  );
}
function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 transition-colors duration-300 text-sm ${
        active ? "text-[#B8986E]" : "text-white"
      } hover:text-[#B8986E]`}
    >
      {children}
    </Link>
  );
}
