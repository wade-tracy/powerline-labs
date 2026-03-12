<script setup lang="ts">
useSeoMeta({
  title: 'Powerline Labs — Web & Mobile App Development',
  description:
    'Powerline Labs builds high-performance web and mobile applications for businesses ready to move fast. Modern tech, clean code, real results.',
  ogTitle: 'Powerline Labs — Web & Mobile App Development',
  ogDescription:
    'Powerline Labs builds high-performance web and mobile applications for businesses ready to move fast.',
  ogUrl: 'https://powerlinelabs.com',
})

// ── Nav ──────────────────────────────────────────────────────────────────────
const navOpen = ref(false)

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

function closeNav() {
  navOpen.value = false
}

// ── Contact form ──────────────────────────────────────────────────────────────
interface ContactForm {
  name: string
  email: string
  company: string
  message: string
}

const form = reactive<ContactForm>({
  name: '',
  email: '',
  company: '',
  message: '',
})

const formStatus = ref<'idle' | 'submitting' | 'success' | 'error'>('idle')
const formError = ref('')

async function submitForm() {
  formStatus.value = 'submitting'
  formError.value = ''

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form },
    })
    formStatus.value = 'success'
    form.name = ''
    form.email = ''
    form.company = ''
    form.message = ''
  } catch (err: unknown) {
    formStatus.value = 'error'
    formError.value =
      err instanceof Error ? err.message : 'Something went wrong. Please try again.'
  }
}
</script>

<template>
  <div class="min-h-screen bg-white text-slate-900">

    <!-- ── Navbar ──────────────────────────────────────────────────────────── -->
    <header class="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div class="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <!-- Logo -->
        <a href="#" class="flex items-center gap-2.5 group">
          <span class="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8L6 2L10 8L14 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L6 8L10 12L14 8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
            </svg>
          </span>
          <span class="font-bold text-slate-900 text-lg tracking-tight">Powerline Labs</span>
        </a>

        <!-- Desktop nav -->
        <nav class="hidden md:flex items-center gap-8">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            class="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >{{ link.label }}</a>
          <a
            href="#contact"
            class="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >Let's Talk</a>
        </nav>

        <!-- Mobile burger -->
        <button
          class="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          :aria-expanded="navOpen"
          aria-label="Toggle menu"
          @click="navOpen = !navOpen"
        >
          <svg v-if="!navOpen" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <rect y="3" width="20" height="2" rx="1"/>
            <rect y="9" width="20" height="2" rx="1"/>
            <rect y="15" width="20" height="2" rx="1"/>
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div v-if="navOpen" class="md:hidden border-t border-slate-100 bg-white px-6 py-4 flex flex-col gap-4">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm font-medium text-slate-700 py-1"
          @click="closeNav"
        >{{ link.label }}</a>
        <a
          href="#contact"
          class="text-sm font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white text-center"
          @click="closeNav"
        >Let's Talk</a>
      </div>
    </header>

    <!-- ── Hero ───────────────────────────────────────────────────────────── -->
    <section class="relative bg-slate-900 text-white pt-32 pb-28 overflow-hidden">
      <!-- Background grid pattern -->
      <div class="absolute inset-0 opacity-[0.04]" style="background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 40px 40px;"></div>
      <!-- Gradient orb -->
      <div class="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-20" style="background: radial-gradient(circle, #3B82F6, transparent 70%);"></div>
      <div class="absolute bottom-0 -left-16 w-[400px] h-[400px] rounded-full opacity-10" style="background: radial-gradient(circle, #6366F1, transparent 70%);"></div>

      <div class="relative mx-auto max-w-6xl px-6 text-center">
        <span class="inline-block text-xs font-semibold tracking-widest text-blue-400 uppercase mb-6 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10">
          Web &amp; Mobile App Studio
        </span>
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight max-w-4xl mx-auto">
          Apps That Move at the<br>
          <span class="text-transparent bg-clip-text" style="background-image: linear-gradient(135deg, #60A5FA, #818CF8);">Speed of Your Business</span>
        </h1>
        <p class="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Powerline Labs designs and builds high-performance web and mobile applications — from idea to launch, fast.
        </p>
        <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            class="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-600/25"
          >
            Start a Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </a>
          <a
            href="#services"
            class="inline-flex items-center justify-center px-7 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white font-semibold text-sm transition-colors"
          >
            View Services
          </a>
        </div>

        <!-- Stats row -->
        <div class="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto border-t border-slate-800 pt-10">
          <div>
            <div class="text-3xl font-extrabold text-white">10+</div>
            <div class="text-xs text-slate-500 mt-1 font-medium">Projects Shipped</div>
          </div>
          <div class="border-x border-slate-800">
            <div class="text-3xl font-extrabold text-white">5+</div>
            <div class="text-xs text-slate-500 mt-1 font-medium">Years Experience</div>
          </div>
          <div>
            <div class="text-3xl font-extrabold text-white">100%</div>
            <div class="text-xs text-slate-500 mt-1 font-medium">Client Satisfaction</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Services ───────────────────────────────────────────────────────── -->
    <section id="services" class="py-24 bg-white">
      <div class="mx-auto max-w-6xl px-6">
        <div class="text-center mb-16">
          <span class="text-xs font-semibold tracking-widest text-blue-600 uppercase">What We Build</span>
          <h2 class="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">Our Services</h2>
          <p class="mt-4 text-slate-500 max-w-xl mx-auto">
            We partner with startups and established businesses to build the digital products they need to grow.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Web Apps -->
          <div class="group rounded-2xl border border-slate-200 p-8 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
              <svg class="text-blue-600 group-hover:text-white transition-colors" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Web Applications</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Fast, scalable web apps built with modern frameworks. From SaaS platforms to internal tools, we deliver production-ready software that performs.
            </p>
            <ul class="mt-6 space-y-2">
              <li v-for="item in ['Vue / React / Nuxt', 'REST & GraphQL APIs', 'Cloud-native deployment', 'SEO-ready architecture']" :key="item" class="flex items-center gap-2 text-sm text-slate-600">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#EFF6FF"/><path d="M4 7L6.5 9.5L10 5" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Mobile Apps -->
          <div class="group rounded-2xl border border-slate-200 p-8 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
              <svg class="text-blue-600 group-hover:text-white transition-colors" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Mobile Apps</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Native-quality iOS and Android apps built with cross-platform tools. Ship to both app stores from a single, maintainable codebase.
            </p>
            <ul class="mt-6 space-y-2">
              <li v-for="item in ['React Native / Expo', 'iOS & Android', 'Offline-first support', 'Push notifications']" :key="item" class="flex items-center gap-2 text-sm text-slate-600">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#EFF6FF"/><path d="M4 7L6.5 9.5L10 5" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Consulting -->
          <div class="group rounded-2xl border border-slate-200 p-8 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300">
            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
              <svg class="text-blue-600 group-hover:text-white transition-colors" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 20h20M7 20V10M12 20V4M17 20v-6"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-slate-900 mb-3">Technical Consulting</h3>
            <p class="text-slate-500 leading-relaxed text-sm">
              Architecture reviews, tech stack decisions, and team augmentation. We help you make the right technical choices before you build.
            </p>
            <ul class="mt-6 space-y-2">
              <li v-for="item in ['Architecture design', 'Code & security audits', 'Team training', 'CTO advisory']" :key="item" class="flex items-center gap-2 text-sm text-slate-600">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="7" fill="#EFF6FF"/><path d="M4 7L6.5 9.5L10 5" stroke="#2563EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Why Us ──────────────────────────────────────────────────────────── -->
    <section class="py-24 bg-slate-50">
      <div class="mx-auto max-w-6xl px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span class="text-xs font-semibold tracking-widest text-blue-600 uppercase">Why Powerline Labs</span>
            <h2 class="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">Built for speed.<br>Built to last.</h2>
            <p class="mt-5 text-slate-500 leading-relaxed">
              We're a focused studio — no account managers, no bloated teams. You work directly with the engineers building your product.
            </p>
          </div>

          <div class="grid sm:grid-cols-2 gap-6">
            <div v-for="item in [
              { icon: '⚡', title: 'Fast Delivery', body: 'Lean process means your product ships in weeks, not months.' },
              { icon: '🎯', title: 'Direct Access', body: 'Work directly with senior engineers — no layers of management.' },
              { icon: '🔒', title: 'Quality Code', body: 'Typed, tested, and documented. Code you can build on for years.' },
              { icon: '🚀', title: 'Launch Ready', body: 'We handle CI/CD, hosting, and monitoring so you go live with confidence.' },
            ]" :key="item.title" class="rounded-xl bg-white border border-slate-200 p-6">
              <div class="text-2xl mb-3">{{ item.icon }}</div>
              <h3 class="font-bold text-slate-900 mb-1.5">{{ item.title }}</h3>
              <p class="text-sm text-slate-500 leading-relaxed">{{ item.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Process ────────────────────────────────────────────────────────── -->
    <section id="process" class="py-24 bg-white">
      <div class="mx-auto max-w-6xl px-6">
        <div class="text-center mb-16">
          <span class="text-xs font-semibold tracking-widest text-blue-600 uppercase">How We Work</span>
          <h2 class="mt-3 text-4xl font-extrabold tracking-tight text-slate-900">From Idea to Launch</h2>
          <p class="mt-4 text-slate-500 max-w-xl mx-auto">
            A straightforward process designed to keep things moving and keep you informed every step of the way.
          </p>
        </div>

        <div class="relative">
          <!-- Connector line -->
          <div class="hidden md:block absolute top-10 left-0 right-0 h-px bg-slate-200 mx-28"></div>

          <div class="grid md:grid-cols-4 gap-8">
            <div v-for="(step, i) in [
              { num: '01', title: 'Discovery', body: 'We dig into your goals, users, and constraints to define the right scope.' },
              { num: '02', title: 'Design', body: 'UX wireframes and UI mockups aligned with your brand before a line of code is written.' },
              { num: '03', title: 'Build', body: 'Iterative development with weekly demos so you always see progress.' },
              { num: '04', title: 'Launch', body: 'Deploy, monitor, and iterate. We stay hands-on through go-live and beyond.' },
            ]" :key="step.num" class="relative text-center">
              <div class="w-20 h-20 rounded-full border-2 border-slate-200 bg-white flex flex-col items-center justify-center mx-auto mb-6 relative z-10">
                <span class="text-xs font-bold text-blue-600 tracking-widest">{{ step.num }}</span>
              </div>
              <h3 class="font-bold text-slate-900 mb-2">{{ step.title }}</h3>
              <p class="text-sm text-slate-500 leading-relaxed">{{ step.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Contact ────────────────────────────────────────────────────────── -->
    <section id="contact" class="py-24 bg-slate-900">
      <div class="mx-auto max-w-6xl px-6">
        <div class="grid lg:grid-cols-2 gap-16">
          <!-- Left copy -->
          <div class="text-white">
            <span class="text-xs font-semibold tracking-widest text-blue-400 uppercase">Get In Touch</span>
            <h2 class="mt-3 text-4xl font-extrabold tracking-tight">Let's Build Something Great</h2>
            <p class="mt-5 text-slate-400 leading-relaxed">
              Tell us about your project and we'll get back to you within one business day.
            </p>

            <div class="mt-10 space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-semibold text-white">Email</div>
                  <a href="mailto:support@powerlinelabs.com" class="text-slate-400 text-sm hover:text-blue-400 transition-colors">support@powerlinelabs.com</a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <div class="text-sm font-semibold text-white">Response Time</div>
                  <div class="text-slate-400 text-sm">Within 1 business day</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Form -->
          <div>
            <!-- Success state -->
            <div v-if="formStatus === 'success'" class="rounded-2xl bg-white/5 border border-white/10 p-8 text-center">
              <div class="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Message Sent!</h3>
              <p class="text-slate-400 text-sm">Thanks for reaching out. We'll be in touch within one business day.</p>
              <button
                class="mt-6 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                @click="formStatus = 'idle'"
              >Send another message</button>
            </div>

            <!-- Form -->
            <form v-else class="rounded-2xl bg-white/5 border border-white/10 p-8 space-y-5" @submit.prevent="submitForm">
              <div class="grid sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-1.5" for="name">Name *</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Jane Smith"
                    class="w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  >
                </div>
                <div>
                  <label class="block text-sm font-medium text-slate-300 mb-1.5" for="email">Email *</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    class="w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  >
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-300 mb-1.5" for="company">Company</label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  placeholder="Acme Inc. (optional)"
                  class="w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                >
              </div>

              <div>
                <label class="block text-sm font-medium text-slate-300 mb-1.5" for="message">Message *</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  placeholder="Tell us about your project — what you're building, your timeline, and any specific challenges..."
                  class="w-full rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                ></textarea>
              </div>

              <div v-if="formStatus === 'error'" class="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                {{ formError || 'Something went wrong. Please try again or email us directly.' }}
              </div>

              <button
                type="submit"
                :disabled="formStatus === 'submitting'"
                class="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-colors"
              >
                <svg v-if="formStatus === 'submitting'" class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                </svg>
                {{ formStatus === 'submitting' ? 'Sending…' : 'Send Message' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- ── Footer ─────────────────────────────────────────────────────────── -->
    <footer class="bg-slate-950 text-slate-500 py-10">
      <div class="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2.5">
          <span class="flex items-center justify-center w-7 h-7 rounded-md bg-blue-600 text-white">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M2 8L6 2L10 8L14 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L6 8L10 12L14 8" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity="0.5"/>
            </svg>
          </span>
          <span class="font-bold text-slate-400 text-sm">Powerline Labs</span>
        </div>
        <p class="text-xs">© {{ new Date().getFullYear() }} Powerline Labs. All rights reserved.</p>
        <nav class="flex gap-6 text-xs">
          <a href="#services" class="hover:text-slate-300 transition-colors">Services</a>
          <a href="#process" class="hover:text-slate-300 transition-colors">Process</a>
          <a href="#contact" class="hover:text-slate-300 transition-colors">Contact</a>
        </nav>
      </div>
    </footer>

  </div>
</template>
