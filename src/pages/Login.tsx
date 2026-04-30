import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Login = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") await login(email, password);
      else await signup(name, email, password);
      toast.success(`Welcome${mode === "signup" ? "" : " back"}!`);
      navigate("/");
    } catch {
      toast.error("Something went wrong");
    } finally { setLoading(false); }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="bg-card rounded-2xl shadow-card p-8">
        <h1 className="text-2xl font-bold text-gradient">{mode === "login" ? "Welcome back" : "Join GlowUp"}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {mode === "login" ? "Login to continue shopping" : "Create your account"}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <input
              required
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full h-11 px-4 rounded-lg bg-muted border border-transparent focus:bg-background focus:border-primary focus:outline-none"
            />
          )}
          <input
            required
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full h-11 px-4 rounded-lg bg-muted border border-transparent focus:bg-background focus:border-primary focus:outline-none"
          />
          <input
            required
            minLength={6}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full h-11 px-4 rounded-lg bg-muted border border-transparent focus:bg-background focus:border-primary focus:outline-none"
          />
          <Button type="submit" disabled={loading} className="w-full gradient-primary text-primary-foreground font-semibold">
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Sign Up"}
          </Button>
        </form>

        <p className="text-sm text-center mt-6 text-muted-foreground">
          {mode === "login" ? "New here?" : "Already a member?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-primary font-semibold hover:underline"
          >
            {mode === "login" ? "Create account" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
