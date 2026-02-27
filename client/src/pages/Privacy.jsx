export default function Privacy() {
  return (
    <div className="space-y-6 max-w-2xl animate-slide-up">
      <h1 className="font-display font-bold text-2xl">Privacy Policy</h1>
      <div className="card p-6 prose prose-invert prose-sm max-w-none">
        <p className="text-agos-muted"><strong>Last updated:</strong> February 27, 2026</p>
        <h3 className="font-display text-agos-text">1. Information We Collect</h3>
        <p className="text-agos-muted">We collect: email address, display name, and gameplay data (games played, mood selections, XP/coin balances). We do not sell your data.</p>
        <h3 className="font-display text-agos-text">2. How We Use Your Data</h3>
        <p className="text-agos-muted">Your data is used to: provide personalized game recommendations, track progression, maintain faction leaderboards, and improve our AI algorithms.</p>
        <h3 className="font-display text-agos-text">3. Data Storage</h3>
        <p className="text-agos-muted">Data is stored in encrypted databases. Passwords are hashed using bcrypt. JWT tokens are used for authentication.</p>
        <h3 className="font-display text-agos-text">4. Your Rights</h3>
        <p className="text-agos-muted">You may request data deletion at any time by contacting us.</p>
        <h3 className="font-display text-agos-text">5. Cookies</h3>
        <p className="text-agos-muted">We use localStorage for authentication tokens and user preferences. No third-party tracking cookies.</p>
        <h3 className="font-display text-agos-text">6. Contact</h3>
        <p className="text-agos-muted">For privacy concerns, contact: privacy@agos.gg</p>
      </div>
    </div>
  );
}
