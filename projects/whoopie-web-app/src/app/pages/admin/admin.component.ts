import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FirebaseService } from '../../core/services/firebase.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  loginForm: FormGroup;
  isAuthenticated = signal(false);
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  firebaseService = inject(FirebaseService);
  
  // Use computed to derive state
  showContent = computed(() => this.isAuthenticated());
  showLoginForm = computed(() => !this.isAuthenticated());

  constructor(
    private fb: FormBuilder,
    private auth: Auth
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    
    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.isAuthenticated.set(true);
    } catch (error: any) {
      console.error('Login error:', error);
      // Show friendly error message
      this.errorMessage.set(
        error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' 
          ? 'Invalid email or password' 
          : 'An error occurred during login. Please try again.'
      );
    } finally {
      this.isLoading.set(false);
    }
  }

  logout() {
    this.auth.signOut();
    this.isAuthenticated.set(false);
  }

  // Form validation helpers
  get emailControl() { return this.loginForm.get('email'); }
  get passwordControl() { return this.loginForm.get('password'); }
  get emailError() { 
    const control = this.emailControl;
    if (control?.touched) {
      if (control.hasError('required')) return 'Email is required';
      if (control.hasError('email')) return 'Please enter a valid email';
    }
    return null;
  }
  get passwordError() {
    const control = this.passwordControl;
    if (control?.touched) {
      if (control.hasError('required')) return 'Password is required';
      if (control.hasError('minlength')) return 'Password must be at least 6 characters';
    }
    return null;
  }

  getPosts() {
    this.firebaseService.getFirestoreData('blogPosts').subscribe((data) => {
      console.log('Firestore data:', data);
    });
  }

  uploadPost() {
    const newPost = {
      id: Date.now(),
      title: 'New Blog Post ' + new Date().toLocaleDateString(),
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'This is a new blog post created from the admin panel.',
      date: new Date().toISOString().split('T')[0],
      author: 'Admin User',
      readTime: '5 min read',
      tags: ['Admin', 'New Post', 'Firestore']
    };

    this.isLoading.set(true);

    this.firebaseService.addFirestoreData('blogPosts', newPost)
      .subscribe({
        next: (docId) => {
          console.log(`Post uploaded successfully with ID: ${docId}`);
          this.isLoading.set(false);
          // Show success message - you could add a success message signal here
        },
        error: (error) => {
          console.error('Error uploading post:', error);
          this.isLoading.set(false);
          this.errorMessage.set('Failed to upload post. Please try again.');
        }
      });
  }
}
