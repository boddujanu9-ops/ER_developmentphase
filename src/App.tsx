import { Switch, Route, Router as WouterRouter, Link, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Queue from "./pages/Queue";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Result from "./pages/Result";

const queryClient = new QueryClient();

function Sidebar() {
  const [location] = useLocation();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/register", label: "Register Patient" },
    { href: "/queue", label: "Patient Queue" },
    { href: "/admin", label: "Admin Panel" },
    { href: "/about", label: "About System" },
    { href: "/contact", label: "Contact Support" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-title">ER TRIAGE</div>
      <nav>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={location === link.href ? "active" : ""}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/register" component={Register} />
      <Route path="/result" component={Result} />
      <Route path="/queue" component={Queue} />
      <Route path="/admin" component={Admin} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base="/">
        <div className="layout">
          <Sidebar />
          <Router />
        </div>
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;