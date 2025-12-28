import { Link } from "react-router";
import { FiHome, FiAlertTriangle } from "react-icons/fi";
import Container from "./components/ui/Container";

function NotFound() {
  return (
    <div className="flex w-full items-center justify-center bg-bg-page py-20 mt-16">
      <Container className="text-center">
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-bg-subtle shadow-inner">
          <FiAlertTriangle className="h-10 w-10 text-brand-accent opacity-90" />
        </div>
        <h1 className="mb-2 font-heading text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-brand-primary to-brand-accent sm:text-9xl">
          404
        </h1>
        <h2 className="mb-4 font-heading text-2xl font-bold text-text-main sm:text-3xl">
          Page not found
        </h2>
        <p className="mx-auto mb-10 max-w-md font-body text-base leading-relaxed text-text-body">
          Oops! The page you are looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="
            inline-flex items-center gap-2
            rounded-xl bg-brand-primary px-8 py-3.5
            font-body text-sm font-medium text-text-inverse
            shadow-lg shadow-brand-primary/25
            transition-all duration-300
            hover:bg-brand-hover hover:-translate-y-1 hover:shadow-xl
            active:scale-95
            focus:ring-4 focus:ring-brand-primary/20 outline-none
          "
        >
          <FiHome className="text-lg" />
          Go back home
        </Link>
      </Container>
    </div>
  );
}

export default NotFound;