# FoodLink – Bridging Waste and Want

![version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)

<p>&nbsp;</p>

FoodLink is an innovative platform designed to connect food surplus with those in need, effectively bridging the gap between waste and want in our communities. Our platform facilitates the connection between food businesses with surplus and organizations that help those in need, making food distribution more efficient and reducing waste.

---

### Features

- **Smart Food Matching**: Automatically connects food donors with nearby recipient organizations
- **Real-time Tracking**: Monitor food pickup and delivery status in real-time
- **Interactive Dashboard**: User-friendly interface for managing donations and requests
- **Chatbot Assistant**: AI-powered support for quick assistance and information
- **Impact Analytics**: Track and visualize your contribution to reducing food waste
- **NGO Management**: Dedicated portal for NGOs to manage food requests and distributions
- **Donor Portal**: Easy-to-use interface for businesses to list and manage food donations
- **Interactive Map**: Visualize nearby donation opportunities and NGO locations

### Tech Stack

#### Frontend
- React.js
- Chakra UI
- Modern JavaScript (ES6+)
- Interactive Maps
- Real-time Chat

#### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- RESTful APIs

### Getting Started

#### Prerequisites
- Node.js LTS version
- MongoDB installed and running
- Git

#### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rushabh-K/Asep-Sem-2-Final-Project.git
cd Asep-Sem-2-Final-Project
```

2. Install client dependencies:
```bash
npm install --legacy-peer-deps
```

3. Install server dependencies:
```bash
cd server
npm install
```

#### Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. In a new terminal, start the frontend application:
```bash
# From the root directory
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Project Structure

```
foodlink/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/               # Source files
│       ├── components/    # Reusable components
│       ├── views/         # Page components
│       ├── contexts/      # React contexts
│       └── routes/        # Application routes
└── server/                # Backend Node.js application
    ├── routes/            # API routes
    ├── models/            # Database models
    ├── middleware/        # Custom middleware
    └── scripts/           # Utility scripts
```

### Contributing

We welcome contributions to FoodLink! If you'd like to contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

This project is dedicated to making a positive impact on our communities by reducing food waste and helping those in need.
