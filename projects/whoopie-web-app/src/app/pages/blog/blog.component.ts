import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';

interface BlogPost {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
  blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The State of Front-End Frameworks in 2025',
      imageUrl: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Compare React, Vue, Angular, Svelte, and emerging frameworks with performance benchmarks and community adoption rates.',
      date: '2023-11-15',
      author: 'Emma Rodriguez',
      readTime: '8 min read',
      tags: ['Frameworks', 'React', 'Vue', 'Angular', 'Svelte']
    },
    {
      id: 2,
      title: 'Mastering CSS Grid and Flexbox',
      imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Advanced layout techniques with practical examples for responsive design challenges.',
      date: '2023-10-28',
      author: 'Alex Chen',
      readTime: '6 min read',
      tags: ['CSS', 'Grid', 'Flexbox', 'Responsive Design']
    },
    {
      id: 3,
      title: 'Accessibility First: Building Inclusive Web Experiences',
      imageUrl: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Strategies, tools, and testing methods to ensure your websites work for everyone.',
      date: '2023-10-15',
      author: 'Jamie Taylor',
      readTime: '7 min read',
      tags: ['Accessibility', 'a11y', 'Inclusive Design']
    },
    {
      id: 4,
      title: 'Performance Optimization Techniques for Modern Web Apps',
      imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Lazy loading, code splitting, caching strategies, and measuring core web vitals.',
      date: '2023-09-30',
      author: 'Michael Johnson',
      readTime: '9 min read',
      tags: ['Performance', 'Optimization', 'Web Vitals']
    },
    {
      id: 5,
      title: 'From Junior to Senior: Front-End Career Path Roadmap',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Skills, portfolio tips, and learning resources to advance your front-end career.',
      date: '2023-09-15',
      author: 'Sarah Miller',
      readTime: '10 min read',
      tags: ['Career', 'Learning', 'Professional Development']
    },
    {
      id: 6,
      title: 'Design Systems at Scale',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'How to build, maintain, and evolve a design system for consistent UX across multiple projects.',
      date: '2023-08-28',
      author: 'David Park',
      readTime: '8 min read',
      tags: ['Design Systems', 'UX', 'Component Libraries']
    },
    {
      id: 7,
      title: 'WebAssembly for Front-End Developers',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Practical use cases and getting started with WASM in your web applications.',
      date: '2023-08-10',
      author: 'Chris Williams',
      readTime: '11 min read',
      tags: ['WebAssembly', 'WASM', 'Performance']
    },
    {
      id: 8,
      title: 'Front-End Testing Strategies',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Unit, integration, and end-to-end testing approaches with modern tools like Cypress, Jest, and Testing Library.',
      date: '2023-07-28',
      author: 'Nicole Garcia',
      readTime: '7 min read',
      tags: ['Testing', 'Cypress', 'Jest', 'QA']
    },
    {
      id: 9,
      title: 'CSS-in-JS vs. Traditional Styling: The Great Debate',
      imageUrl: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'Compare methodologies with real-world pros and cons.',
      date: '2023-07-15',
      author: 'Thomas Wilson',
      readTime: '6 min read',
      tags: ['CSS-in-JS', 'Styling', 'CSS', 'Best Practices']
    },
    {
      id: 10,
      title: 'Building for the Edge: Modern Deployment Strategies',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      description: 'CDNs, edge functions, and optimizing global performance of front-end applications.',
      date: '2023-06-30',
      author: 'Lisa Thompson',
      readTime: '9 min read',
      tags: ['Edge Computing', 'CDN', 'Deployment', 'Performance']
    }
  ];
}
