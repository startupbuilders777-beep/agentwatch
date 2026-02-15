import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <header className="px-8 py-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl">
              🦔
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">OpenClaw</h1>
              <p className="text-xs text-slate-400">Lite</p>
            </div>
          </div>
          <Link href="/dashboard" className="btn-primary">
            Go to Dashboard →
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-300 text-sm mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Now in Beta
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in stagger-1" style={{ opacity: 0 }}>
            <span className="gradient-text">Build AI Agents</span>
            <br />
            Without Code
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 animate-fade-in stagger-2" style={{ opacity: 0 }}>
            Create powerful automation workflows in minutes. No programming required. 
            Just describe what you want, and let your AI agents do the work.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-3" style={{ opacity: 0 }}>
            <Link href="/dashboard" className="btn-primary text-lg px-8 py-4">
              Get Started Free →
            </Link>
            <button className="btn-secondary text-lg px-8 py-4">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Everything you need to automate
          </h2>
          <p className="text-slate-400 text-center mb-16 max-w-xl mx-auto">
            Powerful features designed for non-technical users
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center animate-fade-in stagger-1" style={{ opacity: 0 }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl mx-auto mb-6">
                🎯
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Visual Builder</h3>
              <p className="text-slate-400">
                Design your agents with an intuitive visual interface. No code, no complexity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center animate-fade-in stagger-2" style={{ opacity: 0 }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-3xl mx-auto mb-6">
                📋
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Pre-built Templates</h3>
              <p className="text-slate-400">
                Start with ready-made templates for common workflows. Customize to your needs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center animate-fade-in stagger-3" style={{ opacity: 0 }}>
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-3xl mx-auto mb-6">
                🔗
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Connect Anything</h3>
              <p className="text-slate-400">
                Integrate with Email, Slack, Calendar, and more. Connect your favorite tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-8 py-20 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            How it works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Choose a Template</h3>
              <p className="text-slate-400 text-sm">Start from scratch or use a pre-built template</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Describe Your Task</h3>
              <p className="text-slate-400 text-sm">Simply tell your agent what to do in plain language</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Set Schedule</h3>
              <p className="text-slate-400 text-sm">Choose when and how often your agent runs</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Watch It Work</h3>
              <p className="text-slate-400 text-sm">Your agent handles tasks automatically</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to automate your workflow?
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Join thousands of users who are already building AI agents without code.
          </p>
          <Link href="/dashboard" className="btn-primary text-lg px-10 py-4 inline-block">
            Start Building Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span>🦔</span>
            <span>OpenClaw Lite</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 OpenClaw. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
