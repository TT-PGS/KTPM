import pyrebase

# 🔧 Bước 1: Cấu hình Firebase
firebase_config = {
    "apiKey": "AIzaSyDmm7Z6m3X5IZNcy_3__HZWUoAs-ox8irQ",                      
    # ⚠️ Lấy từ Firebase > Project Settings > General > Web API Key
    "authDomain": "ktpm-94619.firebaseapp.com",  
    # ⚠️ <PROJECT_ID> chính là project_id trong Firebase console
    "databaseURL": "",                          
    # Không cần nếu bạn không dùng Realtime DB
    "storageBucket": "ktpm-94619.appspot.com" 
    # ⚠️ <PROJECT_ID> dùng lại như trên
}

# 🔗 Bước 2: Khởi tạo kết nối với Firebase
firebase = pyrebase.initialize_app(firebase_config)
auth = firebase.auth()

# 🔐 Bước 3: Đăng nhập user (đã đăng ký trước đó)
email = "thtien.sdh241@hcmut.edu.vn"            
# ⚠️ Email người dùng (đã đăng ký trên Firebase)
password = "hehehe"                
# ⚠️ Mật khẩu tương ứng

# 🪪 Bước 4: Xác thực, nhận ID Token
user = auth.sign_in_with_email_and_password(email, password)
id_token = user['idToken']

# 📢 Bước 5: In token ra để gửi kèm Header: Authorization: Bearer <token>
print("Firebase ID Token:", id_token)
