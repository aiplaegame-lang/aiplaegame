// ฟังก์ชันสำหรับดึงข้อมูลจาก JSON
async function fetchMods() {
    try {
        const response = await fetch('mods.json');
        return await response.json();
    } catch (error) {
        console.error("ไม่สามารถโหลดข้อมูลม็อดได้:", error);
        return [];
    }
}

// ฟังก์ชันแสดงม็อดในหน้าแรก (เอาแค่ 3 ม็อดล่าสุด โดยเรียงจาก ID มากไปน้อย)
async function renderLatestMods() {
    const grid = document.getElementById('latest-mods-grid');
    if (!grid) return;

    const mods = await fetchMods();
    
    // เรียงลำดับจาก ID มากไปน้อย (b.id - a.id)
    const sortedMods = mods.sort((a, b) => b.id - a.id);
    
    // ดึง 3 ตัวแรกที่เรียงใหม่แล้วมาแสดง
    const latestMods = sortedMods.slice(0, 3); 

    grid.innerHTML = latestMods.map(mod => `
        <a href="${mod.link}" target="_blank" class="mod-card">
            <img src="${mod.image}" alt="${mod.title}">
            <h3>${mod.title}</h3>
        </a>
    `).join('');
}

// ฟังก์ชันแสดงม็อดทั้งหมดในหน้าม็อด (เรียงจาก ID มากไปน้อยทั้งหมด)
async function renderAllMods() {
    const grid = document.getElementById('all-mods-grid');
    if (!grid) return;

    const mods = await fetchMods();
    
    // เรียงลำดับจาก ID มากไปน้อย (b.id - a.id)
    const sortedMods = mods.sort((a, b) => b.id - a.id);

    grid.innerHTML = sortedMods.map(mod => `
        <a href="${mod.link}" target="_blank" class="mod-card">
            <img src="${mod.image}" alt="${mod.title}">
            <h3>${mod.title}</h3>
        </a>
    `).join('');
}

// เรียกใช้งานเมื่อ Document โหลดเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    renderLatestMods();
    renderAllMods();
});