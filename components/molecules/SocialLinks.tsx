import { GitHubIcon } from "@/components/atoms/GitHubIcon";
import { LinkedInIcon } from "@/components/atoms/LinkedInIcon";

const socialLinks = [
    {
        href: "https://github.com/akilasatolu/",
        label: "GitHub: akilasatolu",
        icon: "github",
    },
    {
        href: "https://www.linkedin.com/in/shogo-yoshizawa-70794a374",
        label: "LinkedIn",
        icon: "linkedin",
    },
] as const;

export const SocialLinks = () => {
    return (
        <ul className="flex list-none items-center gap-8">
            {socialLinks.map((link) => (
                <li key={link.href}>
                    <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.label}
                    >
                        {link.icon === "linkedin" ? (
                            <LinkedInIcon className="size-6" />
                        ) : (
                            <GitHubIcon className="size-6" />
                        )}
                    </a>
                </li>
            ))}
        </ul>
    );
};
