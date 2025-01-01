// ResetPasswordForm.vue
<template>
  <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 flex items-center justify-center">        
    <div class="w-full max-w-sm mt-20">
      <div class="reset-password">            
        <div class="font-bold text-xl mb-2">Reset Password</div>
        <form @submit.prevent="resetPassword" class="bg-connectyed-card-light shadow-md rounded px-8 pt-6 pb-8 mb-4 border-solid border-2 border-gray-200">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              :value="emailValue"
              type="email"
              id="email"
              disabled
              required
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 bg-gray-100"
            />
          </div>
          <div class="form-group">
            <label for="password">New Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              required
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
          </div>
          <div class="form-group">
            <label for="password_confirmation">Confirm Password</label>
            <input
              v-model="password_confirmation"
              type="password"
              id="password_confirmation"
              required
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            />
          </div>
          <button 
            type="submit" 
            :disabled="processing"
            class="bg-connectyed-button-light text-connectyed-button-dark hover:bg-connectyed-button-hover-light hover:text-connectyed-button-light w-full h-12 transition-colors duration-150 focus:shadow-outline font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {{ processing ? 'Resetting Password...' : 'Reset Password' }}
          </button>
        </form>
        <p v-if="successMessage" class="text-green-500 text-center">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    token: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  
  data() {
    return {
      emailValue: this.email,
      password: '',
      password_confirmation: '',
      successMessage: '',
      errorMessage: '',
      processing: false
    }
  },

  mounted() {
    if (!this.token || !this.email) {
      this.errorMessage = 'Invalid password reset link'
      setTimeout(() => {
        this.$router.push('/password/forgot')
      }, 2000)
    }
  },

  methods: {
    async resetPassword() {
      this.processing = true
      this.errorMessage = ''
      this.successMessage = ''

      try {
        console.log('Attempting password reset with:', {
          token: this.token,
          email: this.email,
          password: '***'
        });

        if (this.password !== this.password_confirmation) {
          throw new Error('Passwords do not match')
        }

        if (this.password.length < 8) {
          throw new Error('Password must be at least 8 characters long')
        }

        const response = await axios.post('/api/reset-password', {
          token: this.token,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })

        console.log('Reset password response:', response);
        this.successMessage = 'Password reset successfully! Redirecting to login...'
        
        // Clear sensitive data
        this.password = ''
        this.password_confirmation = ''
        
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
      } catch (error) {
        console.error('Reset password error:', error.response?.data);
        if (error.message) {
          this.errorMessage = error.message
        } else {
          this.errorMessage = error.response?.data?.error || 
                            error.response?.data?.message || 
                            'Failed to reset password. Please try again.'
        }
      } finally {
        this.processing = false
      }
    }
  }
}
</script>