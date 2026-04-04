"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { login } from "@/actions/auth";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setLoading(true);
    setError(null);
    const result = await login(data);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0A",
        padding: "1rem",
      }}
    >
      <div
        style={{
          background: "#1A1A1A",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          padding: "2.5rem",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "#D4AF37",
              borderRadius: "12px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            📷
          </div>
          <h1
            style={{
              color: "#fff",
              fontSize: "1.5rem",
              fontWeight: 700,
              fontFamily: "system-ui",
            }}
          >
            Aksway Admin
          </h1>
          <p style={{ color: "#A0A0A0", fontSize: "0.875rem", marginTop: "0.5rem" }}>
            Sign in to manage your website
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              style={{ display: "block", color: "#A0A0A0", fontSize: "0.875rem", marginBottom: "0.5rem" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder="admin@aksway.in"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "#242424",
                border: errors.email ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
            {errors.email && (
              <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              style={{ display: "block", color: "#A0A0A0", fontSize: "0.875rem", marginBottom: "0.5rem" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "#242424",
                border: errors.password ? "1px solid #ef4444" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "0.875rem",
                outline: "none",
              }}
            />
            {errors.password && (
              <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "0.25rem" }}>{errors.password.message}</p>
            )}
          </div>

          {/* Error message */}
          {error && (
            <div
              style={{
                padding: "0.75rem 1rem",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: "8px",
                color: "#ef4444",
                fontSize: "0.875rem",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.875rem",
              background: loading ? "#B8912F" : "#D4AF37",
              color: "#000",
              border: "none",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "0.9rem",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "0.5rem",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
