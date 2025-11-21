---
trigger: always_on
---

B2B Marketing Platform
A business-to-business marketing platform enabling companies to promote and sell products from other businesses.
Tech Stack

Frontend: React
Backend: Supabase (PostgreSQL, Auth, Storage, Real-time)

Architecture Overview
This platform connects businesses that want to market products (sellers) with businesses looking to purchase (buyers). The application facilitates product listings, marketing campaigns, and B2B transactions.
Core Components
Frontend (React)

Product catalog and search
Marketing campaign management
Business user dashboard
Order and transaction tracking
Analytics and reporting interface

Backend (Supabase)

PostgreSQL database for business accounts, products, orders
Row Level Security (RLS) for multi-tenant data isolation
Authentication for business users
Storage for product images and marketing materials
Real-time subscriptions for order updates

Database Schema
Key tables:

products - Product catalog with pricing and inventory
campaigns - Marketing campaigns and promotions
orders - B2B transactions and order history
analytics - Platform usage and conversion metrics
mail - templates

Key Features

Multi-business product marketplace
Campaign creation and management tools
Business authentication and authorization
Real-time order notifications
Analytics dashboard for marketing performance
Filtering businesses to sell products
Business name and location, is albanian business 

Security Considerations

Implement RLS policies to isolate business data
Validate business credentials before access
Secure API keys and never expose service role key on frontend
Use Supabase Auth for session management
Implement rate limiting for API endpoints

AI Model Instructions
When working with this codebase:

Business logic should enforce B2B relationships (no B2C)
All queries must respect RLS policies for data isolation
Use Supabase client-side SDK for frontend operations
Implement proper error handling for failed transactions
Cache product data to minimize database calls
Use real-time subscriptions for order status updates