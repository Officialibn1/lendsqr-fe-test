# Lendsqr Frontend Engineer Assessment

A pixel-perfect implementation of the Lendsqr Admin Console frontend, built as part of the technical assessment for the Frontend Engineer position. This project demonstrates proficiency in modern React development, TypeScript, responsive design, and frontend best practices.

## 🎯 Assessment Overview

This assessment tests competence in building a production-ready admin dashboard with the following requirements:

- **Visual Fidelity**: 100% pixel-perfect implementation of the Figma design
- **Code Quality**: Well-structured, maintainable, and scalable codebase
- **Best Practices**: Modern React patterns, TypeScript usage, and architectural decisions
- **Responsiveness**: Mobile-first responsive design across all device types
- **Performance**: Optimized bundle sizes with code splitting and lazy loading

## 🚀 Live Demo

[View Live Application](https://isah-ibn-muhammad-lendsqr-fe-test.vercel.app/)

## 📋 Features Implemented

### Core Pages

- ✅ **Login Page**: Dummy authentication with form validation
- ✅ **Users Page**: Comprehensive user management with advanced filtering
- ✅ **User Details**: Detailed user information with local storage persistence

### Advanced Functionality

- ✅ **Advanced Filtering**: Multi-field search and filter system with debouncing
- ✅ **Responsive Design**: Mobile-first approach with breakpoint optimization
- ✅ **Empty States**: User-friendly empty states with actionable CTAs
- ✅ **Loading States**: Skeleton loaders and suspense boundaries
- ✅ **Error Handling**: Comprehensive error states with retry mechanisms
- ✅ **Code Splitting**: Route-based and component-based lazy loading
- ✅ **Performance Optimization**: Bundle splitting and caching strategies

## 🛠 Technology Stack

### Core Technologies

- **React 19.2.0**: Latest React with concurrent features
- **TypeScript 5.9.3**: Strict type checking for code reliability
- **Vite 7.2.4**: Fast build tool with HMR and optimized bundling
- **SCSS**: Advanced styling with variables, mixins, and modular architecture

### State Management & Data Fetching

- **Redux Toolkit 2.11.2**: Predictable state management with RTK Query
- **RTK Query**: Efficient data fetching, caching, and synchronization
- **Redux Persist 6.0.0**: State persistence across browser sessions

### UI & Styling

- **Radix UI 3.3.0**: Accessible, unstyled UI primitives
- **React Icons 5.5.0**: Comprehensive icon library
- **SCSS Modules**: Scoped styling with CSS modules pattern
- **Responsive Design**: Mobile-first with custom breakpoint system

### Form Management & Validation

- **React Hook Form 7.71.1**: Performant forms with minimal re-renders
- **Zod 4.3.6**: TypeScript-first schema validation
- **Hookform Resolvers 5.2.2**: Integration between RHF and Zod

### Data & Table Management

- **TanStack Table 8.21.3**: Headless table library with advanced features
- **Date-fns 4.1.0**: Modern date utility library
- **Use-debounce**: Optimized search input handling

### Development & Build Tools

- **ESLint 9.39.1**: Code linting with TypeScript support
- **Sass 1.97.3**: SCSS preprocessing
- **TypeScript ESLint 8.46.4**: TypeScript-specific linting rules

### Testing & Quality

- **Strict TypeScript Configuration**: Zero `any` types, strict null checks
- **ESLint Configuration**: Comprehensive linting rules
- **Code Splitting**: Optimized bundle sizes for performance

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── schemas/         # Form validation schemas
│   ├── table-columns/   # Table column definitions
│   └── ui/              # Generic UI components
│       ├── dashboard-sidenav.tsx
│       ├── header.tsx
│       ├── filter-dropdown.tsx
│       ├── pagination.tsx
│       └── empty-state.tsx
├── pages/               # Route-based page components
│   ├── Dashboard.tsx    # Main dashboard layout
│   ├── UsersPage.tsx    # User management page
│   └── UserDetails.tsx  # Individual user details
├── services/            # API layer and data fetching
│   └── userApi.ts       # RTK Query API definitions
├── store/               # Redux store configuration
│   └── index.ts         # Store setup with persistence
├── styles/              # SCSS styling system
│   ├── _variables.scss  # Design system variables
│   └── *.module.scss    # Component-specific styles
├── assets/              # Static assets and icons
├── routes.ts            # Application routing configuration
└── main.tsx             # Application entry point
```

## 🎨 Design System

### Color Palette

- **Primary Blue**: `#213f7d` - Main brand color
- **Teal**: `#39cdcc` - Accent and interactive elements
- **Text**: `#545f7d` - Primary text color
- **Background**: `#fbfbfb` - Page background
- **Status Colors**: Success (`#39cd62`), Error (`#e4033b`), Warning (`#e9b200`)

### Typography Scale

- **H1**: 40px - Page titles
- **H2**: 32px - Section headers
- **Body**: 20px - Large text
- **Base**: 16px - Standard text
- **Small**: 14px - Secondary text
- **XS**: 12px - Captions and labels

### Responsive Breakpoints

- **Mobile**: 480px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Officialibn1/lendsqr-fe-test.git
   cd lendsqr-fe-test
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev          # Start development server with HMR
npm run build        # Build for production with optimizations
npm run preview      # Preview production build locally
npm run lint         # Run ESLint for code quality checks
```

## 📊 Performance Optimizations

### Code Splitting Strategy

- **Route-based splitting**: Each page loads independently
- **Component-based splitting**: Heavy components load on-demand
- **Vendor chunking**: Third-party libraries separated for better caching

### Bundle Analysis (After Optimization)

- **Main Bundle**: 234KB (75KB gzipped) - 70% reduction from original
- **Vendor Chunks**: Separated by functionality for optimal caching
- **Lazy Components**: FilterDropdown and other heavy components load on-demand

### Performance Features

- **Debounced Search**: 300ms delay prevents excessive API calls
- **Virtualized Tables**: Efficient rendering of large datasets
- **Memoized Components**: Prevents unnecessary re-renders
- **Optimized Images**: SVG icons and optimized assets

## 🔧 Key Implementation Details

### Advanced Filtering System

- Multi-field search across name, email, organization, phone
- Date-based filtering with exact date matching
- Organization and status dropdown filters
- Real-time filter state management with debouncing
- Filter persistence across page refreshes

### Data Management

- RTK Query for efficient API calls and caching
- Optimistic updates for better user experience
- Error boundaries and retry mechanisms

### Responsive Design

- Mobile-first CSS architecture
- Flexible grid systems with CSS Grid and Flexbox
- Responsive typography with fluid scaling
- Touch-friendly interactive elements

### Accessibility

- Semantic HTML structure
- ARIA labels and roles where needed
- Screen reader compatibility

## 📄 License

This project is created for assessment purposes and is not intended for commercial use.

---

**Built with ❤️ for the Lendsqr Frontend Engineer Assessment**
