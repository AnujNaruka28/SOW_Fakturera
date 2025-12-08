# Easy Deployment Guide: React + Node.js (Express) on Linux VM

This guide is designed for beginners. It will walk you through deploying your "SOW_Fakturera" project on a fresh Linux Virtual Machine (VM).

## Prerequisites

1.  **A Linux VM**: You can get a free one from:
    *   **Oracle Cloud Free Tier** (Recommended: "Always Free" ARM instance is very powerful).
    *   **AWS Free Tier** (EC2 t2.micro or t3.micro for 12 months).
    *   **Google Cloud Free Tier** (e2-micro instance).
    *   *Note: Select "Ubuntu 22.04" or "Ubuntu 24.04" as your Operating System.*

2.  **Access**: You should have the IP address of your VM and be able to connect via SSH.

---

## Step 1: Connect to your VM

Open your terminal (PowerShell on Windows, Terminal on Mac/Linux) and run:

```bash
ssh ubuntu@YOUR_VM_IP_ADDRESS
```
*(If you have a key file, use: `ssh -i path/to/key.pem ubuntu@YOUR_VM_IP`)*

---

## Step 2: Set Initial Environment

Once logged in, run these commands one by one to update the system and install necessary tools.

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Git, Curl, and Nginx (Web Server)
sudo apt install git curl nginx -y

# Install Node.js (Version 20)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (Process Manager to keep backend running)
sudo npm install -g pm2
```

---

## Step 3: Clone Your Code

```bash
# Go to the home directory
cd ~

# Clone your repository (Replace URL with your actual GitHub URL)
git clone https://github.com/AnujNaruka28/SOW_Fakturera.git

# Enter the project folder
cd SOW_Fakturera
```

---

## Step 4: Deploy Backend

We will set up the backend first.

1.  **Go to server folder and install dependencies**:
    ```bash
    cd server
    npm install
    ```

2.  **Create Environment Variables**:
    You need to create the `.env` file.
    ```bash
    nano .env
    ```
    Paste your environment variables inside. It should look something like this (update with your real values):
    ```env
    PORT=5000
    NODE_ENV=production
    DATABASE_URL="your_prisma_accelerate_url_here"
    JWT_SECRET="your_secret_here"
    FRONTEND_URL="http://YOUR_VM_IP" 
    # ^ IMPORTANT: Set FRONTEND_URL to your VM's IP or Domain for CORS
    ```
    *Press `Ctrl+X`, then `Y`, then `Enter` to save and exit.*

3.  **Generate Prisma Client**:
    ```bash
    npx prisma generate
    ```

4.  **Start Backend with PM2**:
    ```bash
    pm2 start index.js --name "sow-backend"
    pm2 save
    pm2 startup
    # (Copy run the command output by pm2 startup if asked)
    ```

    *Your backend is now running in the background on port 5000.*

---

## Step 5: Deploy Frontend

Now we will build the React app and let Nginx serve it.

1.  **Go directly to the root folder (where your React app is)**:
    ```bash
    cd ~/SOW_Fakturera
    ```

2.  **Install Frontend Dependencies**:
    ```bash
    npm install
    ```

3.  **Build the Project**:
    Important: Create a `.env` file for frontend production build if you have env vars like `VITE_API_URL`.
    ```bash
    nano .env
    ```
    Add:
    ```env
    VITE_API_BASE_URL=http://YOUR_VM_IP/api/v1
    ```
    *(Note: We will configure Nginx so `/api/v1` redirects to your backend)*

    Now build:
    ```bash
    npm run build
    ```
    This will create a `dist` folder.

4.  **Move Build Files to Nginx**:
    ```bash
    # Create a folder for your site
    sudo mkdir -p /var/www/sow-app

    # Copy files
    sudo cp -r dist/* /var/www/sow-app/

    # Set permissions
    sudo chown -R www-data:www-data /var/www/sow-app
    ```

---

## Step 6: Configure Nginx (The Magic Glue)

Nginx will listen on port 80 (HTTP). It will serve your React files for normal requests, and forward any `/api` requests to your Node.js backend running on port 5000.

1.  **Create Config File**:
    ```bash
    sudo nano /etc/nginx/sites-available/sow-app
    ```

2.  **Paste Configuration**:
    *(Replace `YOUR_VM_IP` with your actual IP address or domain name)*
    ```nginx
    server {
        listen 80;
        server_name YOUR_VM_IP;

        # serve frontend files
        location / {
            root /var/www/sow-app;
            index index.html;
            try_files $uri $uri/ /index.html;
        }

        # proxy api requests to backend
        location /api/ {
            proxy_pass http://localhost:5000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

3.  **Enable the Site**:
    ```bash
    sudo ln -s /etc/nginx/sites-available/sow-app /etc/nginx/sites-enabled/
    sudo rm /etc/nginx/sites-enabled/default  # Remove default welcome page
    ```

4.  **Restart Nginx**:
    ```bash
    sudo nginx -t  # Test config for errors
    sudo systemctl restart nginx
    ```

---

## Step 7: Final Check

Open your browser and visit `http://YOUR_VM_IP`.
You should see your React app. Try logging in or fetching data to verify the Backend connection works.

---

## (Optional) Step 8: Add Domain & HTTPS

If you buy a domain (e.g., `myapp.com`):
1.  Point the Domain's **A Record** to your VM's IP.
2.  Update `server_name` in Step 6 to `myapp.com www.myapp.com`.
3.  Run Certbot for free SSL:
    ```bash
    sudo apt install python3-certbot-nginx -y
    sudo certbot --nginx -d myapp.com -d www.myapp.com
    ```
