// ข้อมูลนักศึกษา
const students = [
    { id: "6501", name: "สมชาย", major: "Computer Science", score: 85 },
    { id: "6502", name: "สมหญิง", major: "Software Engineering", score: 78 },
    { id: "6503", name: "มานะ", major: "Information Technology", score: 92 },
    { id: "6504", name: "มานี", major: "Computer Science", score: 69 }
];


// ==========================================
// ฟังก์ชัน Promise
// ==========================================

function fetchStudentByIdAsync(id) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            if (typeof id !== "string" || id.trim() === "") {
                reject(new Error("รหัสนักศึกษาไม่ถูกต้อง"));
                return;
            }

            const student = students.find(s => s.id === id);

            if (!student) {
                reject(new Error(`ไม่พบรหัสนักศึกษา ${id}`));
                return;
            }

            resolve({ ...student });

        }, 300);
    });
}


// ==========================================
// ส่วนที่ 1 : Sequential
// ทำทีละคน
// ==========================================

async function reportSequential() {

    console.log("\n===== Sequential =====");

    const ids = ["6501", "6502", "6503"];

    const start = Date.now();

    try {

        for (const id of ids) {

            const student = await fetchStudentByIdAsync(id);

            console.log(
                student.name,
                "เวลา:",
                Date.now() - start,
                "ms"
            );
        }

    } catch (error) {

        console.log("Error:", error.message);

    }

    console.log(
        "เวลารวม:",
        Date.now() - start,
        "ms"
    );
}


// ==========================================
// ส่วนที่ 2 : Parallel
// ทำพร้อมกัน
// ==========================================

async function reportParallel() {

    console.log("\n===== Parallel =====");

    const ids = ["6501", "6502", "6503"];

    const start = Date.now();

    try {

        const result = await Promise.all(
            ids.map(id => fetchStudentByIdAsync(id))
        );

        result.forEach(student => {
            console.log(
                student.name,
                "ค้นหาสำเร็จ"
            );
        });

    } catch (error) {

        console.log("Error:", error.message);

    }

    console.log(
        "เวลารวม:",
        Date.now() - start,
        "ms"
    );
}


// ==========================================
// ส่วนที่ 3 : safeReport
// try / catch / finally
// ==========================================

async function safeReport(id) {

    try {

        const student = await fetchStudentByIdAsync(id);

        console.log(
            `พบข้อมูล: ${student.name} (${student.id})`
        );

    } catch (error) {

        console.log(
            `ตรวจไม่พบ: ${error.message}`
        );

    } finally {

        console.log("จบการตรวจสอบ");

    }
}


// ==========================================
// main()
// เรียกใช้งานทั้งหมด
// ==========================================

async function main() {

    await reportSequential();

    await reportParallel();

    await safeReport("6501");

    await safeReport("9999");
}


main();