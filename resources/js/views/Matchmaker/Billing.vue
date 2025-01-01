# Matchmaker/Billing.vue
<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">Billing & Earnings</h2>

    <!-- Earnings Overview -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-blue-900">Available Balance</h3>
          <p class="text-2xl font-bold text-blue-600">${{ availableBalance.toFixed(2) }}</p>
        </div>
        <div class="bg-green-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-green-900">Total Earned</h3>
          <p class="text-2xl font-bold text-green-600">${{ totalEarned.toFixed(2) }}</p>
        </div>
        <div class="bg-purple-50 p-4 rounded-lg">
          <h3 class="text-lg font-semibold text-purple-900">Pending Earnings</h3>
          <p class="text-2xl font-bold text-purple-600">${{ pendingEarnings.toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <!-- Withdrawal Section -->
    <div class="bg-white rounded-lg shadow p-6 mb-6">
      <h3 class="text-xl font-semibold mb-4">Request Withdrawal</h3>
      
      <div v-if="availableBalance > 0" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">PayPal Email</label>
          <input 
            v-model="withdrawalEmail" 
            type="email" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your PayPal email"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Amount to Withdraw</label>
          <input 
            v-model.number="withdrawalAmount" 
            type="number" 
            min="0" 
            :max="availableBalance"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <button 
          @click="requestWithdrawal" 
          class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          :disabled="!canRequestWithdrawal"
        >
          Request Withdrawal
        </button>
      </div>

      <div v-else class="text-center text-gray-500 py-4">
        No funds available for withdrawal
      </div>
    </div>

    <!-- Recent Earnings -->
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-xl font-semibold mb-4">Recent Earnings</h3>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meeting</th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="earning in recentEarnings" :key="earning.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm">{{ formatDate(earning.created_at) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">Meeting #{{ earning.meeting_id }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">${{ earning.amount.toFixed(2) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  :class="[
                    'px-2 py-1 text-xs rounded-full',
                    getStatusClass(earning.status)
                  ]"
                >
                  {{ earning.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="recentEarnings.length === 0" class="text-center text-gray-500 py-8">
          No earnings to display
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import axios from 'axios';

export default {
  name: 'MatchmakerBilling',
  data() {
    return {
      availableBalance: 0,
      totalEarned: 0,
      pendingEarnings: 0,
      withdrawalEmail: '',
      withdrawalAmount: null,
      recentEarnings: [],
      loading: false
    };
  },
  computed: {
    canRequestWithdrawal() {
      return this.withdrawalEmail && 
             this.withdrawalAmount > 0 && 
             this.withdrawalAmount <= this.availableBalance;
    }
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), 'MMM d, yyyy');
    },
    getStatusClass(status) {
      const classes = {
        pending: 'bg-yellow-100 text-yellow-800',
        available: 'bg-green-100 text-green-800',
        withdrawn: 'bg-blue-100 text-blue-800'
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    },
async fetchEarnings() {
  try {
    this.loading = true;
    const response = await axios.get('/api/matchmaker/earnings');
    if (response.data.success && response.data.data) {
      const { availableBalance, totalEarned, pendingEarnings, recentEarnings } = response.data.data;
      
      this.availableBalance = availableBalance || 0;
      this.totalEarned = totalEarned || 0;
      this.pendingEarnings = pendingEarnings || 0;
      this.recentEarnings = recentEarnings || [];
    }
  } catch (error) {
    console.error('Error fetching earnings:', error);
    this.$toast.error('Failed to fetch earnings data');
    // Initialize with default values on error
    this.availableBalance = 0;
    this.totalEarned = 0;
    this.pendingEarnings = 0;
    this.recentEarnings = [];
  } finally {
    this.loading = false;
  }
},
    async requestWithdrawal() {
      if (!this.canRequestWithdrawal) return;
      
      try {
        this.loading = true;
        await axios.post('/api/matchmaker/request-withdrawal', {
          amount: this.withdrawalAmount,
          payment_email: this.withdrawalEmail
        });
        
        this.$toast.success('Withdrawal request submitted successfully');
        this.withdrawalAmount = null;
        await this.fetchEarnings();
      } catch (error) {
        console.error('Error requesting withdrawal:', error);
        this.$toast.error('Failed to submit withdrawal request');
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.fetchEarnings();
  }
};
</script>