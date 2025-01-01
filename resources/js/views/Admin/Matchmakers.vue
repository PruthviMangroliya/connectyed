<!-- resources/js/components/Matchmakers.vue -->
<template>
  <div class="p-8 bg-gray-100 min-h-screen">
    <!-- Tab Navigation -->
    <div class="mb-6">
      <div class="border-b border-gray-200">
        <nav class="flex space-x-8" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            @click="switchTab(tab.value)"
            :class="[
              currentTab === tab.value
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.label }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Statistics Header -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800 mb-4">
        {{ currentTab === 'candidates' ? 'Candidate' : 'Matchmaker' }} Management
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <p class="text-sm text-gray-500">Total {{ currentTab === 'candidates' ? 'Candidates' : 'Matchmakers' }}</p>
          <p class="text-2xl font-bold text-gray-800">{{ currentUsers.length }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <p class="text-sm text-gray-500">Verified</p>
          <p class="text-2xl font-bold text-green-600">{{ verifiedCount }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <p class="text-sm text-gray-500">Avg Experience</p>
          <p class="text-2xl font-bold text-blue-600">{{ averageExperience }}y</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow-sm">
          <p class="text-sm text-gray-500">Countries</p>
          <p class="text-2xl font-bold text-purple-600">{{ uniqueCountries.length }}</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="mb-6 space-y-4">
      <div class="flex flex-wrap gap-4 bg-white p-4 rounded-lg shadow-sm">
        <button 
          v-for="filter in currentFilters" 
          :key="filter.value"
          @click="currentFilter = filter.value"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-colors',
            currentFilter === filter.value 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          ]"
        >
          {{ filter.label }}
        </button>
      </div>

      <!-- Search -->
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="Search by name, location, or bio..."
        class="w-full px-4 py-2 bg-white rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>

    <!-- Grid View -->
    <div v-if="currentTab === 'candidates'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Candidate Cards -->
      <div 
        v-for="candidate in filteredUsers" 
        :key="candidate.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <!-- Existing Candidate Card Content -->
        <div class="relative h-64">
          <img 
            :src="candidate.profile?.profile_image1 || '/path/to/default-image.jpg'" 
            :alt="candidate.name"
            class="w-full h-full object-cover"
          />
          <button 
            v-if="candidate.profile?.profile_image2"
            @click="toggleImage(candidate)"
            class="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100"
          >
            <i class="fas fa-images"></i>
          </button>
        </div>

        <!-- Candidate Info -->
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h2 class="text-xl font-semibold text-gray-800">{{ candidate.name }}</h2>
              <p class="text-sm text-gray-500">@{{ candidate.username }}</p>
            </div>
            <span 
              :class="[
                'px-3 py-1 rounded-full text-sm font-medium',
                candidate.email_verified_at 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-orange-100 text-orange-800'
              ]"
            >
              {{ candidate.email_verified_at ? 'Verified' : 'Pending' }}
            </span>
          </div>

          <!-- Details -->
          <div class="space-y-3">
            <div class="flex items-center text-gray-600">
              <i class="fas fa-map-marker-alt w-5"></i>
              <span class="text-sm">{{ formatLocation(candidate.profile) }}</span>
            </div>

            <div class="flex items-center text-gray-600">
              <i class="fas fa-briefcase w-5"></i>
              <span class="text-sm">{{ candidate.profile?.yearsexperience || 0 }} years experience</span>
            </div>

            <div v-if="candidate.profile?.bio" class="mt-2">
              <p class="text-sm text-gray-600 line-clamp-2">{{ candidate.profile.bio }}</p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-2 mt-4">
            <button
              @click="approveCandidate(candidate.id)"
              :disabled="processing"
              class="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Approve
            </button>
            <button
              class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              @click="viewDetails(candidate)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Matchmaker Grid -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Matchmaker Cards -->
      <div 
        v-for="matchmaker in filteredUsers" 
        :key="matchmaker.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <!-- Profile Header -->
        <div class="relative">
          <div class="h-64 overflow-hidden">
            <img 
              :src="matchmaker.profile?.profile_image1 || '/path/to/default-image.jpg'" 
              :alt="matchmaker.name"
              class="w-full h-full object-cover"
            />
          </div>
          
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 class="text-xl font-bold text-white mb-1">{{ matchmaker.name }}</h3>
            <p class="flex items-center text-white/90 text-sm">
              <i class="fas fa-map-marker-alt mr-2"></i>
              {{ formatLocation(matchmaker.profile) }}
            </p>
          </div>
        </div>

        <!-- Main Content -->
        <div class="p-6">
          <!-- Key Stats -->
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <span class="text-sm text-gray-600">Experience</span>
              <p class="text-lg font-semibold text-gray-800">
                {{ matchmaker.profile?.yearsexperience || 0 }} years
              </p>
            </div>
            <div class="bg-gray-50 rounded-lg p-3 text-center">
              <span class="text-sm text-gray-600">Age</span>
              <p class="text-lg font-semibold text-gray-800">
                {{ matchmaker.profile?.age || 'N/A' }}
              </p>
            </div>
          </div>

          <!-- Bio -->
          <div class="mb-4">
            <h4 class="text-sm font-semibold text-gray-700 mb-2">About</h4>
            <p class="text-sm text-gray-600 line-clamp-3">{{ matchmaker.profile?.bio || 'No bio available' }}</p>
          </div>

          <!-- Actions -->
          <div class="flex gap-2 mt-4">
            <button
              @click="disapproveMatchmaker(matchmaker.id)"
              :disabled="processing"
              class="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Disapprove
            </button>
            <button
              class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              @click="viewDetails(matchmaker)"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Indicator -->
    <div v-if="processing" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      authorization: this.$store.state.auth.authorization,
      candidates: [],
      matchmakers: [],
      currentTab: 'candidates',
      currentFilter: 'all',
      searchQuery: '',
      processing: false,
      tabs: [
        { label: 'Candidates', value: 'candidates' },
        { label: 'Matchmakers', value: 'matchmakers' }
      ],
      candidateFilters: [
        { label: 'All Candidates', value: 'all' },
        { label: 'Verified', value: 'verified' },
        { label: 'Experienced (3y+)', value: 'experienced' }
      ],
      matchmakerFilters: [
        { label: 'All Matchmakers', value: 'all' },
        { label: 'Experienced (5y+)', value: 'experienced' },
        { label: 'New (>1y)', value: 'new' }
      ]
    };
  },

  computed: {
    currentUsers() {
      return this.currentTab === 'candidates' ? this.candidates : this.matchmakers;
    },

    currentFilters() {
      return this.currentTab === 'candidates' ? this.candidateFilters : this.matchmakerFilters;
    },

    verifiedCount() {
      return this.currentUsers.filter(u => u.email_verified_at).length;
    },

    averageExperience() {
      const total = this.currentUsers.reduce((sum, u) => sum + (u.profile?.yearsexperience || 0), 0);
      return (this.currentUsers.length > 0 ? (total / this.currentUsers.length).toFixed(1) : '0.0');
    },

    uniqueCountries() {
      return [...new Set(this.currentUsers.map(u => u.profile?.country).filter(Boolean))];
    },

    filteredUsers() {
      let filtered = [...this.currentUsers];

      // Apply filters
      if (this.currentTab === 'candidates') {
        if (this.currentFilter === 'verified') {
          filtered = filtered.filter(c => c.email_verified_at);
        } else if (this.currentFilter === 'experienced') {
          filtered = filtered.filter(c => (c.profile?.yearsexperience || 0) >= 3);
        }
      } else {
        if (this.currentFilter === 'experienced') {
          filtered = filtered.filter(m => (m.profile?.yearsexperience || 0) >= 5);
        } else if (this.currentFilter === 'new') {
          filtered = filtered.filter(m => (m.profile?.yearsexperience || 0) <= 1);
        }
      }

      // Apply search
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(u => 
          u.name?.toLowerCase().includes(query) ||
          (u.profile?.city && u.profile.city.toLowerCase().includes(query)) ||
          (u.profile?.country && u.profile.country.toLowerCase().includes(query)) ||
          (u.profile?.bio && u.profile.bio.toLowerCase().includes(query))
        );
      }

      return filtered;
    }
  },

  methods: {
    switchTab(tabValue) {
      this.currentTab = tabValue;
      this.currentFilter = 'all'; // Reset filter when switching tabs
      if (tabValue === 'matchmakers') {
        this.fetchMatchmakers();
      } else {
        this.fetchUsers();
      }
    },

    async fetchUsers() {
      this.processing = true;
      try {
        axios.defaults.headers.common.Authorization = `Bearer ${this.authorization.token}`;
        const response = await axios.get('/api/admin/candidates');
        this.candidates = response.data.data.filter(c => c.role === 'candidate');
      } catch (error) {
        console.error('Error fetching candidates:', error);
        this.$toast.error('Failed to fetch candidates.');
      } finally {
        this.processing = false;
      }
    },

    async fetchMatchmakers() {
      this.processing = true;
      try {
        axios.defaults.headers.common.Authorization = `Bearer ${this.authorization.token}`;
        const response = await axios.get('/api/admin/matchmakers');
        this.matchmakers = response.data.data.filter(m => m.role === 'matchmaker');
      } catch (error) {
        console.error('Error fetching matchmakers:', error);
        this.$toast.error('Failed to fetch matchmakers.');
      } finally {
        this.processing = false;
      }
    },

    async approveCandidate(userId) {
      this.processing = true;
      try {
        await axios.post('/api/admin/candidates/approve', { user_id: userId });
        this.$toast.success('Candidate approved and promoted to Matchmaker.');
        await this.fetchMatchmakers(); // Refresh matchmakers list
        await this.fetchUsers(); // Refresh candidates list
      } catch (error) {
        console.error('Error approving candidate:', error);
        this.$toast.error('Failed to approve candidate.');
      } finally {
        this.processing = false;
      }
    },

    async disapproveMatchmaker(userId) {
      this.processing = true;
      try {
        await axios.post('/api/admin/matchmakers/disapprove', { user_id: userId });
        this.$toast.success('Matchmaker disapproved and moved to Candidates.');
        await this.fetchUsers(); // Refresh candidates list
        await this.fetchMatchmakers(); // Refresh matchmakers list
      } catch (error) {
        console.error('Error disapproving matchmaker:', error);
        this.$toast.error('Failed to disapprove matchmaker.');
      } finally {
        this.processing = false;
      }
    },

    formatLocation(profile) {
      if (!profile) return 'Location not specified';
      return [profile.city, profile.state, profile.country].filter(Boolean).join(', ');
    },

    toggleImage(user) {
      if (user.profile?.profile_image2) {
        [user.profile.profile_image1, user.profile.profile_image2] = 
        [user.profile.profile_image2, user.profile.profile_image1];
      }
    },

    viewDetails(user) {
      const routeName = this.currentTab === 'candidates' ? 'CandidateDetails' : 'MatchmakerDetails';
      this.$router.push({ name: routeName, params: { id: user.id } });
    }
  },

  mounted() {
    this.fetchUsers();
  }
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.transition-colors {
  transition: all 0.3s ease;
}

.transition-shadow {
  transition: box-shadow 0.3s ease;
}

/* Loader Styles */
.loader {
  border-top-color: #3498db;
  animation: spinner 1.5s linear infinite;
}

@keyframes spinner {
  to { transform: rotate(360deg); }
}
</style>
