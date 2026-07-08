import { SiHtml5, SiJavascript, SiCss, SiJson } from "react-icons/si";

// Each nav item is styled like a filename, with its matching
// tech logo standing in for a "file type" icon.
const navItems = [
  { label: "aboutme.html", href: "#about", icon: SiHtml5 },
  { label: "skills.js", href: "#skills", icon: SiJavascript },
  { label: "project.css", href: "#projects", icon: SiCss },
  { label: "contact.json", href: "#contact", icon: SiJson },
];

const NavBar = () => {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-ink/60
                 backdrop-blur-md border-b border-line"
    >
      <nav
        className="container mx-auto px-6 h-16 flex items-center
                   justify-center sm:justify-start gap-2 sm:gap-6
                   overflow-x-auto"
      >
        {navItems.map(({ label, href, icon: Icon }) => (
          <a
            key={label}
            href={href}
            className="flex items-center gap-2 text-sm font-mono text-slate
                       hover:text-amber transition-colors duration-300
                       whitespace-nowrap focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-amber rounded-sm px-1"
          >
            <Icon className="w-4 h-4" aria-hidden="true" />
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default NavBar;