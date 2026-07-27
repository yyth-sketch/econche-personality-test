# ECONCHÉ Personality Test — เว็บควิซ

เว็บแบบทดสอบ "ในทีม Production คุณเหมาะกับงานอะไร?" ของชมรม ECONCHÉ
ทำเป็น HTML/CSS/JS ล้วน ๆ ไม่ต้อง build ใด ๆ ใช้ GitHub Pages ได้ทันที

## โครงสร้างไฟล์
```
econche-quiz/
├── index.html          หน้าเว็บหลัก
├── styles.css           สไตล์ (ธีมม่านโรงละครแดง/ทอง)
├── script.js             โลจิกควิซ + คิดคะแนน + สลับภาษา
├── images/
│   └── qr-openchat.jpeg  QR Code Econché OpenChat (หน้าผลลัพธ์)
└── README.md
```

## วิธี Publish ด้วย GitHub Pages

1. สร้าง repository ใหม่บน GitHub เช่น `econche-quiz`
2. อัปโหลดไฟล์ทั้งหมดในโฟลเดอร์นี้ (`index.html`, `styles.css`, `script.js`, โฟลเดอร์ `images/`) ขึ้นไปที่ repo — จะลากไฟล์วางผ่านหน้าเว็บ GitHub หรือใช้ `git push` ก็ได้
3. ไปที่ **Settings → Pages**
4. ที่หัวข้อ **Build and deployment** เลือก Source เป็น **Deploy from a branch**
5. เลือก Branch เป็น `main` (หรือ branch ที่ใช้) และโฟลเดอร์เป็น `/ (root)` แล้วกด **Save**
6. รอสัก 1-2 นาที เว็บจะขึ้นที่ `https://<ชื่อบัญชี>.github.io/econche-quiz/`

## วิธีแก้ไขเนื้อหา

- **คำถาม/ตัวเลือก/คำอธิบายผลลัพธ์**: แก้ในไฟล์ `script.js` ที่ตัวแปร `QUESTIONS` และ `ROLE_DESC` (มีทั้งภาษาไทย `th` และอังกฤษ `en`)
- **สีธีม/ฟอนต์**: แก้ในไฟล์ `styles.css` ที่ส่วน `:root` ด้านบนสุด
- **QR Code**: เปลี่ยนไฟล์ `images/qr-openchat.jpeg` เป็นไฟล์ใหม่ (ใช้ชื่อไฟล์เดิม หรือแก้ path ใน `index.html`)

## การคิดผลลัพธ์

ตัวเลือก A = Writer, B = Director, C = Actor, D = Producer
ระบบนับจำนวนคำตอบแต่ละแบบจาก 7 ข้อ แล้วดูว่าข้อไหนถูกเลือกมากที่สุด
ถ้ามีคะแนนเท่ากันมากกว่า 1 บทบาท จะแสดงผลรวมกันแบบ "Writer/Director" ตามลำดับ Writer → Director → Actor → Producer
