// ==========================================
// 1. 파이어베이스 초기화 및 설정 (보내주신 비밀키 적용)
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyCyO3O8QCoCoFFm61pntZBlm34Ynvr1Rxs",
  authDomain: "team-scheduler-86b2f.firebaseapp.com",
  projectId: "team-scheduler-86b2f",
  storageBucket: "team-scheduler-86b2f.firebasestorage.app",
  messagingSenderId: "542881484318",
  appId: "1:542881484318:web:758073989c1355a898680f",
  measurementId: "G-5Z9WNMY6T4"
};

// 파이어베이스 및 데이터베이스(Firestore) 연결
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// --- 기본 컬러 팔레트 ---
const COLOR_PALETTE = [
  '#6366f1', // Indigo
  '#0ea5e9', // Sky Blue
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#f43f5e', // Rose
  '#8b5cf6', // Violet
  '#14b8a6', // Teal
  '#f97316'  // Orange
];

// --- 기본 데이터 (서버 데이터베이스가 비어있을 때 사용) ---
const DEFAULT_MEMBERS = [
  { id: 'm1', name: '김민준', role: '프로젝트 매니저 (PM)', color: '#6366f1' },
  { id: 'm2', name: '이서연', role: 'UI/UX 디자이너', color: '#f43f5e' },
  { id: 'm3', name: '박지훈', role: '프론트엔드 개발자', color: '#0ea5e9' },
  { id: 'm4', name: '최수민', role: '백엔드 개발자', color: '#10b981' }
];

const getDemoEvents = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');

  return [
    {
      id: 'e1',
      title: '팀 주간 전체 회의',
      startDate: `${year}-${month}-15`,
      startTime: '10:00',
      endDate: `${year}-${month}-15`,
      endTime: '11:30',
      assignee: 'm1',
      assigneeName: '김민준',
      category: 'meeting',
      priority: 'high',
      description: '주간 업무 공유 및 마일스톤 점검을 위한 회의입니다.'
    },
    {
      id: 'e2',
      title: '신규 피처 디자인 시안 작업',
      startDate: `${year}-${month}-15`,
      startTime: '09:00',
      endDate: `${year}-${month}-19`,
      endTime: '18:00',
      assignee: 'm2',
      assigneeName: '이서연',
      category: 'task',
      priority: 'medium',
      description: '사용자 피드백을 반영한 모바일 UI 컴포넌트 리디자인 작업.'
    },
    {
      id: 'e3',
      title: '캘린더 대시보드 화면 마크업',
      startDate: `${year}-${month}-17`,
      startTime: '09:00',
      endDate: `${year}-${month}-22`,
      endTime: '18:00',
      assignee: 'm3',
      assigneeName: '박지훈',
      category: 'task',
      priority: 'high',
      description: 'CSS Grid와 Flexbox를 활용한 간트차트 및 캘린더 반응형 구현.'
    },
    {
      id: 'e4',
      title: '데이터베이스 마이그레이션 및 패치',
      startDate: `${year}-${month}-20`,
      startTime: '13:00',
      endDate: `${year}-${month}-20`,
      endTime: '16:00',
      assignee: 'm4',
      assigneeName: '최수민',
      category: 'milestone',
      priority: 'high',
      description: 'AWS RDS 스키마 업데이트 및 인덱스 최적화 작업.'
    },
    {
      id: 'e5',
      title: '개인 정기 여름 휴가',
      startDate: `${year}-${month}-24`,
      startTime: '09:00',
      endDate: `${year}-${month}-26`,
      endTime: '18:00',
      assignee: 'm1',
      assigneeName: '김민준',
      category: 'vacation',
      priority: 'low',
      description: '하반기 추진 동력 확보를 위한 재충전 휴가.'
    },
    {
      id: 'e6',
      title: '디자인 피드백 및 스프린트 계획 회의',
      startDate: `${year}-${month}-22`,
      startTime: '14:00',
      endDate: `${year}-${month}-22`,
      endTime: '16:00',
      assignee: 'm2',
      assigneeName: '이서연',
      category: 'meeting',
      priority: 'medium',
      description: '스프린트 3단계 개발 사항 확인 및 와이어프레임 최종 컨펌.'
    }
  ];
};

const getDemoReports = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');

  const getOffsetDateString = (offsetDays) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return getNormalizedDateString(d);
  };

  return [
    {
      id: 'r1',
      assignee: 'm1',
      assigneeName: '김민준',
      project: '차세대 국방 물류 ERP 구축',
      client: '국방부',
      startDate: `${year}-${month}-01`,
      endDate: `${year}-${month}-30`,
      amount: 4500,
      progress: 40,
      status: 'ongoing',
      remarks: '중간 보고 파일 작성 중, 백엔드 마일스톤 패치 조율 중.',
      invoiceStatus: 'unissued',
      invoiceDate: '',
      createdAt: getOffsetDateString(-3)
    },
    {
      id: 'r2',
      assignee: 'm2',
      assigneeName: '이서연',
      project: '티맥스 스마트 캘린더 리디자인',
      client: '티맥스소프트',
      startDate: `${year}-${month}-10`,
      endDate: `${year}-${month}-24`,
      amount: 1800,
      progress: 80,
      status: 'ongoing',
      remarks: 'UI 모형 2차 본 완료, 퍼블리셔 가이드 제공 예정.',
      invoiceStatus: 'unissued',
      invoiceDate: '',
      createdAt: getOffsetDateString(-10)
    },
    {
      id: 'r3',
      assignee: 'm3',
      assigneeName: '박지훈',
      project: '티맥스 스마트 캘린더 프론트 개발',
      client: '티맥스소프트',
      startDate: `${year}-${month}-15`,
      endDate: `${year}-${month}-30`,
      amount: 2500,
      progress: 60,
      status: 'ongoing',
      remarks: 'CSS Grid 및 반응형 캘린더 작업 완료. 주간 보고 연동 작업 진행 중.',
      invoiceStatus: 'unissued',
      invoiceDate: '',
      createdAt: getOffsetDateString(-2)
    },
    {
      id: 'r4',
      assignee: 'm4',
      assigneeName: '최수민',
      project: '클라우드 DB 분산 이중화 구축',
      client: 'KT Cloud',
      startDate: `${year}-${month}-05`,
      endDate: `${year}-${month}-20`,
      amount: 3200,
      progress: 100,
      status: 'completed',
      finalCompleted: true,
      remarks: 'DB 이중화 및 장애 복구 자동 테스트 통과 완료.',
      invoiceStatus: 'unissued',
      invoiceDate: '',
      createdAt: getOffsetDateString(-15)
    }
  ];
};

// --- 애플리케이션 상태(State) ---
const state = {
  members: [],
  events: [],
  reports: [],
  filters: {
    category: 'all',
    priority: 'all',
    memberIds: [],
    startDate: '',
    endDate: '',
    client: 'all',
    invoiceYear: new Date().getFullYear().toString(),
    completedYear: new Date().getFullYear().toString(),
    completedMonth: 'all',
    completedAssignee: 'all',
    reportAssignee: 'all',
    invoiceAssignee: 'all',
    invoiceStatus: 'all',
    invoiceMonth: 'all'
  },
  currentView: 'timeline',
  currentDate: new Date(),
  timelineScale: 'month',
  theme: 'light',
  pagination: {
    report: { currentPage: 1, pageSize: 10 },
    invoice: { currentPage: 1, pageSize: 10 },
    completed: { currentPage: 1, pageSize: 10 }
  }
};
const expandedInvoiceIds = new Set();

// --- 초기화 및 DOM 로드 완료 핸들러 ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setupLogin();
});

function setupLogin() {
  const loginContainer = document.getElementById('login-container');
  const appContainer = document.getElementById('app-container');
  const loginForm = document.getElementById('login-form');
  const usernameInput = document.getElementById('login-username');
  const passwordInput = document.getElementById('login-password');
  const errorMsg = document.getElementById('login-error-msg');

  firebase.auth().onAuthStateChanged((user) => {
    const btnReset = document.getElementById('btn-reset');
    const btnExport = document.getElementById('btn-export');
    const btnImport = document.getElementById('btn-import-trigger');

    if (user) {
      sessionStorage.setItem('is_logged_in', 'true');
      sessionStorage.setItem('logged_in_user', user.email);

      if (loginContainer) loginContainer.style.display = 'none';
      if (appContainer) appContainer.style.display = 'flex';

      const showAdminActions = (user.email === 'whjung@dnde.co.kr');
      if (btnReset) btnReset.style.display = showAdminActions ? 'flex' : 'none';
      if (btnExport) btnExport.style.display = showAdminActions ? 'flex' : 'none';
      if (btnImport) btnImport.style.display = showAdminActions ? 'flex' : 'none';

      setupEventListeners();
      listenToFirebaseRealtime();
    } else {
      sessionStorage.removeItem('is_logged_in');
      sessionStorage.removeItem('logged_in_user');
      sessionStorage.removeItem('secondary_auth');

      if (loginContainer) loginContainer.style.display = 'flex';
      if (appContainer) appContainer.style.display = 'none';

      if (btnReset) btnReset.style.display = 'none';
      if (btnExport) btnExport.style.display = 'none';
      if (btnImport) btnImport.style.display = 'none';
    }
  });

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const username = usernameInput.value.trim();
      const password = passwordInput.value;

      // 세션 지속성 설정 후 로그인 시도 (창 닫으면 자동 로그아웃)
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          // 🟢 대소문자 오타 교정 완료: Password -> password
          return firebase.auth().signInWithEmailAndPassword(username, password);
        })
        .then((userCredential) => {
          // 🟢 로그인 성공 시 토스트 알림 및 즉시 대시보드 화면 열기 연동
          showToast('CAE파트 일정 관리 시스템에 오신 것을 환영합니다.');
          if (loginContainer) loginContainer.style.display = 'none';
          if (appContainer) appContainer.style.display = 'flex';
          setupEventListeners();
          listenToFirebaseRealtime();
        })
        .catch((error) => {
          console.error("Firebase Auth Error:", error.code, error.message);
          errorMsg.textContent = '아이디 또는 비밀번호가 일치하지 않습니다.';
          errorMsg.style.display = 'block';
          passwordInput.value = '';
          passwordInput.focus();
        });
    });
  }
}

// ==========================================
// 2. 파이어베이스 실시간 데이터 동기화 리스너
// ==========================================
function listenToFirebaseRealtime() {
  let loadedCollections = 0;

  function checkAndRender() {
    loadedCollections++;
    if (loadedCollections >= 3) {
      // 테마는 UI 설정이므로 로컬 유지
      state.theme = localStorage.getItem('ts_theme') || 'light';
      document.documentElement.setAttribute('data-theme', state.theme);

      // 첫 로드 때 멤버가 한 명도 없다면(최초 설치) 초기 데모 데이터를 집어넣음
      if (state.members.length === 0) {
        initializeDemoDataToFirebase();
      } else {
        // 멤버가 있다면 필터 활성화
        if (state.filters.memberIds.length === 0) {
          const loggedInUser = sessionStorage.getItem('logged_in_user');
          if (loggedInUser) {
            const userPrefix = loggedInUser.split('@')[0];
            const nameMap = {
              'hdlee': '이헌덕',
              'ujkim': '김욱진',
              'wtkang': '강원태',
              'shmoon': '문승환',
              'yslim': '임윤승',
              'mgkim': '김민건'
            };
            if (userPrefix === 'whjung' || !nameMap[userPrefix]) {
              state.filters.memberIds = state.members.map(m => m.id);
            } else {
              const targetName = nameMap[userPrefix];
              const matchedMember = state.members.find(m => m.name === targetName);
              if (matchedMember) {
                state.filters.memberIds = [matchedMember.id];
              } else {
                state.filters.memberIds = state.members.map(m => m.id);
              }
            }
          } else {
            state.filters.memberIds = state.members.map(m => m.id);
          }
        }
        renderApp();
      }
    }
  }

  // A. 멤버 데이터 실시간 감지
  db.collection("members").onSnapshot((snapshot) => {
    const members = [];
    snapshot.forEach((doc) => members.push(doc.data()));
    state.members = members;
    if (loadedCollections < 3) checkAndRender(); else renderApp();
  });

  // B. 일정 데이터 실시간 감지
  db.collection("events").onSnapshot((snapshot) => {
    const events = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (!data.assigneeName && data.assignee) {
        const m = state.members.find(member => member.id === data.assignee);
        if (m) data.assigneeName = m.name;
      }
      events.push(data);
    });
    state.events = events;
    if (loadedCollections < 3) checkAndRender(); else renderApp();
  });

  // C. 프로젝트/주간보고 데이터 실시간 감지
  db.collection("reports").onSnapshot((snapshot) => {
    const reports = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (!data.assigneeName && data.assignee) {
        const m = state.members.find(member => member.id === data.assignee);
        if (m) data.assigneeName = m.name;
      }
      // 계산서 회차 마이그레이션 보정
      if (!data.invoices || !Array.isArray(data.invoices) || data.invoices.length < 5) {
        const invoices = [];
        invoices.push({
          status: data.invoiceStatus || 'unissued',
          amount: data.invoiceStatus === 'issued' ? (Number(data.amount) || 0) : 0,
          date: data.invoiceDate || ''
        });
        for (let i = 1; i < 5; i++) {
          invoices.push({ status: 'unissued', amount: 0, date: '' });
        }
        data.invoices = invoices;
      }
      reports.push(data);
    });
    state.reports = reports;
    if (loadedCollections < 3) checkAndRender(); else renderApp();
  });
}

// 최초 구동 시 클라우드 서버에 데모 데이터 심어주는 함수
function initializeDemoDataToFirebase() {
  showToast("서버에 데모 데이터를 생성하고 있습니다...");

  const batch = db.batch();

  DEFAULT_MEMBERS.forEach(m => {
    const ref = db.collection("members").doc(m.id);
    batch.set(ref, m);
  });

  getDemoEvents().forEach(e => {
    const ref = db.collection("events").doc(e.id);
    batch.set(ref, e);
  });

  getDemoReports().forEach(r => {
    // 5차 계산서 데이터 초기화 보정
    const invoices = [{ status: r.invoiceStatus || 'unissued', amount: r.invoiceStatus === 'issued' ? Number(r.amount) : 0, date: r.invoiceDate || '' }];
    for (let i = 1; i < 5; i++) invoices.push({ status: 'unissued', amount: 0, date: '' });
    r.invoices = invoices;

    const ref = db.collection("reports").doc(r.id);
    batch.set(ref, r);
  });

  batch.commit().then(() => {
    showToast("초기 데이터 구축이 완료되었습니다.");
  });
}

// 기존 saveData는 로컬에 임시 세이브 및 에이전트 동기화만 유지
function saveData() {
  localStorage.setItem('ts_members', JSON.stringify(state.members));
  localStorage.setItem('ts_events', JSON.stringify(state.events));
  localStorage.setItem('ts_reports', JSON.stringify(state.reports));
}

// --- 테마 설정 ---
function initTheme() {
  state.theme = localStorage.getItem('ts_theme') || 'light';
  document.documentElement.setAttribute('data-theme', state.theme);
  renderThemeIndicator();
}

function renderThemeIndicator() {
  const indicator = document.getElementById('theme-indicator');
  if (!indicator) return;
  if (state.theme === 'dark') {
    indicator.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
      다크
    `;
  } else {
    indicator.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      라이트
    `;
  }
}

function toggleTheme() {
  state.theme = state.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('ts_theme', state.theme);
  document.documentElement.setAttribute('data-theme', state.theme);
  renderThemeIndicator();
  showToast(`${state.theme === 'light' ? '라이트' : '다크'} 모드로 변경되었습니다.`);
}

// --- 이벤트 리스너 설정 ---
function setupEventListeners() {
  document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);

  document.getElementById('view-btn-timeline').addEventListener('click', () => switchView('timeline'));
  document.getElementById('view-btn-report').addEventListener('click', () => switchView('report'));
  document.getElementById('view-btn-invoice').addEventListener('click', () => switchView('invoice'));
  document.getElementById('view-btn-completed').addEventListener('click', () => switchView('completed'));

  document.getElementById('filter-start-date').addEventListener('change', (e) => {
    state.filters.startDate = e.target.value;
    resetPaginationPages();
    renderApp();
  });

  document.getElementById('filter-end-date').addEventListener('change', (e) => {
    state.filters.endDate = e.target.value;
    resetPaginationPages();
    renderApp();
  });

  document.getElementById('btn-clear-date-filter').addEventListener('click', () => {
    state.filters.startDate = '';
    state.filters.endDate = '';
    document.getElementById('filter-start-date').value = '';
    document.getElementById('filter-end-date').value = '';
    resetPaginationPages();
    renderApp();
  });

  document.getElementById('filter-client').addEventListener('change', (e) => {
    state.filters.client = e.target.value;
    resetPaginationPages();
    renderApp();
  });

  document.getElementById('filter-invoice-year').addEventListener('change', (e) => {
    state.filters.invoiceYear = e.target.value;
    resetPaginationPages();
    renderApp();
  });

  const filterInvoiceMonth = document.getElementById('filter-invoice-month');
  if (filterInvoiceMonth) {
    filterInvoiceMonth.addEventListener('change', (e) => {
      state.filters.invoiceMonth = e.target.value;
      resetPaginationPages();
      renderApp();
    });
  }

  const selectInvoiceAssignee = document.getElementById('filter-invoice-assignee');
  if (selectInvoiceAssignee) {
    selectInvoiceAssignee.addEventListener('change', (e) => {
      state.filters.invoiceAssignee = e.target.value;
      state.pagination.invoice.currentPage = 1;
      renderApp();
    });
  }

  // 팀원 전체 선택 / 전체 해제 리스너
  const btnSelectAll = document.getElementById('btn-select-all-members');
  if (btnSelectAll) {
    btnSelectAll.addEventListener('click', () => {
      state.filters.memberIds = state.members.map(m => m.id);
      resetPaginationPages();
      renderApp();
    });
  }

  const btnDeselectAll = document.getElementById('btn-deselect-all-members');
  if (btnDeselectAll) {
    btnDeselectAll.addEventListener('click', () => {
      state.filters.memberIds = [];
      resetPaginationPages();
      renderApp();
    });
  }

  // 세금계산서 구분 탭 리스너 등록
  const invoiceTabContainer = document.querySelector('.invoice-tab-container');
  if (invoiceTabContainer) {
    invoiceTabContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.invoice-tab-btn');
      if (!btn) return;

      // 탭 active 클래스 토글
      invoiceTabContainer.querySelectorAll('.invoice-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 필터 상태 업데이트 및 렌더링
      state.filters.invoiceStatus = btn.dataset.status;
      state.pagination.invoice.currentPage = 1;
      renderApp();
    });
  }

  const btnAddInvoiceProj = document.getElementById('btn-add-invoice-project');
  if (btnAddInvoiceProj) {
    btnAddInvoiceProj.addEventListener('click', () => {
      openReportModal();
    });
  }

  document.getElementById('filter-completed-year').addEventListener('change', (e) => {
    state.filters.completedYear = e.target.value;
    resetPaginationPages();
    renderApp();
  });

  const completedMonthSelect = document.getElementById('filter-completed-month');
  if (completedMonthSelect) {
    completedMonthSelect.addEventListener('change', (e) => {
      state.filters.completedMonth = e.target.value;
      resetPaginationPages();
      renderApp();
    });
  }

  const completedAssigneeSelect = document.getElementById('filter-completed-assignee');
  if (completedAssigneeSelect) {
    completedAssigneeSelect.addEventListener('change', (e) => {
      state.filters.completedAssignee = e.target.value;
      resetPaginationPages();
      renderApp();
    });
  }

  const selectReportAssignee = document.getElementById('filter-report-assignee');
  if (selectReportAssignee) {
    selectReportAssignee.addEventListener('change', (e) => {
      state.filters.reportAssignee = e.target.value;
      state.pagination.report.currentPage = 1;
      renderApp();
    });
  }

  document.getElementById('btn-cal-prev').addEventListener('click', () => navigateCalendar(-1));
  document.getElementById('btn-cal-next').addEventListener('click', () => navigateCalendar(1));
  document.getElementById('btn-cal-today').addEventListener('click', () => {
    state.currentDate = new Date();
    renderApp();
  });

  const scaleContainer = document.getElementById('timeline-scale-container');
  if (scaleContainer) {
    const scaleBtns = scaleContainer.querySelectorAll('.scale-btn');
    scaleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        scaleBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        state.timelineScale = e.target.dataset.scale;
        renderApp();
      });
    });
  }

  const priorityFilters = document.getElementById('priority-filter-container').querySelectorAll('.filter-tag');
  priorityFilters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      priorityFilters.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      state.filters.priority = e.target.dataset.priority;
      resetPaginationPages();
      renderApp();
    });
  });

  const sidebarCollapseBtn = document.getElementById('sidebar-collapse-btn');
  if (sidebarCollapseBtn) {
    sidebarCollapseBtn.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      const icon = document.getElementById('sidebar-collapse-icon');
      sidebar.classList.toggle('collapsed');

      if (sidebar.classList.contains('collapsed')) {
        icon.innerHTML = '<polyline points="9 18 15 12 9 6"></polyline>';
      } else {
        icon.innerHTML = '<polyline points="15 18 9 12 15 6"></polyline>';
      }

      if (typeof window.resizeTextareas === 'function') {
        setTimeout(window.resizeTextareas, 50);
        setTimeout(window.resizeTextareas, 310); // Wait for CSS transition
      }
    });
  }

  document.getElementById('btn-close-event-modal').addEventListener('click', closeEventModal);
  document.getElementById('btn-cancel-event-modal').addEventListener('click', closeEventModal);
  document.getElementById('form-event').addEventListener('submit', handleEventSubmit);
  document.getElementById('btn-delete-event').addEventListener('click', handleDeleteEvent);

  document.getElementById('btn-add-member').addEventListener('click', () => openMemberModal());
  document.getElementById('btn-close-member-modal').addEventListener('click', closeMemberModal);
  document.getElementById('btn-cancel-member-modal').addEventListener('click', closeMemberModal);
  document.getElementById('form-member').addEventListener('submit', handleMemberSubmit);
  document.getElementById('btn-delete-member').addEventListener('click', handleDeleteMember);

  document.getElementById('btn-add-report').addEventListener('click', () => openReportModal());
  document.getElementById('btn-close-report-modal').addEventListener('click', closeReportModal);
  document.getElementById('btn-cancel-report-modal').addEventListener('click', closeReportModal);
  document.getElementById('form-report').addEventListener('submit', handleReportSubmit);
  document.getElementById('btn-delete-report').addEventListener('click', handleDeleteReport);
  document.getElementById('btn-complete-report').addEventListener('click', handleProjectComplete);

  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle-btn');
  const overlay = document.getElementById('sidebar-overlay');

  const btnLogout = document.getElementById('btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      firebase.auth().signOut().then(() => {
        showToast('로그아웃 되었습니다.');
      }).catch(err => {
        console.error(err);
      });
    });
  }

  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });

  document.getElementById('btn-export').addEventListener('click', exportData);

  const importTrigger = document.getElementById('btn-import-trigger');
  const fileImport = document.getElementById('file-import');
  importTrigger.addEventListener('click', () => fileImport.click());
  fileImport.addEventListener('change', importData);

  document.getElementById('btn-reset').addEventListener('click', resetData);

}

// --- 일정/팀원 필터링 연산 ---
function getFilteredEvents() {
  return state.events.filter(event => {
    if (state.filters.category !== 'all' && event.category !== state.filters.category) return false;
    if (state.filters.priority !== 'all' && event.priority !== state.filters.priority) return false;
    const isAssigneeExist = state.members.some(m => m.id === event.assignee);
    if (isAssigneeExist && !state.filters.memberIds.includes(event.assignee)) return false;
    if (state.filters.startDate && event.endDate < state.filters.startDate) return false;
    if (state.filters.endDate && event.startDate > state.filters.endDate) return false;
    if (state.filters.client !== 'all') {
      if (event.category === 'project') {
        if (event.client !== state.filters.client) return false;
      } else {
        return false;
      }
    }
    return true;
  });
}

// --- 전체 화면 렌더링 컨트롤러 ---
function renderApp() {
  updateClientFilterDropdown();
  updateYearFilterDropdown();
  updateHeaderAndMeta();
  renderSidebarMembers();
  renderStatsBar();

  renderCurrentView();
}

function renderCurrentView() {
  updatePageSize();
  const calNav = document.querySelector('.cal-nav');

  if (state.currentView === 'timeline') {
    calNav.style.display = 'flex';
    document.getElementById('timeline-view-wrapper').style.display = 'flex';
    document.getElementById('report-view-wrapper').style.display = 'none';
    document.getElementById('invoice-view-wrapper').style.display = 'none';
    document.getElementById('completed-projects-view-wrapper').style.display = 'none';
    renderTimelineView();
  } else if (state.currentView === 'report') {
    calNav.style.display = 'none';
    document.getElementById('timeline-view-wrapper').style.display = 'none';
    document.getElementById('report-view-wrapper').style.display = 'flex';
    document.getElementById('invoice-view-wrapper').style.display = 'none';
    document.getElementById('completed-projects-view-wrapper').style.display = 'none';
    renderReportView();
  } else if (state.currentView === 'invoice') {
    calNav.style.display = 'none';
    document.getElementById('timeline-view-wrapper').style.display = 'none';
    document.getElementById('report-view-wrapper').style.display = 'none';
    document.getElementById('invoice-view-wrapper').style.display = 'flex';
    document.getElementById('completed-projects-view-wrapper').style.display = 'none';
    renderInvoiceView();
  } else if (state.currentView === 'completed') {
    calNav.style.display = 'none';
    document.getElementById('timeline-view-wrapper').style.display = 'none';
    document.getElementById('report-view-wrapper').style.display = 'none';
    document.getElementById('invoice-view-wrapper').style.display = 'none';
    document.getElementById('completed-projects-view-wrapper').style.display = 'flex';
    renderCompletedProjectsView();
  }
}

// --- 헤더 정보 갱신 ---
function updateHeaderAndMeta() {
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth() + 1;
  const date = state.currentDate.getDate();
  const scale = state.timelineScale || 'month';

  const displayRange = document.getElementById('cal-nav-display-range');
  if (displayRange) {
    if (scale === 'today') displayRange.textContent = `${year}년 ${month}월 ${date}일`;
    else if (scale === 'year') displayRange.textContent = `${year}년`;
    else displayRange.textContent = `${year}년 ${month}월`;
  }

  const today = new Date();
  const daysKR = ['일', '월', '화', '수', '목', '금', '토'];
  const headerToday = document.getElementById('header-today-string');
  if (headerToday) {
    headerToday.textContent = `오늘: ${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 (${daysKR[today.getDay()]})`;
  }
}

// --- 통계 요약 바 갱신 ---
function renderStatsBar() {
  const filteredEvents = getFilteredEvents();
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();

  const thisMonthEvents = filteredEvents.filter(event => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    return (start.getFullYear() === year && start.getMonth() === month) ||
      (end.getFullYear() === year && end.getMonth() === month) ||
      (start <= new Date(year, month, 1) && end >= new Date(year, month + 1, 0));
  });
  document.getElementById('stat-total-events').textContent = thisMonthEvents.length;
  document.getElementById('stat-total-members').textContent = state.members.length;

  const endingProjects = filteredEvents.filter(event => {
    if (event.category !== 'project' || !event.endDate) return false;
    const end = new Date(event.endDate);
    return end.getFullYear() === year && end.getMonth() === month;
  });
  document.getElementById('stat-high-priority').textContent = endingProjects.length;
}

// --- 사이드바 팀원 리스트 렌더링 ---
function renderSidebarMembers() {
  const container = document.getElementById('member-list-container');
  if (!container) return;
  container.innerHTML = '';

  state.members.forEach(member => {
    const isChecked = state.filters.memberIds.includes(member.id);
    const item = document.createElement('div');
    item.className = 'member-item';
    item.style.setProperty('--dot-color', member.color);

    item.innerHTML = `
      <div class="member-info" onclick="toggleMemberFilter('${member.id}')">
        <span class="member-color-dot" style="background-color: ${member.color};"></span>
        <div class="member-name-container">
          <span class="member-name">${escapeHTML(member.name)}</span>
          <span class="member-role">${escapeHTML(member.role || '역할 미정')}</span>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <button class="member-action-btn" title="정보 수정" onclick="openMemberModal('${member.id}')">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path>
          </svg>
        </button>
        <input type="checkbox" class="member-checkbox" style="--dot-color: ${member.color};" ${isChecked ? 'checked' : ''} onclick="event.stopPropagation(); toggleMemberFilter('${member.id}')">
      </div>
    `;
    container.appendChild(item);
  });
}

function toggleMemberFilter(memberId) {
  const index = state.filters.memberIds.indexOf(memberId);
  if (index > -1) state.filters.memberIds.splice(index, 1);
  else state.filters.memberIds.push(memberId);
  resetPaginationPages();
  renderApp();

  if (window.innerWidth <= 1024) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }
}

// --- 팀원별 타임라인(Gantt) 뷰 렌더링 ---
function renderTimelineView() {
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const scale = state.timelineScale || 'month';
  let colCount = 10;

  const scaleBtns = document.querySelectorAll('#timeline-scale-container .scale-btn');
  scaleBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.scale === scale);
  });

  const headerContainer = document.getElementById('timeline-header-days-container');
  headerContainer.innerHTML = '';
  headerContainer.style.display = 'grid';

  if (scale === 'today') {
    colCount = 10;
    headerContainer.style.gridTemplateColumns = `repeat(10, 1fr)`;
    for (let h = 9; h <= 18; h++) {
      const hourEl = document.createElement('div');
      hourEl.className = 'timeline-header-day';
      hourEl.innerHTML = `<span class="timeline-header-day-num">${h}시</span>`;
      headerContainer.appendChild(hourEl);
    }
  } else if (scale === 'year') {
    colCount = 12;
    headerContainer.style.gridTemplateColumns = `repeat(12, 1fr)`;
    for (let m = 1; m <= 12; m++) {
      const monthEl = document.createElement('div');
      monthEl.className = 'timeline-header-day';
      monthEl.innerHTML = `<span class="timeline-header-day-num">${m}월</span>`;
      headerContainer.appendChild(monthEl);
    }
  } else {
    colCount = daysInMonth;
    headerContainer.style.gridTemplateColumns = `repeat(${daysInMonth}, 1fr)`;
    const daysKR = ['일', '월', '화', '수', '목', '금', '토'];
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const dayName = daysKR[date.getDay()];
      const isToday = checkIfToday(year, month, d);

      const dayEl = document.createElement('div');
      dayEl.className = `timeline-header-day${isToday ? ' today' : ''}`;

      if (date.getDay() === 0) dayEl.style.color = 'var(--danger)';
      else if (date.getDay() === 6) dayEl.style.color = 'var(--secondary)';

      dayEl.innerHTML = `
        <span class="timeline-header-day-num">${d}</span>
        <span class="timeline-header-day-name">${dayName}</span>
      `;
      headerContainer.appendChild(dayEl);
    }
  }

  const rowsContainer = document.getElementById('timeline-rows-container');
  rowsContainer.innerHTML = '';

  const filteredEvents = getFilteredEvents().filter(event => event.category === 'project');

  const activeMembers = [...state.members];
  const activeMemberIds = state.members.map(m => m.id);
  const deletedMemberIds = [...new Set(
    state.reports.map(r => r.assignee)
      .concat(state.events.map(e => e.assignee))
  )].filter(id => id && !activeMemberIds.includes(id));

  deletedMemberIds.forEach(id => {
    const assigneeInfo = getAssigneeInfo(id);
    activeMembers.push({
      id: id,
      name: assigneeInfo.name,
      color: assigneeInfo.color,
      role: '삭제된 팀원',
      isDeleted: true
    });
  });

  activeMembers.forEach(member => {
    const memberEvents = [];

    if (scale === 'today') {
      const todayStr = getNormalizedDateString(state.currentDate);
      filteredEvents.forEach(event => {
        if (event.assignee !== member.id) return;
        if (event.startDate <= todayStr && event.endDate >= todayStr) {
          let startCol = 1;
          let endCol = 10;
          if (event.startDate === todayStr) {
            const startHour = event.startTime ? parseInt(event.startTime.split(':')[0], 10) : 9;
            startCol = Math.max(1, Math.min(10, startHour - 9 + 1));
          }
          if (event.endDate === todayStr) {
            const endHour = event.endTime ? parseInt(event.endTime.split(':')[0], 10) : 18;
            endCol = Math.max(1, Math.min(10, endHour - 9 + 1));
          }
          memberEvents.push({ ...event, clampedStartCol: startCol, clampedEndCol: endCol });
        }
      });
    } else if (scale === 'year') {
      const yearStartStr = `${year}-01-01`;
      const yearEndStr = `${year}-12-31`;
      filteredEvents.forEach(event => {
        if (event.assignee !== member.id) return;
        if (event.endDate < yearStartStr || event.startDate > yearEndStr) return;
        const startM = event.startDate < yearStartStr ? 1 : parseInt(event.startDate.split('-')[1], 10);
        const endM = event.endDate > yearEndStr ? 12 : parseInt(event.endDate.split('-')[1], 10);
        memberEvents.push({ ...event, clampedStartCol: startM, clampedEndCol: endM });
      });
    } else {
      const monthStartStr = `${year}-${String(month + 1).padStart(2, '0')}-01`;
      const monthEndStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;
      filteredEvents.forEach(event => {
        if (event.assignee !== member.id) return;
        if (event.endDate < monthStartStr || event.startDate > monthEndStr) return;
        const startD = event.startDate < monthStartStr ? 1 : parseInt(event.startDate.split('-')[2], 10);
        const endD = event.endDate > monthEndStr ? daysInMonth : parseInt(event.endDate.split('-')[2], 10);
        memberEvents.push({ ...event, clampedStartCol: startD, clampedEndCol: endD });
      });
    }

    const maxRows = assignRowsToEvents(memberEvents);
    const gridRowsCount = Math.max(1, maxRows);

    const row = document.createElement('div');
    row.className = 'timeline-row';

    const profile = document.createElement('div');
    profile.className = 'timeline-row-member';

    const activeProjects = state.reports.filter(r => r.assignee === member.id && !r.finalCompleted).map(r => r.project);
    const uniqueProjects = [...new Set(activeProjects)];
    const projectsStr = uniqueProjects.length > 0 ? `참여 프로젝트: ${uniqueProjects.join(', ')}` : '참여 프로젝트 없음';

    profile.innerHTML = `
      <span class="name" style="color: ${member.color};">${escapeHTML(member.name)}</span>
      <span class="role">${escapeHTML(member.role || '역할 미정')}</span>
      <span class="member-projects" style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHTML(projectsStr)}">${escapeHTML(projectsStr)}</span>
    `;
    if (!member.isDeleted) {
      profile.addEventListener('click', () => openMemberModal(member.id));
    } else {
      profile.style.cursor = 'default';
    }
    row.appendChild(profile);

    const grid = document.createElement('div');
    grid.className = 'timeline-row-grid';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${colCount}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${gridRowsCount}, 34px)`;
    grid.style.paddingTop = '6px';
    grid.style.paddingBottom = '6px';

    for (let c = 1; c <= colCount; c++) {
      let isTodayCell = false;
      if (scale === 'today') {
        const currentHour = new Date().getHours();
        if (checkIfToday(year, month, state.currentDate.getDate()) && currentHour === (c + 8)) isTodayCell = true;
      } else if (scale === 'month') {
        isTodayCell = checkIfToday(year, month, c);
      } else if (scale === 'year') {
        const today = new Date();
        isTodayCell = (today.getFullYear() === year && today.getMonth() + 1 === c);
      }

      const cell = document.createElement('div');
      cell.className = `timeline-grid-cell${isTodayCell ? ' today' : ''}`;
      cell.style.gridColumn = c;
      cell.style.gridRow = `1 / span ${gridRowsCount}`;
      grid.appendChild(cell);
    }

    memberEvents.forEach(event => {
      const bar = document.createElement('div');
      bar.className = `timeline-event-bar priority-${event.priority}`;
      bar.style.backgroundColor = hexToRgba(member.color, 0.9);
      bar.style.gridColumn = `${event.clampedStartCol} / ${event.clampedEndCol + 1}`;
      bar.style.gridRow = event.timelineRow;

      bar.innerHTML = `<span style="margin-right: 4px;">💼</span> ${escapeHTML(event.title)}`;
      bar.title = `${event.title}\n기간: ${event.startDate} ~ ${event.endDate}\n${event.description || ''}`;

      bar.addEventListener('click', () => {
        if (event.id.startsWith('e_r_')) {
          openReportModal(event.id.replace('e_r_', ''));
        } else {
          openEventModal(event.id);
        }
      });
      grid.appendChild(bar);
    });

    row.appendChild(grid);
    rowsContainer.appendChild(row);
  });

  if (state.members.length === 0) {
    rowsContainer.innerHTML = `<div style="padding: 3rem; text-align: center; color: var(--text-muted);">등록된 팀원이 없습니다.</div>`;
  }
}

function assignRowsToEvents(memberEvents) {
  memberEvents.sort((a, b) => b.startDate.localeCompare(a.startDate));
  const endTimes = [];
  memberEvents.forEach(event => {
    let assignedRowIndex = -1;
    for (let r = 0; r < endTimes.length; r++) {
      if (event.clampedStartCol > endTimes[r]) {
        assignedRowIndex = r;
        break;
      }
    }
    if (assignedRowIndex === -1) {
      endTimes.push(event.clampedEndCol);
      event.timelineRow = endTimes.length;
    } else {
      endTimes[assignedRowIndex] = event.clampedEndCol;
      event.timelineRow = assignedRowIndex + 1;
    }
  });
  return endTimes.length;
}

function navigateCalendar(direction) {
  const scale = state.timelineScale || 'month';
  if (scale === 'today') state.currentDate.setDate(state.currentDate.getDate() + direction);
  else if (scale === 'year') state.currentDate.setFullYear(state.currentDate.getFullYear() + direction);
  else state.currentDate.setMonth(state.currentDate.getMonth() + direction);
  renderApp();
}

function getAssigneeInfo(assigneeId, reports = state.reports, events = state.events) {
  if (!assigneeId) {
    return { name: '미배정', color: '#94a3b8', isDeleted: true };
  }
  const member = state.members.find(m => m.id === assigneeId);
  if (member) {
    return { name: member.name, color: member.color, isDeleted: false };
  }

  const rep = reports.find(r => r.assignee === assigneeId);
  if (rep && rep.assigneeName) {
    return { name: rep.assigneeName, color: '#94a3b8', isDeleted: true };
  }

  const ev = events.find(e => e.assignee === assigneeId);
  if (ev && ev.assigneeName) {
    return { name: ev.assigneeName, color: '#94a3b8', isDeleted: true };
  }

  return { name: '미배정', color: '#94a3b8', isDeleted: true };
}

function switchView(view) {
  state.currentView = view;
  document.getElementById('view-btn-timeline').classList.toggle('active', view === 'timeline');
  document.getElementById('view-btn-report').classList.toggle('active', view === 'report');
  document.getElementById('view-btn-invoice').classList.toggle('active', view === 'invoice');
  document.getElementById('view-btn-completed').classList.toggle('active', view === 'completed');

  if (view === 'timeline') document.getElementById('main-view-title').textContent = '스케줄 타임라인';
  else if (view === 'report') document.getElementById('main-view-title').textContent = '주간업무 보고';
  else if (view === 'invoice') document.getElementById('main-view-title').textContent = '세금계산서 발행현황';
  else if (view === 'completed') document.getElementById('main-view-title').textContent = '프로젝트 완료 현황';

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    if (view === 'invoice' || view === 'completed') {
      statsBar.style.display = 'none';
    } else {
      statsBar.style.display = 'grid';
    }
  }

  // 뷰 변경 시 사이드바 자동 닫기
  if (window.innerWidth <= 1024) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  } else {
    const sidebar = document.getElementById('sidebar');
    const icon = document.getElementById('sidebar-collapse-icon');
    if (sidebar && !sidebar.classList.contains('collapsed')) {
      sidebar.classList.add('collapsed');
      if (icon) icon.innerHTML = '<polyline points="9 18 15 12 9 6"></polyline>';
      if (typeof window.resizeTextareas === 'function') {
        setTimeout(window.resizeTextareas, 50);
        setTimeout(window.resizeTextareas, 310);
      }
    }
  }

  renderApp();
}

// --- 일정 추가/수정 모달 로직 ---
function openEventModal(eventId = null, defaultDate = null) {
  const modal = document.getElementById('modal-event');
  const form = document.getElementById('form-event');
  const titleInput = document.getElementById('event-title');
  const startDateInput = document.getElementById('event-start-date');
  const startTimeInput = document.getElementById('event-start-time');
  const endDateInput = document.getElementById('event-end-date');
  const endTimeInput = document.getElementById('event-end-time');
  const assigneeSelect = document.getElementById('event-assignee');
  const categorySelect = document.getElementById('event-category');
  const prioritySelect = document.getElementById('event-priority');
  const descInput = document.getElementById('event-desc');
  const deleteBtn = document.getElementById('btn-delete-event');

  form.reset();

  assigneeSelect.innerHTML = '';
  if (state.members.length === 0) {
    const opt = document.createElement('option');
    opt.value = ''; opt.textContent = '(등록된 팀원 없음)';
    assigneeSelect.appendChild(opt);
  } else {
    state.members.forEach(member => {
      const opt = document.createElement('option');
      opt.value = member.id; opt.textContent = member.name;
      assigneeSelect.appendChild(opt);
    });
  }

  if (eventId) {
    document.getElementById('event-modal-title').textContent = '일정 수정 및 정보';
    deleteBtn.style.display = 'block';
    const event = state.events.find(e => e.id === eventId);
    if (event) {
      document.getElementById('event-id').value = event.id;
      titleInput.value = event.title;
      startDateInput.value = event.startDate;
      startTimeInput.value = event.startTime || '09:00';
      endDateInput.value = event.endDate;
      endTimeInput.value = event.endTime || '18:00';
      assigneeSelect.value = event.assignee;
      categorySelect.value = event.category;
      prioritySelect.value = event.priority;
      descInput.value = event.description || '';
    }
  } else {
    document.getElementById('event-modal-title').textContent = '새 일정 등록';
    deleteBtn.style.display = 'none';
    document.getElementById('event-id').value = '';
    const initDateStr = defaultDate || getNormalizedDateString(new Date());
    startDateInput.value = initDateStr;
    endDateInput.value = initDateStr;
    startTimeInput.value = '09:00';
    endTimeInput.value = '18:00';
  }
  modal.classList.add('active');
}

function closeEventModal() {
  document.getElementById('modal-event').classList.remove('active');
}

// [서버 업로드] 일정 등록/수정
function handleEventSubmit(e) {
  e.preventDefault();
  if (state.members.length === 0) {
    alert('일정을 등록하려면 먼저 최소 1명의 팀원을 등록해야 합니다.');
    return;
  }

  const id = document.getElementById('event-id').value || 'e_' + Date.now();
  const title = document.getElementById('event-title').value.trim();
  const startDate = document.getElementById('event-start-date').value;
  const startTime = document.getElementById('event-start-time').value;
  const endDate = document.getElementById('event-end-date').value;
  const endTime = document.getElementById('event-end-time').value;
  const assignee = document.getElementById('event-assignee').value;
  const category = document.getElementById('event-category').value;
  const priority = document.getElementById('event-priority').value;
  const description = document.getElementById('event-desc').value.trim();

  if (startDate > endDate || (startDate === endDate && startTime > endTime)) {
    alert('종료 시간은 시작 시간보다 빠를 수 없습니다.');
    return;
  }

  const data = { id, title, startDate, startTime, endDate, endTime, assignee, category, priority, description };

  // 클라우드 서버 데이터베이스에 저장
  db.collection("events").doc(id).set(data)
    .then(() => {
      showToast('일정이 동기화 서버에 보관되었습니다.');
      closeEventModal();
    });
}

// [서버 삭제] 일정 삭제
function handleDeleteEvent() {
  const id = document.getElementById('event-id').value;
  if (!id) return;

  if (confirm('이 일정을 삭제하시겠습니까?')) {
    db.collection("events").doc(id).delete()
      .then(() => {
        showToast('일정이 서버에서 제거되었습니다.');
        closeEventModal();
      });
  }
}

// --- 팀원 추가/수정 모달 로직 ---
function openMemberModal(memberId = null) {
  const modal = document.getElementById('modal-member');
  const form = document.getElementById('form-member');
  const nameInput = document.getElementById('member-name');
  const roleInput = document.getElementById('member-role');
  const colorInput = document.getElementById('member-color');
  const deleteBtn = document.getElementById('btn-delete-member');
  const paletteContainer = document.getElementById('member-color-palette');

  form.reset();

  paletteContainer.innerHTML = '';
  COLOR_PALETTE.forEach(color => {
    const colDiv = document.createElement('div');
    colDiv.className = 'color-option';
    colDiv.style.backgroundColor = color;
    colDiv.dataset.color = color;
    colDiv.addEventListener('click', () => {
      document.querySelectorAll('.color-option').forEach(d => d.classList.remove('selected'));
      colDiv.classList.add('selected');
      colorInput.value = color;
    });
    paletteContainer.appendChild(colDiv);
  });

  if (memberId) {
    document.getElementById('member-modal-title').textContent = '팀원 정보 수정';
    deleteBtn.style.display = 'block';
    const member = state.members.find(m => m.id === memberId);
    if (member) {
      document.getElementById('member-id').value = member.id;
      nameInput.value = member.name;
      roleInput.value = member.role || '';
      colorInput.value = member.color;
      const targetOption = Array.from(paletteContainer.children).find(child => child.dataset.color === member.color);
      if (targetOption) targetOption.classList.add('selected');
    }
  } else {
    document.getElementById('member-modal-title').textContent = '새 팀원 추가';
    deleteBtn.style.display = 'none';
    document.getElementById('member-id').value = '';
    const randomColor = COLOR_PALETTE[state.members.length % COLOR_PALETTE.length];
    colorInput.value = randomColor;
    const targetOption = Array.from(paletteContainer.children).find(child => child.dataset.color === randomColor);
    if (targetOption) targetOption.classList.add('selected');
  }
  modal.classList.add('active');
}

function closeMemberModal() {
  document.getElementById('modal-member').classList.remove('active');
}

// [서버 업로드] 팀원 정보 동기화
function handleMemberSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('member-id').value || 'm_' + Date.now();
  const name = document.getElementById('member-name').value.trim();
  const role = document.getElementById('member-role').value.trim();
  const color = document.getElementById('member-color').value;

  db.collection("members").doc(id).set({ id, name, role, color })
    .then(() => {
      showToast('팀원 정보가 클라우드에 업데이트되었습니다.');
      closeMemberModal();
    });
}

// [서버 삭제] 팀원 삭제
function handleDeleteMember() {
  const id = document.getElementById('member-id').value;
  if (!id) return;

  const warningMsg = '정말 이 팀원을 삭제하시겠습니까? (이 팀원 목록에서만 지워지며, 기존에 배정된 일정 및 주간보고 내역은 그대로 유지됩니다)';

  if (confirm(warningMsg)) {
    const batch = db.batch();
    batch.delete(db.collection("members").doc(id));

    batch.commit().then(() => {
      showToast('팀원 정보가 삭제되었습니다.');
      closeMemberModal();
    });
  }
}

// --- 주간 업무보고서 (Weekly Report) 뷰 렌더링 ---
function renderReportView() {
  const tableBody = document.getElementById('report-table-body');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  const selectAssignee = document.getElementById('filter-report-assignee');
  if (selectAssignee) {
    const currentSelected = state.filters.reportAssignee || 'all';
    selectAssignee.innerHTML = '<option value="all">전체 작성자</option>';
    state.members.forEach(member => {
      const opt = document.createElement('option');
      opt.value = member.id; opt.textContent = member.name;
      if (member.id === currentSelected) opt.selected = true;
      selectAssignee.appendChild(opt);
    });
  }

  const filteredReports = state.reports.filter(report => {
    if (report.finalCompleted) return false;
    const isAssigneeExist = state.members.some(m => m.id === report.assignee);
    if (isAssigneeExist && !state.filters.memberIds.includes(report.assignee)) return false;
    if (state.filters.startDate && report.endDate < state.filters.startDate) return false;
    if (state.filters.endDate && report.startDate > state.filters.endDate) return false;
    if (state.filters.client !== 'all' && report.client !== state.filters.client) return false;
    if (state.filters.reportAssignee && state.filters.reportAssignee !== 'all' && report.assignee !== state.filters.reportAssignee) return false;
    return true;
  });

  filteredReports.sort((a, b) => {
    const indexA = state.members.findIndex(m => m.id === a.assignee);
    const indexB = state.members.findIndex(m => m.id === b.assignee);
    const valA = indexA === -1 ? Infinity : indexA;
    const valB = indexB === -1 ? Infinity : indexB;
    if (valA !== valB) return valA - valB;
    return b.startDate.localeCompare(a.startDate);
  });

  const totalItems = filteredReports.length;
  const pageSize = state.pagination.report.pageSize;
  const totalPages = Math.ceil(totalItems / pageSize);
  if (state.pagination.report.currentPage > totalPages) state.pagination.report.currentPage = Math.max(1, totalPages);

  const start = (state.pagination.report.currentPage - 1) * pageSize;
  const pageReports = filteredReports.slice(start, start + pageSize);

  if (pageReports.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 3rem; color: var(--text-muted);">프로젝트가 없습니다.</td></tr>`;
    document.getElementById('report-pagination').innerHTML = '';
    return;
  }

  pageReports.forEach(report => {
    const assigneeInfo = getAssigneeInfo(report.assignee);
    const memberName = assigneeInfo.name;
    const memberColor = assigneeInfo.color;

    let statusLabel = '대기', statusClass = 'status-pending';
    if (report.status === 'ongoing') { statusLabel = '진행중'; statusClass = 'status-ongoing'; }
    else if (report.status === 'completed') { statusLabel = '완료'; statusClass = 'status-completed'; }
    else if (report.status === 'suspended') { statusLabel = '보류'; statusClass = 'status-suspended'; }

    let confirmBtn = '';
    if (report.progressModified || report.remarksModified) {
      confirmBtn = `
        <button class="member-action-btn confirm-report-btn" title="보고 확인" onclick="confirmReport('${report.id}')" style="color: var(--success); margin-left: 0.25rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </button>`;
    }

    const options = state.members.map(m => `<option value="${m.id}" ${m.id === report.assignee ? 'selected' : ''}>${escapeHTML(m.name)}</option>`).join('');

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="width: 1%; white-space: nowrap; text-align: center;">
        <div class="reporter-label" style="display: flex; align-items: center; justify-content: center; gap: 4px;">
          <span class="reporter-dot" style="background-color: ${memberColor};"></span>
          <select class="inline-edit-input" onchange="updateReportInline('${report.id}', 'assignee', this.value)" style="width: 80px; text-align: center; text-align-last: center;">
            ${options}
          </select>
        </div>
      </td>
      <td style="width: 15%; text-align: center;"><input class="inline-edit-input" style="text-align: left; min-width: 100px; width: 85%; margin: 0 auto; display: block; box-sizing: border-box;" value="${escapeHTML(report.client)}" onchange="updateReportInline('${report.id}', 'client', this.value)"></td>
      <td style="width: 25%; text-align: center;"><input class="inline-edit-input ${isNewProject(report.createdAt) ? 'new-project-name' : ''}" style="font-weight: 600; text-align: left; min-width: 120px; width: 85%; margin: 0 auto; display: block; box-sizing: border-box;" value="${escapeHTML(report.project)}" onchange="updateReportInline('${report.id}', 'project', this.value)"></td>
      <td style="width: 1%; white-space: nowrap; text-align: center;"><input type="text" class="inline-edit-input" style="text-align: center; width: 80px;" value="${window.formatShortDate(report.startDate)}" onfocus="this.type='date'; this.value='${report.startDate}';" onblur="this.type='text'; this.value=window.formatShortDate(this.value);" onchange="if(this.type==='date') updateReportInline('${report.id}', 'startDate', this.value)"></td>
      <td style="width: 1%; white-space: nowrap; text-align: center;"><input type="text" class="inline-edit-input ${isNewProject(report.endDateModifiedAt) ? 'new-project-name' : ''} ${isEndDateApproaching(report.endDate, report.status) ? 'approaching-end-date' : ''}" style="text-align: center; width: 80px;" value="${window.formatShortDate(report.endDate)}" onfocus="this.type='date'; this.value='${report.endDate}';" onblur="this.type='text'; this.value=window.formatShortDate(this.value);" onchange="if(this.type==='date') updateReportInline('${report.id}', 'endDate', this.value)"></td>
      <td style="width: 1%; white-space: nowrap; text-align: center;">
        <input type="text" class="inline-edit-input" style="text-align: right; width: 80px; margin: 0 auto; display: block;" value="${Number(report.amount || 0).toLocaleString()}" onfocus="this.value='${report.amount || 0}'" onblur="this.value=Number(this.value).toLocaleString()" onchange="updateReportInline('${report.id}', 'amount', this.value.replace(/,/g, ''))">
      </td>
      <td style="width: 1%; white-space: nowrap; text-align: center;">
        <div style="display: flex; align-items: center; justify-content: center;">
          <div class="progress-bar-container" style="flex-shrink: 0;"><div class="progress-bar-fill" style="width: ${report.progress}%;"></div></div>
          <input type="number" min="0" max="100" class="inline-edit-input ${report.progressModified ? 'modified-text' : ''}" style="width: 50px; text-align: center;" value="${report.progress}" onchange="updateReportInline('${report.id}', 'progress', this.value)">
        </div>
      </td>
      <td style="width: 1%; white-space: nowrap; text-align: center;">
        <select class="inline-edit-input status-badge ${statusClass}" onchange="updateReportInline('${report.id}', 'status', this.value)" style="border: 1px solid transparent; height: auto; min-width: 85px; text-align: center; text-align-last: center; margin: 0 auto; display: block;">
          <option value="pending" ${report.status === 'pending' ? 'selected' : ''}>대기</option>
          <option value="ongoing" ${report.status === 'ongoing' ? 'selected' : ''}>진행중</option>
          <option value="completed" ${report.status === 'completed' ? 'selected' : ''}>완료</option>
          <option value="suspended" ${report.status === 'suspended' ? 'selected' : ''}>보류</option>
        </select>
      </td>
      <td style="width: 40%;">
        <textarea class="inline-edit-input auto-resize-textarea" rows="1" style="resize: none; overflow: hidden; min-height: 28px; width: 100%; box-sizing: border-box;" oninput="this.style.height = ''; this.style.height = this.scrollHeight + 'px';" onchange="updateReportInline('${report.id}', 'remarks', this.value)">${escapeHTML(report.remarks || '')}</textarea>
      </td>
      <td style="width: 1%; white-space: nowrap; text-align: center;">
        <div style="display: flex; justify-content: center;"><button class="member-action-btn" title="상세 모달 열기" onclick="openReportModal('${report.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></button>${confirmBtn}</div>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  renderPagination('report-pagination', state.pagination.report.currentPage, totalPages, 'window.changeReportPage');

  setTimeout(() => {
    if (typeof window.resizeTextareas === 'function') {
      window.resizeTextareas();
    }
  }, 0);
}

window.formatShortDate = function (dateStr) {
  if (!dateStr) return '';
  if (dateStr.includes('/')) return dateStr;
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[0].slice(2)}/${parts[1]}/${parts[2]}`;
  }
  return dateStr;
};

window.updateReportInline = function (id, field, value) {
  const existing = state.reports.find(r => r.id === id);
  if (!existing) return;

  if (field === 'amount' || field === 'progress') value = Number(value);

  const updateData = { [field]: value };

  if (field === 'progress' && existing.progress !== value) {
    updateData.progressModified = true;
  }
  if (field === 'remarks' && existing.remarks !== value) {
    updateData.remarksModified = true;
  }
  if (field === 'endDate' && existing.endDate !== value) {
    updateData.endDateModifiedAt = getNormalizedDateString(new Date());
  }

  db.collection("reports").doc(id).update(updateData).then(() => {
    // Data syncs automatically
  }).catch(err => {
    console.error("Error updating report inline:", err);
    showToast('수정 중 오류가 발생했습니다.');
  });
};

// --- 주간 업무보고 모달 ---
function openReportModal(reportId = null) {
  const modal = document.getElementById('modal-report');
  const form = document.getElementById('form-report');
  const assigneeSelect = document.getElementById('report-assignee');
  const projectInput = document.getElementById('report-project');
  const clientInput = document.getElementById('report-client');
  const amountInput = document.getElementById('report-amount');
  const startDateInput = document.getElementById('report-start-date');
  const endDateInput = document.getElementById('report-end-date');
  const progressInput = document.getElementById('report-progress');
  const statusSelect = document.getElementById('report-status');
  const remarksInput = document.getElementById('report-remarks');
  const deleteBtn = document.getElementById('btn-delete-report');
  const completeBtn = document.getElementById('btn-complete-report');

  form.reset();

  assigneeSelect.innerHTML = '';
  if (state.members.length === 0) {
    const opt = document.createElement('option');
    opt.value = ''; opt.textContent = '(등록된 팀원 없음)';
    assigneeSelect.appendChild(opt);
  } else {
    state.members.forEach(member => {
      const opt = document.createElement('option');
      opt.value = member.id; opt.textContent = member.name;
      assigneeSelect.appendChild(opt);
    });
  }

  if (reportId) {
    document.getElementById('report-modal-title').textContent = '프로젝트 정보 수정 및 상세';
    deleteBtn.style.display = 'block';
    completeBtn.style.display = 'block';

    const report = state.reports.find(r => r.id === reportId);
    if (report) {
      document.getElementById('report-id').value = report.id;
      assigneeSelect.value = report.assignee;
      projectInput.value = report.project;
      clientInput.value = report.client;
      amountInput.value = Number(report.amount || 0).toLocaleString();
      startDateInput.value = report.startDate;
      endDateInput.value = report.endDate;
      progressInput.value = report.progress;
      statusSelect.value = report.status;
      remarksInput.value = report.remarks || '';
    }
  } else {
    document.getElementById('report-modal-title').textContent = '새 프로젝트 등록';
    deleteBtn.style.display = 'none';
    completeBtn.style.display = 'none';
    document.getElementById('report-id').value = '';
    const todayStr = getNormalizedDateString(new Date());
    startDateInput.value = todayStr;
    endDateInput.value = todayStr;
    progressInput.value = '0';
    statusSelect.value = 'ongoing';
  }
  modal.classList.add('active');
}

function closeReportModal() {
  document.getElementById('modal-report').classList.remove('active');
}

// [서버 업로드] 프로젝트 추가 및 연동 스케줄 업로드
function handleReportSubmit(e) {
  e.preventDefault();
  if (state.members.length === 0) {
    alert('팀원이 존재하지 않아 프로젝트를 등록할 수 없습니다.');
    return;
  }

  const id = document.getElementById('report-id').value || 'r_' + Date.now();
  const assignee = document.getElementById('report-assignee').value;
  const project = document.getElementById('report-project').value.trim();
  const client = document.getElementById('report-client').value.trim();
  const amount = Number(document.getElementById('report-amount').value.replace(/,/g, ''));
  const startDate = document.getElementById('report-start-date').value;
  const endDate = document.getElementById('report-end-date').value;
  const progress = Number(document.getElementById('report-progress').value);
  const status = document.getElementById('report-status').value;
  const remarks = document.getElementById('report-remarks').value.trim();

  if (startDate > endDate) {
    alert('종료일은 시작일보다 빠를 수 없습니다.');
    return;
  }

  const prevReport = state.reports.find(r => r.id === id);
  const isProgressChanged = prevReport ? Number(prevReport.progress) !== Number(progress) : false;
  const isRemarksChanged = prevReport ? prevReport.remarks !== remarks : false;
  const isEndDateChanged = prevReport ? prevReport.endDate !== endDate : false;

  const memberObj = state.members.find(m => m.id === assignee);
  const assigneeName = memberObj ? memberObj.name : '';

  const targetReport = {
    id, assignee, assigneeName, project, client, amount, startDate, endDate, progress, status, remarks,
    invoiceStatus: prevReport ? (prevReport.invoiceStatus || 'unissued') : 'unissued',
    invoiceDate: prevReport ? (prevReport.invoiceDate || '') : '',
    invoiceRemarks: prevReport ? (prevReport.invoiceRemarks || '') : '',
    invoices: prevReport ? (prevReport.invoices || Array.from({ length: 5 }, () => ({ status: 'unissued', amount: 0, date: '' }))) : Array.from({ length: 5 }, () => ({ status: 'unissued', amount: 0, date: '' })),
    progressModified: isProgressChanged ? true : (prevReport ? prevReport.progressModified : false),
    remarksModified: isRemarksChanged ? true : (prevReport ? prevReport.remarksModified : false),
    endDateModifiedAt: isEndDateChanged ? getNormalizedDateString(new Date()) : (prevReport ? prevReport.endDateModifiedAt : null),
    finalCompleted: prevReport ? (prevReport.finalCompleted || false) : false,
    createdAt: prevReport ? (prevReport.createdAt || getNormalizedDateString(new Date())) : getNormalizedDateString(new Date())
  };

  // 파이어베이스 트랜잭션형 배치를 이용해 간트차트 일정과 동시에 서버에 저장
  const batch = db.batch();
  batch.set(db.collection("reports").doc(id), targetReport);

  // 연동 캘린더 일정 계산 배치 연계
  const eventId = 'e_r_' + id;
  if (!targetReport.finalCompleted) {
    const title = `[프로젝트] ${targetReport.project}`;
    const eventData = {
      id: eventId, title, startDate: targetReport.startDate, startTime: '09:00',
      endDate: targetReport.endDate, endTime: '18:00', assignee: targetReport.assignee, assigneeName: targetReport.assigneeName,
      category: 'project', priority: 'medium', client: targetReport.client, description: `프로젝트 연동 일정 (${targetReport.client})`
    };
    batch.set(db.collection("events").doc(eventId), eventData);
  } else {
    batch.delete(db.collection("events").doc(eventId));
  }

  batch.commit().then(() => {
    showToast('프로젝트 내역 및 연동 스케줄이 실시간 동기화되었습니다.');
    closeReportModal();
  });
}

// [서버 삭제] 프로젝트 파기
function handleDeleteReport() {
  const id = document.getElementById('report-id').value;
  if (!id) return;

  if (confirm('이 프로젝트를 삭제하시겠습니까?')) {
    const batch = db.batch();
    batch.delete(db.collection("reports").doc(id));
    batch.delete(db.collection("events").doc('e_r_' + id));

    batch.commit().then(() => {
      showToast('프로젝트 및 관계 일정이 전면 제거되었습니다.');
      closeReportModal();
    });
  }
}

// --- 세금계산서 발행 관리 뷰 렌더링 ---
function renderInvoiceView() {
  const tableBody = document.getElementById('invoice-table-body');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  const targetYear = state.filters.invoiceYear;
  const targetMonth = state.filters.invoiceMonth || 'all';
  const invoiceStatusFilter = state.filters.invoiceStatus || 'all';

  const selectInvoiceAssignee = document.getElementById('filter-invoice-assignee');
  if (selectInvoiceAssignee) {
    const currentSelected = state.filters.invoiceAssignee || 'all';
    selectInvoiceAssignee.innerHTML = '<option value="all">전체 작성자</option>';
    state.members.forEach(member => {
      const opt = document.createElement('option');
      opt.value = member.id; opt.textContent = member.name;
      if (member.id === currentSelected) opt.selected = true;
      selectInvoiceAssignee.appendChild(opt);
    });
  }

  // 세금계산서 구분 탭 UI 액티브 클래스 상태 동기화
  const tabContainer = document.querySelector('.invoice-tab-container');
  if (tabContainer) {
    tabContainer.querySelectorAll('.invoice-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.status === invoiceStatusFilter);
    });
  }

  let sumTotal = 0;
  let sumIssued = 0;
  let sumUnissued = 0;
  const invoiceReports = [];

  state.reports.forEach(report => {
    if (report.status !== 'completed' && report.status !== 'ongoing') return;
    const isAssigneeExist = state.members.some(m => m.id === report.assignee);
    if (isAssigneeExist && !state.filters.memberIds.includes(report.assignee)) return;
    if (state.filters.startDate && report.endDate < state.filters.startDate) return;
    if (state.filters.endDate && report.startDate > state.filters.endDate) return;
    if (state.filters.client !== 'all' && report.client !== state.filters.client) return;
    if (state.filters.invoiceAssignee && state.filters.invoiceAssignee !== 'all' && report.assignee !== state.filters.invoiceAssignee) return;

    let hasInvoiceInTargetPeriod = false;
    let projectIssuedSumInTargetPeriod = 0;

    if (report.invoices && Array.isArray(report.invoices)) {
      report.invoices.forEach(inv => {
        if (inv.status === 'issued' && inv.date) {
          const invYear = inv.date.substring(0, 4);
          const invMonth = inv.date.substring(5, 7);
          const yearMatches = targetYear === 'all' || invYear === targetYear;
          const monthMatches = targetMonth === 'all' || invMonth === targetMonth;

          if (yearMatches && monthMatches) {
            hasInvoiceInTargetPeriod = true;
            projectIssuedSumInTargetPeriod += (Number(inv.amount) || 0);
          }
        }
      });
    }

    const projStartYear = report.startDate ? report.startDate.substring(0, 4) : '';
    const projEndYear = report.endDate ? report.endDate.substring(0, 4) : '';
    const isProjectInTargetYear = (projStartYear === targetYear || projEndYear === targetYear);

    let includeReport = false;
    if (targetMonth !== 'all') {
      includeReport = hasInvoiceInTargetPeriod;
    } else {
      includeReport = (targetYear === 'all' || hasInvoiceInTargetPeriod || isProjectInTargetYear);
    }

    if (includeReport) {
      // 발행완료 판정: 발행금액(총 금액) > 0 이고 잔금이 0인 상태
      const totalAmount = Number(report.amount) || 0;
      let totalIssued = 0;
      if (report.invoices) {
        report.invoices.forEach(inv => {
          if (inv.status === 'issued') totalIssued += (Number(inv.amount) || 0);
        });
      }
      const balance = totalAmount - totalIssued;
      const isCompleted = totalAmount > 0 && balance === 0;

      // 구분 필터링 조건
      let matchesStatus = true;
      if (invoiceStatusFilter === 'completed') {
        matchesStatus = isCompleted;
      } else if (invoiceStatusFilter === 'pending') {
        matchesStatus = !isCompleted;
      }

      if (matchesStatus) {
        sumIssued += projectIssuedSumInTargetPeriod;

        if (targetYear === 'all' || isProjectInTargetYear) {
          const balanceAllTime = Math.max(0, totalAmount - totalIssued);
          sumUnissued += balanceAllTime;
        }

        report._currentYearIssued = projectIssuedSumInTargetPeriod;
        invoiceReports.push(report);
      }
    }
  });

  sumTotal = sumIssued + sumUnissued;

  const summaryCardsContainer = document.querySelector('.invoice-summary-cards');
  const loggedInUser = sessionStorage.getItem('logged_in_user');
  if (loggedInUser === 'whjung@dnde.co.kr') {
    if (summaryCardsContainer) {
      summaryCardsContainer.style.display = 'flex';

      const periodText = targetYear === 'all' ? '전체 연도' : (targetMonth === 'all' ? `선택 연도` : `선택 기간`);
      const cardTitles = summaryCardsContainer.querySelectorAll('.summary-card span:first-child');
      if (cardTitles.length >= 3) {
        cardTitles[0].textContent = `${periodText} 총 금액`;
        cardTitles[1].textContent = `${periodText} 발행완료 합계`;
        cardTitles[2].textContent = `${periodText} 미발행 합계`;
      }
    }
    document.getElementById('invoice-sum-total').textContent = sumTotal.toLocaleString() + ' 만원';
    document.getElementById('invoice-sum-issued').textContent = sumIssued.toLocaleString() + ' 만원';
    document.getElementById('invoice-sum-unissued').textContent = sumUnissued.toLocaleString() + ' 만원';
  } else {
    if (summaryCardsContainer) {
      summaryCardsContainer.style.display = 'none';
    }
  }

  // 팀원별 매출 요약 집계
  const memberRevenues = {};
  state.members.forEach(m => {
    memberRevenues[m.id] = {
      id: m.id,
      name: m.name,
      color: m.color,
      totalAmount: 0,
      issuedAmount: 0
    };
  });

  invoiceReports.forEach(report => {
    const assignee = report.assignee;
    if (assignee) {
      if (!memberRevenues[assignee]) {
        const assigneeInfo = getAssigneeInfo(assignee);
        memberRevenues[assignee] = {
          id: assignee,
          name: assigneeInfo.name,
          color: assigneeInfo.color,
          totalAmount: 0,
          issuedAmount: 0
        };
      }
      memberRevenues[assignee].totalAmount += (Number(report.amount) || 0);
      memberRevenues[assignee].issuedAmount += (Number(report._currentYearIssued) || 0);
    }
  });

  const revenueContainer = document.getElementById('member-revenue-summary');
  if (revenueContainer) {
    const loggedInUser = sessionStorage.getItem('logged_in_user');
    if (loggedInUser === 'whjung@dnde.co.kr') {
      const revenueItemsHtml = Object.values(memberRevenues)
        .filter(m => m.totalAmount > 0)
        .map(m => `
          <div class="revenue-chip" onclick="openRevenueChartModal('${m.id}')" style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 0.5rem 0.85rem; border-radius: 20px; display: flex; align-items: center; gap: 0.5rem; box-shadow: var(--shadow-sm); font-size: 0.8rem; transition: transform 0.2s ease;">
            <span class="reporter-dot" style="background-color: ${m.color}; margin: 0; width: 8px; height: 8px; flex-shrink: 0;"></span>
            <span style="font-weight: 600; color: var(--text-primary);">${escapeHTML(m.name)}:</span>
            <span style="color: var(--primary); font-weight: 700;">${m.totalAmount.toLocaleString()} 만원</span>
            <span style="color: var(--text-muted); font-size: 0.7rem; font-weight: normal; margin-left: 0.1rem;">(발행완료: ${m.issuedAmount.toLocaleString()}만)</span>
          </div>
        `).join('');

      if (revenueItemsHtml) {
        revenueContainer.innerHTML = revenueItemsHtml;
        revenueContainer.style.display = 'flex';
      } else {
        revenueContainer.innerHTML = `<span style="font-size: 0.8rem; color: var(--text-muted); padding: 0.25rem 0.5rem;">선택 기간 내 매출 내역이 존재하지 않습니다.</span>`;
        revenueContainer.style.display = 'flex';
      }
    } else {
      revenueContainer.innerHTML = '';
      revenueContainer.style.display = 'none';
    }
  }

  invoiceReports.sort((a, b) => b.endDate.localeCompare(a.endDate));

  const totalItems = invoiceReports.length;
  const pageSize = state.pagination.invoice.pageSize;
  const totalPages = Math.ceil(totalItems / pageSize);
  if (state.pagination.invoice.currentPage > totalPages) state.pagination.invoice.currentPage = Math.max(1, totalPages);

  const start = (state.pagination.invoice.currentPage - 1) * pageSize;
  const pageReports = invoiceReports.slice(start, start + pageSize);
  // -----------------------------------------------------------------
  // 🟢 [교체 구간 끝] 이 아래에 있는 if (pageReports.length === 0) { 부터는 기존 코드 그대로 둡니다.
  // -----------------------------------------------------------------

  if (pageReports.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="11" style="text-align: center; padding: 3rem;">프로젝트 내역이 없습니다.</td></tr>`;
    document.getElementById('invoice-pagination').innerHTML = '';
    return;
  }

  pageReports.forEach(report => {
    const assigneeInfo = getAssigneeInfo(report.assignee);
    const memberName = assigneeInfo.name;
    const memberColor = assigneeInfo.color;
    const totalAmount = Number(report.amount) || 0;
    let totalIssued = 0;
    if (report.invoices) {
      report.invoices.forEach(inv => { if (inv.status === 'issued') totalIssued += (Number(inv.amount) || 0); });
    }
    const balance = totalAmount - totalIssued;
    const isExpanded = expandedInvoiceIds.has(report.id);

    let firstInvoiceDate = '';
    if (report.invoices && report.invoices.length > 0 && report.invoices[0].status === 'issued') {
      firstInvoiceDate = window.formatShortDate(report.invoices[0].date);
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="white-space: nowrap;"><div class="reporter-label"><span class="reporter-dot" style="background-color: ${memberColor};"></span><span>${escapeHTML(memberName)}</span></div></td>
      <td>${escapeHTML(report.client)}</td><td style="font-weight: 600;">${escapeHTML(report.project)}</td>
      <td style="white-space: nowrap; text-align: center;">${window.formatShortDate(report.startDate)}</td>
      <td style="white-space: nowrap; text-align: center;">${window.formatShortDate(report.endDate)}</td>
      <td style="white-space: nowrap; text-align: center; font-weight: 600; color: var(--primary);">${firstInvoiceDate}</td>
      <td style="text-align: right; white-space: nowrap;">${totalAmount.toLocaleString()}</td>
      <td style="white-space: nowrap;"><span class="status-badge ${report.status === 'completed' ? 'status-completed' : 'status-ongoing'}">${report.status === 'completed' ? '완료' : '진행중'}</span></td>
      <td style="text-align: right; color: var(--success); font-weight: bold; white-space: nowrap;">
        ${report._currentYearIssued.toLocaleString()} 
        ${targetYear !== 'all' ? `<span style="font-size:0.7rem; font-weight:normal; color:var(--text-muted);">(${targetYear}년${targetMonth !== 'all' ? ` ${targetMonth}월` : ''}분)</span>` : ''}
      </td>
      <td style="text-align: right; color: ${balance > 0 ? '#ef4444' : 'var(--success)'}; white-space: nowrap;">${balance.toLocaleString()}</td>
      <td style="white-space: nowrap;">
        <div style="display: flex; gap: 0.25rem; align-items: center;">
          <button class="btn-secondary toggle-expand-btn" onclick="toggleInvoiceExpand('${report.id}')">발행 관리</button>
          <button class="member-action-btn" onclick="openReportModal('${report.id}')" title="수정">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path>
            </svg>
          </button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);

    const expandTr = document.createElement('tr');
    expandTr.className = 'invoice-expand-row';
    expandTr.id = `invoice-expand-${report.id}`;
    expandTr.style.display = isExpanded ? 'table-row' : 'none';
    expandTr.innerHTML = `
      <td colspan="11" style="padding: 1rem; background: var(--bg-hover);">
        <div class="invoice-expand-card" style="background: var(--bg-card); padding: 1rem; border-radius: 8px;">
          <div style="display:grid; grid-template-columns: repeat(5, 1fr); gap:0.5rem;">
            ${[0, 1, 2, 3, 4].map(idx => {
      const inv = report.invoices[idx] || { status: 'unissued', amount: 0, date: '' };
      return `
                <div style="border:1px solid var(--border-color); padding:0.5rem; border-radius:6px;">
                  <div style="display:flex; justify-content:space-between; font-size:0.75rem;">
                    <span>${idx + 1}차</span>
                    <select onchange="updateInvoiceStage('${report.id}', ${idx}, 'status', this.value)">
                      <option value="unissued" ${inv.status === 'unissued' ? 'selected' : ''}>미발행</option>
                      <option value="issued" ${inv.status === 'issued' ? 'selected' : ''}>발행완료</option>
                    </select>
                  </div>
                  <input type="text" value="${Number(inv.amount || 0).toLocaleString()}" style="width:100%; font-size:0.75rem; margin:4px 0; text-align:right;" onfocus="this.value='${inv.amount || 0}'" onblur="this.value=Number(this.value).toLocaleString()" onchange="updateInvoiceStage('${report.id}', ${idx}, 'amount', this.value.replace(/,/g, ''))">
                  <input type="date" value="${inv.date}" style="width:100%; font-size:0.7rem;" ${inv.status === 'unissued' ? 'disabled' : ''} onchange="updateInvoiceStage('${report.id}', ${idx}, 'date', this.value)">
                </div>`;
    }).join('')}
          </div>
          <div style="margin-top:0.5rem; display:flex; gap:0.5rem; align-items:center;">
            <span style="font-size:0.75rem;">비고:</span>
            <input type="text" value="${escapeHTML(report.invoiceRemarks || '')}" style="flex:1;" onchange="handleInvoiceRemarksChange('${report.id}', this.value)">
          </div>
        </div>
      </td>`;
    tableBody.appendChild(expandTr);
  });

  renderPagination('invoice-pagination', state.pagination.invoice.currentPage, totalPages, 'window.changeInvoicePage');
}

// [서버 업로드] 주간보고 확인 완료 (플래그 리셋)
window.confirmReport = function (reportId) {
  db.collection("reports").doc(reportId).update({
    progressModified: false,
    remarksModified: false
  }).then(() => {
    showToast('수정 내역 알림이 확인 처리되었습니다.');
  });
};

// [서버 업로드] 팀장 전용 프로젝트 완전 완료 처리
function handleProjectComplete() {
  const id = document.getElementById('report-id').value;
  if (!id) return;

  if (!confirm('귀하는 팀장 또는 파트장입니까? 완료 처리 시 타임라인에서 일정이 마감 제거됩니다.')) return;

  const batch = db.batch();
  batch.update(db.collection("reports").doc(id), {
    status: 'completed',
    progress: 100,
    finalCompleted: true,
    progressModified: true
  });
  batch.delete(db.collection("events").doc('e_r_' + id));

  batch.commit().then(() => {
    showToast('프로젝트 완료 기안 처리가 서버에 최종 반영되었습니다.');
    closeReportModal();
    switchView('completed');
  });
}

// [서버 업로드] 5차 계산서 분할 상태 변경 시 실시간 업로드
window.updateInvoiceStage = function (reportId, stageIndex, field, value) {
  const report = state.reports.find(r => r.id === reportId);
  if (report) {
    const invoices = [...report.invoices];
    if (field === 'status') {
      invoices[stageIndex].status = value;
      invoices[stageIndex].date = value === 'unissued' ? '' : getNormalizedDateString(new Date());
    } else if (field === 'amount') {
      invoices[stageIndex].amount = Number(value) || 0;
    } else if (field === 'date') {
      invoices[stageIndex].date = value;
    }

    db.collection("reports").doc(reportId).update({ invoices })
      .then(() => {
        showToast(`${stageIndex + 1}차 대금 관리 정보가 실시간 업데이트되었습니다.`);
      });
  }
};

window.handleInvoiceRemarksChange = function (reportId, newRemarks) {
  db.collection("reports").doc(reportId).update({ invoiceRemarks: newRemarks })
    .then(() => showToast('계산서 비고란이 업데이트되었습니다.'));
};

// [서버 삭제] 완료 프로젝트 삭제
window.deleteCompletedProject = function (reportId) {
  if (confirm('정말 이 완료된 프로젝트를 데이터베이스에서 영구 삭제하시겠습니까?')) {
    const batch = db.batch();
    batch.delete(db.collection("reports").doc(reportId));
    batch.delete(db.collection("events").doc('e_r_' + reportId));
    batch.commit().then(() => {
      showToast('완료 프로젝트 데이터가 서버에서 파기되었습니다.');
    });
  }
};

// --- 프로젝트 완료 현황 뷰 렌더링 ---
function renderCompletedProjectsView() {
  const tableBody = document.getElementById('completed-projects-table-body');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  const selectCompletedAssignee = document.getElementById('filter-completed-assignee');
  if (selectCompletedAssignee) {
    const currentSelected = state.filters.completedAssignee || 'all';
    selectCompletedAssignee.innerHTML = '<option value="all">전체 작성자</option>';
    state.members.forEach(member => {
      const opt = document.createElement('option');
      opt.value = member.id; opt.textContent = member.name;
      if (member.id === currentSelected) opt.selected = true;
      selectCompletedAssignee.appendChild(opt);
    });
  }

  const filteredReports = state.reports.filter(report => {
    if (!report.finalCompleted) return false;
    const isAssigneeExist = state.members.some(m => m.id === report.assignee);
    if (isAssigneeExist && !state.filters.memberIds.includes(report.assignee)) return false;
    if (state.filters.startDate && report.endDate < state.filters.startDate) return false;
    if (state.filters.endDate && report.startDate > state.filters.endDate) return false;
    if (state.filters.client !== 'all' && report.client !== state.filters.client) return false;

    if (state.filters.completedAssignee && state.filters.completedAssignee !== 'all' && report.assignee !== state.filters.completedAssignee) return false;

    if (state.filters.completedYear !== 'all') {
      const year = report.startDate ? report.startDate.substring(0, 4) : '';
      if (year !== state.filters.completedYear) return false;
    }
    if (state.filters.completedMonth !== 'all') {
      const month = report.startDate ? report.startDate.substring(5, 7) : '';
      if (month !== state.filters.completedMonth) return false;
    }
    return true;
  });

  filteredReports.sort((a, b) => b.endDate.localeCompare(a.endDate));

  const totalItems = filteredReports.length;
  const pageSize = state.pagination.completed.pageSize;
  const totalPages = Math.ceil(totalItems / pageSize);
  if (state.pagination.completed.currentPage > totalPages) state.pagination.completed.currentPage = Math.max(1, totalPages);

  const start = (state.pagination.completed.currentPage - 1) * pageSize;
  const pageReports = filteredReports.slice(start, start + pageSize);

  if (pageReports.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 3rem;">완료 프로젝트 로그가 비어있습니다.</td></tr>`;
    document.getElementById('completed-pagination').innerHTML = '';
    return;
  }

  pageReports.forEach(report => {
    const assigneeInfo = getAssigneeInfo(report.assignee);
    const memberName = assigneeInfo.name;
    const memberColor = assigneeInfo.color;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="white-space: nowrap;"><div class="reporter-label"><span class="reporter-dot" style="background-color: ${memberColor};"></span><span>${escapeHTML(memberName)}</span></div></td>
      <td>${escapeHTML(report.client)}</td><td style="font-weight: 600;">${escapeHTML(report.project)}</td>
      <td style="white-space: nowrap;">${window.formatShortDate(report.startDate)}</td><td style="white-space: nowrap;">${window.formatShortDate(report.endDate)}</td>
      <td style="text-align: right; white-space: nowrap;">${(Number(report.amount) || 0).toLocaleString()}</td>
      <td style="white-space: nowrap;"><span class="status-badge status-completed">완료</span></td>
      <td class="tight-remarks">${escapeHTML(report.remarks || '-')}</td>
      <td style="white-space: nowrap;">
        <div style="display: flex; gap: 0.25rem; align-items: center;">
          <button class="member-action-btn" onclick="openReportModal('${report.id}')" title="수정">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path>
            </svg>
          </button>
          <button class="member-action-btn" onclick="deleteCompletedProject('${report.id}')" style="color: var(--danger);" title="삭제">삭제</button>
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  renderPagination('completed-pagination', state.pagination.completed.currentPage, totalPages, 'window.changeCompletedPage');
}

// --- 공통 페이지네이션 및 필터 서브 유틸리티 ---
function renderPagination(containerId, currentPage, totalPages, onPageChangeName) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (totalPages <= 1) { container.innerHTML = ''; return; }
  container.innerHTML = `
    <button class="btn-nav" ${currentPage === 1 ? 'disabled' : ''} onclick="${onPageChangeName}(${currentPage - 1})">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <span class="pagination-info" style="margin: 0 1rem; font-size:0.85rem;">${currentPage} / ${totalPages} 페이지</span>
    <button class="btn-nav" ${currentPage === totalPages ? 'disabled' : ''} onclick="${onPageChangeName}(${currentPage + 1})">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>`;
}

function updateClientFilterDropdown() {
  const select = document.getElementById('filter-client');
  if (!select) return;
  const currentSelected = state.filters.client;
  const clients = [...new Set(state.reports.map(r => r.client).filter(c => c))].sort();
  select.innerHTML = '<option value="all">전체 업체</option>';
  clients.forEach(client => {
    const opt = document.createElement('option');
    opt.value = client; opt.textContent = client;
    if (client === currentSelected) opt.selected = true;
    select.appendChild(opt);
  });
}

function updateYearFilterDropdown() {
  const selectInvoice = document.getElementById('filter-invoice-year');
  if (selectInvoice) {
    const currentSelected = state.filters.invoiceYear;
    let years = [...new Set(state.reports.map(r => r.startDate ? r.startDate.substring(0, 4) : null).filter(y => y))];
    const currentYear = new Date().getFullYear().toString();
    if (!years.includes(currentYear)) {
      years.push(currentYear);
    }
    years.sort((a, b) => b.localeCompare(a));

    selectInvoice.innerHTML = '<option value="all">전체 연도</option>';
    years.forEach(year => {
      const opt = document.createElement('option');
      opt.value = year; opt.textContent = `${year}년`;
      if (year === currentSelected) opt.selected = true;
      selectInvoice.appendChild(opt);
    });
  }
  const selectCompleted = document.getElementById('filter-completed-year');
  if (selectCompleted) {
    const currentSelected = state.filters.completedYear;
    let years = [...new Set(state.reports.filter(r => r.finalCompleted).map(r => r.startDate ? r.startDate.substring(0, 4) : null).filter(y => y))];
    const currentYear = new Date().getFullYear().toString();
    if (!years.includes(currentYear)) {
      years.push(currentYear);
    }
    years.sort((a, b) => b.localeCompare(a));

    selectCompleted.innerHTML = '<option value="all">전체 연도</option>';
    years.forEach(year => {
      const opt = document.createElement('option');
      opt.value = year; opt.textContent = `${year}년`;
      if (year === currentSelected) opt.selected = true;
      selectCompleted.appendChild(opt);
    });
  }
}

function resetPaginationPages() {
  state.pagination.report.currentPage = 1;
  state.pagination.invoice.currentPage = 1;
  state.pagination.completed.currentPage = 1;
}

window.changeReportPage = (page) => { state.pagination.report.currentPage = page; renderReportView(); };
window.changeInvoicePage = (page) => { state.pagination.invoice.currentPage = page; renderInvoiceView(); };
window.changeCompletedPage = (page) => { state.pagination.completed.currentPage = page; renderCompletedProjectsView(); };

window.toggleInvoiceExpand = function (reportId) {
  const expandRow = document.getElementById(`invoice-expand-${reportId}`);
  if (expandRow) {
    const isHidden = expandRow.style.display === 'none';
    expandRow.style.display = isHidden ? 'table-row' : 'none';
    if (isHidden) expandedInvoiceIds.add(reportId); else expandedInvoiceIds.delete(reportId);
  }
};

// 백업 기능 유지
function exportData() {
  const dataStr = JSON.stringify({ members: state.members, events: state.events, reports: state.reports }, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `teamscheduler_cloud_backup.json`;
  a.click();
  showToast('서버의 스냅샷 데이터 백업본이 다운로드되었습니다.');
}

// 백업 본 서버 대량 주입(Override)
function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const data = JSON.parse(event.target.result);
      if (Array.isArray(data.members) && Array.isArray(data.events) && Array.isArray(data.reports)) {
        if (confirm('클라우드 원격 서버의 전 데이터가 이 파일로 강제 치환됩니다. 계속하시겠습니까?')) {
          showToast('클라우드 덮어쓰기 작업을 시작합니다...');
          const batch = db.batch();

          // 기존 데이터 삭제 프로세스 생략(문서ID 덮어쓰기)
          data.members.forEach(m => batch.set(db.collection("members").doc(m.id), m));
          data.events.forEach(ev => batch.set(db.collection("events").doc(ev.id), ev));
          data.reports.forEach(r => batch.set(db.collection("reports").doc(r.id), r));

          batch.commit().then(() => showToast('클라우드 서버 동기화 복원이 완수되었습니다.'));
        }
      }
    } catch (err) { alert('오류: ' + err.message); }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// 위험구역: 서버 폭파 및 리셋
function resetData() {
  const loggedInUser = sessionStorage.getItem('logged_in_user');
  if (loggedInUser !== 'whjung@dnde.co.kr') {
    alert('whjung@dnde.co.kr 계정만 전체 데이터 초기화가 가능합니다.');
    return;
  }

  if (confirm('주의: 클라우드 중앙 DB를 청소하고 데모 데이터 세트로 복원합니다. 확정하시겠습니까?')) {
    if (confirm('정말로 모든 데이터를 지우고 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      initializeDemoDataToFirebase();
    }
  }
}

// --- 공통 알림 및 헬퍼 유틸리티 ---
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3000);
}

function getNormalizedDateString(date) {
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
  return adjustedDate.toISOString().split('T')[0];
}

function isNewProject(createdAt) {
  if (!createdAt) return false;
  const createdTime = new Date(createdAt).getTime();
  const todayTime = new Date(getNormalizedDateString(new Date())).getTime();
  return ((todayTime - createdTime) / (1000 * 60 * 60 * 24)) <= 5;
}

function isEndDateApproaching(endDateStr, status) {
  if (!endDateStr || status === 'completed' || status === 'suspended') return false;

  // Safely parse YYYY-MM-DD
  const parts = endDateStr.split('-');
  if (parts.length !== 3) return false;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const day = parseInt(parts[2], 10);

  const endDate = new Date(year, month, day);
  endDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Highlight if end date is within 7 days (and includes past due)
  return diffDays <= 7;
}

function checkIfToday(year, month, day) {
  const today = new Date();
  return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
}

function hexToRgba(hex, alpha) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

// Textarea Auto Resize Function
window.resizeTextareas = function () {
  const textareas = document.querySelectorAll('.auto-resize-textarea');
  textareas.forEach(ta => {
    ta.style.height = 'auto';
    const newHeight = ta.scrollHeight;
    ta.style.height = newHeight + 'px';
  });
};

window.updatePageSize = function () {
  const rowHeight = 65; // Approximate pixels per row including padding
  const reservedHeight = 350; // Pixels reserved for header, navigation, pagination, etc.
  const availableHeight = window.innerHeight - reservedHeight;
  const calculatedSize = Math.max(5, Math.floor(availableHeight / rowHeight));

  if (state.pagination.report.pageSize !== calculatedSize) {
    state.pagination.report.pageSize = calculatedSize;
    state.pagination.invoice.pageSize = calculatedSize;
    state.pagination.completed.pageSize = calculatedSize;
    return true;
  }
  return false;
};

window.addEventListener('resize', () => {
  requestAnimationFrame(() => {
    if (typeof window.resizeTextareas === 'function') {
      window.resizeTextareas();
    }
    if (typeof window.updatePageSize === 'function') {
      if (window.updatePageSize()) {
        renderCurrentView();
      }
    }
  });
});

// --- 매출 현황 그래프 모달 및 Chart.js 로직 ---
let revenueChartInstances = {};

window.openRevenueChartModal = function (memberId) {
  const modal = document.getElementById('modal-revenue-chart');
  if (!modal) return;

  if (typeof Chart === 'undefined') {
    showToast('차트 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해주세요.', 'error');
    return;
  }

  modal.classList.add('active');

  const monthlyDataByMember = {};
  const totalByMember = {};
  const overallMonthlyData = {};

  state.members.forEach(m => {
    monthlyDataByMember[m.id] = {};
    totalByMember[m.id] = 0;
  });

  state.reports.forEach(report => {
    if (report.status !== 'completed' && report.status !== 'ongoing') return;
    const assignee = report.assignee;
    if (!assignee) return;

    if (report.invoices && Array.isArray(report.invoices)) {
      report.invoices.forEach(inv => {
        if (inv.status === 'issued' && inv.date) {
          const yyyyMM = inv.date.substring(0, 7);
          const amt = Number(inv.amount) || 0;

          if (!monthlyDataByMember[assignee]) monthlyDataByMember[assignee] = {};
          if (!monthlyDataByMember[assignee][yyyyMM]) monthlyDataByMember[assignee][yyyyMM] = 0;
          monthlyDataByMember[assignee][yyyyMM] += amt;

          if (!totalByMember[assignee]) totalByMember[assignee] = 0;
          totalByMember[assignee] += amt;

          if (!overallMonthlyData[yyyyMM]) overallMonthlyData[yyyyMM] = 0;
          overallMonthlyData[yyyyMM] += amt;
        }
      });
    }
  });

  const allMonthsSet = new Set();
  Object.values(monthlyDataByMember).forEach(memberData => {
    Object.keys(memberData).forEach(m => allMonthsSet.add(m));
  });
  const allMonths = Array.from(allMonthsSet).sort();

  if (revenueChartInstances.personal) revenueChartInstances.personal.destroy();
  if (revenueChartInstances.team) revenueChartInstances.team.destroy();
  if (revenueChartInstances.overall) revenueChartInstances.overall.destroy();

  const ctxPersonal = document.getElementById('chart-personal-monthly');
  const ctxTeam = document.getElementById('chart-team-comparison');
  const ctxOverall = document.getElementById('chart-overall-monthly');

  if (!ctxPersonal || !ctxTeam || !ctxOverall) return;

  const memberInfo = getAssigneeInfo(memberId);
  document.getElementById('chart-title-personal').textContent = `개인별 월별 매출 (${escapeHTML(memberInfo.name)})`;

  const personalData = allMonths.map(m => (monthlyDataByMember[memberId] ? monthlyDataByMember[memberId][m] || 0 : 0));
  revenueChartInstances.personal = new Chart(ctxPersonal, {
    type: 'bar',
    data: {
      labels: allMonths,
      datasets: [{
        label: `${memberInfo.name} 월별 매출 (만원)`,
        data: personalData,
        backgroundColor: memberInfo.color,
        borderRadius: 4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const activeMembers = state.members.filter(m => totalByMember[m.id] > 0);
  const teamLabels = activeMembers.map(m => m.name);
  const teamData = activeMembers.map(m => totalByMember[m.id]);
  const teamColors = activeMembers.map(m => m.color);

  revenueChartInstances.team = new Chart(ctxTeam, {
    type: 'doughnut',
    data: {
      labels: teamLabels,
      datasets: [{
        data: teamData,
        backgroundColor: teamColors,
        borderWidth: 1
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  const overallData = allMonths.map(m => overallMonthlyData[m] || 0);
  revenueChartInstances.overall = new Chart(ctxOverall, {
    type: 'line',
    data: {
      labels: allMonths,
      datasets: [{
        label: '전체 월별 매출 (만원)',
        data: overallData,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#10b981'
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
};

document.getElementById('btn-close-revenue-chart-modal')?.addEventListener('click', () => {
  document.getElementById('modal-revenue-chart').classList.remove('active');
});
window.addEventListener('click', (e) => {
  const modal = document.getElementById('modal-revenue-chart');
  if (e.target === modal) modal.classList.remove('active');
});

// --- 연도별 요약 그래프 모달 로직 ---
let yearlySpecificChartInstance = null;
let yearlyCumulativeChartInstance = null;

window.openYearlySummaryChartModal = function (type) {
  const loggedInUser = sessionStorage.getItem('logged_in_user');
  if (loggedInUser !== 'whjung@dnde.co.kr') return;

  const modal = document.getElementById('modal-yearly-summary-chart');
  if (!modal) return;

  if (typeof Chart === 'undefined') {
    showToast('차트 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해주세요.', 'error');
    return;
  }

  modal.classList.add('active');

  const targetYear = state.filters.invoiceYear;

  let titleStr = '';
  if (type === 'total') titleStr = '총 금액';
  else if (type === 'issued') titleStr = '발행 완료';
  else if (type === 'unissued') titleStr = '미발행 합계';

  document.getElementById('yearly-summary-chart-modal-title').textContent = targetYear === 'all' ? '전체 연도 매출 현황' : `${targetYear}년 매출 현황`;
  const specificTitleEl = document.getElementById('yearly-summary-specific-title');
  if (specificTitleEl) specificTitleEl.textContent = `월별 ${titleStr} 상세 통계`;

  const monthlyStats = {};

  state.reports.forEach(report => {
    if (report.status !== 'completed' && report.status !== 'ongoing') return;

    let includeReport = false;
    if (targetYear === 'all') {
      includeReport = true;
    } else {
      const projStartYear = report.startDate ? report.startDate.substring(0, 4) : '';
      const projEndYear = report.endDate ? report.endDate.substring(0, 4) : '';
      let hasInvoiceInTargetYear = false;
      if (report.invoices) {
        hasInvoiceInTargetYear = report.invoices.some(inv => inv.status === 'issued' && inv.date && inv.date.substring(0, 4) === targetYear);
      }
      if (hasInvoiceInTargetYear || projStartYear === targetYear || projEndYear === targetYear) {
        includeReport = true;
      }
    }

    if (!includeReport) return;

    // 총 금액을 '시작일' 기준으로 집계하여 누적 차트가 선행되도록 변경
    const projMonth = report.startDate ? report.startDate.substring(0, 7) : (report.endDate ? report.endDate.substring(0, 7) : '');
    const totalAmt = Number(report.amount) || 0;
    let totalIssuedAmt = 0;

    if (report.invoices) {
      report.invoices.forEach(inv => {
        if (inv.status === 'issued' && inv.date) {
          const invMonth = inv.date.substring(0, 7);
          const invAmt = Number(inv.amount) || 0;
          totalIssuedAmt += invAmt;

          if (!monthlyStats[invMonth]) monthlyStats[invMonth] = { total: 0, issued: 0, unissued: 0 };
          monthlyStats[invMonth].issued += invAmt;
        }
      });
    }

    if (projMonth) {
      if (!monthlyStats[projMonth]) monthlyStats[projMonth] = { total: 0, issued: 0, unissued: 0 };
      const unissuedAmt = Math.max(0, totalAmt - totalIssuedAmt);
      monthlyStats[projMonth].unissued += unissuedAmt;
    }
  });

  // Calculate total = issued + unissued for all months
  Object.keys(monthlyStats).forEach(month => {
    monthlyStats[month].total = monthlyStats[month].issued + monthlyStats[month].unissued;
  });

  let allMonths = Object.keys(monthlyStats);
  if (targetYear !== 'all') {
    allMonths = allMonths.filter(m => m.startsWith(targetYear));
  }
  allMonths.sort();

  if (targetYear !== 'all') {
    for (let i = 1; i <= 12; i++) {
      const mStr = `${targetYear}-${String(i).padStart(2, '0')}`;
      if (!allMonths.includes(mStr)) {
        allMonths.push(mStr);
        monthlyStats[mStr] = { total: 0, issued: 0, unissued: 0 };
      }
    }
    allMonths.sort();
  }

  const labels = allMonths.map(m => {
    const parts = m.split('-');
    return targetYear === 'all' ? `${parts[0]}년 ${parts[1]}월` : `${parts[1]}월`;
  });

  const dataTotal = allMonths.map(m => monthlyStats[m] ? monthlyStats[m].total : 0);
  const dataIssued = allMonths.map(m => monthlyStats[m] ? monthlyStats[m].issued : 0);
  const dataUnissued = allMonths.map(m => monthlyStats[m] ? monthlyStats[m].unissued : 0);

  // 누적 데이터 계산
  const today = new Date();
  const currentYearMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;

  const cumulativeTotal = [];
  const cumulativeIssued = [];
  let curTot = 0;
  let curIss = 0;
  for (let i = 0; i < allMonths.length; i++) {
    curTot += dataTotal[i];
    curIss += dataIssued[i];
    cumulativeTotal.push(curTot);

    if (allMonths[i] <= currentYearMonth) {
      cumulativeIssued.push(curIss);
    } else {
      cumulativeIssued.push(null);
    }
  }

  // 특정 지표 차트 렌더링
  let specificData = [];
  let specificLabel = '';
  let specificColor = '';

  if (type === 'total') {
    specificData = dataTotal;
    specificLabel = '총 금액 (만원)';
    specificColor = 'rgba(99, 102, 241, 0.8)';
  } else if (type === 'issued') {
    specificData = dataIssued;
    specificLabel = '발행 완료 (만원)';
    specificColor = 'rgba(16, 185, 129, 0.8)';
  } else if (type === 'unissued') {
    specificData = dataUnissued;
    specificLabel = '미발행 합계 (만원)';
    specificColor = 'rgba(239, 68, 68, 0.8)';
  }

  const sectionSpecific = document.getElementById('chart-section-specific');
  const ctxSpecific = document.getElementById('chart-yearly-specific');

  if (sectionSpecific && ctxSpecific) {
    sectionSpecific.style.display = 'block';
    if (yearlySpecificChartInstance) {
      yearlySpecificChartInstance.destroy();
    }
    yearlySpecificChartInstance = new Chart(ctxSpecific, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: specificLabel,
          data: specificData,
          backgroundColor: specificColor,
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.parsed.y.toLocaleString() + ' 만원';
              }
            }
          }
        }
      }
    });
  }

  // 누적 차트 렌더링
  const ctxCumul = document.getElementById('chart-yearly-cumulative');
  if (ctxCumul) {
    if (yearlyCumulativeChartInstance) {
      yearlyCumulativeChartInstance.destroy();
    }
    yearlyCumulativeChartInstance = new Chart(ctxCumul, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: '누적 총 금액 (만원)',
            data: cumulativeTotal,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointBackgroundColor: '#6366f1'
          },
          {
            label: '누적 발행 완료 (만원)',
            data: cumulativeIssued,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointBackgroundColor: '#10b981'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                return context.dataset.label + ': ' + context.parsed.y.toLocaleString() + ' 만원';
              }
            }
          }
        }
      }
    });
  }
};

document.getElementById('btn-close-yearly-summary-chart-modal')?.addEventListener('click', () => {
  document.getElementById('modal-yearly-summary-chart').classList.remove('active');
});
window.addEventListener('click', (e) => {
  const modal = document.getElementById('modal-yearly-summary-chart');
  if (e.target === modal) modal.classList.remove('active');
});