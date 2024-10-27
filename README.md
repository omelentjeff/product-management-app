# Solteq-harjoitustehtava


## Motivation
Pre-assignment developed for Solteq recruiting process

## How to run the app locally
1. Make sure Docker Desktop is installed and running. If you don't have it, you can install it here: https://www.docker.com/products/docker-desktop/
   
2. Clone the repository to your computer and move to the project root:


  ```
git clone https://github.com/omelentjeff/solteq-harjoitustehtava
cd solteq-harjoitustehtava
  ```
  
3. Build docker container (This can take a few moments):
```
docker-compose up --build -d
```

5. Once it's done, navigate to 'http://localhost:3000' on your browser.
  
7. When you want to stop, run:

```
docker-compose down
```

## Tech/framework used
- Java / Spring Boot
- MySql
- React.js
- Docker
- JWT for user authentication

## Features
- User authentication (and role based authorization)
- Create admin or user account
- User accounts can read data
- Admin accounts can Create, Read, Update and Delete data
- Image uploads from admin file system (images stored in database)
- Data represented in a table/grid
- Dynamic search feature to look for products based on GTIN-code AND product name
- Auto-suggestion for search
- User input debouncing for reducing API calls
 
### Screenshots

### Login
<img width="1440" alt="Näyttökuva 2024-10-27 kello 19 37 04" src="https://github.com/user-attachments/assets/0cfb524e-8497-46fa-8ab4-f640722c68c6">

### Sign Up
<img width="1440" alt="Näyttökuva 2024-10-27 kello 19 37 54" src="https://github.com/user-attachments/assets/c56f982f-87f8-4ba7-bafe-3ab3cec16f11">

### Admin Dashboard
<img width="1440" alt="Näyttökuva 2024-10-27 kello 19 38 33" src="https://github.com/user-attachments/assets/01fe0028-aeed-4ea7-b813-b99e4c42cbd7">

### View Product Details pt.1
<img width="1440" alt="Näyttökuva 2024-10-27 kello 19 39 04" src="https://github.com/user-attachments/assets/0fc966f7-aaa3-4df4-a154-9b9662840915">

### View Product Details pt.2
<img width="1440" alt="Näyttökuva 2024-10-27 kello 19 39 20" src="https://github.com/user-attachments/assets/1c94b566-1d56-4a7c-8a2d-c0310e535129">

### Edit Product Details
<img width="1440" alt="Näyttökuva 2024-10-27 kello 19 39 42" src="https://github.com/user-attachments/assets/61f3b895-2d06-423c-b80b-98609b46d591">

### Create New Product
<img width="1440" alt="Näyttökuva 2024-10-27 kello 19 40 00" src="https://github.com/user-attachments/assets/153b1542-7eae-4e28-b179-7e77eb122cd8">

### Delete Product
<img width="1440" alt="Näyttökuva 2024-10-27 kello 19 40 14" src="https://github.com/user-attachments/assets/430b4557-e469-479d-b6a2-5dd771e30934">

### User Dashboard
<img width="1440" alt="Näyttökuva 2024-10-27 kello 19 40 50" src="https://github.com/user-attachments/assets/bbe00981-40ba-4c33-bf14-84debe1f6055">

### Search Products
<img width="1440" alt="Näyttökuva 2024-10-27 kello 19 41 05" src="https://github.com/user-attachments/assets/437cdca0-d1b8-4ca7-b73f-b90bbe42cae8">













