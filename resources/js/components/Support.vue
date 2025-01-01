<!-- components/Support.vue -->
<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Support Messages</h3>
        <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700">
          <span class="text-2xl">&times;</span>
        </button>
      </div>

      <!-- Messages Container -->
      <div class="h-96 overflow-y-auto mb-4 border rounded-lg p-4">
        <div v-if="messages.length === 0" class="text-center text-gray-500 py-4">
          No support messages yet. Start a conversation!
        </div>
        <div v-else>
          <div
            v-for="message in sortedMessages"
            :key="message.id"
            :class="[
              'mb-4 p-3 rounded-lg',
              message.sender_id === currentUser.id
                ? 'bg-blue-100 ml-12'
                : 'bg-gray-100 mr-12'
            ]"
          >
            <div class="flex justify-between items-start">
              <span class="font-semibold text-sm">
                {{ message.sender_id === currentUser.id ? 'You' : 'Support' }}
              </span>
              <span class="text-xs text-gray-500">
                {{ formatDate(message.created_at) }}
              </span>
            </div>
            <p class="mt-1">{{ message.message }}</p>
          </div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="flex gap-2">
        <input
          v-model="newMessage"
          type="text"
          placeholder="Type your message..."
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          @keyup.enter="sendMessage"
        />
        <button
          @click="sendMessage"
          :disabled="!newMessage.trim() || sending"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {{ sending ? 'Sending...' : 'Send' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import axios from 'axios';

export default {
  name: 'Support',
  props: {
    currentUser: {
      type: Object,
      required: true
    },
    authorization: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      adminId: 1, // Assuming admin ID is 1
      sending: false, // To handle sending state
    };
  },
  computed: {
    sortedMessages() {
      return [...this.messages].sort((a, b) => 
        new Date(a.created_at) - new Date(b.created_at)
      );
    }
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), 'MMM d, yyyy h:mm a');
    },
    async fetchMessages() {
      try {
        const response = await axios.get('/api/messages', {
          headers: { Authorization: `Bearer ${this.authorization.token}` }
        });
        if (response.data.success) {
          // Filter messages between current user and admin
          this.messages = response.data.data.filter(msg => 
            (msg.sender_id === this.currentUser.id && msg.receiver_id === this.adminId) ||
            (msg.sender_id === this.adminId && msg.receiver_id === this.currentUser.id)
          );
        } else {
          console.error('Failed to fetch messages:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    },
    async sendMessage() {
      if (!this.newMessage.trim()) return;

      this.sending = true;

      try {
        const response = await axios.post('/api/messages/send', {
          receiver_id: this.adminId,
          message: this.newMessage.trim()
        }, {
          headers: { Authorization: `Bearer ${this.authorization.token}` }
        });

        if (response.data.success) {
          this.messages.push(response.data.data);
          this.newMessage = '';
        } else {
          alert(response.data.message || 'Failed to send message.');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        alert('An error occurred while sending the message.');
      } finally {
        this.sending = false;
      }
    }
  },
  mounted() {
    this.fetchMessages();
  }
};
</script>

<style scoped>
.fixed {
  position: fixed;
}
.inset-0 {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.bg-gray-600 {
  background-color: #4a5568;
}
.bg-opacity-50 {
  background-opacity: 0.5;
}
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.justify-center {
  justify-content: center;
}
.z-50 {
  z-index: 50;
}
.bg-white {
  background-color: #ffffff;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.p-6 {
  padding: 1.5rem;
}
.w-full {
  width: 100%;
}
.max-w-2xl {
  max-width: 42rem;
}
.mx-4 {
  margin-left: 1rem;
  margin-right: 1rem;
}
.flex-1 {
  flex: 1;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.border {
  border: 1px solid #e2e8f0;
}
.rounded-lg {
  border-radius: 0.5rem;
}
.focus\:outline-none:focus {
  outline: none;
}
.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
}
.focus\:ring-blue-500:focus {
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
}
.bg-blue-100 {
  background-color: #ebf8ff;
}
.bg-gray-100 {
  background-color: #f7fafc;
}
.bg-blue-500 {
  background-color: #4299e1;
}
.bg-blue-600 {
  background-color: #3182ce;
}
.text-gray-500 {
  color: #a0aec0;
}
.text-gray-700 {
  color: #4a5568;
}
.text-blue-500 {
  color: #4299e1;
}
.text-blue-600 {
  color: #3182ce;
}
.text-red-500 {
  color: #f56565;
}
.text-white {
  color: #ffffff;
}
.hover\:text-gray-700:hover {
  color: #4a5568;
}
.hover\:bg-blue-600:hover {
  background-color: #3182ce;
}
.hover\:bg-blue-500:hover {
  background-color: #4299e1;
}
.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}
.hover\:bg-red-600:hover {
  background-color: #c53030;
}
.rounded-full {
  border-radius: 9999px;
}
.shadow-lg {
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.space-x-2 > :not([hidden]) ~ :not([hidden]) {
  margin-left: 0.5rem;
}
</style>
