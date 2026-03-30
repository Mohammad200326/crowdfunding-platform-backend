# 🎯 Crowdfunding Platform

## 📌 Overview

A crowdfunding platform that enables individuals and organizations to raise funds for their ideas, projects, or causes through public contributions.

Users can create campaigns, explore active projects, donate securely, and track progress, while the platform ensures trust through verification, moderation, and payment management.

---

## 🚀 Features

### 👤 User Roles
- **Donor** – browse and support campaigns  
- **Campaign Creator** – create and manage campaigns  
- **Admin** – review and moderate platform activity  

---

### 📢 Campaign Management
- Create, update, and manage fundraising campaigns  
- Set funding goals, timelines, and categories  
- Track campaign status (pending, confirmed, rejected)  
- Publish campaign updates  

---

### 💰 Donations & Payments
- Secure donations using **Stripe integration**  
- Track payment status (pending, completed, failed)  
- Support multiple donations per campaign  

---

### 🔐 Verification System
- Identity verification for:
  - Donors  
  - Campaign creators  
- Helps ensure trust and prevent fraud  

---

### ❤️ Engagement
- Like campaigns  
- User preferences for personalized experience  

---

### 🏦 Withdrawals
- Campaign creators can withdraw funds  
- Bank account integration  
- Platform fee handling  

---

### 🖼️ Asset Management
- Unified system for managing:
  - Campaign images  
  - Identity documents  
  - Bank verification files  

---

## 🧩 System Workflow

1. User signs up  
2. Creator creates a campaign  
3. Admin reviews and approves it  
4. Donors browse and donate  
5. Campaign collects funds  
6. Creator requests withdrawal  
7. Funds are transferred after approval  

---

## 🛠️ Tech Stack

- **Backend:** NestJS  
- **Database:** MySQL  
- **ORM:** Prisma  
- **Payments:** Stripe  
- **Storage:** ImageKit  
- **Validation:** Zod  

---

## 📊 Database Design

The system is built around key entities such as:

- Users  
- Campaigns  
- Donations  
- Campaign Updates  
- Withdrawals  
- Identities (Donor & Creator)  
- Assets  

👉 Full schema available in Prisma file

---

## 👥 Team

- Osama Ibrahim Zuraid  
- Abdelqader Anwar Safi  
- Omar Nazeeh Qalalweh  
- **Mohammad Iyad Al Khudary (Team Lead)**  

---

## 🏁 Status

🚧 In Progress — Core features implemented, with ongoing improvements and refinements.
