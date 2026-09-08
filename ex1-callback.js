// ข้อมูลนักศึกษา
const students = [
    { id: "6501", name: "สมชาย", major: "Computer Science", score: 85 },
    { id: "6502", name: "สมหญิง", major: "Software Engineering", score: 78 },
    { id: "6503", name: "มานะ", major: "Information Technology", score: 92 },
    { id: "6504", name: "มานี", major: "Computer Science", score: 69 }
];


// ฟังก์ชันค้นหานักศึกษาด้วย Callback
function fetchStudentById(id, callback) {

    // จำลองการค้นหาฐานข้อมูล ใช้เวลา 300ms
    setTimeout(() => {

        // ตรวจสอบ id
        if (typeof id !== "string" || id.trim() === "") {
            callback(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
            return;
        }

        // ค้นหานักศึกษา
        const student = students.find(s => s.id === id);

        // ถ้าไม่พบ
        if (!student) {
            callback(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
            return;
        }

        // ถ้าพบข้อมูล
        callback(null, { ...student });

    }, 300);
}


// ==========================================
// ทดลองกรณีที่ 1 : มีข้อมูล
// ==========================================

fetchStudentById("6501", (error, student) => {

    if (error) {
        console.log("Error:", error.message);
        return;
    }

    console.log("กรณีที่ 1");
    console.log("พบข้อมูล:", student);
});


// ==========================================
// ทดลองกรณีที่ 2 : ไม่มีข้อมูล
// ==========================================

fetchStudentById("9999", (error, student) => {

    if (error) {
        console.log("กรณีที่ 2");
        console.log("Error:", error.message);
        return;
    }

    console.log(student);
});


// ==========================================
// ทดลองกรณีที่ 3 : id ผิดรูปแบบ
// ==========================================

fetchStudentById(42, (error, student) => {

    if (error) {
        console.log("กรณีที่ 3");
        console.log("Error:", error.message);
        return;
    }

    console.log(student);
});