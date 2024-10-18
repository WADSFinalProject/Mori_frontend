# Mori: Frontend Repository

<img src="Mori.png" alt="Our App's Video" style="border-radius: 15px; margin-bottom: 20px; width: 250px;">


[![Our App's Video](https://img.shields.io/badge/Our%20App's%20Promo%20Video-Watch-red?logo=youtube)](https://www.youtube.com/watch?v=NWyZfkSVxP8)
[![Project Documentation](https://img.shields.io/badge/Report-Read-blue?logo=microsoft-word)](https://drive.google.com/file/d/1H2l_C8Pp526vc9zQG0F9yThzrXiQZu6I/view?usp=sharing)


### What is Mori?
**Mori** is an app designed to simplify the supply chain system of **moringa leaves production**. It helps manage and streamline the entire process, ensuring efficient tracking and coordination from collection to production and distribution. The system includes various roles such as Centra, Harbor Guard, XYZ, and Admin. 


### Features per roles
 - Centra: 
    - Monitor and ensure the collection, processing, and shipping of leaves meet required standards.
    - Record data on collected wet leaves, initiate processing machines, monitor countdowns, and input new weight data post-processing.
    - Create batches of wet, dried, and processed leaves, ensuring correct weights and dates to determine expiry.
    - Input airway bill details for each shipment to track detailed information and associated batches.
 - Harbor Guard: 
    - Oversees and monitors the shipment of moringa leaves from centra locations to their harbor. 
    - Provide updates on shipment status, notify XYZ of arrivals or missing shipments, and inform XYZ when shipments are ready for pickup.
 - XYZ: 
    - Oversee machine statuses and stock updates at Centra locations.
    - Receive notifications when stock is available and schedule pickups to respective harbors.
    - Monitor shipment status and edit shipment batch data after confirmation and reception note creation.
    - Access shipment histories and reception documents via the desktop version.
    - View detailed information on Centra's real-time stock, machine load, and warehouse stock and capacity.
 - Admin: 
    - Monitor Centras, Shipments, Harbor Guards, XYZs, and Users.
    - Add new user accounts (without passwords for security), Centras with their machines, harbor locations, and XYZ warehouse locations.
    - Monitor all the mentioned data and edit/delete them when needed to ensure all data stays up to date. 
    - Monitor all centras respective datas like machine's real-time state and stocks.
    - Monitor shipments, including detailed information such as status and involved batches.


### How to run: Frontend Repository

Step 1: On your terminal, git clone the repository
```
git clone git@github.com:WADSFinalProject/Mori_frontend.git
```

Step 2: Navigate to the main folder 
```
cd Mori
```

Step 3: Install NPM
```
npm install
```

Step 3: Run the app
```
npm run dev
```

Step 4: Inspect the output to find the link of the localhost, to be able to add it to the backend code (for CORS purposes). 


### Credentials for testing purposes

**Admin Account**

Email: morimori@gmail.com

Password: Mori12312


Please contact our team for OTP code! :D 

