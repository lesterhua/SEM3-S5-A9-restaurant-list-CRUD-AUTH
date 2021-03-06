# 餐廳清單

使用 Node.js + Express + MongoDB 打造的餐廳清單網站，可以新增、刪除、修改、顯示餐廳詳細的介紹。以及打造使用者認證系統。

## Features - 產品功能

- 使用者看到所有的餐廳清單
- 使用者可以點擊任何一個餐廳，會顯示個別餐廳詳細的介紹
- 使用者可以用中英文或大小寫，依照名稱、- 分類進行搜尋
- 使用者可以新增一家餐廳
- 使用者可以修改一家餐廳的資訊
- 使用者可以刪除一家餐廳
- 使用者可以排列餐廳
- 使用者可以註冊帳號，註冊的資料包括：名字、email、密碼、確認密碼
- 使用者註冊、登入時，有錯誤，會顯示告知使用者其中的錯誤訊息
- 使用者的密碼要使用 bcrypt 來處理
- 使用者也可以透過 Facebook Login 直接登入

## Environment SetUp - 環境建置

- node.js v10.16.0
- express 4.17.1
- express-handlebars 3.1.0
- mongoose 5.6.0
- mongo DB
- bcryptjs 2.4.3
- body-parser 1.19.0
- connect-flash 0.1.1
- dotenv 8.0.0
- express-session 1.16.2
- method-override 3.0.0
- passport 0.4.0
- passport-facebook 3.0.0
- passport-local 1.0.0

## Installing - 專案安裝流程

1. 安裝 [MongoDB](https://www.mongodb.com/download-center/community)

2. 安裝 ROBT 3T

3. 打開你的 terminal，Clone 此專案至本機電腦

```
 https://github.com/lesterhua/SEM3-S5-A9-restaurant-list-CRUD-AUTH.git
```

4. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd restaurant_list
```

5. 安裝 npm 套件

```
在 Terminal 輸入 npm install 指令
```

6. 建立種子資料

```
在 Terminal 裡 cd models/seeds
node restaurantSeeder.js
```

7. 執行專案

```
在 Terminal 輸入 npm run dev  指令
```

#### 安裝成功後，會在終端機看到訊息"Express is running on :http://localhost:3000

## 畫面 - Demo

![alt text](https://github.com/lesterhua/SEM3-S5-A9-restaurant-list-CRUD-AUTH/blob/master/public/fb.gif)

![alt text](https://github.com/lesterhua/SEM3-S5-A9-restaurant-list-CRUD-AUTH/blob/master/public/login-info.gif)

![alt text](https://github.com/lesterhua/SEM3-S5-A9-restaurant-list-CRUD-AUTH/blob/master/public/register-info.gif)

![alt text](https://github.com/lesterhua/SEM3-S5-A9-restaurant-list-CRUD-AUTH/blob/master/public/seeder1.gif)

![alt text](https://github.com/lesterhua/SEM3-S5-A9-restaurant-list-CRUD-AUTH/blob/master/public/seeder2.gif)

## 作者 - Authors

[Lester](https://github.com/lesterhua)
