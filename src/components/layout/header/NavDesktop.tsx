import { NavLink } from "react-router";
import { routes } from "../../../constants/navigation";
import BadgeIcon from "./BadgeIcon";

function NavDesktop() {
  return (
    <nav>
      <ul className="hidden lg:flex items-center gap-2"> 
        {routes.map(({ Icon, href, title }) => {
          const isDisabled = title === "Notifications"; 

          return (
            <li key={title} className="h-full flex items-center">
              <NavLink
                to={isDisabled ? "#" : href}
                onClick={(e) => isDisabled && e.preventDefault()}
                className={({ isActive }) => `
                  group flex items-center gap-2 px-3 py-2 rounded-lg
                  font-body text-sm font-medium tracking-wide
                  transition-all duration-300 ease-in-out relative
                  ${isDisabled 
                    ? "opacity-50 cursor-not-allowed grayscale text-text-muted" 
                    : isActive
                        ? "text-brand-primary cursor-default" 
                        : "text-text-body hover:text-text-hover hover:bg-bg-interactive-hover cursor-pointer"
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <span className="text-lg relative z-10">
                      <BadgeIcon icon={Icon} title={title} />
                    </span>
                    <span className="hidden xl:block whitespace-nowrap relative z-10 text-md">
                      {title}
                    </span>
                    
                    {!isDisabled && (
                      <span 
                        className={`
                          absolute bottom-0 left-0 
                          h-0.5 w-full rounded-full
                          bg-brand-primary
                          origin-left transition-transform duration-300 ease-out
                          ${isActive ? "scale-x-100" : "scale-x-0"}
                        `}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavDesktop;