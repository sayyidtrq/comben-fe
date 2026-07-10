import re

def populate_html():
    with open('pages/agent-hierarchy.html', 'r') as f:
        content = f.read()

    tree_html = """
            <ul>
              <li>
                <div class="tree-card-container is-selected">
                  <div class="role-badge role-regional">REGIONAL HEAD</div>
                  <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                      <img src="https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=12B9C3&color=fff" style="width:100%; height:100%; object-fit:cover;">
                    </div>
                    <div>
                      <div style="font-weight: 700; font-size: 13px; color: #111827;">Siti Nurhaliza</div>
                      <div style="font-size: 12px; color: #6B7280;">AGT-002345</div>
                    </div>
                  </div>
                  <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6B7280; border-top: 1px solid #F3F4F6; padding-top: 8px;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" width="12" height="12"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    <span style="color: #10B981; font-weight: 500;">Total Tim: 24 | Direct Report: 3</span>
                  </div>
                </div>
                <ul>
                  <li>
                    <div class="tree-card-container">
                      <div class="role-badge role-am">AGENCY MANAGER</div>
                      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                          <img src="https://ui-avatars.com/api/?name=Fajar+Ramadhan&background=3B82F6&color=fff" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <div>
                          <div style="font-weight: 700; font-size: 13px; color: #111827;">Fajar Ramadhan</div>
                          <div style="font-size: 12px; color: #6B7280;">AGT-002346</div>
                        </div>
                      </div>
                      <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6B7280; border-top: 1px solid #F3F4F6; padding-top: 8px;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" width="12" height="12"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        Total Tim: 8 | Direct Report: 2
                      </div>
                    </div>
                    <ul>
                      <li>
                        <div class="tree-card-container">
                          <div class="role-badge role-spv">SUPERVISOR</div>
                          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                              <img src="https://ui-avatars.com/api/?name=Maya+Lestari&background=9333EA&color=fff" style="width:100%; height:100%; object-fit:cover;">
                            </div>
                            <div>
                              <div style="font-weight: 700; font-size: 13px; color: #111827;">Maya Lestari</div>
                              <div style="font-size: 12px; color: #6B7280;">AGT-002348</div>
                            </div>
                          </div>
                          <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6B7280; border-top: 1px solid #F3F4F6; padding-top: 8px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" width="12" height="12"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            Total Tim: 4
                          </div>
                        </div>
                        <ul>
                          <li>
                            <div class="tree-card-container leaf-node">
                              <div class="role-badge role-agen">AGEN</div>
                              <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #059669; font-weight: 600; font-size: 13px;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> 4 Agen
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <div class="tree-card-container">
                          <div class="role-badge role-spv">SUPERVISOR</div>
                          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                              <img src="https://ui-avatars.com/api/?name=Rudi+Pratama&background=9333EA&color=fff" style="width:100%; height:100%; object-fit:cover;">
                            </div>
                            <div>
                              <div style="font-weight: 700; font-size: 13px; color: #111827;">Rudi Pratama</div>
                              <div style="font-size: 12px; color: #6B7280;">AGT-002789</div>
                            </div>
                          </div>
                          <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6B7280; border-top: 1px solid #F3F4F6; padding-top: 8px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" width="12" height="12"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            Total Tim: 4
                          </div>
                        </div>
                        <ul>
                          <li>
                            <div class="tree-card-container leaf-node">
                              <div class="role-badge role-agen">AGEN</div>
                              <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #059669; font-weight: 600; font-size: 13px;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> 4 Agen
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  
                  <li>
                    <div class="tree-card-container">
                      <div class="role-badge role-am">AGENCY MANAGER</div>
                      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                          <img src="https://ui-avatars.com/api/?name=Nanda+Pratama&background=3B82F6&color=fff" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <div>
                          <div style="font-weight: 700; font-size: 13px; color: #111827;">Nanda Pratama</div>
                          <div style="font-size: 12px; color: #6B7280;">AGT-002347</div>
                        </div>
                      </div>
                      <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6B7280; border-top: 1px solid #F3F4F6; padding-top: 8px;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" width="12" height="12"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        Total Tim: 9 | Direct Report: 2
                      </div>
                    </div>
                    <ul>
                      <li>
                        <div class="tree-card-container">
                          <div class="role-badge role-spv">SUPERVISOR</div>
                          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                              <img src="https://ui-avatars.com/api/?name=Dewi+Sartika&background=9333EA&color=fff" style="width:100%; height:100%; object-fit:cover;">
                            </div>
                            <div>
                              <div style="font-weight: 700; font-size: 13px; color: #111827;">Dewi Sartika</div>
                              <div style="font-size: 12px; color: #6B7280;">AGT-000456</div>
                            </div>
                          </div>
                          <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6B7280; border-top: 1px solid #F3F4F6; padding-top: 8px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" width="12" height="12"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            Total Tim: 5
                          </div>
                        </div>
                        <ul>
                          <li>
                            <div class="tree-card-container leaf-node">
                              <div class="role-badge role-agen">AGEN</div>
                              <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #059669; font-weight: 600; font-size: 13px;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> 5 Agen
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <div class="tree-card-container">
                          <div class="role-badge role-spv">SUPERVISOR</div>
                          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                              <img src="https://ui-avatars.com/api/?name=Bambang+Setiawan&background=9333EA&color=fff" style="width:100%; height:100%; object-fit:cover;">
                            </div>
                            <div>
                              <div style="font-weight: 700; font-size: 13px; color: #111827;">Bambang Setiawan</div>
                              <div style="font-size: 12px; color: #6B7280;">AGT-001567</div>
                            </div>
                          </div>
                          <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6B7280; border-top: 1px solid #F3F4F6; padding-top: 8px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" width="12" height="12"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            Total Tim: 4
                          </div>
                        </div>
                        <ul>
                          <li>
                            <div class="tree-card-container leaf-node">
                              <div class="role-badge role-agen">AGEN</div>
                              <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #059669; font-weight: 600; font-size: 13px;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> 5 Agen
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  
                  <li>
                    <div class="tree-card-container">
                      <div class="role-badge role-am">AGENCY MANAGER</div>
                      <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                        <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                          <img src="https://ui-avatars.com/api/?name=Ahmad+Fauzi&background=3B82F6&color=fff" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <div>
                          <div style="font-weight: 700; font-size: 13px; color: #111827;">Ahmad Fauzi</div>
                          <div style="font-size: 12px; color: #6B7280;">AGT-002349</div>
                        </div>
                      </div>
                      <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6B7280; border-top: 1px solid #F3F4F6; padding-top: 8px;">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" width="12" height="12"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        Total Tim: 9 | Direct Report: 2
                      </div>
                    </div>
                    <ul>
                      <li>
                        <div class="tree-card-container">
                          <div class="role-badge role-spv">SUPERVISOR</div>
                          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                              <img src="https://ui-avatars.com/api/?name=Yuliana+Lestari&background=9333EA&color=fff" style="width:100%; height:100%; object-fit:cover;">
                            </div>
                            <div>
                              <div style="font-weight: 700; font-size: 13px; color: #111827;">Yuliana Lestari</div>
                              <div style="font-size: 12px; color: #6B7280;">AGT-001234</div>
                            </div>
                          </div>
                          <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6B7280; border-top: 1px solid #F3F4F6; padding-top: 8px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" width="12" height="12"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            Total Tim: 3
                          </div>
                        </div>
                        <ul>
                          <li>
                            <div class="tree-card-container leaf-node">
                              <div class="role-badge role-agen">AGEN</div>
                              <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #059669; font-weight: 600; font-size: 13px;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> 4 Agen
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <div class="tree-card-container">
                          <div class="role-badge role-spv">SUPERVISOR</div>
                          <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 12px;">
                            <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden;">
                              <img src="https://ui-avatars.com/api/?name=Andi+Hermawan&background=9333EA&color=fff" style="width:100%; height:100%; object-fit:cover;">
                            </div>
                            <div>
                              <div style="font-weight: 700; font-size: 13px; color: #111827;">Andi Hermawan</div>
                              <div style="font-size: 12px; color: #6B7280;">AGT-000123</div>
                            </div>
                          </div>
                          <div style="display: flex; align-items: center; gap: 6px; font-size: 11px; color: #6B7280; border-top: 1px solid #F3F4F6; padding-top: 8px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" width="12" height="12"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            Total Tim: 4
                          </div>
                        </div>
                        <ul>
                          <li>
                            <div class="tree-card-container leaf-node">
                              <div class="role-badge role-agen">AGEN</div>
                              <div style="display: flex; align-items: center; justify-content: center; gap: 8px; color: #059669; font-weight: 600; font-size: 13px;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> 4 Agen
                              </div>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
"""

    detail_html = """
          <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 24px;">
            <div style="width: 64px; height: 64px; border-radius: 50%; overflow: hidden; margin-bottom: 12px;">
              <img src="https://ui-avatars.com/api/?name=Siti+Nurhaliza&background=12B9C3&color=fff" style="width:100%; height:100%; object-fit:cover;">
            </div>
            <div style="font-weight: 700; font-size: 16px; color: #111827;">Siti Nurhaliza</div>
            <div style="font-size: 13px; color: #6B7280; margin-bottom: 8px;">AGT-002345</div>
            <div style="background: #E0F2FE; color: #0284C7; font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 12px;">Regional Head</div>
          </div>
          
          <div class="detail-list">
            <div class="detail-row">
              <div class="detail-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M7 8V6a5 5 0 0 1 10 0v2"/></svg> Posisi</div>
              <div class="detail-val">Regional Head</div>
            </div>
            <div class="detail-row">
              <div class="detail-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> Wilayah</div>
              <div class="detail-val">Jakarta Raya</div>
            </div>
            <div class="detail-row">
              <div class="detail-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg> Cabang</div>
              <div class="detail-val">Jakarta Selatan</div>
            </div>
            <div class="detail-row">
              <div class="detail-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> Total Tim</div>
              <div class="detail-val">24 Agen</div>
            </div>
            <div class="detail-row">
              <div class="detail-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg> Direct Report</div>
              <div class="detail-val">3 (Agency Manager)</div>
            </div>
            <div class="detail-row">
              <div class="detail-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Override Eligibility</div>
              <div class="detail-val"><span style="background: #D1FAE5; color: #059669; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">Ya</span></div>
            </div>
            <div class="detail-row">
              <div class="detail-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Periode Berlaku</div>
              <div class="detail-val">1 Mei 2025 - Sekarang</div>
            </div>
            <div class="detail-row">
              <div class="detail-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg> Status</div>
              <div class="detail-val" style="display:flex; align-items:center; gap:6px;"><div style="width:6px; height:6px; border-radius:50%; background:#10B981;"></div> Aktif</div>
            </div>
            <div class="detail-row">
              <div class="detail-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> Email</div>
              <div class="detail-val">siti.nurhaliza@comben.co.id</div>
            </div>
            <div class="detail-row">
              <div class="detail-label"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> No. Telepon</div>
              <div class="detail-val">0812-3456-7890</div>
            </div>
          </div>
          
          <button class="button" style="width: 100%; margin-top: 24px; background: white; color: #12B9C3; border: 1px solid #12B9C3; border-radius: 6px; padding: 10px 16px; font-size: 13px; font-weight: 600; display:flex; justify-content:center; align-items:center; gap:8px;">
            Lihat Profil Agen <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </button>
"""

    table_html = """
          <table class="history-table">
            <thead>
              <tr>
                <th>Tanggal & Waktu</th>
                <th>Aksi</th>
                <th>Perubahan</th>
                <th>Dari</th>
                <th>Ke</th>
                <th>Dilakukan Oleh</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><div style="display:flex; align-items:center; gap:8px;"><svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 22 Mei 2025 <span style="color:#9CA3AF; margin-left:8px;">10:24</span></div></td>
                <td><span class="action-label action-pindah"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></svg> Pindah Struktur</span></td>
                <td>Pemindahan Supervisor</td>
                <td>Rudi Pratama (AGT-002789)</td>
                <td>Dewi Sartika (AGT-000456)</td>
                <td>Budi Santoso</td>
                <td>Penyesuaian struktur tim untuk area Jakarta Selatan</td>
              </tr>
              <tr>
                <td><div style="display:flex; align-items:center; gap:8px;"><svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 20 Mei 2025 <span style="color:#9CA3AF; margin-left:8px;">15:32</span></div></td>
                <td><span class="action-label action-tambah"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg> Penambahan</span></td>
                <td>Penambahan Agen</td>
                <td>-</td>
                <td>Andi Saputra (AGT-003210)</td>
                <td>Dedi Kurniawan</td>
                <td>Agen baru hasil rekrutmen Mei 2025</td>
              </tr>
              <tr>
                <td><div style="display:flex; align-items:center; gap:8px;"><svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 18 Mei 2025 <span style="color:#9CA3AF; margin-left:8px;">09:15</span></div></td>
                <td><span class="action-label action-ubah"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Perubahan Posisi</span></td>
                <td>Perubahan Posisi</td>
                <td>Supervisor</td>
                <td>Agency Manager</td>
                <td>Budi Santoso</td>
                <td>Promosi kinerja Q1 2025</td>
              </tr>
              <tr>
                <td><div style="display:flex; align-items:center; gap:8px;"><svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" stroke-width="2" width="14" height="14"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 15 Mei 2025 <span style="color:#9CA3AF; margin-left:8px;">11:07</span></div></td>
                <td><span class="action-label action-hapus"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg> Penghapusan</span></td>
                <td>Penghapusan Agen</td>
                <td>Ahmad Zaki (AGT-001998)</td>
                <td>-</td>
                <td>Dedi Kurniawan</td>
                <td>Resign atas permintaan sendiri</td>
              </tr>
            </tbody>
          </table>
"""

    content = content.replace('<!-- Tree goes here -->', tree_html)
    content = content.replace('<!-- Detail goes here -->', detail_html)
    content = content.replace('<!-- Table goes here -->', table_html)

    with open('pages/agent-hierarchy.html', 'w') as f:
        f.write(content)

if __name__ == "__main__":
    populate_html()
