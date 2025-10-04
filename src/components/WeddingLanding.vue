<template>
  <div class="min-h-screen bg-gradient-to-b from-rose-50 via-white to-rose-50">
    <!-- Loading Animation -->
    <div v-if="isLoading" class="fixed inset-0 z-[100] bg-white flex items-center justify-center">
      <div class="text-center">
        <div class="font-script text-4xl md:text-6xl text-rose-600 mb-4 animate-pulse">O & V</div>
        <div class="flex gap-2 justify-center">
          <div class="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style="animation-delay: 0s"></div>
          <div class="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          <div class="w-2 h-2 bg-rose-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
        </div>
      </div>
    </div>

    <!-- Floating Petals -->
    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div v-for="i in 8" :key="i" class="petal" :style="petalStyle(i)">🌸</div>
    </div>

    <!-- Elegant Header -->
    <header class="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-40 transition-all">
      <div class="max-w-6xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
        <div class="font-script text-xl md:text-2xl text-rose-600">O & V</div>
        <nav class="flex gap-4 md:gap-8 font-sans text-xs md:text-sm tracking-wide">
          <a href="#gallery" class="text-gray-700 hover:text-rose-600 transition-colors">{{ $t('nav.gallery') }}</a>
          <a href="#schedule" class="text-gray-700 hover:text-rose-600 transition-colors">{{ $t('nav.schedule') }}</a>
          <a href="#donation" class="text-gray-700 hover:text-rose-600 transition-colors">{{ $t('nav.donation') }}</a>
        </nav>
        <div class="flex items-center gap-2 md:gap-3">
          <button @click="toggleMusic" class="w-8 h-8 md:w-9 md:h-9 rounded-full bg-rose-50 hover:bg-rose-100 flex items-center justify-center transition-colors">
            <span class="text-sm md:text-base">{{ isMusicPlaying ? '🔊' : '🔇' }}</span>
          </button>
          <select v-model="locale" @change="onLangChange" class="border border-rose-200 rounded-full px-2 md:px-3 py-1 text-xs md:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-rose-300">
            <option value="en">EN</option>
            <option value="kh">ខ្មែរ</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <!-- Background with parallax effect -->
      <div class="absolute inset-0 hero-bg" :style="heroStyleWithParallax">
        <div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 text-center px-4 md:px-6 animate-fadeIn">
        <!-- Decorative top line -->
        <div class="flex items-center justify-center mb-6 md:mb-8">
          <div class="h-px w-12 md:w-16 bg-white/50"></div>
          <div class="mx-3 md:mx-4 text-white/80">✦</div>
          <div class="h-px w-12 md:w-16 bg-white/50"></div>
        </div>

        <!-- Names -->
        <div class="mb-6">
          <h1 class="font-script text-5xl sm:text-6xl md:text-8xl text-white mb-3 md:mb-4 drop-shadow-lg leading-tight">
            Odom & Vatan
          </h1>
          <p class="font-serif text-lg sm:text-xl md:text-2xl text-white/90 tracking-wide md:tracking-widest">{{ $t('hero.date') }}</p>
        </div>

        <!-- Decorative bottom line -->
        <div class="flex items-center justify-center mt-6 md:mt-8">
          <div class="h-px w-12 md:w-16 bg-white/50"></div>
          <div class="mx-3 md:mx-4 text-white/80">✦</div>
          <div class="h-px w-12 md:w-16 bg-white/50"></div>
        </div>

        <!-- Countdown -->
        <div class="mt-8 md:mt-12 inline-block bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl w-full max-w-md md:max-w-xl">
          <div class="grid grid-cols-4 gap-3 sm:gap-6 md:gap-10">
            <div class="text-center">
              <div class="text-2xl sm:text-3xl md:text-5xl font-serif font-light text-white mb-1 md:mb-2">{{ days }}</div>
              <div class="text-[10px] sm:text-xs md:text-sm text-white/80 uppercase tracking-wider font-sans">{{ $t('count.days') }}</div>
            </div>
            <div class="text-center">
              <div class="text-2xl sm:text-3xl md:text-5xl font-serif font-light text-white mb-1 md:mb-2">{{ hours }}</div>
              <div class="text-[10px] sm:text-xs md:text-sm text-white/80 uppercase tracking-wider font-sans">{{ $t('count.hours') }}</div>
            </div>
            <div class="text-center">
              <div class="text-2xl sm:text-3xl md:text-5xl font-serif font-light text-white mb-1 md:mb-2">{{ minutes }}</div>
              <div class="text-[10px] sm:text-xs md:text-sm text-white/80 uppercase tracking-wider font-sans">{{ $t('count.minutes') }}</div>
            </div>
            <div class="text-center">
              <div class="text-2xl sm:text-3xl md:text-5xl font-serif font-light text-white mb-1 md:mb-2">{{ seconds }}</div>
              <div class="text-[10px] sm:text-xs md:text-sm text-white/80 uppercase tracking-wider font-sans">{{ $t('count.seconds') }}</div>
            </div>
          </div>
        </div>
      </div>

    </section>

    <main class="max-w-6xl mx-auto px-4 md:px-6">
      <!-- Gallery Section (Now First) -->
      <section id="gallery" class="py-12 md:py-20 scroll-reveal">
        <div class="text-center mb-8 md:mb-12">
          <!-- Section decorative header -->
          <div class="flex items-center justify-center mb-4 md:mb-6">
            <div class="h-px w-8 md:w-12 bg-rose-300"></div>
            <div class="mx-3 md:mx-4 text-rose-400">✦</div>
            <div class="h-px w-8 md:w-12 bg-rose-300"></div>
          </div>

          <h2 class="font-serif text-3xl md:text-5xl text-gray-800">{{ $t('gallery.title') }}</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <!-- All photos - uniform height, no cropping, clickable with hover overlay -->
          <div @click="openImageModal(gallery1)" class="h-64 sm:h-80 md:h-96 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl bg-gradient-to-br from-rose-50 to-white flex items-center justify-center cursor-pointer group relative">
            <img :src="gallery1" alt="Gallery photo 1" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span class="text-white font-sans text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to view</span>
            </div>
          </div>
          <div @click="openImageModal(gallery2)" class="h-64 sm:h-80 md:h-96 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl bg-gradient-to-br from-rose-50 to-white flex items-center justify-center cursor-pointer group relative">
            <img :src="gallery2" alt="Gallery photo 2" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span class="text-white font-sans text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to view</span>
            </div>
          </div>
          <div @click="openImageModal(gallery3)" class="h-64 sm:h-80 md:h-96 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl bg-gradient-to-br from-rose-50 to-white flex items-center justify-center cursor-pointer group relative">
            <img :src="gallery3" alt="Gallery photo 3" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span class="text-white font-sans text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to view</span>
            </div>
          </div>
          <div @click="openImageModal(gallery4)" class="h-64 sm:h-80 md:h-96 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-xl bg-gradient-to-br from-rose-50 to-white flex items-center justify-center cursor-pointer group relative">
            <img :src="gallery4" alt="Gallery photo 4" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span class="text-white font-sans text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Click to view</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Event Details Section -->
      <section id="schedule" class="py-12 md:py-20 scroll-reveal">
        <div class="max-w-4xl mx-auto">
          <!-- Section decorative header -->
          <div class="flex items-center justify-center mb-4 md:mb-6">
            <div class="h-px w-8 md:w-12 bg-rose-300"></div>
            <div class="mx-3 md:mx-4 text-rose-400">✦</div>
            <div class="h-px w-8 md:w-12 bg-rose-300"></div>
          </div>

          <h2 class="font-serif text-3xl md:text-5xl text-gray-800 text-center mb-8 md:mb-12">{{ $t('event.title') }}</h2>

          <div class="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-6 sm:p-8 md:p-12 border border-rose-100">
            <div class="flex items-center justify-center mb-6 md:mb-8">
              <div class="w-14 h-14 md:w-16 md:h-16 rounded-full bg-rose-100 flex items-center justify-center">
                <span class="text-2xl md:text-3xl">📅</span>
              </div>
            </div>

            <div class="space-y-5 md:space-y-6 font-sans text-center">
              <div>
                <div class="text-rose-600 font-semibold mb-2 uppercase tracking-wide text-xs md:text-sm">{{ $t('event.dateLabel') }}</div>
                <p class="text-gray-800 text-lg sm:text-xl md:text-2xl font-serif">{{ $t('event.date') }}</p>
              </div>

              <div class="h-px bg-rose-100 max-w-xs mx-auto"></div>

              <div>
                <div class="text-rose-600 font-semibold mb-2 uppercase tracking-wide text-xs md:text-sm">{{ $t('event.timeLabel') }}</div>
                <p class="text-gray-800 text-lg sm:text-xl md:text-2xl font-serif">{{ $t('event.time') }}</p>
              </div>

              <div class="h-px bg-rose-100 max-w-xs mx-auto"></div>

              <div>
                <div class="text-rose-600 font-semibold mb-2 uppercase tracking-wide text-xs md:text-sm">{{ $t('event.venueLabel') }}</div>
                <a href="https://maps.google.com/?q=Sokha+Hotel+Phnom+Penh" target="_blank" class="inline-flex items-center gap-2 text-gray-800 text-lg sm:text-xl md:text-2xl font-serif hover:text-rose-600 transition-colors group">
                  <span>{{ $t('event.venue') }}</span>
                  <span class="text-base group-hover:translate-x-1 transition-transform">📍</span>
                </a>
              </div>
            </div>

            <!-- Embedded Google Map with clear marker -->
            <div class="mt-6 md:mt-8 rounded-xl md:rounded-2xl overflow-hidden shadow-lg relative">
              <iframe
                src="https://www.google.com/maps?q=Sokha+Phnom+Penh+Hotel&output=embed&z=15"
                width="100%"
                height="400"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <!-- Gift/Donations Section -->
      <section id="donation" class="py-12 md:py-20 scroll-reveal">
        <div class="max-w-4xl mx-auto">
          <!-- Section decorative header -->
          <div class="flex items-center justify-center mb-4 md:mb-6">
            <div class="h-px w-8 md:w-12 bg-rose-300"></div>
            <div class="mx-3 md:mx-4 text-rose-400">✦</div>
            <div class="h-px w-8 md:w-12 bg-rose-300"></div>
          </div>

          <h2 class="font-serif text-3xl md:text-5xl text-gray-800 text-center mb-8 md:mb-12">{{ $t('donation.title') }}</h2>

          <div class="bg-gradient-to-br from-rose-50 to-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-xl p-6 sm:p-8 md:p-12 border border-rose-100">
            <p class="font-sans text-gray-600 text-center mb-8 md:mb-10 leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
              {{ $t('donation.info') }}
            </p>

            <!-- QR Code Display -->
            <div class="flex justify-center mb-8 md:mb-10">
              <img :src="qrImage" alt="QR Code" class="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain rounded-lg md:rounded-xl shadow-md" />
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://pay.ababank.com/oRF8/9ubz4m2a" target="_blank" class="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-sans py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-base inline-block w-full sm:w-auto text-center">
                {{ $t('qr.clickHere') }}
              </a>
              <a :href="qrImage" target="_blank" class="bg-white border-2 border-rose-300 text-rose-600 hover:bg-rose-50 font-sans py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg text-base inline-block w-full sm:w-auto text-center">
                {{ $t('qr.download') }}
              </a>
            </div>
            <p class="text-gray-500 text-xs sm:text-sm text-center mt-4 italic">
              {{ $t('qr.saveInstruction') }}
            </p>
          </div>
        </div>
      </section>
    </main>

    <!-- Image Lightbox Modal -->
    <div v-if="imageModal" class="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" @click="closeImageModal">
      <button @click="closeImageModal" class="absolute top-4 right-4 text-white text-3xl md:text-4xl w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors z-10">
        ×
      </button>
      <div @click.stop class="max-w-5xl max-h-full w-full h-full flex items-center justify-center">
        <img :src="selectedImage" alt="Gallery photo" class="max-w-full max-h-full object-contain" />
      </div>
    </div>

    <!-- Hidden YouTube Player for Background Music -->
    <div id="youtube-player"></div>

    <!-- Footer -->
    <footer class="py-8 md:py-12 text-center border-t border-rose-100 mt-12 md:mt-20 px-4">
      <div class="flex items-center justify-center mb-3 md:mb-4">
        <div class="h-px w-8 md:w-12 bg-rose-300"></div>
        <div class="mx-3 md:mx-4 text-rose-400">✦</div>
        <div class="h-px w-8 md:w-12 bg-rose-300"></div>
      </div>
      <p class="font-sans text-xs md:text-sm text-gray-500">{{ $t('footer.text') }}</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import qrImage from '../assets/QR.png'
import heroBackground from '../assets/my pre wedding.jpg'
import gallery1 from '../assets/photo_2025-10-04 19.54.10.jpeg'
import gallery2 from '../assets/photo_2025-10-04 19.54.15.jpeg'
import gallery3 from '../assets/photo_2025-10-04 19.54.19.jpeg'
import gallery4 from '../assets/photo_2025-10-04 19.54.24.jpeg'

const { locale: i18nLocale, t } = useI18n({ useScope: 'global' })

// Loading animation
const isLoading = ref(true)

// locale management
const locale = ref(i18nLocale.value)
function onLangChange() {
  i18nLocale.value = locale.value
  localStorage.setItem('site_lang', locale.value)
}

// Parallax effect
const scrollY = ref(0)
const heroStyleWithParallax = computed(() => {
  return `background-image: url('${heroBackground}'); background-size: cover; background-position: center center;`
})

// Floating petals animation - more subtle
function petalStyle(index) {
  const delay = index * 1.5
  const duration = 15 + Math.random() * 10
  const leftPos = Math.random() * 100
  return {
    left: `${leftPos}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

// Music player with YouTube
const isMusicPlaying = ref(false)
let player = null
let musicTimer = null
let hasUnmuted = false

async function toggleMusic() {
  if (!player) {
    player = await initYouTubePlayer()
  }

  if (isMusicPlaying.value) {
    player.pauseVideo()
    isMusicPlaying.value = false
    if (musicTimer) clearTimeout(musicTimer)
  } else {
    player.playVideo()
    if (!hasUnmuted) {
      player.unMute()
      player.setVolume(20)
      hasUnmuted = true
    }
    isMusicPlaying.value = true

    musicTimer = setTimeout(() => {
      player.pauseVideo()
      isMusicPlaying.value = false
    }, 60000)
  }
}

function initYouTubePlayer() {
  return new Promise((resolve) => {
    const checkYT = () => {
      if (window.YT && window.YT.Player) {
        player = new window.YT.Player('youtube-player', {
          height: '0',
          width: '0',
          videoId: 'vGJTaP6anOU',
          playerVars: {
            autoplay: 1,
            controls: 0,
            enablejsapi: 1,
            mute: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event) => {
              event.target.playVideo()
              resolve(player)
            },
            onStateChange: (event) => {
              if (event.data === 0) {
                isMusicPlaying.value = false
                if (musicTimer) clearTimeout(musicTimer)
              }
            }
          }
        })
      } else {
        setTimeout(checkYT, 100)
      }
    }
    checkYT()
  })
}

// countdown (November 30, 2025 6:30 AM Cambodia Time - UTC+7)
const weddingDate = new Date('2025-11-30T06:30:00+07:00')
const days = ref('--')
const hours = ref('--')
const minutes = ref('--')
const seconds = ref('--')

let intervalId = null
function updateCountdown() {
  const now = new Date()
  const diff = weddingDate - now
  if (diff <= 0) {
    days.value = hours.value = minutes.value = seconds.value = 0
    clearInterval(intervalId)
    return
  }
  const s = Math.floor(diff / 1000)
  days.value = Math.floor(s / (3600 * 24))
  hours.value = Math.floor((s % (3600 * 24)) / 3600)
  minutes.value = Math.floor((s % 3600) / 60)
  seconds.value = s % 60
}

onMounted(() => {
  // Loading animation
  setTimeout(() => {
    isLoading.value = false
  }, 1500)

  // Countdown
  updateCountdown();
  intervalId = setInterval(updateCountdown, 1000)

  // Parallax scroll listener
  window.addEventListener('scroll', handleScroll)

  // Intersection Observer for scroll reveals
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el))

  // Initialize YouTube player
  const initAPI = async () => {
    if (window.YT && window.YT.Player) {
      player = await initYouTubePlayer()
    } else {
      window.onYouTubeIframeAPIReady = async () => {
        player = await initYouTubePlayer()
      }
    }
  }

  setTimeout(initAPI, 1500)

  // Auto-unmute on first interaction
  const autoUnmute = () => {
    if (player && !hasUnmuted) {
      player.unMute()
      player.setVolume(20)
      hasUnmuted = true
      isMusicPlaying.value = true

      musicTimer = setTimeout(() => {
        player.pauseVideo()
        isMusicPlaying.value = false
      }, 60000)

      document.removeEventListener('click', autoUnmute)
      document.removeEventListener('scroll', autoUnmute)
      document.removeEventListener('touchstart', autoUnmute)
    }
  }

  document.addEventListener('click', autoUnmute)
  document.addEventListener('scroll', autoUnmute, { passive: true })
  document.addEventListener('touchstart', autoUnmute, { passive: true })
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  scrollY.value = window.scrollY
}

// Image lightbox modal
const imageModal = ref(false)
const selectedImage = ref('')

function openImageModal(imgSrc) {
  selectedImage.value = imgSrc
  imageModal.value = true
}
function closeImageModal() { imageModal.value = false }

// QR download
async function downloadQr() {
  try {
    const res = await fetch(qrImage)
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'odom-vatan-wedding-qr.png'
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Download failed:', err)
  }
}
</script>

<style scoped>
.hero-bg {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: background-position 0.1s ease-out;
}

/* Floating petals animation - subtle and elegant */
.petal {
  position: fixed;
  top: -50px;
  font-size: 1.2rem;
  opacity: 0.3;
  animation: float-down linear infinite;
  will-change: transform;
}

@keyframes float-down {
  0% {
    transform: translateY(-50px) translateX(0) rotate(0deg);
    opacity: 0;
  }
  15% {
    opacity: 0.3;
  }
  85% {
    opacity: 0.3;
  }
  100% {
    transform: translateY(100vh) translateX(30px) rotate(180deg);
    opacity: 0;
  }
}

/* Scroll reveal animations */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Smooth transitions for interactive elements */
img {
  transition: transform 0.3s ease;
}
</style>
