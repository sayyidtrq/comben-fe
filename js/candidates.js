(() => {
const candidates = [
  {
    id: "AGT-002345",
    name: "Rina Setiawati",
    email: "rina.setiawati96@gmail.com",
    phone: "0812-3456-7890",
    birth: "Bandung, 14 Januari 1996",
    gender: "Perempuan",
    marital: "Belum Menikah",
    citizenship: "WNI",
    address: "Jl. Cihampelas No. 123, Bandung, Jawa Barat 40131",
    domicile: "Bandung, Jawa Barat",
    position: "Agent Asuransi",
    branch: "Jakarta Selatan",
    branchKey: "jakarta-selatan",
    source: "Website Career",
    stage: "Interview",
    stageKey: "interview",
    status: "active",
    registered: "22 Mei 2025",
    recruiter: "Dedi Kurniawan",
    recruiterRole: "Unit Manager",
    photo: "../assets/images/agent_aisyah_putri.png",
    note: "Kandidat memiliki komunikasi yang baik, berorientasi pada target, dan memahami produk asuransi dasar dengan cukup baik. Motivasi bergabung tinggi.",
    checklist: ["Formulir Lamaran", "KTP", "NPWP", "Rekening Bank", "Sertifikat / Lisensi"],
    history: [
      ["Pendaftaran", "Selesai", "Sistem", "22 Mei 2025, 09:12", "Pendaftaran via website"],
      ["Screening", "Selesai", "Ahmad Fauzi", "22 Mei 2025, 10:05", "Memenuhi kriteria dasar"],
      ["Interview", "Berjalan", "Dedi Kurniawan", "22 Mei 2025, 14:30", "Menunggu hasil interview"],
      ["Verifikasi Dokumen", "Belum Mulai", "-", "-", "Menunggu sebelumnya"],
      ["Approval", "Belum Mulai", "-", "-", "Menunggu sebelumnya"]
    ]
  },
  {
    id: "AGT-002346",
    name: "Fajar Ramadhan",
    email: "fajar.ramadhan@mail.com",
    phone: "0813-2211-8840",
    birth: "Bandung, 3 Maret 1995",
    gender: "Laki-laki",
    marital: "Menikah",
    citizenship: "WNI",
    address: "Jl. Merdeka No. 88, Bandung",
    domicile: "Bandung, Jawa Barat",
    position: "Agent Asuransi",
    branch: "Bandung",
    branchKey: "bandung",
    source: "Jobstreet",
    stage: "Screening",
    stageKey: "screening",
    status: "revision",
    registered: "21 Mei 2025",
    recruiter: "Ahmad Fauzi",
    recruiterRole: "Recruiter",
    initials: "FR",
    note: "Pengalaman sales bagus, namun dokumen pendukung perlu dilengkapi sebelum masuk jadwal interview.",
    checklist: ["Formulir Lamaran", "KTP", "NPWP", "Rekening Bank"],
    history: [
      ["Pendaftaran", "Selesai", "Sistem", "21 Mei 2025, 09:20", "Pendaftaran dari Jobstreet"],
      ["Screening", "Berjalan", "Ahmad Fauzi", "21 Mei 2025, 15:10", "Menunggu revisi dokumen"],
      ["Interview", "Belum Mulai", "-", "-", "Menunggu screening"]
    ]
  },
  {
    id: "AGT-002567",
    name: "Dinda Ayu Lestari",
    email: "dinda.ayu@mail.com",
    phone: "0817-9021-1188",
    birth: "Surabaya, 9 September 1997",
    gender: "Perempuan",
    marital: "Belum Menikah",
    citizenship: "WNI",
    address: "Jl. Diponegoro No. 12, Surabaya",
    domicile: "Surabaya, Jawa Timur",
    position: "Financial Advisor",
    branch: "Surabaya",
    branchKey: "surabaya",
    source: "Instagram Ads",
    stage: "Verification",
    stageKey: "verification",
    status: "active",
    registered: "20 Mei 2025",
    recruiter: "Yuliana Lestari",
    recruiterRole: "Recruiter",
    photo: "../assets/images/agent_maria_santos.png",
    note: "Dokumen lengkap dan siap diverifikasi. Kandidat terlihat kuat untuk pipeline Surabaya.",
    checklist: ["Formulir Lamaran", "KTP", "NPWP", "Rekening Bank", "Sertifikat / Lisensi", "Surat Referensi"],
    history: [
      ["Pendaftaran", "Selesai", "Sistem", "20 Mei 2025, 08:10", "Pendaftaran dari Instagram Ads"],
      ["Screening", "Selesai", "Yuliana Lestari", "20 Mei 2025, 11:45", "Lolos screening"],
      ["Interview", "Selesai", "Dedi Kurniawan", "21 Mei 2025, 10:00", "Direkomendasikan"],
      ["Verifikasi Dokumen", "Berjalan", "Ops Team", "22 Mei 2025, 13:00", "Sedang dicek"]
    ]
  },
  {
    id: "AGT-002350",
    name: "Rina Sari",
    email: "rina.sari@mail.com",
    phone: "0821-4419-2220",
    birth: "Denpasar, 7 Juli 1994",
    gender: "Perempuan",
    marital: "Menikah",
    citizenship: "WNI",
    address: "Jl. Tukad Badung No. 45, Denpasar",
    domicile: "Bali",
    position: "Agent Asuransi",
    branch: "Bali",
    branchKey: "bali",
    source: "Website Career",
    stage: "Approved",
    stageKey: "approved",
    status: "done",
    registered: "18 Mei 2025",
    recruiter: "Iqbal Maulana",
    recruiterRole: "Unit Manager",
    initials: "RS",
    note: "Telah disetujui untuk lanjut onboarding. Performa interview dan dokumen sangat baik.",
    checklist: ["Formulir Lamaran", "KTP", "NPWP", "Rekening Bank", "Sertifikat / Lisensi", "Surat Referensi"],
    history: [
      ["Pendaftaran", "Selesai", "Sistem", "18 Mei 2025, 09:00", "Pendaftaran via website"],
      ["Screening", "Selesai", "Iqbal Maulana", "18 Mei 2025, 10:30", "Lolos"],
      ["Interview", "Selesai", "Dedi Kurniawan", "19 Mei 2025, 14:00", "Direkomendasikan"],
      ["Verifikasi Dokumen", "Selesai", "Ops Team", "20 Mei 2025, 09:00", "Lengkap"],
      ["Approval", "Selesai", "Budi Santoso", "20 Mei 2025, 16:00", "Approved"]
    ]
  },
  {
    id: "AGT-002411",
    name: "Agung Setiawan",
    email: "agung.setiawan@mail.com",
    phone: "0819-7742-9931",
    birth: "Makassar, 12 Juni 1992",
    gender: "Laki-laki",
    marital: "Menikah",
    citizenship: "WNI",
    address: "Jl. Veteran No. 17, Makassar",
    domicile: "Makassar, Sulawesi Selatan",
    position: "Senior Agent",
    branch: "Makassar",
    branchKey: "makassar",
    source: "Referal Karyawan",
    stage: "Interview",
    stageKey: "interview",
    status: "active",
    registered: "19 Mei 2025",
    recruiter: "Putri Amelia",
    recruiterRole: "Recruiter",
    initials: "AS",
    note: "Kandidat senior dengan pengalaman kuat di bancassurance. Cocok untuk area Makassar.",
    checklist: ["Formulir Lamaran", "KTP", "NPWP", "Rekening Bank", "Sertifikat / Lisensi"],
    history: [
      ["Pendaftaran", "Selesai", "Sistem", "19 Mei 2025, 10:20", "Referral internal"],
      ["Screening", "Selesai", "Putri Amelia", "19 Mei 2025, 13:00", "Lolos"],
      ["Interview", "Berjalan", "Dedi Kurniawan", "23 Mei 2025, 11:00", "Menunggu hasil"]
    ]
  },
  {
    id: "AGT-002412",
    name: "Maya Lestari",
    email: "maya.lestari@mail.com",
    phone: "0822-1145-8800",
    birth: "Medan, 22 April 1998",
    gender: "Perempuan",
    marital: "Belum Menikah",
    citizenship: "WNI",
    address: "Jl. Gatot Subroto No. 72, Medan",
    domicile: "Medan",
    position: "Agent Asuransi",
    branch: "Medan",
    branchKey: "medan",
    source: "Instagram Ads",
    stage: "New Applicant",
    stageKey: "new-applicant",
    status: "active",
    registered: "23 Mei 2025",
    recruiter: "Nanda Pratama",
    recruiterRole: "Recruiter",
    initials: "ML",
    note: "Baru mendaftar, profil awal menarik untuk diproses ke screening.",
    checklist: ["Formulir Lamaran", "KTP", "NPWP"],
    history: [["Pendaftaran", "Selesai", "Sistem", "23 Mei 2025, 09:35", "Pendaftaran via Instagram Ads"]]
  },
  {
    id: "AGT-002413",
    name: "Bambang Setiawan",
    email: "bambang.setiawan@mail.com",
    phone: "0811-3200-4411",
    birth: "Bandung, 5 Mei 1990",
    gender: "Laki-laki",
    marital: "Menikah",
    citizenship: "WNI",
    address: "Jl. Asia Afrika No. 50, Bandung",
    domicile: "Bandung",
    position: "Agent Asuransi",
    branch: "Bandung",
    branchKey: "bandung",
    source: "Jobstreet",
    stage: "Verification",
    stageKey: "verification",
    status: "revision",
    registered: "17 Mei 2025",
    recruiter: "Ahmad Fauzi",
    recruiterRole: "Recruiter",
    initials: "BS",
    note: "NPWP perlu diperbarui karena resolusi file kurang jelas.",
    checklist: ["Formulir Lamaran", "KTP", "Rekening Bank", "Sertifikat / Lisensi"],
    history: [
      ["Pendaftaran", "Selesai", "Sistem", "17 Mei 2025, 08:40", "Pendaftaran Jobstreet"],
      ["Screening", "Selesai", "Ahmad Fauzi", "17 Mei 2025, 12:00", "Lolos"],
      ["Interview", "Selesai", "Dedi Kurniawan", "18 Mei 2025, 10:00", "Baik"],
      ["Verifikasi Dokumen", "Berjalan", "Ops Team", "20 Mei 2025, 15:00", "Butuh revisi NPWP"]
    ]
  },
  {
    id: "AGT-002414",
    name: "Salsa Nabilla",
    email: "salsa.nabilla@mail.com",
    phone: "0812-8766-4321",
    birth: "Jakarta, 30 Oktober 1999",
    gender: "Perempuan",
    marital: "Belum Menikah",
    citizenship: "WNI",
    address: "Jl. Kemang Raya No. 9, Jakarta Selatan",
    domicile: "Jakarta Selatan",
    position: "Agent Asuransi",
    branch: "Jakarta Selatan",
    branchKey: "jakarta-selatan",
    source: "Website Career",
    stage: "Rejected",
    stageKey: "rejected",
    status: "rejected",
    registered: "16 Mei 2025",
    recruiter: "Dedi Kurniawan",
    recruiterRole: "Unit Manager",
    initials: "SN",
    note: "Belum memenuhi kriteria pengalaman minimal untuk role saat ini.",
    checklist: ["Formulir Lamaran", "KTP", "NPWP", "Rekening Bank"],
    history: [
      ["Pendaftaran", "Selesai", "Sistem", "16 Mei 2025, 10:00", "Pendaftaran website"],
      ["Screening", "Selesai", "Dedi Kurniawan", "16 Mei 2025, 14:00", "Tidak memenuhi kriteria"],
      ["Rejected", "Selesai", "Dedi Kurniawan", "17 Mei 2025, 09:00", "Rejected"]
    ]
  },
  {
    id: "AGT-002415",
    name: "Nanda Pratama",
    email: "nanda.pratama@mail.com",
    phone: "0821-6601-2020",
    birth: "Surabaya, 11 November 1993",
    gender: "Laki-laki",
    marital: "Menikah",
    citizenship: "WNI",
    address: "Jl. Tunjungan No. 21, Surabaya",
    domicile: "Surabaya",
    position: "Agent Asuransi",
    branch: "Surabaya",
    branchKey: "surabaya",
    source: "Website Career",
    stage: "Screening",
    stageKey: "screening",
    status: "active",
    registered: "24 Mei 2025",
    recruiter: "Yuliana Lestari",
    recruiterRole: "Recruiter",
    initials: "NP",
    note: "Profil sales bagus, sedang menunggu hasil pengecekan awal.",
    checklist: ["Formulir Lamaran", "KTP", "NPWP", "Rekening Bank"],
    history: [
      ["Pendaftaran", "Selesai", "Sistem", "24 Mei 2025, 08:15", "Pendaftaran website"],
      ["Screening", "Berjalan", "Yuliana Lestari", "24 Mei 2025, 11:45", "Dalam proses"]
    ]
  },
  {
    id: "AGT-002416",
    name: "Putri Amelia",
    email: "putri.amelia@mail.com",
    phone: "0818-1200-3344",
    birth: "Jakarta, 8 Agustus 1996",
    gender: "Perempuan",
    marital: "Belum Menikah",
    citizenship: "WNI",
    address: "Jl. Sudirman Kav. 20, Jakarta Selatan",
    domicile: "Jakarta Selatan",
    position: "Financial Advisor",
    branch: "Jakarta Selatan",
    branchKey: "jakarta-selatan",
    source: "LinkedIn",
    stage: "Interview",
    stageKey: "interview",
    status: "active",
    registered: "24 Mei 2025",
    recruiter: "Iqbal Maulana",
    recruiterRole: "Recruiter",
    initials: "PA",
    note: "Kandidat punya background wealth advisory. Cocok untuk segmen premium.",
    checklist: ["Formulir Lamaran", "KTP", "NPWP", "Rekening Bank", "Surat Referensi"],
    history: [
      ["Pendaftaran", "Selesai", "Sistem", "24 Mei 2025, 10:00", "LinkedIn apply"],
      ["Screening", "Selesai", "Iqbal Maulana", "24 Mei 2025, 13:00", "Lolos"],
      ["Interview", "Berjalan", "Dedi Kurniawan", "25 Mei 2025, 09:30", "Menunggu hasil"]
    ]
  }
];

const seedLength = candidates.length;
for (let index = seedLength; index < 36; index += 1) {
  const base = candidates[index % seedLength];
  const next = { ...base };
  next.id = `AGT-${String(3000 + index).padStart(6, "0")}`;
  next.name = `${base.name.split(" ")[0]} ${["Saputra", "Wijaya", "Permata", "Kusuma", "Hartono", "Anggraini"][index % 6]}`;
  next.email = `${next.name.toLowerCase().replaceAll(" ", ".")}@mail.com`;
  next.registered = `${String(10 + (index % 18)).padStart(2, "0")} Mei 2025`;
  next.status = ["active", "revision", "done", "active", "rejected"][index % 5];
  next.stageKey = ["new-applicant", "screening", "interview", "verification", "approved", "rejected"][index % 6];
  next.stage = { "new-applicant": "New Applicant", screening: "Screening", interview: "Interview", verification: "Verification", approved: "Approved", rejected: "Rejected" }[next.stageKey];
  next.initials = next.name.split(" ").map((part) => part[0]).join("").slice(0, 2);
  next.photo = index % 4 === 0 ? base.photo : undefined;
  candidates.push(next);
}

const documentAssets = [
  ["KTP", "../assets/documents/ktp.jpeg", "Rina_Setiawati_KTP.jpg"],
  ["NPWP", "../assets/documents/npwp.jpeg", "Rina_Setiawati_NPWP.jpg"],
  ["Rekening Bank", "../assets/documents/rekening-bank.jpg", "Rina_Setiawati_Rek.jpg"],
  ["Sertifikat / Lisensi", "../assets/documents/sertifikat.webp", "Rina_Setiawati_Lisensi.jpg"],
  ["Surat Referensi", "../assets/documents/surat-referensi.png", "Rina_Setiawati_Referensi.png"]
];

const listPage = document.querySelector("[data-candidate-list-page]");
let candidateListPage = 1;
const candidatePageSize = 4;
const detailPage = document.querySelector("[data-candidate-detail-page]");
const toast = document.querySelector("[data-candidate-toast]");
const modal = document.querySelector("[data-candidate-modal]");

function normalize(value) {
  return String(value || "").toLowerCase().trim();
}

function slug(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getSelectedCandidate() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || localStorage.getItem("comben-selected-candidate") || "AGT-002345";
  return candidates.find((candidate) => candidate.id === id) || candidates[0];
}

function setSelectedCandidate(id) {
  localStorage.setItem("comben-selected-candidate", id);
}

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function openModal(title, html) {
  if (!modal) return;
  modal.querySelector("[data-modal-title]").textContent = title;
  modal.querySelector("[data-modal-body]").innerHTML = html;
  modal.hidden = false;
}

function closeModal() {
  if (modal) modal.hidden = true;
}

function avatar(candidate, large = false) {
  const cls = large ? "candidate-photo-lg" : "candidate-photo";
  if (candidate.photo) return `<span class="${cls}"><img src="${candidate.photo}" alt="${candidate.name}"></span>`;
  return `<span class="${cls}">${candidate.initials || candidate.name.slice(0, 2).toUpperCase()}</span>`;
}

function stagePill(candidate) {
  const extra = candidate.status === "done" ? " done" : candidate.status === "revision" ? " warn" : candidate.status === "rejected" ? " danger" : "";
  return `<span class="candidate-pill${extra}">${candidate.stage}</span>`;
}

function documentsHtml(limit = documentAssets.length) {
  return documentAssets.slice(0, limit).map(([label, src, file]) => `
    <button class="document-card" type="button" data-doc-preview="${label}">
      <span class="document-thumb"><img src="${src}" alt="${label}"></span>
      <strong>${label}</strong>
      <small>${file}</small>
    </button>
  `).join("");
}

function renderList() {
  const grid = listPage.querySelector("[data-candidate-grid]");
  const summary = listPage.querySelector("[data-candidate-summary]");
  if (!grid || !summary) return;

  summary.innerHTML = [
    ["Total Kandidat", candidates.length, "↑ 8 baru bulan ini", "#12b9c3", "e8fbfb"],
    ["Interview", candidates.filter((c) => c.stageKey === "interview").length, "jadwal aktif", "#2478e8", "e8f1ff"],
    ["Butuh Revisi", candidates.filter((c) => c.status === "revision").length, "perlu follow-up", "#f2ae24", "fff5db"],
    ["Dokumen Lengkap", candidates.filter((c) => c.checklist.length === 6).length, "siap approval", "#16a764", "e7f8ed"]
  ].map(([label, value, trend, color, bg]) => `
    <article class="pipeline-kpi candidate-summary-card">
      <div class="kpi-icon" style="color:${color};background:#${bg}">${value}</div>
      <div><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div><div class="kpi-trend">${trend}</div></div>
    </article>
  `).join("");

  grid.innerHTML = candidates.map((candidate) => `
    <article class="candidate-list-card candidate-list-card-large" data-candidate-row data-id="${candidate.id}" data-stage="${candidate.stageKey}" data-branch="${candidate.branchKey}" data-status="${candidate.status}">
      <div class="candidate-card-head">
        ${avatar(candidate)}
        <div>
          <h2>${candidate.name}</h2>
          <p class="candidate-card-id">${candidate.id} · ${candidate.email}</p>
        </div>
      </div>
      <div class="candidate-status-row">${stagePill(candidate)}<span class="candidate-muted">${candidate.registered}</span></div>
      <div class="candidate-card-meta">
        <div><small>Cabang</small><strong>${candidate.branch}</strong></div>
        <div><small>Sumber</small><strong>${candidate.source}</strong></div>
        <div><small>Recruiter</small><strong>${candidate.recruiter}</strong></div>
        <div><small>Kelengkapan</small><strong>${candidate.checklist.length} / 6 dokumen</strong></div>
      </div>
      <p class="candidate-card-note">${candidate.note}</p>
      <div class="candidate-list-actions">
        <a class="pipeline-action" href="candidate-detail.html?id=${candidate.id}" data-detail-link>Detail</a>
        <button class="pipeline-action" type="button" data-candidate-action="${candidate.name} ditandai untuk follow-up.">Follow Up</button>
      </div>
    </article>
  `).join("");
}

function filterList() {
  const search = normalize(listPage.querySelector("[data-candidate-search]")?.value);
  const stage = listPage.querySelector("[data-candidate-stage]")?.value || "all";
  const branch = listPage.querySelector("[data-candidate-branch]")?.value || "all";
  const status = listPage.querySelector("[data-candidate-status]")?.value || "all";
  const rows = Array.from(listPage.querySelectorAll("[data-candidate-row]"));
  const matches = rows.filter((row) => (!search || normalize(row.textContent).includes(search))
    && (stage === "all" || row.dataset.stage === stage)
    && (branch === "all" || row.dataset.branch === branch)
    && (status === "all" || row.dataset.status === status));
  const totalPages = Math.max(1, Math.ceil(matches.length / candidatePageSize));
  if (candidateListPage > totalPages) candidateListPage = totalPages;
  const start = (candidateListPage - 1) * candidatePageSize;
  const pageItems = new Set(matches.slice(start, start + candidatePageSize));

  rows.forEach((row) => { row.hidden = !pageItems.has(row); });

  const empty = listPage.querySelector("[data-candidate-empty]");
  if (empty) empty.hidden = matches.length !== 0;
  const pager = listPage.querySelector("[data-candidate-pagination]");
  if (pager) {
    const visibleEnd = matches.length === 0 ? 0 : Math.min(start + candidatePageSize, matches.length);
    const prevPage = Math.max(1, candidateListPage - 1);
    const nextPage = Math.min(totalPages, candidateListPage + 1);
    pager.innerHTML = `
      <span class="candidate-page-info">Menampilkan ${matches.length === 0 ? 0 : start + 1}-${visibleEnd} dari ${matches.length} kandidat</span>
      <button type="button" class="candidate-page-nav" data-candidate-page="${prevPage}" ${candidateListPage === 1 ? "disabled" : ""}>Back</button>
      ${Array.from({ length: totalPages }, (_, index) => `<button type="button" class="${index + 1 === candidateListPage ? "active" : ""}" data-candidate-page="${index + 1}">${index + 1}</button>`).join("")}
      <button type="button" class="candidate-page-nav" data-candidate-page="${nextPage}" ${candidateListPage === totalPages ? "disabled" : ""}>Next</button>
    `;
  }
}

function renderDetail() {
  const root = detailPage.querySelector("[data-candidate-detail-root]");
  const candidate = getSelectedCandidate();
  if (!root) return;

  const completed = candidate.checklist.length;
  const progress = Math.round((completed / 6) * 100);
  const currentIndex = ["new-applicant", "screening", "interview", "verification", "approved"].includes(candidate.stageKey)
    ? ["new-applicant", "screening", "interview", "verification", "approved"].indexOf(candidate.stageKey)
    : 1;

  root.innerHTML = `
    <section class="candidate-profile-strip">
      ${avatar(candidate, true)}
      <div class="candidate-profile-main">
        <h2>${candidate.name}</h2>
        <div class="candidate-id-row"><span>Candidate ID</span><strong>${candidate.id}</strong><button class="copy-button" type="button" data-copy-id>⧉</button></div>
      </div>
      <div class="candidate-strip-item"><small>Sumber Rekrutmen</small><strong>${candidate.source}</strong></div>
      <div class="candidate-strip-item"><small>Tahap Saat Ini</small>${stagePill(candidate)}</div>
      <div class="candidate-strip-item"><small>Tanggal Daftar</small><strong>${candidate.registered}</strong></div>
      <div class="candidate-strip-item"><small>Assigned Recruiter</small><strong>${candidate.recruiter}</strong><span>${candidate.recruiterRole}</span></div>
    </section>

    <section class="candidate-reference-layout">
      <div class="candidate-reference-main">
        <article class="candidate-panel candidate-compact-panel"><h2>Biodata</h2>${[
          ["Nama Lengkap", candidate.name],
          ["Tempat, Tanggal Lahir", candidate.birth],
          ["Jenis Kelamin", candidate.gender],
          ["Status Pernikahan", candidate.marital],
          ["Kewarganegaraan", candidate.citizenship],
          ["Alamat", candidate.address]
        ].map(([k, v]) => `<div class="candidate-kv"><small>${k}</small><strong>${v}</strong></div>`).join("")}</article>

        <article class="candidate-panel candidate-compact-panel documents-panel"><div class="candidate-panel-head"><h2>Dokumen Ringkas</h2><button class="panel-link" type="button" data-open-modal="documents">Lihat semua dokumen</button></div><div class="document-grid reference-doc-grid">${documentsHtml(4)}</div></article>

        <article class="candidate-panel candidate-compact-panel"><div class="candidate-panel-head"><h2>Riwayat Tahapan Rekrutmen</h2><button class="panel-link" type="button" data-open-modal="history">Lihat riwayat lengkap</button></div><table class="history-table"><thead><tr><th>Tahapan</th><th>Status</th><th>Oleh</th><th>Tanggal</th><th>Catatan</th></tr></thead><tbody>${candidate.history.slice(0, 5).map((row) => `<tr>${row.map((cell, idx) => `<td>${idx === 1 ? `<span class="candidate-pill ${cell === "Selesai" ? "done" : cell === "Berjalan" ? "" : "muted"}">${cell}</span>` : cell}</td>`).join("")}</tr>`).join("")}</tbody></table></article>
      </div>

      <div class="candidate-reference-mid">
        <article class="candidate-panel candidate-compact-panel"><h2>Kontak</h2>${[
          ["Telepon", candidate.phone],
          ["Email", candidate.email],
          ["Domisili", candidate.domicile]
        ].map(([k, v]) => `<div class="candidate-kv icon-row"><small>${k}</small><strong>${v}</strong></div>`).join("")}</article>

        <article class="candidate-panel candidate-compact-panel"><h2>Posisi / Branch yang dilamar</h2>${[
          ["Posisi", candidate.position],
          ["Branch / Channel", candidate.branch],
          ["Penempatan yang disetujui", candidate.branch]
        ].map(([k, v]) => `<div class="candidate-kv"><small>${k}</small><strong>${v}</strong></div>`).join("")}</article>

        <article class="candidate-panel candidate-compact-panel"><div class="candidate-panel-head"><h2>Interview Notes</h2><button class="panel-link" type="button" data-open-modal="notes">Edit</button></div><p class="note-box reference-note">"${candidate.note}"</p><div class="recruiter-row">${avatar({ initials: candidate.recruiter.split(" ").map((n) => n[0]).join("").slice(0, 2) })}<div><strong>${candidate.recruiter}</strong><p class="candidate-muted">${candidate.recruiterRole}</p></div><span class="note-date">${candidate.history.find((item) => item[0] === "Interview")?.[3] || candidate.registered}</span></div></article>

        <article class="candidate-panel candidate-compact-panel"><div class="candidate-panel-head"><h2>Checklist Kelengkapan</h2><strong data-check-count>${completed} / 6 lengkap</strong></div><div class="check-progress"><i data-check-progress style="--progress:${progress}%"></i></div><div class="checklist-grid">${["Formulir Lamaran", "KTP", "NPWP", "Rekening Bank", "Sertifikat / Lisensi", "Surat Referensi"].map((item) => `<div class="check-item ${candidate.checklist.includes(item) ? "is-complete" : ""}" data-check-item><span class="check-dot">✓</span>${item}</div>`).join("")}</div></article>
      </div>

      <aside class="candidate-panel candidate-progress-panel"><h2>Progress Rekrutmen</h2><div class="progress-rail">${["Pendaftaran", "Screening", "Interview", "Verifikasi Dokumen", "Approval"].map((step, index) => {
        const hist = candidate.history.find((item) => item[0] === step || (step === "Verifikasi Dokumen" && item[0] === "Verification"));
        const state = index < currentIndex ? "done" : index === currentIndex ? "active" : "";
        return `<div class="progress-step ${state}" data-step="${index + 1}"><strong>${step}</strong><span>${state === "done" ? "Selesai" : state === "active" ? "Berjalan" : "Belum Mulai"}${hist?.[3] && hist[3] !== "-" ? ` · ${hist[3]}` : ""}</span>${state === "active" ? '<em>Menunggu hasil tahap saat ini</em>' : ""}</div>`;
      }).join("")}</div></aside>
    </section>
  `;
}

function addCandidateModal() {
  openModal("Tambah Kandidat", `
    <form class="candidate-form" data-add-candidate-form>
      <label><span>Nama Kandidat</span><input class="input" name="name" value="Alya Maharani"></label>
      <label><span>Email</span><input class="input" name="email" value="alya.maharani@mail.com"></label>
      <label><span>Cabang</span><select class="select" name="branch"><option>Jakarta Selatan</option><option>Bandung</option><option>Surabaya</option></select></label>
      <label><span>Posisi</span><input class="input" name="position" value="Agent Asuransi"></label>
      <label><span>Sumber Rekrutmen</span><select class="select" name="source"><option>Website Career</option><option>Jobstreet</option><option>Referal Karyawan</option></select></label>
      <button class="candidate-primary" type="submit">Simpan Kandidat Dummy</button>
    </form>
  `);
}

function wireCommonEvents() {
  document.addEventListener("click", (event) => {
    const action = event.target.closest("[data-candidate-action]");
    if (action) showToast(action.dataset.candidateAction);

    const detailLink = event.target.closest("[data-detail-link]");
    const card = event.target.closest("[data-candidate-row]");
    if (detailLink || (card && !event.target.closest("button, a, select, input"))) {
      const id = (detailLink || card).closest("[data-candidate-row]")?.dataset.id;
      if (id) setSelectedCandidate(id);
      if (card && !detailLink) window.location.href = `candidate-detail.html?id=${id}`;
    }

    if (event.target.closest("[data-close-modal]") || event.target === modal) closeModal();

    const open = event.target.closest("[data-open-modal]");
    if (open && detailPage) {
      const candidate = getSelectedCandidate();
      const type = open.dataset.openModal;
      const map = {
        documents: ["Semua Dokumen", `<div class="document-grid modal-doc-grid">${documentsHtml()}</div>`],
        history: ["Riwayat Lengkap", `<table class="history-table"><thead><tr><th>Tahapan</th><th>Status</th><th>Oleh</th><th>Tanggal</th><th>Catatan</th></tr></thead><tbody>${candidate.history.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`],
        notes: ["Edit Interview Notes", `<label class="candidate-form-full"><span>Catatan Interview</span><textarea class="input">${candidate.note}</textarea></label><button class="candidate-primary" type="button" data-save-modal>Save Notes</button>`],
        revision: ["Request Revision", `<label class="candidate-form-full"><span>Pesan Revisi</span><textarea class="input">Mohon lengkapi atau perbarui dokumen yang belum valid sebelum proses dilanjutkan.</textarea></label><button class="candidate-warning" type="button" data-save-modal>Kirim Request Revision</button>`],
        more: ["Aksi Lainnya", `<div class="candidate-list-actions"><button class="pipeline-action" type="button" data-save-modal>Jadwal Ulang Interview</button><button class="pipeline-action" type="button" data-save-modal>Tandai Prioritas</button><button class="pipeline-action" type="button" data-save-modal>Download PDF</button></div>`]
      };
      if (map[type]) openModal(map[type][0], map[type][1]);
    }

    if (event.target.closest("[data-save-modal]")) {
      closeModal();
      showToast("Aksi dummy berhasil disimpan.");
    }

    if (event.target.closest("[data-doc-preview]")) {
      showToast(`Preview ${event.target.closest("[data-doc-preview]").dataset.docPreview} dibuka.`);
    }

    if (event.target.closest("[data-open-add-candidate]")) addCandidateModal();
  });

  modal?.addEventListener("submit", (event) => {
    if (!event.target.matches("[data-add-candidate-form]")) return;
    event.preventDefault();
    closeModal();
    showToast("Kandidat dummy berhasil ditambahkan ke draft.");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

function wireListPage() {
  renderList();
  ["[data-candidate-search]", "[data-candidate-stage]", "[data-candidate-branch]", "[data-candidate-status]"].forEach((selector) => {
    listPage.querySelector(selector)?.addEventListener("input", () => { candidateListPage = 1; filterList(); });
    listPage.querySelector(selector)?.addEventListener("change", () => { candidateListPage = 1; filterList(); });
  });
  listPage.querySelector("[data-reset-candidates]")?.addEventListener("click", () => {
    listPage.querySelector("[data-candidate-search]").value = "";
    listPage.querySelector("[data-candidate-stage]").value = "all";
    listPage.querySelector("[data-candidate-branch]").value = "all";
    listPage.querySelector("[data-candidate-status]").value = "all";
    candidateListPage = 1;
    filterList();
    showToast("Filter kandidat direset.");
  });
  listPage.addEventListener("click", (event) => {
    const pageButton = event.target.closest("[data-candidate-page]");
    if (!pageButton) return;
    candidateListPage = Number(pageButton.dataset.candidatePage);
    filterList();
  });
  filterList();
}

function wireDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const backLink = detailPage.querySelector(".candidate-detail-actions .candidate-light-button");
  if (params.get("from") === "approval" && backLink) {
    backLink.href = "recruitment-approval.html";
    backLink.textContent = "← Kembali ke recruitment approval";
  }
  renderDetail();
  detailPage.addEventListener("click", (event) => {
    const check = event.target.closest("[data-check-item]");
    if (!check) return;
    check.classList.toggle("is-complete");
    const items = Array.from(detailPage.querySelectorAll("[data-check-item]"));
    const done = items.filter((item) => item.classList.contains("is-complete")).length;
    detailPage.querySelector("[data-check-count]").textContent = `${done} / ${items.length} lengkap`;
    detailPage.querySelector("[data-check-progress]").style.setProperty("--progress", `${Math.round((done / items.length) * 100)}%`);
    showToast(`${check.textContent.trim()} diperbarui.`);
  });

  function setDecisionStatus(type) {
    const candidate = getSelectedCandidate();
    const root = detailPage.querySelector("[data-candidate-detail-root]");
    if (!root) return;
    let banner = root.querySelector("[data-decision-banner]");
    if (!banner) {
      banner = document.createElement("article");
      banner.dataset.decisionBanner = "";
      root.prepend(banner);
    }
    const isApproved = type === "approve";
    banner.className = `candidate-decision-banner ${isApproved ? "approved" : "rejected"}`;
    banner.innerHTML = `
      <span class="decision-icon">${isApproved ? "✓" : "!"}</span>
      <div>
        <strong>${candidate.name} ${isApproved ? "disetujui" : "ditolak"}</strong>
        <p>${isApproved ? "Status kandidat ditandai approved dan siap lanjut ke onboarding." : "Status kandidat ditandai rejected dan proses rekrutmen dihentikan."}</p>
      </div>
      <small>${new Date().toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</small>
    `;

    detailPage.querySelectorAll("[data-detail-action]").forEach((button) => {
      button.classList.toggle("is-active", button.dataset.detailAction === type);
    });
    showToast(`${candidate.name} ${isApproved ? "ditandai approved." : "ditandai rejected."}`);
  }

  detailPage.querySelector("[data-detail-action='approve']")?.addEventListener("click", () => setDecisionStatus("approve"));
  detailPage.querySelector("[data-detail-action='reject']")?.addEventListener("click", () => setDecisionStatus("reject"));
}

wireCommonEvents();
if (listPage) wireListPage();
if (detailPage) wireDetailPage();
})();
