<!-- views/Admin/Overview.vue -->
<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">Admin Dashboard</h2>

    <!-- Main Tabs -->
    <div class="border-b border-gray-200 mb-6">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in mainTabs"
          :key="tab.id"
          @click="activeMainTab = tab.id"
          :class="[
            'py-4 px-1 border-b-2 font-medium text-sm',
            activeMainTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Support Messages Tab -->
    <div v-if="activeMainTab === 'supportMessages'">
      <div class="bg-white rounded-lg shadow p-6">
        <h3 class="text-xl font-semibold mb-4">Support Messages</h3>
        
        <!-- Messages List -->
        <div class="space-y-6">
          <div
            v-for="conversation in groupedConversations"
            :key="conversation.userId"
            class="border rounded-lg p-4"
          >
            <!-- User Info Header -->
            <div class="bg-gray-50 p-4 rounded-t-lg mb-4">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-semibold text-lg">{{ conversation.userName }}</h4>
                  <p class="text-sm text-gray-600">{{ conversation.userEmail }}</p>
                  <div class="mt-1 flex items-center space-x-2">
                    <span 
                      :class="[
                        'px-2 py-1 text-xs rounded-full',
                        conversation.userRole === 'client' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      ]"
                    >
                      {{ capitalize(conversation.userRole) }}
                    </span>
                    <span 
                      v-if="conversation.userRole === 'client' && conversation.package"
                      class="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800"
                    >
                      {{ capitalize(conversation.package) }} Package
                    </span>
                  </div>
                </div>
                <span class="text-sm text-gray-500">
                  Last active: {{ formatDate(conversation.lastMessage.created_at) }}
                </span>
              </div>
            </div>

            <!-- Messages Thread -->
            <div class="space-y-3 max-h-96 overflow-y-auto mb-4 p-4 bg-gray-50 rounded-lg">
              <div
                v-for="message in conversation.messages"
                :key="message.id"
                :class="[
                  'p-3 rounded-lg max-w-[80%]',
                  message.sender_id === 1 
                    ? 'bg-blue-100 ml-auto' 
                    : 'bg-white mr-auto'
                ]"
              >
                <div class="flex justify-between items-center mb-1">
                  <span class="text-xs font-semibold">
                    {{ message.sender_id === 1 ? 'You' : conversation.userName }}
                  </span>
                  <span class="text-xs text-gray-500">
                    {{ formatDate(message.created_at) }}
                  </span>
                </div>
                <p class="text-gray-800">{{ message.message }}</p>
              </div>
            </div>
            
            <!-- Reply Section -->
            <div class="flex gap-2 bg-white p-2 rounded-lg">
              <input
                v-model="replies[conversation.userId]"
                type="text"
                placeholder="Type your reply..."
                class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                @keyup.enter="sendReply(conversation.userId)"
              />
              <button
                @click="sendReply(conversation.userId)"
                class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                :disabled="!replies[conversation.userId]?.trim()"
              >
                Reply
              </button>
            </div>
          </div>

          <!-- No Messages State -->
          <div v-if="groupedConversations.length === 0" class="text-center text-gray-500 py-8">
            No support messages yet
          </div>
        </div>
      </div>
    </div>

    <!-- Withdrawals & Complaints Tab -->
    <div v-if="activeMainTab === 'withdrawalsComplaints'" class="space-y-6">
      <!-- Tabs for Withdrawals and Complaints -->
      <div class="border-b border-gray-200 mb-6">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in subTabs"
            :key="tab.id"
            @click="activeSubTab = tab.id"
            :class="[
              'py-4 px-1 border-b-2 font-medium text-sm',
              activeSubTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Withdrawal Requests Sub-Tab -->
      <div v-if="activeSubTab === 'withdrawals'" class="space-y-6">
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">PayPal Email</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="request in withdrawalRequests" :key="request.id">
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">{{ request.user.name }}</div>
                  <div class="text-sm text-gray-500">{{ request.user.email }}</div>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 text-xs rounded-full capitalize" :class="getRoleClass(request.user.role)">
                    {{ capitalize(request.user.role) }}
                  </span>
                </td>
                <td class="px-6 py-4">${{ request.amount.toFixed(2) }}</td>
                <td class="px-6 py-4">{{ request.payment_email }}</td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 text-xs rounded-full" :class="getStatusClass(request.status)">
                    {{ capitalize(request.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 space-x-2">
                  <template v-if="request.status === 'pending'">
                    <button 
                      @click="approveWithdrawal(request.id)"
                      class="text-green-600 hover:text-green-900">
                      Approve
                    </button>
                    <button 
                      @click="rejectWithdrawal(request.id)"
                      class="text-red-600 hover:text-red-900">
                      Reject
                    </button>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- No Withdrawal Requests -->
          <div v-if="withdrawalRequests.length === 0" class="text-center text-gray-500 py-4">
            No withdrawal requests found.
          </div>
        </div>
      </div>

      <!-- Complaints Sub-Tab -->
      <div v-if="activeSubTab === 'complaints'" class="space-y-6">
        <div class="bg-white shadow rounded-lg overflow-hidden">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Meeting</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Matchmaker</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Complaint</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="complaint in complaints" :key="complaint.id">
                <td class="px-6 py-4">
                  <div class="text-sm">#{{ complaint.meeting_id }}</div>
                  <div class="text-xs text-gray-500">{{ formatDate(complaint.meeting.start_time) }}</div>
                </td>
                <td class="px-6 py-4">{{ complaint.client.name }}</td>
                <td class="px-6 py-4">{{ complaint.meeting.matchmaker.name }}</td>
                <td class="px-6 py-4">
                  <div class="text-sm">{{ complaint.complaint_text }}</div>
                </td>
                <td class="px-6 py-4">
                  <span class="px-2 py-1 text-xs rounded-full" :class="getComplaintStatusClass(complaint.status)">
                    {{ capitalize(complaint.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 space-x-2">
                  <template v-if="complaint.status === 'pending'">
                    <button 
                      @click="resolveComplaint(complaint.id)"
                      class="text-green-600 hover:text-green-900">
                      Resolve
                    </button>
                    <button 
                      @click="refundMeeting(complaint.meeting_id)"
                      class="text-blue-600 hover:text-blue-900">
                      Issue Refund
                    </button>
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- No Complaints -->
          <div v-if="complaints.length === 0" class="text-center text-gray-500 py-4">
            No complaints found.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import axios from 'axios';

export default {
  name: 'AdminOverview',
  data() {
    return {
      // Main Tabs
      activeMainTab: 'supportMessages',
      mainTabs: [
        { id: 'supportMessages', name: 'Support Messages' },
        { id: 'withdrawalsComplaints', name: 'Withdrawals & Complaints' }
      ],
      // Sub Tabs for Withdrawals & Complaints
      activeSubTab: 'withdrawals',
      subTabs: [
        { id: 'withdrawals', name: 'Withdrawal Requests' },
        { id: 'complaints', name: 'Meeting Complaints' }
      ],
      // Support Messages Data
      messages: [],
      replies: {},
      loadingMessages: false,
      // Withdrawals Data
      withdrawalRequests: [],
      loadingWithdrawals: false,
      // Complaints Data
      complaints: [],
      loadingComplaints: false
    };
  },
  computed: {
    groupedConversations() {
      const conversations = {};
      
      this.messages.forEach(message => {
        const userId = message.sender_id === 1 ? message.receiver_id : message.sender_id;
        const user = message.sender_id === 1 ? message.receiver : message.sender;
        
        if (!conversations[userId]) {
          conversations[userId] = {
            userId,
            userName: user.name,
            userEmail: user.email,
            userRole: user.role,
            package: user.purchased_package,
            messages: [],
            lastMessage: message
          };
        }
        
        conversations[userId].messages.push(message);
        if (new Date(message.created_at) > new Date(conversations[userId].lastMessage.created_at)) {
          conversations[userId].lastMessage = message;
        }
      });
      
      // Sort conversations by most recent message
      return Object.values(conversations).sort((a, b) => 
        new Date(b.lastMessage.created_at) - new Date(a.lastMessage.created_at)
      );
    }
  },
  methods: {
    // Utility Methods
    formatDate(date) {
      return format(new Date(date), 'MMM d, yyyy h:mm a');
    },
    capitalize(text) {
      if (!text) return '';
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    // Support Messages Methods
    async fetchSupportMessages() {
      try {
        this.loadingMessages = true;
        const response = await axios.get('/api/messages');
        if (response.data.success) {
          this.messages = response.data.data.filter(msg => 
            msg.sender_id === 1 || msg.receiver_id === 1
          );
        }
      } catch (error) {
        console.error('Error fetching support messages:', error);
        this.$toast.error('Failed to fetch support messages');
      } finally {
        this.loadingMessages = false;
      }
    },
    async sendReply(userId) {
      const reply = this.replies[userId];
      if (!reply?.trim()) return;
      
      try {
        this.loadingMessages = true;
        const response = await axios.post('/api/messages/send', {
          receiver_id: userId,
          message: reply
        });
        
        if (response.data.success) {
          this.messages.push(response.data.data);
          this.$set(this.replies, userId, '');
          // Optionally refresh messages to ensure consistency
          await this.fetchSupportMessages();
        }
      } catch (error) {
        console.error('Error sending reply:', error);
        this.$toast.error('Failed to send reply');
      } finally {
        this.loadingMessages = false;
      }
    },
    // Withdrawals Methods
    async fetchWithdrawals() {
      try {
        this.loadingWithdrawals = true;
        const response = await axios.get('/api/admin/withdrawals');
        if (response.data.success) {
          this.withdrawalRequests = response.data.data;
        } else {
          this.$toast.error('Failed to fetch withdrawal requests');
        }
      } catch (error) {
        console.error('Error fetching withdrawals:', error);
        this.$toast.error('Failed to fetch withdrawal requests');
      } finally {
        this.loadingWithdrawals = false;
      }
    },
    async approveWithdrawal(id) {
      try {
        await axios.post(`/api/admin/withdrawals/${id}/approve`);
        this.$toast.success('Withdrawal request approved');
        await this.fetchWithdrawals();
      } catch (error) {
        console.error('Error approving withdrawal:', error);
        this.$toast.error('Failed to approve withdrawal');
      }
    },
    async rejectWithdrawal(id) {
      try {
        await axios.post(`/api/admin/withdrawals/${id}/reject`);
        this.$toast.success('Withdrawal request rejected');
        await this.fetchWithdrawals();
      } catch (error) {
        console.error('Error rejecting withdrawal:', error);
        this.$toast.error('Failed to reject withdrawal');
      }
    },
    getRoleClass(role) {
      const classes = {
        matchmaker: 'bg-blue-100 text-blue-800',
        client: 'bg-green-100 text-green-800'
      };
      return classes[role] || 'bg-gray-100 text-gray-800';
    },
    getStatusClass(status) {
      const classes = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    },
    // Complaints Methods
    async fetchComplaints() {
      try {
        this.loadingComplaints = true;
        const response = await axios.get('/api/admin/complaints');
        if (response.data.success) {
          this.complaints = response.data.data;
        } else {
          this.$toast.error('Failed to fetch complaints');
        }
      } catch (error) {
        console.error('Error fetching complaints:', error);
        this.$toast.error('Failed to fetch complaints');
      } finally {
        this.loadingComplaints = false;
      }
    },
    async resolveComplaint(id) {
      try {
        await axios.post(`/api/admin/complaints/${id}/resolve`);
        this.$toast.success('Complaint resolved');
        await this.fetchComplaints();
      } catch (error) {
        console.error('Error resolving complaint:', error);
        this.$toast.error('Failed to resolve complaint');
      }
    },
    async refundMeeting(meetingId) {
      try {
        await axios.post(`/api/admin/meetings/${meetingId}/refund`);
        this.$toast.success('Meeting refunded successfully');
        await this.fetchComplaints();
      } catch (error) {
        console.error('Error refunding meeting:', error);
        this.$toast.error('Failed to refund meeting');
      }
    },
    getComplaintStatusClass(status) {
      const classes = {
        pending: 'bg-yellow-100 text-yellow-800',
        resolved: 'bg-green-100 text-green-800',
        refunded: 'bg-blue-100 text-blue-800'
      };
      return classes[status] || 'bg-gray-100 text-gray-800';
    }
  },
  watch: {
    // Watch for main tab changes to fetch relevant data
    activeMainTab(newTab) {
      if (newTab === 'supportMessages') {
        this.fetchSupportMessages();
      } else if (newTab === 'withdrawalsComplaints') {
        // Fetch both withdrawals and complaints when accessing this tab
        this.fetchWithdrawals();
        this.fetchComplaints();
      }
    },
    // Watch for sub tab changes to fetch relevant data
    activeSubTab(newTab) {
      if (newTab === 'withdrawals') {
        this.fetchWithdrawals();
      } else if (newTab === 'complaints') {
        this.fetchComplaints();
      }
    }
  },
  mounted() {
    // Initial data fetch based on the default active tab
    this.fetchSupportMessages();
  },
  beforeDestroy() {
    // Clean up any intervals or listeners if added in the future
  }
};
</script>

<style scoped>
/* Optional: Add custom scrollbar styling */
.max-h-96 {
  scrollbar-width: thin;
  scrollbar-color: #CBD5E0 #EDF2F7;
}

.max-h-96::-webkit-scrollbar {
  width: 8px;
}

.max-h-96::-webkit-scrollbar-track {
  background: #EDF2F7;
  border-radius: 6px;
}

.max-h-96::-webkit-scrollbar-thumb {
  background-color: #CBD5E0;
  border-radius: 6px;
  border: 2px solid #EDF2F7;
}
</style>
