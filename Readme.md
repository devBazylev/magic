# [🌟 View Live Application (click on the link)](https://magic-cfv9pi7y2-devbazylevs-projects.vercel.app/)

## 🧙‍♂️ Magic Shop - Fantasy Items Store

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.2.2-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Redux-1.9.7-purple?style=for-the-badge&logo=redux" alt="Redux" />
  <img src="https://img.shields.io/badge/SASS-1.89.2-pink?style=for-the-badge&logo=sass" alt="SASS" />
  <img src="https://img.shields.io/badge/Vite-7.0.6-646CFF?style=for-the-badge&logo=vite" alt="Vite" />
</div>

## 📖 Project Overview

Magic Shop is a modern, responsive web application for fantasy enthusiasts to browse, filter, and purchase magical items. Built with cutting-edge technologies, it provides an immersive shopping experience with features like favorites, cart management, and advanced filtering.

## ✨ Key Features

### 🛍️ **Shopping Experience**
- **Product Catalog**: Browse magical items with high-quality images
- **Smart Filtering**: Filter by categories (weapons, elixirs, artifacts, armors)
- **Advanced Sorting**: Sort by popularity, price (cheap/expensive), and rarity
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### ❤️ **User Features**
- **Favorites System**: Save favorite items with persistent storage
- **Shopping Cart**: Add items to cart with quantity management
- **User Authentication**: Secure login/logout system
- **Persistent State**: All preferences saved in localStorage

### 🎨 **UI/UX Features**
- **Modern Design**: Clean, fantasy-themed interface
- **Smooth Animations**: CSS transitions and hover effects
- **Modal Windows**: Detailed item information in popups
- **Toast Notifications**: User feedback for actions
- **Loading States**: Spinner components for better UX

## 🛠️ Technology Stack

### **Frontend**
- **React 18.2.0** - Modern UI library with hooks
- **TypeScript 5.2.2** - Type-safe JavaScript
- **Redux Toolkit 1.9.7** - State management
- **React Router 6.16.0** - Client-side routing
- **SASS 1.89.2** - CSS preprocessor with variables and mixins

### **Build Tools**
- **Vite 7.0.6** - Fast build tool and dev server
- **ESLint** - Code linting and formatting
- **Vitest 3.2.4** - Unit testing framework

### **UI Libraries**
- **React Toastify** - Toast notifications
- **React Helmet Async** - SEO and meta tags
- **Classnames** - Conditional CSS classes

### **Backend Integration**
- **Axios** - HTTP client for API calls
- **Mock API** - [Mokky.dev](https://mokky.dev/) for backend simulation

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/devbazylev/magic.git
   cd magic
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Available Scripts

```bash
npm start          # Start dev server with SASS compilation
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm test           # Run tests with Vitest
npm run sass       # Compile SASS to CSS
npm run deploy     # Deploy to GitHub Pages
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── app/            # Main app component
│   ├── card/           # Product card component
│   ├── card-list/      # Product grid component
│   ├── filter/         # Filtering component
│   ├── header/         # Navigation header
│   ├── modal/          # Modal dialogs
│   └── ...
├── pages/              # Page components
│   ├── main/           # Home page
│   ├── login/          # Authentication page
│   ├── favorites/      # Favorites page
│   └── error/          # Error page
├── store/              # Redux store
│   ├── site-data/      # Product data state
│   ├── site-process/   # UI state
│   └── user-process/   # User state
├── services/           # API services
├── utils.ts            # Utility functions
└── types.ts            # TypeScript type definitions
```

## 🎯 Key Components

### **Card Component**
- Displays product information
- Add to cart functionality
- Favorite toggle
- Responsive image loading

### **Filter System**
- Category filtering (checkboxes)
- Price and popularity sorting
- Real-time results update
- Persistent filter state

### **State Management**
- Redux Toolkit for global state
- Local storage integration
- Optimistic updates
- Error handling

## 🔧 Customization

### **Styling**
The project uses SASS with a modular approach:
- `variables.scss` - Color schemes and breakpoints
- `mixins.scss` - Reusable SASS mixins
- `blocks/` - Component-specific styles

### **Configuration**
- Environment variables in `vite.config.ts`
- TypeScript configuration in `tsconfig.json`
- ESLint rules in `.eslintrc`

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: 768px, 1024px, 1440px
- **Flexible Grid**: CSS Grid and Flexbox
- **Touch Friendly**: Large touch targets

## 🧪 Testing

The project includes comprehensive testing setup:
- **Vitest** for unit testing
- **Testing Library** for component testing
- **Mock Store** for Redux testing
- **Axios Mock Adapter** for API testing

## 🚀 Deployment

The application is deployed on GitHub Pages:
- Automatic deployment on push to main branch
- Production build optimization
- Asset compression and minification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Bazylev Aleksey**
- GitHub: [@devbazylev](https://github.com/devbazylev)
- Portfolio: [devbazylev.github.io](https://devbazylev.github.io)

---

<div align="center">
  <p>Made with ❤️ and magic ✨</p>
  <p>Built for fantasy enthusiasts and modern web development</p>
</div>
