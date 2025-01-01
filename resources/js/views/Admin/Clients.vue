# template section
<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <!-- Header with Statistics -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Client Management Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <p class="text-sm text-gray-500">Total Clients</p>
          <p class="text-2xl font-bold text-gray-800">{{ clients.length }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <p class="text-sm text-gray-500">Verified Clients</p>
          <p class="text-2xl font-bold text-green-600">
            {{ clients.filter(c => c.email_verified_at).length }}
          </p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <p class="text-sm text-gray-500">Unverified Clients</p>
          <p class="text-2xl font-bold text-orange-500">
            {{ clients.filter(c => !c.email_verified_at).length }}
          </p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <p class="text-sm text-gray-500">With Package</p>
          <p class="text-2xl font-bold text-purple-600">
            {{ clients.filter(c => c.purchased_package).length }}
          </p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div class="flex flex-wrap gap-4">
        <button 
          @click="currentFilter = 'all'"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            currentFilter === 'all' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          All Clients
        </button>
        <button 
          @click="currentFilter = 'verified'"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            currentFilter === 'verified' 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          Verified
        </button>
        <button 
          @click="currentFilter = 'unverified'"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            currentFilter === 'unverified' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          Unverified
        </button>
        <button 
          @click="currentFilter = 'withPackage'"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            currentFilter === 'withPackage' 
              ? 'bg-purple-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          With Package
        </button>
      </div>
    </div>

    <!-- Client Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="client in filteredClients" 
        :key="client.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <!-- Profile Image -->
        <div class="relative w-full h-48 bg-gray-100">
          <img
            v-if="client.profile?.profile_image1"
            :src="client.profile.profile_image1"
            :alt="client.name"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
          <div
            v-else
            class="w-full h-full flex items-center justify-center bg-gray-200"
          >
            <svg 
              class="w-16 h-16 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>

        <!-- Card Header -->
        <div class="p-6 border-b border-gray-100">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="text-xl font-semibold text-gray-800">{{ client.name }}</h2>
              <p class="text-sm text-gray-500">@{{ client.username }}</p>
            </div>
            <span 
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                client.email_verified_at 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              ]"
            >
              {{ client.email_verified_at ? 'Verified' : 'Unverified' }}
            </span>
          </div>

          <!-- Contact Info -->
          <div class="space-y-2">
            <p class="text-sm text-gray-600">
              <i class="fas fa-envelope mr-2"></i>{{ client.email }}
            </p>
            <p v-if="client.profile?.location" class="text-sm text-gray-600">
              <i class="fas fa-map-marker-alt mr-2"></i>
              {{ [client.profile.city, client.profile.state, client.profile.country].filter(Boolean).join(', ') }}
            </p>
          </div>
        </div>

        <!-- Profile Details -->
        <div class="p-6" v-if="client.profile">
          <div class="space-y-3">
            <div v-if="client.profile.jobtitle" class="flex items-center text-sm text-gray-600">
              <i class="fas fa-briefcase mr-2"></i>
              {{ client.profile.jobtitle }}
            </div>
            <div v-if="client.profile.education" class="flex items-center text-sm text-gray-600">
              <i class="fas fa-graduation-cap mr-2"></i>
              {{ client.profile.education }}
            </div>
            <div v-if="client.profile.languages" class="flex items-center text-sm text-gray-600">
              <i class="fas fa-language mr-2"></i>
              {{ client.profile.languages }}
            </div>
          </div>
        </div>

        <!-- Package Info -->
        <div 
          v-if="client.purchased_package" 
          class="px-6 py-4 bg-gray-50 border-t border-gray-100"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-600">Package:</span>
            <span 
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                getPackageClass(client.purchased_package)
              ]"
            >
              {{ client.purchased_package.toUpperCase() }}
            </span>
          </div>
          <p class="text-sm text-gray-500 mt-1">
            Purchased: {{ formatDate(client.package_purchased_at) }}
          </p>
        </div>

        <!-- Actions -->
        <div class="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div class="flex gap-2">
            <button
              v-if="!client.email_verified_at"
              @click="approveClient(client.id)"
              class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Verify Client
            </button>
            <button
              class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

# script section
<script>
export default {
  data() {
    return {
      currentFilter: 'all',
      authorization: this.$store.state.auth.authorization,
      clients: [],
      processing: false
    }
  },

  computed: {
    filteredClients() {
      switch (this.currentFilter) {
        case 'verified':
          return this.clients.filter(client => client.email_verified_at)
        case 'unverified':
          return this.clients.filter(client => !client.email_verified_at)
        case 'withPackage':
          return this.clients.filter(client => client.purchased_package)
        default:
          return this.clients
      }
    }
  },

  methods: {
    async fetchClients() {
      this.processing = true
      axios.defaults.headers.common.Authorization = `Bearer ${this.authorization.token}`
      try {
        const response = await axios.get('/api/admin/clients')
        this.clients = response.data.data
      } catch (error) {
        console.error('Error fetching clients:', error)
      } finally {
        this.processing = false
      }
    },

    async approveClient(clientId) {
      // Implement your approval logic here
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A'
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },

    getPackageClass(packageName) {
      const classes = {
        platinum: 'bg-purple-100 text-purple-800',
        gold: 'bg-yellow-100 text-yellow-800',
        silver: 'bg-gray-100 text-gray-800'
      }
      return classes[packageName.toLowerCase()] || 'bg-blue-100 text-blue-800'
    },

    handleImageError(event) {
      // Replace broken image with default avatar
      event.target.src = '/path/to/default-avatar.png' // Replace with your default image path
      event.target.classList.add('default-avatar')
    }
  },

  mounted() {
    this.fetchClients()
  }
}
</script>

# style section
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-leave-from, .fade-enter-to {
  opacity: 0;
}
</style>