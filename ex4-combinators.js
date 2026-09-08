// เครื่องมือจำลอง Promise
const wait = (ms, value, willFail = false) =>

    new Promise((resolve, reject) => {

        setTimeout(() => {

            if (willFail) {
                reject(new Error(`${value} ล้มเหลว`));
            } else {
                resolve(value);
            }

        }, ms);

    });


// ==========================================
// สถานการณ์ที่ 1 : Promise.all()
// ==========================================
// ต้องการผลลัพธ์ครบทุกตัว
// ==========================================

async function scenario1() {

    console.log("\n===== สถานการณ์ที่ 1 =====");

    try {

        const result = await Promise.all([
            wait(300, "เปิดหน้าโปรไฟล์"),
            wait(400, "ตารางเรียน"),
            wait(500, "ประกาศ")
        ]);

        console.log("ผลลัพธ์ทั้งหมด:");
        console.log(result);

    } catch (error) {

        console.log("Error:", error.message);

    }
}


// ==========================================
// สถานการณ์ที่ 2 : Promise.allSettled()
// ==========================================
// ต้องการรู้ผลทุกตัว แม้บางตัวจะล้มเหลว
// ==========================================

async function scenario2() {

    console.log("\n===== สถานการณ์ที่ 2 =====");

    const result = await Promise.allSettled([
        wait(300, "อีเมล", false),
        wait(500, "SMS", true),
        wait(400, "แอป", false)
    ]);

    result.forEach(item => {

        console.log(item);

    });
}


// ==========================================
// สถานการณ์ที่ 3 : Promise.any()
// ==========================================
// เอาตัวแรกที่สำเร็จ
// ==========================================

async function scenario3() {

    console.log("\n===== สถานการณ์ที่ 3 =====");

    try {

        const result = await Promise.any([
            wait(300, "mirror-A", true),
            wait(600, "mirror-B", false)
        ]);

        console.log(
            "ข้อมูลที่สำเร็จ:",
            result
        );

    } catch (error) {

        console.log("Error:", error.message);

    }
}


// ==========================================
// สถานการณ์ที่ 4 : Promise.race()
// ==========================================
// เอาตัวที่เสร็จก่อน
// ==========================================

async function scenario4() {

    console.log("\n===== สถานการณ์ที่ 4 =====");

    try {

        const result = await Promise.race([

            // ฐานข้อมูลใช้เวลา 1200ms
            wait(1200, "ข้อมูลจากฐานข้อมูล"),

            // Timeout ใช้เวลา 800ms
            wait(800, "หมดเวลา", true)

        ]);

        console.log("ผลลัพธ์:", result);

    } catch (error) {

        console.log("Error:", error.message);

    }
}


// ==========================================
// main()
// เรียกทั้ง 4 สถานการณ์
// ==========================================

async function main() {

    await scenario1();

    await scenario2();

    await scenario3();

    await scenario4();

    console.log("\n===== จบข้อที่ 4 =====");
}


main();