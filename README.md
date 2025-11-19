# SD13 Sports Academy - Complete CMS System

A complete content management system for SD13 Sports Academy with dynamic content, admin panel, and database integration.

## Features

### 🏀 **Homepage**
- Dynamic hero section with video background
- Dynamic programs section
- Dynamic coaches section
- Dynamic testimonials
- Gallery with image management
- Contact form with Google Maps integration
- Bilingual support (English/Arabic) with RTL

### 🔧 **Admin Panel**
- Secure authentication system
- Content management for all sections
- File upload system for images and videos
- Real-time content updates
- User-friendly interface

### 🗄️ **Database**
- SQLite database with Prisma ORM
- Structured content management
- Image and video file storage
- User authentication

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up the database:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the website:**
   - Homepage: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - Admin Login: http://localhost:3000/admin/login

### Default Admin Credentials
- **Email:** admin@sd13academy.com
- **Password:** admin123

## Admin Panel Features

### 📝 **Content Management**
- **Hero Section:** Edit title, subtitle, description, and video
- **Programs:** Add, edit, delete training programs with images
- **Coaches:** Manage coach profiles with photos and bios
- **Testimonials:** Add customer reviews and ratings
- **Gallery:** Upload and manage images
- **Contact Info:** Update contact details and map location

### 🎨 **Design Features**
- Modern, responsive design
- Smooth animations with Framer Motion
- Professional color scheme
- Mobile-first approach
- SEO optimized

### 🌐 **Multilingual Support**
- English and Arabic languages
- RTL (Right-to-Left) support for Arabic
- Dynamic language switching
- Bilingual content management

## File Structure

```
src/
├── app/
│   ├── admin/                 # Admin panel pages
│   ├── api/                   # API routes
│   └── globals.css           # Global styles
├── components/               # React components
├── lib/                     # Utilities and configurations
├── data/                    # Static data (legacy)
└── prisma/                  # Database schema
```

## API Endpoints

### Content Management
- `GET/POST /api/hero` - Hero section content
- `GET/POST /api/programs` - Training programs
- `GET/POST /api/coaches` - Coach profiles
- `GET/POST /api/testimonials` - Customer testimonials
- `GET/POST /api/gallery` - Gallery images

### Authentication
- `POST /api/auth/signin` - Admin login
- `POST /api/auth/signout` - Admin logout

## Database Schema

The system uses the following main entities:
- **Users** - Admin authentication
- **HeroContent** - Homepage hero section
- **Programs** - Training programs
- **Coaches** - Coach profiles
- **Testimonials** - Customer reviews
- **GalleryImages** - Gallery photos
- **ContactInfo** - Contact details

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
Create a `.env` file with:
```
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
```

## Technologies Used

- **Frontend:** Next.js 15, React, TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **Database:** SQLite, Prisma ORM
- **Authentication:** NextAuth.js
- **File Upload:** Custom implementation
- **Icons:** Lucide React

## Support

For support or questions, contact the development team.

---

**SD13 Sports Academy** - Where champions are made! 🏀