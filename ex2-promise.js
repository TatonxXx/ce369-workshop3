// ข้อมูลนักศึกษา
const students = [
    { id: "6501", name: "สมชาย", major: "Computer Science", score: 85 },
    { id: "6502", name: "สมหญิง", major: "Software Engineering", score: 78 },
    { id: "6503", name: "มานะ", major: "Information Technology", score: 92 },
    { id: "6504", name: "มานี", major: "Computer Science", score: 69 }
];


// ==========================================
// ฟังก์ชันแบบ Promise
// ==========================================

function fetchStudentByIdAsync(id) {

    return new Promise((resolve, reject) => {

        // จำลองฐานข้อมูล 300ms
        setTimeout(() => {

            // ตรวจสอบ id
            if (typeof id !== "string" || id.trim() === "") {
                reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
                return;
            }

            // ค้นหานักศึกษา
            const student = students.find(s => s.id === id);

            // ไม่พบข้อมูล
            if (!student) {
                reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
                return;
            }

            // พบข้อมูล
            resolve({ ...student });

        }, 300);
    });
}


// ==========================================
// ทดลอง Promise Chain
// ==========================================

fetchStudentByIdAsync("6501")

    // ขั้นที่ 1
    // เปลี่ยนข้อมูลนักศึกษาเป็น name และ grade
    .then(student => {

        return {
            name: student.name,
            grade: student.score >= 80 ? "A" : "B"
        };

    })

    // ขั้นที่ 2
    // เปลี่ยนเป็นข้อความ
    .then(result => {

        return `ชื่อ ${result.name} ได้เกรด ${result.grade}`;

    })

    // ขั้นที่ 3
    // แสดงข้อความ
    .then(message => {

        console.log(message);

    })

    // จัดการ Error
    .catch(error => {

        console.log("Error:", error.message);

    })

    // ทำงานทุกกรณี
    .finally(() => {

        console.log("จบการทำงาน");
    });


// ==========================================
// Bonus : promisify()
// ==========================================

function promisify(fn) {

    return function (...args) {

        return new Promise((resolve, reject) => {

            fn(...args, (error, result) => {

                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            });

        });
    };
}


// ทดลอง promisify
const fetchStudentPromise = promisify((id, callback) => {

    setTimeout(() => {

        const student = students.find(s => s.id === id);

        if (!student) {
            callback(new Error("ไม่พบข้อมูล"));
            return;
        }

        callback(null, { ...student });

    }, 300);
});


fetchStudentPromise("6502")
    .then(student => {
        console.log("Promisify:", student);
    })
    .catch(error => {
        console.log("Promisify Error:", error.message);
    });