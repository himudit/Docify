import React, { useState } from 'react';
import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { protecx } from '../lib/protecx';
import { ProtecXError } from '@protecx/js';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setFieldErrors({});

        try {
            const session = await protecx.login({
                email: formData.email,
                password: formData.password,
            });

            console.log("Welcome back!", session.user);
            // Redirect to dashboard or home
            navigate('/');

        } catch (err) {
            console.error("Login error:", err);
            if (err instanceof ProtecXError) {
                // 1. Handle specific field errors (e.g., for form feedback)
                if (err.isValidationError()) {
                    setFieldErrors(err.getAllFieldErrors());
                }

                // 2. Handle global errors (e.g., for toasts/alerts)
                if (err.isGlobalError()) {
                    const globalErr = err.getErrors();
                    setError(typeof globalErr === 'string' ? globalErr : "Invalid email or password");
                }

                // Log the specific error code if needed (API_ERROR, RATE_LIMIT_ERROR, etc.)
                console.error(`Error Code: ${err.code}`);
            } else {
                // Handle generic network or unexpected errors
                setError("An unexpected error occurred. Please try again.");
                console.error("An unexpected error occurred", err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.logo}>Docify</div>
                    <h1 className={styles.title}>Welcome back</h1>
                    <p className={styles.subtitle}>Log in to your account to continue</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                    {error && (
                        <div className={styles.errorMessage}>
                            <svg className={styles.errorIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="email">Email Address</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            className={styles.input}
                            value={formData.email}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        {fieldErrors.email && <span className={styles.fieldError}>{fieldErrors.email}</span>}
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            className={styles.input}
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        {fieldErrors.password && <span className={styles.fieldError}>{fieldErrors.password}</span>}
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>

                <div className={styles.divider}>
                    <span>or continue with</span>
                </div>

                <div className={styles.socialButtons}>
                    <button className={styles.socialButton}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                        </svg>
                        GitHub
                    </button>
                    <button className={styles.socialButton}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google
                    </button>
                </div>

                <div className={styles.footer}>
                    Don't have an account?
                    <Link to="/signup" className={styles.link}>Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
