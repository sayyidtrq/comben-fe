(() => {
const page = document.querySelector("[data-recruitment-approval-page]");
if (!page) return;

const docs = [
  ["KTP", "../assets/documents/ktp.jpeg", "Lengkap"],
  ["NPWP", "../assets/documents/npwp.jpeg", "Lengkap"],
  ["Ijazah Terakhir", "../assets/documents/sertifikat.webp", "Lengkap"],
  ["SKCK", "../assets/documents/surat-referensi.png", "Lengkap"],
  ["Surat Kesehatan", "../assets/documents/surat-referensi.png", "Lengkap"],
  ["Rekening Bank", "../assets/documents/rekening-bank.jpg", "Lengkap"]
];

const names = [
  ["AGT-002789", "Rudi Pratama", "Jakarta Selatan", "Senior Agent", "Dewi Sartika", 87, 100],
  ["AGT-002567", "Dinda Ayu Lestari", "Surabaya", "Financial Advisor", "Yuliana Lestari", 86, 100],
  ["AGT-002413", "Bambang Setiawan", "Bandung", "Agent Asuransi", "Ahmad Fauzi", 77, 90]
];

const approvals = Array.from({ length: 36 }, (_, index) => {
  const base = names[index % names.length];
  const day = 27 - (index % 12);
  const statusCycle = ["waiting", "approved", "revision", "waiting", "rejected", "approved", "waiting", "revision", "waiting", "approved", "rejected", "waiting"][index % 12];
  return {
    rowKey: `${base[0]}-approval-${index + 1}`,
    id: base[0],
    profileId: base[0],
    name: base[1],
    branch: base[2],
    position: base[3],
    submittedBy: base[4],
    submitterRole: index % 2 === 0 ? "Unit Manager" : "Branch Manager",
    interviewScore: Math.max(68, base[5] - (index % 5)),
    completeness: Math.max(80, base[6] - (index % 3) * 5),
    status: statusCycle,
    level: index % 3 === 0 ? "Regional Manager" : index % 3 === 1 ? "Branch Manager" : "Super Admin",
    date: `2025-05-${String(day).padStart(2, "0")}`,
    time: `${String(9 + (index % 7)).padStart(2, "0")}:${index % 2 ? "18" : "47"}`,
    seen: index === 0,
    age: 23 + (index % 12),
    phone: `0812-${3456 + index}-${7890 - index}`,
    email: `${base[1].toLowerCase().replaceAll(" ", ".")}@email.com`,
    education: index % 2 ? "S1 Komunikasi" : "S1 Manajemen",
    address: index % 2 ? "Jl. Kemang Raya No. 15, Jakarta Selatan" : "Jl. Cihampelas No. 123, Bandung",
    recommendation: index % 5 === 3 ? "Pertimbangkan" : "Direkomendasikan"
  };
});

let state = {
  page: 1,
  pageSize: 5,
  selectedId: approvals[0].rowKey
};

function toast(message) {
  const el = page.querySelector("[data-ra-toast]");
  if (!el) return;
  el.textContent = message;
  el.classList.add("show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => el.classList.remove("show"), 2200);
}

function statusLabel(status) {
  return {
    waiting: "Menunggu Persetujuan",
    approved: "Disetujui",
    revision: "Need Revision",
    rejected: "Rejected"
  }[status] || status;
}

function eyeIcon(seen) {
  return seen
    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3l18 18"/><path d="M10.6 10.6a2 2 0 0 0 2.8 2.8"/><path d="M9.9 5.2A9.2 9.2 0 0 1 12 5c6.5 0 10 7 10 7a16.4 16.4 0 0 1-3.1 4.1"/><path d="M6.6 6.6C3.7 8.4 2 12 2 12s3.5 7 10 7a9.6 9.6 0 0 0 4.4-1"/></svg>';
}

function filteredRows() {
  const query = page.querySelector("[data-ra-search]")?.value.trim().toLowerCase() || "";
  const level = page.querySelector("[data-ra-level]").value;
  const branch = page.querySelector("[data-ra-branch]").value;
  const status = page.querySelector("[data-ra-status]").value;
  const start = page.querySelector("[data-date-start]").value;
  const end = page.querySelector("[data-date-end]").value;
  return approvals.filter((row) => (!query || [row.id, row.name, row.branch, row.position, row.submittedBy, row.email].join(" ").toLowerCase().includes(query))
    && (level === "all" || row.level === level)
    && (branch === "all" || row.branch === branch)
    && (status === "all" || row.status === status)
    && (!start || row.date >= start)
    && (!end || row.date <= end));
}

function renderMetrics() {
  const metrics = [
    ["Waiting Approval", 36, "↑ 8.6% dari Apr 2025", "⏳", "#e8f1ff", "", "waiting"],
    ["Approved Today", 12, "↑ 20.0% dari kemarin", "✓", "#e7f8ed", "", "approved"],
    ["Need Revision", 7, "↓ 12.5% dari Apr 2025", "✎", "#fff5db", "warning", "revision"],
    ["Rejected", 5, "↓ 3.8% dari Apr 2025", "×", "#ffe4eb", "danger", "rejected"]
  ];
  const currentStatus = page.querySelector("[data-ra-status]").value;
  page.querySelector("[data-ra-metrics]").innerHTML = metrics.map(([label, value, trend, icon, bg, tone, status]) => `
    <button class="ra-metric ${tone} ${currentStatus === status ? "is-active" : ""}" type="button" data-ra-metric="${status}">
      <div class="ra-metric-icon" style="background:${bg}">${icon}</div>
      <div><small>${label}</small><strong>${value}</strong><span>${trend}</span></div>
    </button>
  `).join("");
}

function renderTable() {
  const rows = filteredRows();
  const totalPages = Math.max(1, Math.ceil(rows.length / state.pageSize));
  if (state.page > totalPages) state.page = totalPages;
  const start = (state.page - 1) * state.pageSize;
  const visible = rows.slice(start, start + state.pageSize);
  page.querySelector("[data-ra-count]").textContent = `(${rows.length})`;
  page.querySelector("[data-ra-rows]").innerHTML = visible.map((row) => `
    <tr data-ra-row="${row.rowKey}" class="${row.rowKey === state.selectedId ? "is-selected" : ""}">
      <td><span class="ra-radio"></span></td>
      <td><strong style="color:#2478e8">${row.id}</strong></td>
      <td><strong>${row.name}</strong></td>
      <td>${row.branch}</td>
      <td>${row.position}</td>
      <td>${row.completeness}% <span class="ra-score ${row.completeness < 90 ? "mid" : ""}">${row.completeness >= 95 ? "Lengkap" : "Kurang"}</span></td>
      <td>${row.interviewScore} <span class="ra-score ${row.interviewScore < 78 ? "mid" : ""}">${row.interviewScore >= 78 ? "Baik" : "Cukup"}</span></td>
      <td><strong>${row.submittedBy}</strong><br><small>${row.submitterRole}</small></td>
      <td>${new Date(row.date).toLocaleDateString("id-ID", { day:"2-digit", month:"short", year:"numeric" })}<br><small>${row.time}</small></td>
      <td><span class="ra-status ${row.status}">${statusLabel(row.status)}</span></td>
      <td><button class="ra-view ${row.seen ? "is-seen" : ""}" type="button" data-ra-view="${row.rowKey}" aria-label="${row.seen ? "Tandai belum dilihat" : "Lihat"} ${row.name}">${eyeIcon(row.seen)}<span>Lihat</span></button></td>
    </tr>
  `).join("");

  page.querySelector("[data-ra-page-info]").textContent = rows.length
    ? `Menampilkan ${start + 1} - ${Math.min(start + state.pageSize, rows.length)} dari ${rows.length} data`
    : "Tidak ada data";
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  page.querySelector("[data-ra-pagination]").innerHTML = [
    state.page >= 3 ? `<button type="button" data-ra-page="1" aria-label="Halaman pertama">&lt;&lt;</button>` : "",
    state.page > 1 ? `<button type="button" data-ra-page="${state.page - 1}" aria-label="Halaman sebelumnya">&lt;</button>` : "",
    ...pageNumbers.map((number) => `<button type="button" class="${number === state.page ? "active" : ""}" data-ra-page="${number}">${number}</button>`),
    state.page < totalPages ? `<button type="button" data-ra-page="${state.page + 1}" aria-label="Halaman berikutnya">&gt;</button>` : "",
    state.page < totalPages ? `<button type="button" data-ra-page="${totalPages}" aria-label="Halaman terakhir">&gt;&gt;</button>` : ""
  ].join("");
}

function selectedRow() {
  const rows = filteredRows();
  return rows.find((row) => row.rowKey === state.selectedId) || rows[0] || approvals[0];
}

function updateDateLabel() {
  const button = page.querySelector("[data-open-calendar]");
  const start = page.querySelector("[data-date-start]").value;
  const end = page.querySelector("[data-date-end]").value;
  const format = (value) => new Date(value).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
  if (button && start && end) button.textContent = `${format(start)} - ${format(end)}`;
}

function renderDetail() {
  const row = selectedRow();
  const profileId = row.profileId || row.id.split("-").slice(0, 2).join("-");
  state.selectedId = row.rowKey;
  const initials = row.name.split(" ").map((part) => part[0]).join("").slice(0, 2);
  page.querySelector("[data-ra-candidate-detail]").innerHTML = `
    <h3 class="ra-card-title">Detail Kandidat</h3>
    <div class="ra-detail-columns">
      <div class="ra-bio-column">
        <div class="ra-candidate-top"><span class="ra-avatar">${initials}</span><div><h3>${row.name}</h3><strong>${row.id}</strong><br><span class="candidate-pill">${row.position}</span></div></div>
        ${[
          ["⌚", "Tempat, Tgl Lahir", `Jakarta, 15 Maret 1996 (${row.age} thn)`],
          ["☎", "No. Handphone", row.phone],
          ["✉", "Email", row.email],
          ["▣", "Pendidikan Terakhir", row.education],
          ["◴", "Pengalaman Kerja", `${3 + (row.age % 4)} tahun`],
          ["⌖", "Alamat", row.address]
        ].map(([icon, k, v]) => `<div class="ra-kv ra-icon-kv"><span>${icon}</span><small>${k}</small><strong class="${k === "Email" ? "ra-value-email" : ""}">${v}</strong></div>`).join("")}
        <a class="ra-link-button" href="candidate-detail.html?id=${profileId}&from=approval" data-full-profile>Lihat Profil Lengkap ↗</a>
      </div>
      <div class="ra-summary-column"><strong>Ringkasan Rekrutmen</strong>${[
        ["Cabang", row.branch],
        ["Posisi yang Dilamar", row.position],
        ["Tanggal Interview", "25 Mei 2025"],
        ["Skor Interview", `${row.interviewScore} / 100 (Baik)`],
        ["Kelengkapan Dokumen", `${row.completeness}% (${row.completeness >= 95 ? "Lengkap" : "Kurang"})`],
        ["Rekomendasi", row.recommendation]
      ].map(([k, v]) => `<div class="ra-kv"><small>${k}</small><strong class="${k === "Rekomendasi" ? "ra-value-recommendation" : ""}">${v}</strong></div>`).join("")}</div>
      <div class="ra-doc-column"><strong>Dokumen Utama</strong><div class="ra-doc-list">${docs.slice(0, 6).map(([name, , status]) => `<div class="ra-doc-row"><span>✓ ${name}</span><span>${status}</span></div>`).join("")}</div><button class="ra-link-inline" type="button" data-ra-documents>Lihat semua dokumen (12)</button></div>
    </div>
  `;

  page.querySelector("[data-ra-risk]").innerHTML = `
    <div class="ra-risk-panel">
      <div class="ra-risk-head"><span class="ra-shield">🛡</span><h3>Flag Risiko</h3><span class="ra-score">${row.interviewScore > 80 ? "Risiko Rendah" : "Risiko Medium"}</span></div>
      <div class="ra-risk-list">
        <div class="ra-risk-row"><span>✓ Tidak ada catatan kredit bermasalah</span></div>
        <div class="ra-risk-row"><span>✓ Tidak masuk daftar hitam internal</span></div>
        <div class="ra-risk-row"><span>✓ Riwayat pekerjaan sesuai</span></div>
      </div>
      <button class="ra-link-inline" type="button" data-ra-screening>Lihat hasil screening lengkap</button>
    </div>
    <div class="ra-note-panel">
      <h3>Catatan Approver</h3>
      <textarea class="ra-approver-note" maxlength="1000" data-ra-note placeholder="Tulis catatan atau pertimbangan Anda..."></textarea>
      <small><span data-ra-note-count>0</span> / 1000 karakter</small>
    </div>
  `;
  page.querySelector("[data-ra-history]").innerHTML = `
    <h3>Riwayat Persetujuan</h3>
    <div class="ra-history-list">
      <div class="ra-history-item"><strong>Diajukan oleh ${row.submittedBy}</strong><br>${row.submitterRole} · ${new Date(row.date).toLocaleDateString("id-ID")}, ${row.time}</div>
      <div class="ra-history-item pending"><strong>Menunggu persetujuan Anda</strong><br>Level: ${row.level}</div>
      <div class="ra-history-item pending"><strong>Selanjutnya: Regional Manager</strong><br>Jika disetujui pada level Anda</div>
    </div>
  `;
}

function openDocs() {
  const body = `<div class="document-grid modal-doc-grid">${docs.map(([label, src]) => `
    <button class="document-card" type="button"><span class="document-thumb"><img src="${src}" alt="${label}"></span><strong>${label}</strong><small>Recruitment_${label}.jpg</small></button>
  `).join("")}</div>`;
  openModal("Semua Dokumen Kandidat", body);
}

function openModal(title, html) {
  page.querySelector("[data-ra-modal-title]").textContent = title;
  page.querySelector("[data-ra-modal-body]").innerHTML = html;
  page.querySelector("[data-ra-modal]").hidden = false;
}

function closeModal() {
  page.querySelector("[data-ra-modal]").hidden = true;
}

function rerender() {
  renderMetrics();
  renderTable();
  renderDetail();
}

page.addEventListener("click", (event) => {
  const metric = event.target.closest("[data-ra-metric]");
  if (metric) {
    page.querySelector("[data-ra-status]").value = metric.dataset.raMetric;
    state.page = 1;
    rerender();
    toast(`Tabel difilter: ${statusLabel(metric.dataset.raMetric)}.`);
    return;
  }

  const view = event.target.closest("[data-ra-view]");
  if (view) {
    event.stopPropagation();
    const item = approvals.find((approval) => approval.rowKey === view.dataset.raView);
    item.seen = !item.seen;
    state.selectedId = item.rowKey;
    renderTable();
    renderDetail();
    toast(item.seen ? "Data kandidat ditandai sudah dilihat." : "Data kandidat ditandai belum dilihat.");
    return;
  }

  const row = event.target.closest("[data-ra-row]");
  if (row) {
    state.selectedId = row.dataset.raRow;
    approvals.find((item) => item.rowKey === state.selectedId).seen = true;
    renderTable();
    renderDetail();
  }

  const pageButton = event.target.closest("[data-ra-page]");
  if (pageButton) {
    state.page = Number(pageButton.dataset.raPage);
    renderTable();
  }

  if (event.target.closest("[data-open-calendar]")) {
    const calendar = page.querySelector("[data-ra-calendar]");
    calendar.hidden = !calendar.hidden;
  }
  if (event.target.closest("[data-apply-calendar]")) {
    page.querySelector("[data-ra-calendar]").hidden = true;
    updateDateLabel();
    state.page = 1;
    rerender();
    toast("Filter tanggal diterapkan.");
  }
  if (event.target.closest("[data-ra-reset]")) {
    page.querySelector("[data-ra-search]").value = "";
    page.querySelector("[data-ra-level]").value = "all";
    page.querySelector("[data-ra-branch]").value = "all";
    page.querySelector("[data-ra-status]").value = "all";
    page.querySelector("[data-date-start]").value = "2025-05-01";
    page.querySelector("[data-date-end]").value = "2025-05-31";
    updateDateLabel();
    state.page = 1;
    rerender();
    toast("Filter direset.");
  }
  if (event.target.closest("[data-ra-documents]")) openDocs();
  if (event.target.closest("[data-ra-screening]")) openModal("Hasil Screening Lengkap", "<p class='note-box'>Dummy screening: kredit bersih, tidak ada blacklist internal, pengalaman kerja sesuai, dan rekomendasi recruiter positif.</p>");
  if (event.target.closest("[data-ra-close-modal]") || event.target === page.querySelector("[data-ra-modal]")) closeModal();
  const decision = event.target.closest("[data-ra-decision]");
  if (decision) {
    const rowData = selectedRow();
    rowData.status = decision.dataset.raDecision;
    state.page = 1;
    rerender();
    toast(`${rowData.name}: keputusan ${statusLabel(rowData.status)} disimpan.`);
  }

  if (!event.target.closest(".ra-date-filter")) {
    page.querySelector("[data-ra-calendar]").hidden = true;
  }
});

page.addEventListener("input", (event) => {
  if (event.target.matches("[data-ra-search], [data-ra-level], [data-ra-branch], [data-ra-status], [data-date-start], [data-date-end]")) {
    state.page = 1;
    rerender();
  }
  if (event.target.matches("[data-ra-note]")) {
    page.querySelector("[data-ra-note-count]").textContent = event.target.value.length;
  }
});

rerender();
updateDateLabel();
})();
