import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

// Add or remove entries here — every other part of the site
// that shows social links should import this same list.
const links = [
  { label: "GitHub", href: "https://github.com/AarushGaikwad", icon: FiGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aarush-gaikwad-257797204/", icon: FiLinkedin },
  { label: "Email", href: "mailto:aarushgaikwad789@gmail.com", icon: FiMail },
];

const SocialLinks = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-slate hover:text-amber transition-colors duration-300
                     focus:outline-none focus-visible:ring-2 focus-visible:ring-amber
                     rounded-sm"
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
