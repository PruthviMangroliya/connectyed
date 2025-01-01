// ForgotPasswordForm.vue
<template>
  <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex items-center justify-center">        
    <div class="w-full max-w-sm mt-20">
      <div class="forgot-password">
        <div class="font-bold text-xl mb-2">Forgot Password</div>            
        <form @submit.prevent="submitEmail" class="bg-connectyed-card-light shadow-md rounded px-8 pt-6 pb-8 mb-4 border-solid border-2 border-gray-200">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
          </div>
          <button 
            type="submit" 
            :disabled="processing"
            class="bg-connectyed-button-light text-connectyed-button-dark hover:bg-connectyed-button-hover-light hover:text-connectyed-button-light w-full h-12 transition-colors duration-150 focus:shadow-outline font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {{ processing ? "Please wait..." : "Send Reset Link" }}
          </button>
        </form>
        <p v-if="successMessage" class="text-green-500 text-center">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      processing: false,
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitEmail() {
      this.processing = true;
      this.errorMessage = '';
      this.successMessage = '';
      
      try {
        console.log('Submitting reset password request for:', this.email);
        const response = await axios.post('/api/forgot-password', {
          email: this.email
        });
        console.log('Reset password response:', response);
        this.successMessage = response.data.message;
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
      } catch (error) {
        console.error('Reset password error:', error);
        this.errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          'Failed to send reset link';
      } finally {
        this.processing = false;
      }
    }
  }
}
</script>