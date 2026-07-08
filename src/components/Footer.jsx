import SocialLinks from "./SocialLinks";

// Kept separate from NavBar's list on purpose — NavBar uses tech-file
// styled labels (aboutme.html etc.), but a footer with the same joke
// twice on one page would feel repetitive, so this uses plain labels.
const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink border-t border-line px-6 py-12">
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center gap-6">
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {quickLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="font-mono text-sm text-slate hover:text-amber
                         transition-colors duration-300 focus:outline-none
                         focus-visible:ring-2 focus-visible:ring-amber rounded-sm"
            >
              {label}
            </a>
          ))}
        </nav>

        <SocialLinks />



        <p className="font-mono text-xs text-slate">
          © {year} Aarush Gaikwad. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;