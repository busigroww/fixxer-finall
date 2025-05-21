# Vercel Deployment Guide for Fixxer Website

This guide will help you connect the Fixxer website to your own Vercel account for future management and updates.

## Prerequisites

1. A Vercel account (free to create at [vercel.com](https://vercel.com))
2. The Fixxer website files (which you already have)

## Step-by-Step Instructions

### 1. Create a Vercel Account (if you don't have one)

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose to sign up with GitHub, GitLab, Bitbucket, or email
3. Complete the registration process

### 2. Install Vercel CLI (Optional but Recommended)

If you want to deploy from your computer:

```bash
npm install -g vercel
```

### 3. Prepare Your Website Files

1. Extract the Fixxer website files to a folder on your computer
2. Make any desired changes to the HTML, CSS, or JavaScript files

### 4. Deploy to Vercel

#### Option A: Using the Vercel Dashboard (Easiest)

1. Log in to your Vercel account at [vercel.com](https://vercel.com)
2. Click "New Project" or "Import Project"
3. Choose "Upload" if you want to directly upload your files
4. Drag and drop your website folder or select it from your computer
5. Configure project settings:
   - Project Name: "fixxer" (or any name you prefer)
   - Framework Preset: "Other"
   - Root Directory: ./ (default)
6. Click "Deploy"

#### Option B: Using Vercel CLI

1. Open a terminal/command prompt
2. Navigate to your website folder:
   ```bash
   cd path/to/fixxer-website
   ```
3. Log in to Vercel:
   ```bash
   vercel login
   ```
4. Deploy the website:
   ```bash
   vercel
   ```
5. Follow the prompts to configure your project

### 5. Configure Your Domain (Optional)

1. In your Vercel dashboard, select your Fixxer project
2. Go to "Settings" > "Domains"
3. Add your custom domain (e.g., fixxer.com)
4. Follow Vercel's instructions to verify domain ownership and set up DNS

## Receiving Appointment Bookings

To receive appointment bookings from your website, you have several options:

### 1. Email Notifications (Simplest)

1. Edit the `script.js` file to add email functionality to the booking form
2. Use a service like [EmailJS](https://www.emailjs.com/) (free tier available):
   - Sign up for EmailJS
   - Create an email template
   - Add the EmailJS code to your booking form submission handler

Example code to add to your script.js:

```javascript
// Add this to your script.js file
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const applianceType = document.getElementById('applianceType').value;
    const issueDescription = document.getElementById('issueDescription').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const preferredTime = document.getElementById('preferredTime').value;
    const name = document.getElementById('bookingName').value;
    const email = document.getElementById('bookingEmail').value;
    const phone = document.getElementById('bookingPhone').value;
    
    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        appliance_type: applianceType,
        issue: issueDescription,
        date: appointmentDate,
        time: preferredTime,
        name: name,
        email: email,
        phone: phone
    })
    .then(function() {
        document.getElementById('bookingSuccess').classList.add('active');
        document.getElementById('bookingForm').reset();
        
        setTimeout(function() {
            document.getElementById('bookingSuccess').classList.remove('active');
            document.getElementById('bookingModal').classList.remove('active');
        }, 3000);
    }, function(error) {
        console.error('Email sending failed:', error);
        alert('There was an error sending your booking. Please try again or contact us directly.');
    });
});
```

### 2. Google Forms Integration (No Backend Required)

1. Create a Google Form with fields matching your booking form
2. Get the form submission URL
3. Update your booking form's action attribute to point to the Google Form URL
4. Map your form field names to Google Form field names

### 3. Database Solution (More Advanced)

For a more robust solution, you could use:
- [Firebase](https://firebase.google.com/) (has a generous free tier)
- [Supabase](https://supabase.com/) (open-source Firebase alternative)

## Updating Spare Parts Pricing

To update spare parts pricing, you have several options:

### 1. Direct File Editing (Simplest)

1. Download the website files from Vercel
2. Edit the `script.js` file to update the `sparePartsData` array
3. Re-upload and deploy to Vercel

### 2. Google Sheets Integration (Recommended)

1. Create a Google Sheet with your spare parts data
2. Make it public or set specific access permissions
3. Use the Google Sheets API to fetch data in your website

Example code to add to your script.js:

```javascript
// Replace the static sparePartsData with this dynamic loading
document.addEventListener('DOMContentLoaded', function() {
    // Google Sheets ID and sheet name
    const sheetId = 'YOUR_GOOGLE_SHEET_ID';
    const sheetName = 'Sheet1';
    
    // Fetch data from Google Sheets
    fetch(`https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${sheetName}`)
        .then(response => response.text())
        .then(data => {
            // Parse the JSON-like response
            const jsonData = JSON.parse(data.substring(47).slice(0, -2));
            
            // Extract the rows
            const rows = jsonData.table.rows;
            
            // Convert to our format
            sparePartsData = rows.map(row => {
                return {
                    "Item Name": row.c[0].v,
                    "Selling Price (Customer)": row.c[1].v
                };
            });
            
            console.log('Spare parts data loaded:', sparePartsData);
        })
        .catch(error => {
            console.error('Error loading spare parts data:', error);
        });
});
```

### 3. Admin Interface (Advanced)

For a complete admin interface, you would need:
1. A backend service (Firebase, Supabase, etc.)
2. Authentication for admin access
3. A CRUD interface for managing parts

This would require more extensive development but would provide the most user-friendly experience for updating prices.

## Need Further Assistance?

If you need help with any of these steps or want to implement more advanced features, please contact us for additional support.
