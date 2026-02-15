"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

interface PricingState {
  compute: "basic" | "gpu";
  tokens: string;
  addons: {
    vectorDb: boolean;
    storage: boolean;
  };
}

const PRICING = {
  compute: {
    basic: { price: 29, label: "Basic", specs: "2 vCPU, 4GB RAM" },
    gpu: { price: 199, label: "GPU", specs: "1x NVIDIA T4, 16GB VRAM" },
  },
  tokens: {
    "100k": { price: 0, label: "100K tokens", included: true },
    "1m": { price: 49, label: "1M tokens" },
    "10m": { price: 399, label: "10M tokens" },
  },
  addons: {
    vectorDb: { price: 25, label: "Vector Database" },
    storage: { price: 10, label: "Additional Storage (100GB)" },
  },
};

const FEATURES: Array<{
  feature: string;
  basic: string | false;
  gpu: string | false;
  enterprise: string;
}> = [
  { feature: "Compute", basic: "2 vCPU", gpu: "4 vCPU", enterprise: "Custom" },
  { feature: "Memory", basic: "4GB RAM", gpu: "16GB RAM", enterprise: "Custom" },
  { feature: "GPU", basic: false, gpu: "1x NVIDIA T4", enterprise: "Custom" },
  { feature: "Token Limit", basic: "100K/mo", gpu: "10M/mo", enterprise: "Unlimited" },
  { feature: "API Calls", basic: "10K/mo", gpu: "1M/mo", enterprise: "Unlimited" },
  { feature: "Support", basic: "Community", gpu: "Priority", enterprise: "Dedicated" },
  { feature: "Uptime", basic: "99.5%", gpu: "99.9%", enterprise: "99.99%" },
];

export default function Home() {
  const [pricing, setPricing] = useState<PricingState>({
    compute: "basic",
    tokens: "100k",
    addons: { vectorDb: false, storage: false },
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    plan: "basic",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const total =
    PRICING.compute[pricing.compute].price +
    PRICING.tokens[pricing.tokens as keyof typeof PRICING.tokens].price +
    (pricing.addons.vectorDb ? PRICING.addons.vectorDb.price : 0) +
    (pricing.addons.storage ? PRICING.addons.storage.price : 0);

  const handleComputeChange = (value: "basic" | "gpu") => {
    setPricing((prev) => ({ ...prev, compute: value }));
  };

  const handleTokensChange = (value: string) => {
    setPricing((prev) => ({ ...prev, tokens: value }));
  };

  const handleAddonChange = (addon: "vectorDb" | "storage") => {
    setPricing((prev) => ({
      ...prev,
      addons: { ...prev.addons, [addon]: !prev.addons[addon] },
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 3000);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <a href="#" className={styles.logo}>
            <span className={styles.logoGradient}>AgentCloud</span>
          </a>
          <nav className={styles.nav}>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#pricing" className={styles.navLink}>Pricing</a>
            <a href="#signup" className={styles.navLink}>Get Started</a>
          </nav>
          <a href="#signup" className={styles.headerCta}>Get Started</a>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOrbs}>
          <div className={styles.orb1}></div>
          <div className={styles.orb2}></div>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            AI Infrastructure<br />
            <span className={styles.heroTitleGradient}>for Developers</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Build, deploy, and scale your AI agents with enterprise-grade infrastructure.
            Pay only for what you use.
          </p>
          <div className={styles.heroButtons}>
            <a href="#signup" className={styles.btnPrimary}>Start Free Trial</a>
            <a href="#pricing" className={styles.btnOutline}>View Pricing</a>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section id="pricing" className={styles.pricing}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Pricing Calculator</h2>
          <p className={styles.sectionSubtitle}>
            Configure your infrastructure and see estimated costs in real-time
          </p>

          <div className={styles.calculator}>
            <div className={styles.calculatorLeft}>
              {/* Compute Selection */}
              <div className={styles.calcSection}>
                <h3 className={styles.calcLabel}>Select Compute</h3>
                <div className={styles.computeOptions}>
                  <button
                    className={`${styles.computeOption} ${pricing.compute === "basic" ? styles.active : ""}`}
                    onClick={() => handleComputeChange("basic")}
                  >
                    <div className={styles.computeHeader}>
                      <span className={styles.computeName}>Basic</span>
                      <span className={styles.computePrice}>$29/mo</span>
                    </div>
                    <span className={styles.computeSpecs}>2 vCPU, 4GB RAM</span>
                  </button>
                  <button
                    className={`${styles.computeOption} ${pricing.compute === "gpu" ? styles.active : ""}`}
                    onClick={() => handleComputeChange("gpu")}
                  >
                    <div className={styles.computeHeader}>
                      <span className={styles.computeName}>GPU</span>
                      <span className={styles.computePrice}>$199/mo</span>
                    </div>
                    <span className={styles.computeSpecs}>1x NVIDIA T4, 16GB VRAM</span>
                  </button>
                </div>
              </div>

              {/* Tokens Selection */}
              <div className={styles.calcSection}>
                <h3 className={styles.calcLabel}>Tokens Included</h3>
                <select
                  className={styles.tokenSelect}
                  value={pricing.tokens}
                  onChange={(e) => handleTokensChange(e.target.value)}
                >
                  <option value="100k">100K tokens (included)</option>
                  <option value="1m">1M tokens (+$49/mo)</option>
                  <option value="10m">10M tokens (+$399/mo)</option>
                </select>
              </div>

              {/* Add-ons */}
              <div className={styles.calcSection}>
                <h3 className={styles.calcLabel}>Add-ons</h3>
                <div className={styles.addons}>
                  <label className={`${styles.addon} ${pricing.addons.vectorDb ? styles.active : ""}`}>
                    <input
                      type="checkbox"
                      checked={pricing.addons.vectorDb}
                      onChange={() => handleAddonChange("vectorDb")}
                    />
                    <span className={styles.addonCheck}>
                      {pricing.addons.vectorDb && "✓"}
                    </span>
                    <span className={styles.addonInfo}>
                      <span className={styles.addonName}>Vector Database</span>
                      <span className={styles.addonPrice}>+$25/mo</span>
                    </span>
                  </label>
                  <label className={`${styles.addon} ${pricing.addons.storage ? styles.active : ""}`}>
                    <input
                      type="checkbox"
                      checked={pricing.addons.storage}
                      onChange={() => handleAddonChange("storage")}
                    />
                    <span className={styles.addonCheck}>
                      {pricing.addons.storage && "✓"}
                    </span>
                    <span className={styles.addonInfo}>
                      <span className={styles.addonName}>Additional Storage (100GB)</span>
                      <span className={styles.addonPrice}>+$10/mo</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Total Display */}
            <div className={styles.calculatorRight}>
              <div className={styles.totalCard}>
                <h3 className={styles.totalLabel}>Estimated Monthly Cost</h3>
                <div className={styles.totalPrice}>
                  <span className={styles.currency}>$</span>
                  <span className={styles.amount}>{total}</span>
                  <span className={styles.period}>/mo</span>
                </div>
                <div className={styles.totalBreakdown}>
                  <div className={styles.breakdownRow}>
                    <span>Compute ({PRICING.compute[pricing.compute].label})</span>
                    <span>${PRICING.compute[pricing.compute].price}</span>
                  </div>
                  <div className={styles.breakdownRow}>
                    <span>{PRICING.tokens[pricing.tokens as keyof typeof PRICING.tokens].label}</span>
                    <span>${PRICING.tokens[pricing.tokens as keyof typeof PRICING.tokens].price}</span>
                  </div>
                  {pricing.addons.vectorDb && (
                    <div className={styles.breakdownRow}>
                      <span>Vector Database</span>
                      <span>$25</span>
                    </div>
                  )}
                  {pricing.addons.storage && (
                    <div className={styles.breakdownRow}>
                      <span>Additional Storage</span>
                      <span>$10</span>
                    </div>
                  )}
                </div>
                <a href="#signup" className={styles.btnPrimary + " " + styles.fullWidth}>
                  Start Building
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionContainer}>
          <h2 className={styles.sectionTitle}>Compare Plans</h2>
          <p className={styles.sectionSubtitle}>
            Choose the right plan for your needs
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.featureTable}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Basic</th>
                  <th className={styles.highlightCol}>GPU</th>
                  <th>Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {FEATURES.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.feature}</td>
                    <td>{row.basic === false ? "—" : row.basic}</td>
                    <td className={styles.highlightCol}>
                      {row.gpu === false ? "—" : row.gpu}
                    </td>
                    <td>{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section id="signup" className={styles.signup}>
        <div className={styles.sectionContainer}>
          <div className={styles.signupCard}>
            <h2 className={styles.sectionTitle}>Get Started</h2>
            <p className={styles.sectionSubtitle}>
              Create your account and start building
            </p>

            {formSubmitted ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h3>Account Created!</h3>
                <p>Welcome to AgentCloud. Check your email for next steps.</p>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={formErrors.name ? styles.inputError : ""}
                    placeholder="John Doe"
                  />
                  {formErrors.name && <span className={styles.errorText}>{formErrors.name}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={formErrors.email ? styles.inputError : ""}
                    placeholder="john@company.com"
                  />
                  {formErrors.email && <span className={styles.errorText}>{formErrors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="company">Company (optional)</label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Inc."
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="plan">Plan Preference</label>
                  <select
                    id="plan"
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                  >
                    <option value="basic">Basic - $29/mo</option>
                    <option value="gpu">GPU - $199/mo</option>
                    <option value="enterprise">Enterprise - Contact Us</option>
                  </select>
                </div>

                <button type="submit" className={styles.btnPrimary + " " + styles.submitBtn}>
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <p className={styles.copyright}>© 2026 AgentCloud. All rights reserved.</p>
          <div className={styles.footerLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
