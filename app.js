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

function getNormalizedDateString(dateObj) {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getOffsetDateString(offsetDays) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return getNormalizedDateString(d);
}

function getCurrentUserMemberId() {
  const loggedInUser = sessionStorage.getItem('logged_in_user');
  if (!loggedInUser) return null;
  if (loggedInUser === 'whjung@dnde.co.kr') return 'admin';
  const userPrefix = loggedInUser.split('@')[0];
  const nameMap = {
    'hdlee': '이헌덕',
    'ujkim': '김욱진',
    'wtkang': '강원태',
    'shmoon': '문승환',
    'yslim': '임윤승',
    'mgkim': '김민건',
    'whjung': '정원혁'
  };
  const targetName = nameMap[userPrefix];
  if (!targetName) return null;
  const matchedMember = state.members.find(m => m.name === targetName);
  return matchedMember ? matchedMember.id : null;
}

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
  quotes: [],
  contracts: [],
  contractCurrentPage: 1,
  contractItemsPerPage: 20,
  notices: [],
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
    invoiceMonth: 'all',
    quoteSearch: '',
    quoteStart: getOffsetDateString(-7),
    quoteEnd: getOffsetDateString(0)
  },
  currentView: 'timeline',
  currentDate: new Date(),
  timelineScale: 'month',
  theme: 'light',
  pagination: {
    report: { currentPage: 1, pageSize: 10 },
    invoice: { currentPage: 1, pageSize: 10 },
    completed: { currentPage: 1, pageSize: 10 },
    quote: { currentPage: 1, pageSize: 10 }
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
    const btnExportReportExcel = document.getElementById('btn-export-report-excel');

    if (user) {
      sessionStorage.setItem('is_logged_in', 'true');
      sessionStorage.setItem('logged_in_user', user.email);

      if (loginContainer) loginContainer.style.display = 'none';
      if (appContainer) appContainer.style.display = 'flex';

      const showAdminActions = (user.email === 'whjung@dnde.co.kr');
      const viewBtnQuote = document.getElementById('view-btn-quote');

      if (btnReset) btnReset.style.display = showAdminActions ? 'flex' : 'none';
      if (btnExport) btnExport.style.display = showAdminActions ? 'flex' : 'none';
      if (btnImport) btnImport.style.display = showAdminActions ? 'flex' : 'none';
      if (btnExportReportExcel) btnExportReportExcel.style.display = showAdminActions ? 'inline-flex' : 'none';
      if (viewBtnQuote) viewBtnQuote.style.display = showAdminActions ? 'flex' : 'none';

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
      if (btnExportReportExcel) btnExportReportExcel.style.display = 'none';
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
    if (loadedCollections >= 6) {
      // 테마는 UI 설정이므로 로컬 유지
      state.theme = localStorage.getItem('ts_theme') || 'light';
      document.documentElement.setAttribute('data-theme', state.theme);

      // 첫 로드 때 멤버가 한 명도 없다면(최초 설치) 초기 데모 데이터를 집어넣음
      if (state.members.length === 0) {
        initializeDemoDataToFirebase();
      } else {
        // 멤버가 있다면 필터 활성화
        if (state.filters.memberIds.length === 0) {
          // 사이드바 팀원 체크박스는 기본적으로 전체 선택 (타임라인 등 다른 계정 정보 볼 수 있도록)
          state.filters.memberIds = state.members.map(m => m.id);

          const currentMemberId = getCurrentUserMemberId();
          if (currentMemberId && currentMemberId !== 'admin') {
            // 주간업무, 계산서, 완료현황의 기본 선택 필터를 본인으로 설정
            if (state.filters.reportAssignee === 'all') state.filters.reportAssignee = currentMemberId;
            if (state.filters.invoiceAssignee === 'all') state.filters.invoiceAssignee = currentMemberId;
            if (state.filters.completedAssignee === 'all') state.filters.completedAssignee = currentMemberId;
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
    if (loadedCollections < 6) checkAndRender(); else renderApp();
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
    if (loadedCollections < 6) checkAndRender(); else renderApp();
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
    if (loadedCollections < 6) checkAndRender(); else renderApp();
  });

  // D. 견적 데이터 실시간 감지
  db.collection("quotes").onSnapshot((snapshot) => {
    const quotes = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      if (!data.assigneeName && data.assignee) {
        const m = state.members.find(member => member.id === data.assignee);
        if (m) data.assigneeName = m.name;
      }
      quotes.push(data);
    });
    // 최신 날짜순 정렬 (기본)
    quotes.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    state.quotes = quotes;
    if (loadedCollections < 6) checkAndRender(); else renderApp();
  });


  // F. 계약서 데이터 실시간 감지
  db.collection("contracts").onSnapshot((snapshot) => {
    const contracts = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      if (!data.assigneeName && data.assignee) {
        const m = state.members.find(member => member.id === data.assignee);
        if (m) data.assigneeName = m.name;
      }
      contracts.push(data);
    });
    // 최신 날짜순 정렬 (기본)
    contracts.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    state.contracts = contracts;
    if (loadedCollections < 6) checkAndRender(); else renderApp();
  });

  // E. 공지사항 데이터 실시간 감지
  db.collection("notices").orderBy("createdAt", "desc").onSnapshot((snapshot) => {
    const notices = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      notices.push(data);
    });
    state.notices = notices;
    if (loadedCollections < 6) checkAndRender(); else {
      renderApp();
      if (document.getElementById('modal-notice') && document.getElementById('modal-notice').classList.contains('active')) {
        renderNoticeList();
      }
    }
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
  document.getElementById('view-btn-quote').addEventListener('click', () => switchView('quote'));
  document.getElementById('view-btn-contract')?.addEventListener('click', () => switchView('contract'));
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

  const filterQuoteSearch = document.getElementById('filter-quote-search');
  if (filterQuoteSearch) {
    filterQuoteSearch.addEventListener('input', (e) => {
      state.filters.quoteSearch = e.target.value;
      state.pagination.quote.currentPage = 1;
      renderApp();
    });
  }

  const filterQuoteStart = document.getElementById('filter-quote-start');
  const filterQuoteEnd = document.getElementById('filter-quote-end');

  if (filterQuoteStart && filterQuoteEnd) {
    const today = new Date();
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 7);

    if (!filterQuoteStart.value) filterQuoteStart.value = oneWeekAgo.toISOString().split('T')[0];
    if (!filterQuoteEnd.value) filterQuoteEnd.value = today.toISOString().split('T')[0];

    state.filters.quoteStart = filterQuoteStart.value;
    state.filters.quoteEnd = filterQuoteEnd.value;

    const onDateChange = () => {
      state.filters.quoteStart = filterQuoteStart.value;
      state.filters.quoteEnd = filterQuoteEnd.value;
      state.pagination.quote.currentPage = 1;
      renderApp();
    };

    filterQuoteStart.addEventListener('change', onDateChange);
    filterQuoteEnd.addEventListener('change', onDateChange);
  }

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

  const closeUrgentModal = () => document.getElementById('modal-urgent-project').classList.remove('active');
  document.getElementById('btn-close-urgent-modal').addEventListener('click', closeUrgentModal);
  document.getElementById('btn-cancel-urgent-modal').addEventListener('click', closeUrgentModal);

  document.getElementById('form-event').addEventListener('submit', handleEventSubmit);
  document.getElementById('btn-delete-event').addEventListener('click', handleDeleteEvent);

  document.getElementById('btn-add-member').addEventListener('click', () => openMemberModal());
  document.getElementById('btn-close-member-modal').addEventListener('click', closeMemberModal);
  document.getElementById('btn-cancel-member-modal').addEventListener('click', closeMemberModal);
  document.getElementById('form-member').addEventListener('submit', handleMemberSubmit);
  document.getElementById('btn-delete-member').addEventListener('click', handleDeleteMember);

  document.getElementById('btn-add-report').addEventListener('click', () => openReportModal());

  const btnExportReportExcel = document.getElementById('btn-export-report-excel');
  if (btnExportReportExcel) {
    btnExportReportExcel.addEventListener('click', () => exportReportListToExcel());
  }
  document.getElementById('btn-close-report-modal').addEventListener('click', closeReportModal);
  document.getElementById('btn-cancel-report-modal').addEventListener('click', closeReportModal);
  document.getElementById('form-report').addEventListener('submit', handleReportSubmit);
  document.getElementById('btn-delete-report').addEventListener('click', handleDeleteReport);
  document.getElementById('btn-complete-report').addEventListener('click', handleProjectComplete);

  // 견적 관리 리스너
  const btnAddQuote = document.getElementById('btn-add-quote');
  if (btnAddQuote) {
    btnAddQuote.addEventListener('click', () => openQuoteModal());
  }

  const btnUploadQuotePdf = document.getElementById('btn-upload-quote-pdf');
  const quotePdfInput = document.getElementById('quote-pdf-input');
  if (btnUploadQuotePdf && quotePdfInput) {
    btnUploadQuotePdf.addEventListener('click', () => quotePdfInput.click());
    quotePdfInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        openQuoteModal(); // 모달 띄우고
        parseQuotePDF(e.target.files[0]); // 파싱 진행
        e.target.value = ''; // 동일 파일 재선택 가능하게 초기화
      }
    });
  }

  const btnSyncOnedrive = document.getElementById('btn-sync-onedrive');
  if (btnSyncOnedrive) {
    btnSyncOnedrive.addEventListener('click', syncOneDriveQuotes);
  }

  const quotePdfDropZone = document.getElementById('quote-pdf-drop-zone');
  if (quotePdfDropZone) {
    quotePdfDropZone.addEventListener('click', () => quotePdfInput.click());
    quotePdfDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      quotePdfDropZone.classList.add('dragover');
    });
    quotePdfDropZone.addEventListener('dragleave', (e) => {
      e.preventDefault();
      quotePdfDropZone.classList.remove('dragover');
    });
    quotePdfDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      quotePdfDropZone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        if (e.dataTransfer.files[0].type === 'application/pdf') {
          parseQuotePDF(e.dataTransfer.files[0]);
        } else {
          showToast('PDF 파일만 업로드 가능합니다.', 'danger');
        }
      }
    });
  }

  const btnCloseQuoteModal = document.getElementById('btn-close-quote-modal');
  if (btnCloseQuoteModal) btnCloseQuoteModal.addEventListener('click', closeQuoteModal);

  const btnCancelQuoteModal = document.getElementById('btn-cancel-quote-modal');
  if (btnCancelQuoteModal) btnCancelQuoteModal.addEventListener('click', closeQuoteModal);

  const formQuote = document.getElementById('form-quote');
  if (formQuote) formQuote.addEventListener('submit', saveQuote);

  const btnDeleteQuote = document.getElementById('btn-delete-quote');
  if (btnDeleteQuote) btnDeleteQuote.addEventListener('click', deleteQuote);

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

  // 공지사항 모달 닫기 리스너
  const btnCloseNotice = document.getElementById('btn-close-notice-modal');
  if (btnCloseNotice) btnCloseNotice.addEventListener('click', closeNoticeModal);

  // 공지 모달 외부 클릭 시 닫기
  const noticeModalOverlay = document.getElementById('modal-notice');
  if (noticeModalOverlay) {
    noticeModalOverlay.addEventListener('click', (e) => {
      if (e.target === noticeModalOverlay) closeNoticeModal();
    });
  }

  // 공지 textarea Ctrl+Enter 제출
  const noticeText = document.getElementById('notice-compose-text');
  if (noticeText) {
    noticeText.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        submitNotice();
      }
    });
  }

  // 긴급 프로젝트 모달 닫기 리스너
  const btnCloseUrgentProjects = document.getElementById('btn-close-urgent-projects-modal');
  if (btnCloseUrgentProjects) btnCloseUrgentProjects.addEventListener('click', closeUrgentProjectsModal);

  const urgentProjectsOverlay = document.getElementById('modal-urgent-projects');
  if (urgentProjectsOverlay) {
    urgentProjectsOverlay.addEventListener('click', (e) => {
      if (e.target === urgentProjectsOverlay) closeUrgentProjectsModal();
    });
  }
}

// ==========================================
// 공지사항 기능
// ==========================================

/**
 * 현재 로그인 사용자의 이름을 state.members에서 직접 조회
 * nameMap(이메일 prefix 매핑)은 기존 앱 패턴과 동일하게 유지
 */
function getLoggedInMemberName() {
  const loggedInUser = sessionStorage.getItem('logged_in_user') || '';
  const userPrefix = loggedInUser.split('@')[0];
  const nameMap = {
    'hdlee': '이헌덕',
    'ujkim': '김욱진',
    'wtkang': '강원태',
    'shmoon': '문승환',
    'yslim': '임윤승',
    'mgkim': '김민건'
  };
  // nameMap에 있는 경우 해당 이름 반환
  if (nameMap[userPrefix]) return nameMap[userPrefix];
  // nameMap에 없는 경우(관리자 등)은 state.members에서 기존 맵핑 이름 제외한 나머지 멤버
  const knownNames = new Set(Object.values(nameMap));
  const extraMember = state.members.find(m => !knownNames.has(m.name));
  if (extraMember) return extraMember.name;
  return userPrefix || '팔원';
}

window.openNoticeModal = function openNoticeModal() {
  const modal = document.getElementById('modal-notice');
  if (!modal) return;

  // 작성자 아바타 초기화
  const authorName = getLoggedInMemberName();
  const memberObj = state.members.find(m => m.name === authorName);
  const memberColor = memberObj ? memberObj.color : '#6366f1';

  const avatarEl = document.getElementById('notice-compose-avatar');
  if (avatarEl) {
    avatarEl.textContent = authorName.charAt(0);
    avatarEl.style.background = `linear-gradient(135deg, ${memberColor}, ${memberColor}cc)`;
  }

  // textarea 초기화
  const textarea = document.getElementById('notice-compose-text');
  if (textarea) textarea.value = '';

  renderNoticeList();
  modal.classList.add('active');
}

function closeNoticeModal() {
  const modal = document.getElementById('modal-notice');
  if (modal) modal.classList.remove('active');
}

function renderNoticeList() {
  const container = document.getElementById('notice-list-container');
  if (!container) return;

  const loggedInUser = sessionStorage.getItem('logged_in_user') || '';
  const currentAuthor = getLoggedInMemberName();

  if (state.notices.length === 0) {
    container.innerHTML = `
      <div class="notice-empty">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <p>아직 공지사항이 없습니다.</p>
        <p style="font-size: 0.8rem;">첫 번째 공지를 작성해보세요!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = state.notices.map(notice => {
    const memberObj = state.members.find(m => m.name === notice.authorName);
    const avatarColor = memberObj ? memberObj.color : '#6366f1';
    const initial = (notice.authorName || '?').charAt(0);
    const timeStr = formatNoticeTime(notice.createdAt);
    const isOwner = notice.authorName === currentAuthor || loggedInUser === 'whjung@dnde.co.kr';

    return `
      <div class="notice-item" id="notice-item-${notice.id}">
        <div class="notice-item-header">
          <div class="notice-item-avatar" style="background: linear-gradient(135deg, ${avatarColor}, ${avatarColor}cc);">${escapeHTML(initial)}</div>
          <span class="notice-item-author">${escapeHTML(notice.authorName || '알 수 없음')}</span>
          <span class="notice-item-time">${timeStr}</span>
        </div>
        <div class="notice-item-content">${escapeHTML(notice.content || '')}</div>
        ${isOwner ? `
          <button class="notice-item-delete" title="삭제" onclick="deleteNotice('${notice.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        ` : ''}
      </div>
    `;
  }).join('');
}

function formatNoticeTime(ts) {
  if (!ts) return '';
  let date;
  if (ts && typeof ts.toDate === 'function') {
    date = ts.toDate();
  } else if (ts && ts.seconds) {
    date = new Date(ts.seconds * 1000);
  } else {
    date = new Date(ts);
  }
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = now - date;
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHr < 24) return `${diffHr}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
}

window.submitNotice = function () {
  const textarea = document.getElementById('notice-compose-text');
  const content = textarea ? textarea.value.trim() : '';
  if (!content) {
    showToast('공지 내용을 입력하세요.', 'danger');
    return;
  }

  const authorName = getLoggedInMemberName();
  const loggedInUser = sessionStorage.getItem('logged_in_user') || '';

  const btn = document.getElementById('btn-submit-notice');
  if (btn) { btn.disabled = true; btn.textContent = '등록 중...'; }

  db.collection('notices').add({
    content,
    authorName,
    authorEmail: loggedInUser,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    if (textarea) textarea.value = '';
    showToast('공지사항이 등록되었습니다.');
  }).catch(err => {
    console.error('공지 등록 오류:', err);
    showToast('공지 등록 중 오류가 발생했습니다.', 'danger');
  }).finally(() => {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-right:4px;"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>등록`;
    }
  });
};

window.deleteNotice = function (noticeId) {
  if (!confirm('이 공지사항을 삭제하시겠습니까?')) return;
  db.collection('notices').doc(noticeId).delete().then(() => {
    showToast('공지사항이 삭제되었습니다.');
  }).catch(err => {
    console.error('공지 삭제 오류:', err);
    showToast('삭제 중 오류가 발생했습니다.', 'danger');
  });
};

// ==========================================
// 긴급(마감 임박) 프로젝트 모달 기능
// ==========================================

window.openUrgentProjectsModal = function () {
  const modal = document.getElementById('modal-urgent-projects');
  if (!modal) return;

  // 모달 제목에 해당 월 표시
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth() + 1;
  const titleEl = document.getElementById('urgent-modal-title');
  if (titleEl) titleEl.textContent = `${year}년 ${month}월 마감 프로젝트`;

  renderUrgentProjectsList();
  modal.classList.add('active');
};

function closeUrgentProjectsModal() {
  const modal = document.getElementById('modal-urgent-projects');
  if (modal) modal.classList.remove('active');
}

function renderUrgentProjectsList() {
  const container = document.getElementById('urgent-projects-list');
  if (!container) return;

  let endingProjects = window._urgentEndingProjects || [];
  if (!endingProjects.length) {
    const year = state.currentDate.getFullYear();
    const month = state.currentDate.getMonth();
    const filteredEvents = getFilteredEvents();
    endingProjects = filteredEvents.filter(event => {
      if (event.category !== 'project' || !event.endDate) return false;
      const end = new Date(event.endDate);
      return end.getFullYear() === year && end.getMonth() === month;
    });
  }

  if (endingProjects.length === 0) {
    container.innerHTML = `
      <div class="notice-empty">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <p>이달 마감 예정 프로젝트가 없습니다.</p>
      </div>
    `;
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const sorted = [...endingProjects].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));

  // 컬럼 헤더
  container.innerHTML = `
    <div style="display:grid; grid-template-columns:8px 1fr auto auto 80px; align-items:center; gap:0.75rem;
                padding:0.5rem 1.25rem 0.4rem; border-bottom:2px solid var(--border-color);
                font-size:0.72rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.05em;">
      <span></span>
      <span>프로젝트명 / 고객사</span>
      <span>담당</span>
      <span style="text-align:center;">마감</span>
      <span style="text-align:right;">진행률</span>
    </div>
    ${sorted.map(event => {
    let progress = 0;
    let projectName = event.title;
    let assigneeName = event.assigneeName || '-';
    let clientName = event.client || '';

    if (event.id.startsWith('e_r_')) {
      const report = state.reports.find(r => r.id === event.id.replace('e_r_', ''));
      if (report) {
        progress = report.progress || 0;
        projectName = report.project || event.title;
        assigneeName = report.assigneeName || assigneeName;
        clientName = report.client || clientName;
      }
    }

    const memberObj = state.members.find(m => m.name === assigneeName);
    const dotColor = memberObj ? memberObj.color : '#94a3b8';

    const endDate = new Date(event.endDate);
    endDate.setHours(0, 0, 0, 0);
    const diffDays = Math.ceil((endDate - today) / 86400000);

    let dLabel, dColor;
    if (diffDays < 0) { dLabel = `D+${Math.abs(diffDays)}`; dColor = '#ef4444'; }
    else if (diffDays === 0) { dLabel = 'D-Day'; dColor = '#ef4444'; }
    else if (diffDays <= 3) { dLabel = `D-${diffDays}`; dColor = '#f97316'; }
    else if (diffDays <= 7) { dLabel = `D-${diffDays}`; dColor = '#f59e0b'; }
    else { dLabel = `D-${diffDays}`; dColor = '#6366f1'; }

    const pColor = progress >= 80 ? '#10b981' : progress >= 50 ? '#6366f1' : '#f59e0b';

    return `
        <div style="display:grid; grid-template-columns:8px 1fr auto auto 80px; align-items:center; gap:0.75rem;
                    padding:0.65rem 1.25rem; border-bottom:1px solid var(--border-color);
                    transition:background 0.15s;" onmouseover="this.style.background='var(--bg-hover)'" onmouseout="this.style.background=''">
          <!-- 담당자 컬러 도트 -->
          <span style="width:8px;height:8px;border-radius:50%;background:${dotColor};display:block;flex-shrink:0;"></span>
          <!-- 프로젝트명 + 고객사 -->
          <div style="min-width:0;">
            <div style="font-size:0.875rem;font-weight:600;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
                 title="${escapeHTML(projectName)}">${escapeHTML(projectName)}</div>
            ${clientName ? `<div style="font-size:0.75rem;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHTML(clientName)}</div>` : ''}
          </div>
          <!-- 담당자 -->
          <span style="font-size:0.8rem;color:var(--text-secondary);white-space:nowrap;">${escapeHTML(assigneeName)}</span>
          <!-- D-day -->
          <span style="font-size:0.8rem;font-weight:700;color:${dColor};white-space:nowrap;text-align:center;">${dLabel}</span>
          <!-- 진행률 바 + 숫자 -->
          <div style="display:flex;align-items:center;gap:5px;">
            <div style="flex:1;background:var(--bg-hover);height:5px;border-radius:3px;overflow:hidden;">
              <div style="width:${progress}%;background:${pColor};height:100%;border-radius:3px;"></div>
            </div>
            <span style="font-size:0.75rem;font-weight:600;color:${pColor};min-width:26px;text-align:right;">${progress}%</span>
          </div>
        </div>
      `;
  }).join('')}
  `;
}

// --- 일정/팀원 필터링 연산 ---
function getFilteredEvents(ignoreMemberFilter = false) {
  return state.events.filter(event => {
    if (state.filters.category !== 'all' && event.category !== state.filters.category) return false;
    if (state.filters.priority !== 'all' && event.priority !== state.filters.priority) return false;
    const isAssigneeExist = state.members.some(m => m.id === event.assignee);
    if (!ignoreMemberFilter && isAssigneeExist && !state.filters.memberIds.includes(event.assignee)) return false;
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
    document.getElementById('quote-view-wrapper').style.display = 'none';
    document.getElementById('contract-view-wrapper').style.display = 'none';
    document.getElementById('invoice-view-wrapper').style.display = 'none';
    document.getElementById('completed-projects-view-wrapper').style.display = 'none';
    renderTimelineView();
  } else if (state.currentView === 'report') {
    calNav.style.display = 'none';
    document.getElementById('timeline-view-wrapper').style.display = 'none';
    document.getElementById('report-view-wrapper').style.display = 'flex';
    document.getElementById('quote-view-wrapper').style.display = 'none';
    document.getElementById('contract-view-wrapper').style.display = 'none';
    document.getElementById('invoice-view-wrapper').style.display = 'none';
    document.getElementById('completed-projects-view-wrapper').style.display = 'none';
    renderReportView();
  } else if (state.currentView === 'quote') {
    calNav.style.display = 'none';
    document.getElementById('timeline-view-wrapper').style.display = 'none';
    document.getElementById('report-view-wrapper').style.display = 'none';
    document.getElementById('quote-view-wrapper').style.display = 'flex';
    document.getElementById('invoice-view-wrapper').style.display = 'none';
    document.getElementById('completed-projects-view-wrapper').style.display = 'none';
    renderQuoteView();
  } else if (state.currentView === 'contract') {
    calNav.style.display = 'none';
    document.getElementById('timeline-view-wrapper').style.display = 'none';
    document.getElementById('report-view-wrapper').style.display = 'none';
    document.getElementById('quote-view-wrapper').style.display = 'none';
    document.getElementById('contract-view-wrapper').style.display = 'flex';
    document.getElementById('invoice-view-wrapper').style.display = 'none';
    document.getElementById('completed-projects-view-wrapper').style.display = 'none';
    renderContractView();
  } else if (state.currentView === 'invoice') {
    calNav.style.display = 'none';
    document.getElementById('timeline-view-wrapper').style.display = 'none';
    document.getElementById('report-view-wrapper').style.display = 'none';
    document.getElementById('quote-view-wrapper').style.display = 'none';
    document.getElementById('contract-view-wrapper').style.display = 'none';
    document.getElementById('invoice-view-wrapper').style.display = 'flex';
    document.getElementById('completed-projects-view-wrapper').style.display = 'none';
    renderInvoiceView();
  } else if (state.currentView === 'completed') {
    calNav.style.display = 'none';
    document.getElementById('timeline-view-wrapper').style.display = 'none';
    document.getElementById('report-view-wrapper').style.display = 'none';
    document.getElementById('quote-view-wrapper').style.display = 'none';
    document.getElementById('contract-view-wrapper').style.display = 'none';
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
  // 공지사항 개수 업데이트
  const noticeCount = state.notices.length;
  const noticeCountEl = document.getElementById('stat-notice-count');
  if (noticeCountEl) noticeCountEl.textContent = noticeCount;
  const noticeBadge = document.getElementById('notice-new-badge');
  if (noticeBadge) noticeBadge.style.display = noticeCount > 0 ? 'inline-block' : 'none';

  const endingProjects = filteredEvents.filter(event => {
    if (event.category !== 'project' || !event.endDate) return false;
    const end = new Date(event.endDate);
    return end.getFullYear() === year && end.getMonth() === month;
  });
  document.getElementById('stat-high-priority').textContent = endingProjects.length;

  // 긴급 데이터를 window에 저장해 모달에서 사용
  window._urgentEndingProjects = endingProjects;
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

  // 타임라인은 체크박스 필터(memberIds)를 무시하고 모든 팀원의 일정을 보여줌
  const rawFilteredEvents = getFilteredEvents(true);
  const filteredEvents = rawFilteredEvents.filter(event => !event.id || !event.id.toString().startsWith('e_r_'));

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

      state.reports.forEach(report => {
        if (report.assignee !== member.id || report.finalCompleted) return;
        if (state.filters.client !== 'all' && report.client !== state.filters.client) return;
        if (!report.startDate || !report.endDate) return;
        if (report.endDate < monthStartStr || report.startDate > monthEndStr) return;

        const startD = report.startDate < monthStartStr ? 1 : parseInt(report.startDate.split('-')[2], 10);
        const endD = report.endDate > monthEndStr ? daysInMonth : parseInt(report.endDate.split('-')[2], 10);

        memberEvents.push({
          id: `e_r_${report.id}`,
          title: `[${report.client || ''}] ${report.project || ''}`,
          startDate: report.startDate,
          endDate: report.endDate,
          assignee: report.assignee,
          assigneeName: report.assigneeName,
          category: 'project',
          priority: 'medium',
          client: report.client,
          description: `프로젝트 연동 일정 (${report.client || ''})`,
          clampedStartCol: startD,
          clampedEndCol: endD
        });
      });
    }

    const maxRows = assignRowsToEvents(memberEvents);
    const gridRowsCount = Math.max(1, maxRows);

    const row = document.createElement('div');
    row.className = 'timeline-row';

    const profile = document.createElement('div');
    profile.className = 'timeline-row-member';

    const activeReports = state.reports.filter(r => r.assignee === member.id && !r.finalCompleted);
    let projectsStr = '보고 내용 없음';
    if (activeReports.length > 0) {
      const remarksList = activeReports.map(r => r.remarks ? `[${r.project}] ${r.remarks}` : `[${r.project}] 내용 없음`);
      projectsStr = remarksList.join(' / ');
    }

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

      let displayTitle = event.title;
      if (event.category === 'project' && event.client) {
        displayTitle = displayTitle.replace('[프로젝트]', `[${event.client}]`);
      }
      bar.innerHTML = `<span style="margin-right: 4px;">💼</span> ${escapeHTML(displayTitle)}`;

      if (event.priority === 'high' && event.id.startsWith('e_r_')) {
        bar.classList.add('urgent-timeline-event');
        bar.removeAttribute('title');
        bar.addEventListener('click', () => {
          openUrgentProjectModal(event.id.replace('e_r_', ''), event.id);
        });
      } else {
        bar.title = `${displayTitle}\n기간: ${event.startDate} ~ ${event.endDate}\n${event.description || ''}`;
        bar.addEventListener('click', () => {
          if (event.id.startsWith('e_r_')) {
            openReportModal(event.id.replace('e_r_', ''));
          } else {
            openEventModal(event.id);
          }
        });
      }
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
  document.getElementById('view-btn-quote').classList.toggle('active', view === 'quote');
  document.getElementById('view-btn-contract')?.classList.toggle('active', view === 'contract');
  document.getElementById('view-btn-invoice').classList.toggle('active', view === 'invoice');
  document.getElementById('view-btn-completed').classList.toggle('active', view === 'completed');

  if (view === 'timeline') document.getElementById('main-view-title').textContent = '스케줄 타임라인';
  else if (view === 'report') document.getElementById('main-view-title').textContent = '주간업무 보고';
  else if (view === 'quote') document.getElementById('main-view-title').textContent = '견적 관리';
  else if (view === 'contract') document.getElementById('main-view-title').textContent = '계약서 관리';
  else if (view === 'invoice') document.getElementById('main-view-title').textContent = '세금계산서 발행현황';
  else if (view === 'completed') document.getElementById('main-view-title').textContent = '프로젝트 완료 현황';

  // 메인 스탯 바 숨김/표시 처리
  const statsBar = document.querySelector('.stats-bar:not(.quote-stats-bar)');
  if (statsBar) {
    if (view === 'invoice' || view === 'completed' || view === 'quote' || view === 'contract') {
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

    const correspondingEvent = state.events.find(e => e.id === `e_r_${report.id}`);
    const isUrgent = correspondingEvent && correspondingEvent.priority === 'high';

    const tr = document.createElement('tr');
    if (isUrgent) {
      tr.classList.add('urgent-report-row');
      tr.title = '클릭하여 긴급 프로젝트 요약 보기';
      tr.onclick = (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'BUTTON' || e.target.tagName === 'TEXTAREA' || e.target.closest('button')) {
          return;
        }
        openUrgentProjectModal(report.id, `e_r_${report.id}`);
      };
    }

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
        <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
          <div class="progress-bar-container" style="flex-shrink: 0; cursor: ew-resize;" onmousedown="startProgressDrag(event, '${report.id}')"><div class="progress-bar-fill" style="width: ${report.progress}%;"></div></div>
          <div style="display: flex; align-items: center; justify-content: center; width: 45px;">
            <span id="progress_text_${report.id}" class="${report.progressModified ? 'modified-text' : ''}" style="width: 25px; text-align: right; font-weight: 500; font-size: 0.9rem;">${report.progress}</span>
            <div style="display: flex; flex-direction: column; margin-left: 4px; gap: 1px;">
              <button class="progress-btn" style="background: none; border: none; padding: 0; cursor: pointer; color: var(--text-secondary); line-height: 1; display: flex; align-items: center;" onclick="changeProgress('${report.id}', 1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8l6 6H6z"/></svg>
              </button>
              <button class="progress-btn" style="background: none; border: none; padding: 0; cursor: pointer; color: var(--text-secondary); line-height: 1; display: flex; align-items: center;" onclick="changeProgress('${report.id}', -1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16l-6-6h12z"/></svg>
              </button>
            </div>
          </div>
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

window.startProgressDrag = function (e, id) {
  e.preventDefault();
  const container = e.currentTarget;
  const rect = container.getBoundingClientRect(); // 처음에 한 번만 측정하여 리렌더링 시 너비가 0이 되는 버그 방지
  let currentPercentage = 0;

  const updateProgressUI = (event) => {
    if (rect.width === 0) return;
    let x = event.clientX - rect.left;
    let percentage = Math.round((x / rect.width) * 100);

    // 10% 단위로 맞춤
    percentage = Math.round(percentage / 10) * 10;

    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;

    currentPercentage = percentage;

    // 리렌더링으로 인해 요소가 교체되었을 수 있으므로 ID로 매번 최신 요소를 찾음
    const textEl = document.getElementById('progress_text_' + id);
    if (textEl) {
      textEl.textContent = percentage;
      const activeRow = textEl.closest('td');
      if (activeRow) {
        const fill = activeRow.querySelector('.progress-bar-fill');
        if (fill) fill.style.width = percentage + '%';
      }
    }
  };

  updateProgressUI(e);

  const onMouseMove = (event) => {
    updateProgressUI(event);
  };

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    // 마우스를 뗄 때만 DB 업데이트 호출 (드래그 중 깜빡임/리렌더링 원천 차단)
    window.updateReportInline(id, 'progress', currentPercentage);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

window.changeProgress = function (id, delta) {
  const textEl = document.getElementById('progress_text_' + id);
  if (!textEl) return;
  let val = parseInt(textEl.textContent, 10);
  if (isNaN(val)) val = 0;
  val += delta;
  if (val < 0) val = 0;
  if (val > 100) val = 100;

  textEl.textContent = val;
  const row = textEl.closest('td');
  if (row) {
    const fill = row.querySelector('.progress-bar-fill');
    if (fill) fill.style.width = val + '%';
  }

  window.updateReportInline(id, 'progress', val);
};

window._inlineUpdateTimers = window._inlineUpdateTimers || {};

window.updateReportInline = function (id, field, value) {
  const existing = state.reports.find(r => r.id === id);
  if (!existing) return;

  if (field === 'amount' || field === 'progress') value = Number(value);

  const updateData = { [field]: value };

  if (field === 'progress' && existing.progress !== value) {
    updateData.progressModified = true;

    // 빠른 UI 반영 (progress-bar-fill 즉각 업데이트는 changeProgress/startProgressDrag에서 처리하므로 여기서는 스킵 가능하지만 텍스트 색상 변경 등을 위해 둠)
    const textEl = document.getElementById(`progress_text_${id}`);
    if (textEl && !textEl.classList.contains('modified-text')) {
      textEl.classList.add('modified-text');
    }
  }
  if (field === 'remarks' && existing.remarks !== value) {
    updateData.remarksModified = true;
  }
  if (field === 'endDate' && existing.endDate !== value) {
    updateData.endDateModifiedAt = getNormalizedDateString(new Date());
  }

  // 디바운스 처리 (500ms 내 연속 입력 시 마지막 1번만 서버 저장)
  const timerKey = `${id}_${field}`;
  if (window._inlineUpdateTimers[timerKey]) {
    clearTimeout(window._inlineUpdateTimers[timerKey]);
  }

  window._inlineUpdateTimers[timerKey] = setTimeout(() => {
    const batch = db.batch();
    const reportRef = db.collection("reports").doc(id);

    // report의 assigneeName 업데이트를 위해 updateData 보강
    if (field === 'assignee') {
      const memberObj = state.members.find(m => m.id === value);
      if (memberObj) {
        updateData.assigneeName = memberObj.name;
      }
    }

    batch.update(reportRef, updateData);

    // 타임라인 연동 일정(event) 업데이트
    // 기존 리포트 데이터와 이번 변경사항을 합쳐 최신 상태 생성
    const latestReport = { ...existing, ...updateData };
    const eventId = `e_r_${id}`;

    const eventUpdateData = {
      title: `[${latestReport.client || ''}] ${latestReport.project || ''}`,
      startDate: latestReport.startDate || '',
      startTime: '09:00',
      endDate: latestReport.endDate || '',
      endTime: '18:00',
      assignee: latestReport.assignee,
      assigneeName: latestReport.assigneeName,
      category: 'project',
      priority: 'medium',
      client: latestReport.client || '',
      description: `프로젝트 연동 일정 (${latestReport.client || ''})`
    };

    if (!latestReport.finalCompleted) {
      batch.set(db.collection("events").doc(eventId), eventUpdateData, { merge: true });
    }

    batch.commit().then(() => {
      // Data syncs automatically
    }).catch(err => {
      console.error("Error updating report inline:", err);
      showToast('수정 중 오류가 발생했습니다.');
    });
  }, 400);
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
    invoiceStatus: prevReport?.invoiceStatus || 'unissued',
    invoiceDate: prevReport?.invoiceDate || '',
    invoiceRemarks: prevReport?.invoiceRemarks || '',
    invoices: prevReport?.invoices || Array.from({ length: 5 }, () => ({ status: 'unissued', amount: 0, date: '' })),
    progressModified: isProgressChanged ? true : (prevReport?.progressModified || false),
    remarksModified: isRemarksChanged ? true : (prevReport?.remarksModified || false),
    endDateModifiedAt: isEndDateChanged ? getNormalizedDateString(new Date()) : (prevReport?.endDateModifiedAt || null),
    finalCompleted: prevReport?.finalCompleted || false,
    createdAt: prevReport?.createdAt || getNormalizedDateString(new Date())
  };

  // 파이어베이스 트랜잭션형 배치를 이용해 간트차트 일정과 동시에 서버에 저장
  const batch = db.batch();
  batch.set(db.collection("reports").doc(id), targetReport, { merge: true });

  // 연동 캘린더 일정 계산 배치 연계
  const eventId = 'e_r_' + id;
  if (!targetReport.finalCompleted) {
    const title = `[${targetReport.client}] ${targetReport.project}`;
    const eventData = {
      id: eventId, title, startDate: targetReport.startDate, startTime: '09:00',
      endDate: targetReport.endDate, endTime: '18:00', assignee: targetReport.assignee, assigneeName: targetReport.assigneeName,
      category: 'project', priority: 'medium', client: targetReport.client, description: `프로젝트 연동 일정 (${targetReport.client})`
    };
    batch.set(db.collection("events").doc(eventId), eventData, { merge: true });
  } else {
    batch.delete(db.collection("events").doc(eventId));
  }

  batch.commit().then(() => {
    showToast('프로젝트 내역 및 연동 스케줄이 실시간 동기화되었습니다.');
    closeReportModal();
  }).catch(err => {
    console.error("Error saving report:", err);
    alert('저장 중 오류가 발생했습니다.');
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

// --- 견적 관리 뷰 렌더링 ---
function renderQuoteView() {
  const tableBody = document.getElementById('quote-table-body');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  // Set filter inputs to initial state if not set
  const quoteStartInput = document.getElementById('filter-quote-start-date');
  const quoteEndInput = document.getElementById('filter-quote-end-date');
  if (quoteStartInput && !quoteStartInput.value) quoteStartInput.value = state.filters.quoteStart;
  if (quoteEndInput && !quoteEndInput.value) quoteEndInput.value = state.filters.quoteEnd;

  let filtered = [...state.quotes];

  if (state.filters.quoteSearch) {
    const s = state.filters.quoteSearch.toLowerCase();
    filtered = filtered.filter(q =>
      (q.client && q.client.toLowerCase().includes(s)) ||
      (q.item && q.item.toLowerCase().includes(s))
    );
  }

  if (state.filters.quoteStart) {
    filtered = filtered.filter(q => q.date && q.date >= state.filters.quoteStart);
  }
  if (state.filters.quoteEnd) {
    filtered = filtered.filter(q => q.date && q.date <= state.filters.quoteEnd);
  }

  // 통계 계산
  const totalCount = filtered.length;
  const totalAmount = filtered.reduce((acc, q) => acc + (Number(q.amount) || 0), 0);

  // 이번 주 월요일 계산
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  const mondayStr = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`;

  const newQuotesThisWeek = state.quotes.filter(q => q.date && q.date >= mondayStr).length;

  document.getElementById('stat-total-quotes').textContent = totalCount + '건';
  document.getElementById('stat-total-quote-amount').textContent = new Intl.NumberFormat().format(totalAmount) + '원';
  const weekStatEl = document.getElementById('stat-new-quotes-week');
  if (weekStatEl) weekStatEl.textContent = newQuotesThisWeek + '건';

  // 페이징
  const { currentPage, pageSize } = state.pagination.quote;
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  if (currentPage > totalPages) state.pagination.quote.currentPage = totalPages;

  const startIdx = (state.pagination.quote.currentPage - 1) * pageSize;
  const pageData = filtered.slice(startIdx, startIdx + pageSize);

  if (pageData.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 2rem;">등록된 견적이 없습니다.</td></tr>`;
  } else {
    pageData.forEach(quote => {
      let quoteNo = '-';
      if (quote.pdfName) {
        const match = quote.pdfName.match(/PRJ-QT-\d{4}-\d+/i);
        if (match) {
          quoteNo = match[0].toUpperCase();
        } else {
          quoteNo = quote.pdfName.split('.').slice(0, -1).join('.');
        }
      }
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 500; color: var(--primary);">${quoteNo}</td>
        <td>${quote.date || ''}</td>
        <td>${quote.client || ''} ${quote.clientRep ? `(${quote.clientRep})` : ''}</td>
        <td>${quote.item || ''}</td>
        <td style="text-align: right;">${new Intl.NumberFormat().format(quote.amount || 0)}원</td>
        <td style="text-align: center;">${quote.assigneeName || ''}</td>
        <td style="text-align: center;">
          ${quote.pdfUrl ? `<button class="btn-secondary btn-sm" onclick="window.open('${quote.pdfUrl}', '_blank')">PDF 열기</button>` : '-'}
        </td>
        <td>
          <button class="btn-primary btn-sm" onclick="openQuoteModal('${quote.id}')">수정</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  renderPagination('quote-pagination', totalPages, state.pagination.quote.currentPage, (page) => {
    state.pagination.quote.currentPage = page;
    renderQuoteView();
  });
}

function openQuoteModal(quoteId = null) {
  const modal = document.getElementById('modal-quote');
  const form = document.getElementById('form-quote');
  const idInput = document.getElementById('quote-id');
  const dateInput = document.getElementById('quote-date');
  const assigneeSelect = document.getElementById('quote-assignee');
  const clientInput = document.getElementById('quote-client');
  const clientRepInput = document.getElementById('quote-client-rep');
  const amountInput = document.getElementById('quote-amount');
  const itemInput = document.getElementById('quote-item');
  const pdfUrlInput = document.getElementById('quote-pdf-url');
  const pdfNameInput = document.getElementById('quote-pdf-name');
  const deleteBtn = document.getElementById('btn-delete-quote');
  const uploadStatus = document.getElementById('quote-pdf-upload-status');

  form.reset();
  uploadStatus.textContent = '';

  // 멤버 셀렉트 구성
  assigneeSelect.innerHTML = '<option value="">담당자 선택</option>';
  state.members.forEach(m => {
    assigneeSelect.innerHTML += `<option value="${m.id}">${m.name}</option>`;
  });

  if (quoteId) {
    document.getElementById('quote-modal-title').textContent = '견적서 수정';
    const q = state.quotes.find(x => x.id === quoteId);
    if (q) {
      idInput.value = q.id;
      dateInput.value = q.date || '';
      assigneeSelect.value = q.assignee || '';
      clientInput.value = q.client || '';
      clientRepInput.value = q.clientRep || '';
      amountInput.value = q.amount || '';
      itemInput.value = q.item || '';
      pdfUrlInput.value = q.pdfUrl || '';
      pdfNameInput.value = q.pdfName || '';
    }
    deleteBtn.style.display = 'block';
  } else {
    document.getElementById('quote-modal-title').textContent = '견적서 등록';
    idInput.value = '';
    const today = new Date();
    dateInput.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const loggedInUser = sessionStorage.getItem('logged_in_user');
    if (loggedInUser) {
      const userPrefix = loggedInUser.split('@')[0];
      const nameMap = {
        'hdlee': '이헌덕',
        'ujkim': '김욱진',
        'wtkang': '강원태',
        'shmoon': '문승환',
        'yslim': '임윤승',
        'mgkim': '김민건',
        'whjung': '정원혁'
      };
      const targetName = nameMap[userPrefix];
      const matchedMember = state.members.find(m => m.name === targetName);
      if (matchedMember) {
        assigneeSelect.value = matchedMember.id;
      }
    }
    deleteBtn.style.display = 'none';
  }

  modal.classList.add('active');
}

function closeQuoteModal() {
  document.getElementById('modal-quote').classList.remove('active');
}

function saveQuote(e) {
  e.preventDefault();
  const id = document.getElementById('quote-id').value;
  const quoteData = {
    date: document.getElementById('quote-date').value,
    assignee: document.getElementById('quote-assignee').value,
    client: document.getElementById('quote-client').value,
    clientRep: document.getElementById('quote-client-rep').value,
    amount: Number(document.getElementById('quote-amount').value),
    item: document.getElementById('quote-item').value,
    pdfUrl: document.getElementById('quote-pdf-url').value,
    pdfName: document.getElementById('quote-pdf-name').value,
    updatedAt: new Date().toISOString()
  };

  const m = state.members.find(mem => mem.id === quoteData.assignee);
  if (m) {
    quoteData.assigneeName = m.name;
  } else {
    quoteData.assigneeName = quoteData.assignee;
  }

  if (id) {
    db.collection("quotes").doc(id).update(quoteData).then(() => {
      showToast('견적이 수정되었습니다.');
      closeQuoteModal();
    });
  } else {
    quoteData.createdAt = new Date().toISOString();
    db.collection("quotes").add(quoteData).then(() => {
      showToast('견적이 등록되었습니다.');
      closeQuoteModal();
    });
  }
}

function deleteQuote() {
  const id = document.getElementById('quote-id').value;
  if (!id) return;
  if (confirm('이 견적을 삭제하시겠습니까?')) {
    db.collection("quotes").doc(id).delete().then(() => {
      showToast('견적이 삭제되었습니다.');
      closeQuoteModal();
    });
  }
}

async function parseQuotePDF(file) {
  const uploadStatus = document.getElementById('quote-pdf-upload-status');
  uploadStatus.textContent = 'PDF 파싱 중... (텍스트 추출)';
  uploadStatus.style.color = 'var(--primary)';

  try {
    const fileReader = new FileReader();
    fileReader.onload = async function () {
      const typedarray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedarray).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + ' ';
      }

      // 텍스트 추출 완료 후 GPT API 호출
      await analyzeWithAI(fullText, file);
    };
    fileReader.readAsArrayBuffer(file);
  } catch (err) {
    console.error(err);
    uploadStatus.textContent = 'PDF 파싱 중 오류가 발생했습니다.';
    uploadStatus.style.color = 'var(--danger)';
    uploadQuotePDF(file);
  }
}

async function analyzeWithAI(text, file) {
  const uploadStatus = document.getElementById('quote-pdf-upload-status');
  let apiKey = await requireApiKey();
  if (!apiKey) {
    uploadStatus.textContent = 'API 키 입력이 취소되어 분석을 건너뛰었습니다.';
    uploadStatus.style.color = 'var(--danger)';
    return;
  }

  uploadStatus.textContent = 'AI가 견적서를 분석 중입니다...';

  const promptText = `너는 전문 회계/구매 시스템 AI야. 전달된 PDF 문서(견적서) 텍스트에서 다음 항목을 정밀하게 추출해서 엄격한 JSON 형식으로만 응답해 줘.
항목:
{
  "companyName": "견적서의 '수신' (거래처명, 주식회사 등은 제외하고 핵심 이름만)",
  "clientRep": "견적서의 '참조' (거래처 담당자명, 직급 포함)",
  "quoteDate": "견적일자: YYYY-MM-DD",
  "items": [{"name": "품목명", "qty": 수량(숫자), "unitPrice": 단가(숫자), "amount": 금액(숫자)}],
  "supplyPrice": 공급가액(숫자),
  "vat": 부가세(숫자),
  "totalAmount": 총금액(숫자),
  "assignee": "견적서의 '발신자' 이름(견적서를 발송/작성한 우리 회사 직원 이름만)"
}

추출할 견적서 텍스트:
${text}`;

  try {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a helpful data extraction assistant that always responds in valid JSON format." },
          { role: "user", content: promptText }
        ]
      })
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('openai_api_key');
        throw new Error("유효하지 않은 API 키이거나 권한이 없습니다.");
      }
      throw new Error(`OpenAI API Error: ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.choices[0].message.content;
    const parsed = JSON.parse(responseText);

    // 폼 채우기
    if (parsed.companyName) document.getElementById('quote-client').value = parsed.companyName;
    if (parsed.clientRep) document.getElementById('quote-client-rep').value = parsed.clientRep;
    if (parsed.quoteDate) document.getElementById('quote-date').value = parsed.quoteDate;
    if (parsed.totalAmount) document.getElementById('quote-amount').value = parsed.totalAmount;

    // 담당자 매핑
    if (parsed.assignee) {
      const member = state.members.find(m => m.name.includes(parsed.assignee) || parsed.assignee.includes(m.name));
      if (member) {
        document.getElementById('quote-assignee').value = member.id;
      } else {
        const select = document.getElementById('quote-assignee');
        const opt = document.createElement('option');
        opt.value = parsed.assignee;
        opt.textContent = parsed.assignee + ' (자동감지)';
        select.appendChild(opt);
        select.value = parsed.assignee;
      }
    }

    // 아이템 배열 처리 (단일 필드에 합치기)
    if (parsed.items && Array.isArray(parsed.items) && parsed.items.length > 0) {
      const firstItemName = parsed.items[0].name;
      const extraCount = parsed.items.length - 1;
      if (extraCount > 0) {
        document.getElementById('quote-item').value = `${firstItemName} 외 ${extraCount}건`;
      } else {
        document.getElementById('quote-item').value = firstItemName;
      }
    }

    uploadStatus.textContent = 'AI 분석 완료! 내용을 확인해주세요. 파일 업로드 중...';
    uploadStatus.style.color = 'var(--primary)';
    uploadQuotePDF(file);

  } catch (err) {
    console.error("Gemini Parse Error:", err);
    uploadStatus.textContent = `AI 분석 중 오류 발생: ${err.message}`;
    uploadStatus.style.color = 'var(--danger)';
    uploadQuotePDF(file);
  }
}

function uploadQuotePDF(file) {
  const uploadStatus = document.getElementById('quote-pdf-upload-status');
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`quotes/${Date.now()}_${file.name}`);

  fileRef.put(file).then((snapshot) => {
    snapshot.ref.getDownloadURL().then((url) => {
      document.getElementById('quote-pdf-url').value = url;
      document.getElementById('quote-pdf-name').value = file.name;
      uploadStatus.textContent = '파일 업로드 완료! (' + file.name + ')';
      uploadStatus.style.color = '#10b981';
    });
  }).catch(err => {
    console.error(err);
    uploadStatus.textContent = '업로드 실패';
    uploadStatus.style.color = 'var(--danger)';
  });
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

window.openUrgentProjectModal = function (reportId, eventId) {
  const report = state.reports.find(r => r.id === reportId);
  const event = state.events.find(e => e.id === eventId);
  if (!report && !event) return;

  const modal = document.getElementById('modal-urgent-project');
  const body = document.getElementById('urgent-project-modal-body');

  let progress = report ? (report.progress || 0) : 0;
  let projectName = report ? (report.project || event?.title) : event?.title;
  let assigneeName = report ? report.assigneeName : (event?.assigneeName || '담당자 미지정');
  let endDateStr = report ? report.endDate : event?.endDate;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(endDateStr);
  endDate.setHours(0, 0, 0, 0);
  const diffTime = endDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let remainingStr = diffDays > 0 ? `D-${diffDays}` : (diffDays === 0 ? 'D-Day' : `D+${Math.abs(diffDays)}`);

  body.innerHTML = `
    <div style="margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-color);">
      <div style="font-size: 1.05rem; margin-bottom: 0.4rem; display: flex; justify-content: space-between; align-items: flex-start;">
        <strong style="word-break: keep-all;">${escapeHTML(projectName)}</strong>
        <span style="font-size: 0.8rem; padding: 2px 6px; background: var(--bg-hover); border-radius: 4px; white-space: nowrap;">${escapeHTML(assigneeName)}</span>
      </div>
      <div style="font-size: 0.9rem; margin-bottom: 0.5rem;">남은 일정: <span style="font-weight:bold; color:var(--primary);">${remainingStr}</span> <span style="color:var(--text-muted);">(${window.formatShortDate(endDateStr)})</span></div>
      <div style="font-size: 0.9rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span>진행률:</span> <span>${progress}%</span>
        </div>
        <div style="width: 100%; background: var(--bg-hover); height: 8px; border-radius: 4px; overflow: hidden;">
          <div style="width: ${progress}%; background: var(--primary); height: 100%;"></div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('btn-detail-urgent-modal').onclick = () => {
    modal.classList.remove('active');
    if (reportId) openReportModal(reportId);
    else openEventModal(eventId);
  };

  modal.classList.add('active');
};

// --- 엑셀 내보내기 ---
function exportReportListToExcel() {
  if (typeof XLSX === 'undefined') {
    alert('엑셀 라이브러리를 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
    return;
  }

  // 필터링된 주간보고 목록 가져오기 (renderReportView와 동일한 조건)
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

  if (filteredReports.length === 0) {
    alert('내보낼 데이터가 없습니다.');
    return;
  }

  const aoa = [['엔지니어', '업체', '과제명', '납기', '비고']];
  const merges = [];
  let currentRow = 1;

  const grouped = {};
  filteredReports.forEach(report => {
    if (!grouped[report.assignee]) {
      grouped[report.assignee] = [];
    }
    grouped[report.assignee].push(report);
  });

  const processedAssignees = new Set();

  filteredReports.forEach(report => {
    const assigneeId = report.assignee;
    if (processedAssignees.has(assigneeId)) return;
    processedAssignees.add(assigneeId);

    const assigneeReports = grouped[assigneeId];
    const assigneeInfo = getAssigneeInfo(assigneeId);

    const count = assigneeReports.length;

    if (count > 1) {
      merges.push({ s: { r: currentRow, c: 0 }, e: { r: currentRow + count - 1, c: 0 } });
    }

    assigneeReports.forEach((r, idx) => {
      let dateStr = '';
      if (r.endDate) {
        const parts = r.endDate.split('-');
        if (parts.length === 3) {
          dateStr = `${parseInt(parts[1], 10)}/${parseInt(parts[2], 10)}`;
        }
      }

      let remarksStr = r.remarks ? r.remarks.trim() : '';
      if (r.progress !== undefined && r.progress !== null && !remarksStr.includes(`${r.progress}%`)) {
        if (remarksStr) remarksStr += '\n';
        remarksStr += `(${r.progress}%)`;
      }

      if (idx === 0) {
        aoa.push([assigneeInfo.name, r.client || '', r.project || '', dateStr, remarksStr]);
      } else {
        aoa.push(['', r.client || '', r.project || '', dateStr, remarksStr]);
      }
    });

    currentRow += count;
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(aoa);

  if (merges.length > 0) {
    ws['!merges'] = merges;
  }

  ws['!cols'] = [
    { wch: 15 },
    { wch: 20 },
    { wch: 40 },
    { wch: 10 },
    { wch: 50 }
  ];

  // 전체 셀에 대해 스타일 적용 (줄바꿈 허용, 가운데 정렬, 테두리)
  const range = XLSX.utils.decode_range(ws['!ref']);
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ c: C, r: R });

      if (!ws[cellRef]) {
        ws[cellRef] = { t: 's', v: '' };
      }

      ws[cellRef].s = {
        font: { name: '맑은 고딕', sz: 10 },
        alignment: { vertical: 'center', wrapText: true },
        border: {
          top: { style: 'thin', color: { rgb: "000000" } },
          bottom: { style: 'thin', color: { rgb: "000000" } },
          left: { style: 'thin', color: { rgb: "000000" } },
          right: { style: 'thin', color: { rgb: "000000" } }
        }
      };

      // 헤더 셀 스타일
      if (R === 0) {
        ws[cellRef].s.fill = { fgColor: { rgb: "DCE6F1" } };
        ws[cellRef].s.font.bold = true;
        ws[cellRef].s.alignment.horizontal = 'center';
      } else {
        // 데이터 셀 스타일 (비고란 제외하고 가운데 정렬)
        if (C !== 4 && C !== 2) {
          // 4번: 비고, 2번: 과제명 -> 좌측정렬
          ws[cellRef].s.alignment.horizontal = 'center';
        } else {
          ws[cellRef].s.alignment.horizontal = 'left';
        }
      }
    }
  }

  XLSX.utils.book_append_sheet(wb, ws, '주간보고');

  const today = new Date();
  const dateSuffix = `${today.getFullYear()}${(today.getMonth() + 1).toString().padStart(2, '0')}${today.getDate().toString().padStart(2, '0')}`;

  XLSX.writeFile(wb, `주간보고_${dateSuffix}.xlsx`);
}

// --- API Key Modal Helper ---
function requireApiKey() {
  return new Promise((resolve) => {
    const existingKey = localStorage.getItem('openai_api_key');
    if (existingKey) {
      return resolve(existingKey);
    }

    const modal = document.getElementById('modal-api-key');
    const input = document.getElementById('input-api-key');
    const btnSave = document.getElementById('btn-save-api-key');
    const btnCancel = document.getElementById('btn-cancel-api-key-modal');
    const btnClose = document.getElementById('btn-close-api-key-modal');

    // Clean up function
    const cleanup = () => {
      modal.style.display = 'none';
      btnSave.onclick = null;
      btnCancel.onclick = null;
      btnClose.onclick = null;
    };

    modal.style.display = 'flex';
    input.value = '';
    input.focus();

    btnSave.onclick = () => {
      const key = input.value.trim();
      if (key) {
        localStorage.setItem('openai_api_key', key);
        cleanup();
        resolve(key);
      } else {
        alert("API 키를 입력해주세요.");
      }
    };

    const cancelFn = () => {
      cleanup();
      resolve(null);
    };

    btnCancel.onclick = cancelFn;
    btnClose.onclick = cancelFn;
  });
}

// --- AI Text Parsing Helper ---
async function parseTextWithAI(text) {
  let apiKey = await requireApiKey();
  if (!apiKey) {
    throw new Error("NO_API_KEY");
  }

  const promptText = `너는 전문 회계/구매 시스템 AI야. 전달된 PDF 문서(견적서) 텍스트에서 다음 항목을 정밀하게 추출해서 엄격한 JSON 형식으로만 응답해 줘.
항목:
{
  "companyName": "견적서의 '수신' (거래처명, 주식회사 등은 제외하고 핵심 이름만)",
  "clientRep": "견적서의 '참조' (거래처 담당자명, 직급 포함)",
  "quoteDate": "견적일자: YYYY-MM-DD",
  "items": [{"name": "품목명", "qty": 수량(숫자), "unitPrice": 단가(숫자), "amount": 금액(숫자)}],
  "supplyPrice": 공급가액(숫자),
  "vat": 부가세(숫자),
  "totalAmount": 총금액(숫자),
  "assignee": "견적서의 '발신자' 이름(견적서를 발송/작성한 우리 회사 직원 이름만)"
}

추출할 견적서 텍스트:
${text}`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60초 타임아웃

  try {
    const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are a helpful data extraction assistant that always responds in valid JSON format." },
          { role: "user", content: promptText }
        ]
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('openai_api_key');
        throw new Error("유효하지 않은 API 키이거나 권한이 없습니다.");
      }
      throw new Error(`OpenAI API Error: ${response.status}`);
    }

    const data = await response.json();
    const responseText = data.choices[0].message.content;
    return JSON.parse(responseText);
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error("API 응답 시간이 초과되었습니다 (60초).");
    }
    throw error;
  }
}

// --- MSAL Configuration for OneDrive Sync ---
const msalConfig = {
  auth: {
    clientId: "498abab9-ff33-4958-9bd2-33f0f1dbde91",
    authority: "https://login.microsoftonline.com/common",
    redirectUri: "https://whjung-arch.github.io/DNDE_Team_Scheduler/"
  }
};

let msalInstance;
// Initialize MSAL only if loaded (in case script failed to load)
if (typeof msal !== 'undefined') {
  msalInstance = new msal.PublicClientApplication(msalConfig);

  // 리디렉션 응답 처리
  msalInstance.handleRedirectPromise().then((authResult) => {
    if (authResult !== null) {
      // 로그인 리디렉션 후 돌아왔을 때, 이전 작업이 동기화였다면 바로 실행
      if (sessionStorage.getItem('pending_onedrive_sync') === 'true') {
        sessionStorage.removeItem('pending_onedrive_sync');
        // UI가 렌더링될 때까지 약간 대기 후 실행
        setTimeout(() => {
          const quoteTabBtn = document.querySelector('.tab-btn[data-target="quote"]');
          if (quoteTabBtn) quoteTabBtn.click();
          syncOneDriveQuotes();
        }, 1000);
      }
    }
  }).catch(error => {
    console.error("MSAL Redirect Error:", error);
  });
}

const msalLoginRequest = {
  scopes: ["Files.Read", "User.Read"]
};

async function syncOneDriveQuotes() {
  if (!msalInstance) {
    showToast("MSAL 라이브러리가 로드되지 않았습니다.", "error");
    return;
  }

  // 먼저 API 키가 있는지 확인/입력 받기 (이 과정에서 비동기 지연이 생기면 팝업이 차단될 수 있으므로 분기 처리)
  let apiKey = await requireApiKey();
  if (!apiKey) {
    showToast("API 키가 입력되지 않아 동기화를 취소합니다.");
    return;
  }

  const uploadStatus = document.getElementById('onedrive-sync-status') || document.getElementById('quote-pdf-upload-status');
  uploadStatus.textContent = 'OneDrive 인증을 진행 중입니다...';
  uploadStatus.style.color = 'var(--primary)';

  let accessToken;
  try {
    // Check if already logged in silently
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalLoginRequest.account = accounts[0];
      const authResult = await msalInstance.acquireTokenSilent(msalLoginRequest);
      accessToken = authResult.accessToken;
    } else {
      // No account found, use redirect
      sessionStorage.setItem('pending_onedrive_sync', 'true');
      msalInstance.loginRedirect(msalLoginRequest);
      return; // redirect will navigate away
    }
  } catch (error) {
    if (error instanceof msal.InteractionRequiredAuthError) {
      sessionStorage.setItem('pending_onedrive_sync', 'true');
      msalInstance.loginRedirect(msalLoginRequest);
      return;
    } else {
      uploadStatus.textContent = `인증 오류: ${error.message}`;
      uploadStatus.style.color = 'var(--danger)';
      throw error;
    }
  }

  uploadStatus.textContent = 'OneDrive 파일 목록을 조회 중입니다...';

  try {
    // Get files from '메일견적서' folder
    const folderName = encodeURIComponent('메일견적서');
    const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root:/${folderName}:/children`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Graph API 에러: ${response.status}`);
    }

    const data = await response.json();
    let files = data.value.filter(file => file.file && file.name.toLowerCase().endsWith('.pdf'));

    // 기간 필터 적용: 상단의 '월별 필터'가 설정되어 있으면 해당 월에 생성/수정된 파일만 가져옴
    const monthFilter = document.getElementById('filter-quote-month')?.value;
    if (monthFilter) {
      files = files.filter(file => {
        const fileDate = file.createdDateTime || file.lastModifiedDateTime;
        if (!fileDate) return true;
        return fileDate.startsWith(monthFilter);
      });
    }

    if (files.length === 0) {
      uploadStatus.textContent = monthFilter ? `${monthFilter} 기간 내 동기화할 PDF 견적서가 없습니다.` : "새로 동기화할 PDF 견적서가 없습니다.";
      setTimeout(() => { uploadStatus.textContent = ''; }, 3000);
      return;
    }

    uploadStatus.textContent = `총 ${files.length}개의 PDF를 확인 중...`;

    let syncedCount = 0;

    for (const file of files) {
      try {
        // Check if oneDriveId exists
        const existing = state.quotes.find(q => q.oneDriveId === file.id);
        if (existing) continue;

        uploadStatus.textContent = `'${file.name}' 분석 중... (최대 10~20초 소요될 수 있습니다)`;

        // Download file content as ArrayBuffer
        const downloadUrl = file['@microsoft.graph.downloadUrl'];
        if (!downloadUrl) {
          throw new Error("다운로드 URL을 찾을 수 없습니다.");
        }
        const fileRes = await fetch(downloadUrl);
        if (!fileRes.ok) {
          console.error(`File download failed: ${fileRes.status}`);
          continue;
        }
        const arrayBuffer = await fileRes.arrayBuffer();

        // Extract text
        const typedarray = new Uint8Array(arrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + ' ';
        }

        // AI Parse
        let parsed;
        try {
          parsed = await parseTextWithAI(fullText);
        } catch (aiErr) {
          console.error("AI 파싱 실패:", aiErr);
          if (aiErr.message === "NO_API_KEY") {
            uploadStatus.textContent = 'API 키가 없어 분석을 취소합니다.';
            uploadStatus.style.color = 'var(--danger)';
            return; // 전체 루프 중단
          }
          uploadStatus.textContent = `'${file.name}' 분석 실패: ${aiErr.message}`;
          await new Promise(r => setTimeout(r, 2000));
          continue; // 에러나면 건너뛰기
        }

        if (!parsed) continue;

        // Firebase Storage 업로드 생략! (CORS 에러 방지 및 저장소 절약)
        // 원본 PDF는 이미 OneDrive에 안전하게 있으므로, 해당 OneDrive 링크를 그대로 사용합니다.
        const fbUrl = file.webUrl || "";

        // Assign default assignee to currently logged in user if not found by AI
        let assigneeId = '';
        let rawAssignee = parsed.assignee || '';
        if (rawAssignee) {
          const member = state.members.find(m => m.name.includes(rawAssignee) || rawAssignee.includes(m.name));
          if (member) assigneeId = member.id;
        }
        if (!assigneeId && !rawAssignee) {
          const loggedInUser = sessionStorage.getItem('logged_in_user');
          if (loggedInUser) {
            const userPrefix = loggedInUser.split('@')[0];
            const nameMap = { 'hdlee': '이헌덕', 'ujkim': '김욱진', 'wtkang': '강원태', 'shmoon': '문승환', 'yslim': '임윤승', 'mgkim': '김민건', 'whjung': '정원혁' };
            const targetName = nameMap[userPrefix];
            const matchedMember = state.members.find(m => m.name === targetName);
            if (matchedMember) assigneeId = matchedMember.id;
          }
        }

        const quoteData = {
          date: parsed.quoteDate || new Date().toISOString().split('T')[0],
          assignee: assigneeId || rawAssignee || '',
          assigneeName: assigneeId ? '' : rawAssignee,
          client: parsed.companyName || '미확인 거래처',
          clientRep: parsed.clientRep || '',
          amount: parsed.totalAmount || 0,
          item: '',
          pdfUrl: fbUrl,
          pdfName: file.name,
          period: parsed.contractPeriod || '',
          updatedAt: new Date().toISOString(),
          oneDriveId: file.id
        };

        // Calculate item field
        if (parsed.items && Array.isArray(parsed.items) && parsed.items.length > 0) {
          const firstItemName = parsed.items[0].name;
          const extraCount = parsed.items.length - 1;
          quoteData.item = extraCount > 0 ? `${firstItemName} 외 ${extraCount}건` : firstItemName;
        } else {
          quoteData.item = "품목 내역 없음";
        }

        await db.collection('quotes').add(quoteData);
        syncedCount++;
      } catch (fileErr) {
        console.error(`'${file.name}' 처리 중 오류:`, fileErr);
        uploadStatus.textContent = `'${file.name}' 처리 실패: ${fileErr.message}`;
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    if (syncedCount > 0) {
      uploadStatus.textContent = `${syncedCount}건의 견적서가 자동으로 등록되었습니다!`;
      showToast(`${syncedCount}건의 견적서가 등록되었습니다.`);
    } else {
      uploadStatus.textContent = "새로운 견적서가 없습니다.";
    }

    setTimeout(() => { uploadStatus.textContent = ''; }, 3000);

  } catch (error) {
    console.error("OneDrive Sync Error:", error);
    uploadStatus.textContent = `동기화 실패: ${error.message}`;
    uploadStatus.style.color = 'var(--danger)';
  }
}

// ================= CONTRACT FUNCTIONS (AUTO-GENERATED) =================

function openContractModal(contractId = null) {
  const modal = document.getElementById('modal-contract');
  const form = document.getElementById('form-contract');
  const idInput = document.getElementById('contract-id');
  const dateInput = document.getElementById('contract-date');
  const assigneeSelect = document.getElementById('contract-assignee');
  const clientInput = document.getElementById('contract-client');
  const clientRepInput = document.getElementById('contract-client-rep');
  const amountInput = document.getElementById('contract-amount');
  const itemInput = document.getElementById('contract-item');
  const pdfUrlInput = document.getElementById('contract-pdf-url');
  const pdfNameInput = document.getElementById('contract-pdf-name');
  const deleteBtn = document.getElementById('btn-delete-contract');
  const uploadStatus = document.getElementById('contract-pdf-upload-status');

  form.reset();
  uploadStatus.textContent = '';

  // 멤버 셀렉트 구성
  assigneeSelect.innerHTML = '<option value="">담당자 선택</option>';
  state.members.forEach(m => {
    assigneeSelect.innerHTML += `<option value="${m.id}">${m.name}</option>`;
  });

  if (contractId) {
    document.getElementById('contract-modal-title').textContent = '계약서 수정';
    const q = state.contracts.find(x => x.id === contractId);
    if (q) {
      idInput.value = q.id;
      dateInput.value = q.date || '';
      assigneeSelect.value = q.assignee || '';
      clientInput.value = q.client || '';
      clientRepInput.value = q.clientRep || '';
      amountInput.value = q.amount || '';
      itemInput.value = q.item || '';
      pdfUrlInput.value = q.pdfUrl || '';
      pdfNameInput.value = q.pdfName || '';
    }
    deleteBtn.style.display = 'block';
  } else {
    document.getElementById('contract-modal-title').textContent = '계약서 등록';
    idInput.value = '';
    const today = new Date();
    dateInput.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const loggedInUser = sessionStorage.getItem('logged_in_user');
    if (loggedInUser) {
      const userPrefix = loggedInUser.split('@')[0];
      const nameMap = {
        'hdlee': '이헌덕',
        'ujkim': '김욱진',
        'wtkang': '강원태',
        'shmoon': '문승환',
        'yslim': '임윤승',
        'mgkim': '김민건',
        'whjung': '정원혁'
      };
      const targetName = nameMap[userPrefix];
      const matchedMember = state.members.find(m => m.name === targetName);
      if (matchedMember) {
        assigneeSelect.value = matchedMember.id;
      }
    }
    deleteBtn.style.display = 'none';
  }

  modal.classList.add('active');
}

function closeContractModal() {
  document.getElementById('modal-contract').classList.remove('active');
}

function deleteContract() {
  const id = document.getElementById('contract-id').value;
  if (!id) return;
  if (confirm('이 계약을 삭제하시겠습니까?')) {
    db.collection("contracts").doc(id).delete().then(() => {
      showToast('계약이 삭제되었습니다.');
      closeContractModal();
    });
  }
}

async function syncOneDriveContracts() {
  if (!msalInstance) {
    showToast("MSAL 라이브러리가 로드되지 않았습니다.", "error");
    return;
  }

  // 먼저 API 키가 있는지 확인/입력 받기 (이 과정에서 비동기 지연이 생기면 팝업이 차단될 수 있으므로 분기 처리)
  let apiKey = await requireApiKey();
  if (!apiKey) {
    showToast("API 키가 입력되지 않아 동기화를 취소합니다.");
    return;
  }

  const uploadStatus = document.getElementById('onedrive-sync-status') || document.getElementById('contract-pdf-upload-status');
  uploadStatus.textContent = 'OneDrive 인증을 진행 중입니다...';
  uploadStatus.style.color = 'var(--primary)';

  let accessToken;
  try {
    // Check if already logged in silently
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalLoginRequest.account = accounts[0];
      const authResult = await msalInstance.acquireTokenSilent(msalLoginRequest);
      accessToken = authResult.accessToken;
    } else {
      // No account found, use redirect
      sessionStorage.setItem('pending_onedrive_sync', 'true');
      msalInstance.loginRedirect(msalLoginRequest);
      return; // redirect will navigate away
    }
  } catch (error) {
    if (error instanceof msal.InteractionRequiredAuthError) {
      sessionStorage.setItem('pending_onedrive_sync', 'true');
      msalInstance.loginRedirect(msalLoginRequest);
      return;
    } else {
      uploadStatus.textContent = `인증 오류: ${error.message}`;
      uploadStatus.style.color = 'var(--danger)';
      throw error;
    }
  }

  uploadStatus.textContent = 'OneDrive 파일 목록을 조회 중입니다...';

  try {
    // Get files from '메일계약서' folder
    const folderName = encodeURIComponent('메일계약서');
    const response = await fetch(`https://graph.microsoft.com/v1.0/me/drive/root:/${folderName}:/children`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error(`Graph API 에러: ${response.status}`);
    }

    const data = await response.json();
    let files = data.value.filter(file => file.file && file.name.toLowerCase().endsWith('.pdf'));

    // 기간 필터 적용: 상단의 '월별 필터'가 설정되어 있으면 해당 월에 생성/수정된 파일만 가져옴
    const monthFilter = document.getElementById('filter-contract-month')?.value;
    if (monthFilter) {
      files = files.filter(file => {
        const fileDate = file.createdDateTime || file.lastModifiedDateTime;
        if (!fileDate) return true;
        return fileDate.startsWith(monthFilter);
      });
    }

    if (files.length === 0) {
      uploadStatus.textContent = monthFilter ? `${monthFilter} 기간 내 동기화할 PDF 계약서가 없습니다.` : "새로 동기화할 PDF 계약서가 없습니다.";
      setTimeout(() => { uploadStatus.textContent = ''; }, 3000);
      return;
    }

    uploadStatus.textContent = `총 ${files.length}개의 PDF를 확인 중...`;

    let syncedCount = 0;

    for (const file of files) {
      try {
        // Check if oneDriveId exists
        const existing = state.contracts.find(q => q.oneDriveId === file.id);
        if (existing) continue;

        uploadStatus.textContent = `'${file.name}' 분석 중... (최대 10~20초 소요될 수 있습니다)`;

        // Download file content as ArrayBuffer
        const downloadUrl = file['@microsoft.graph.downloadUrl'];
        if (!downloadUrl) {
          throw new Error("다운로드 URL을 찾을 수 없습니다.");
        }
        const fileRes = await fetch(downloadUrl);
        if (!fileRes.ok) {
          console.error(`File download failed: ${fileRes.status}`);
          continue;
        }
        const arrayBuffer = await fileRes.arrayBuffer();

        // Extract text
        const typedarray = new Uint8Array(arrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(' ');
          fullText += pageText + ' ';
        }

        // AI Parse
        let parsed;
        try {
          parsed = await parseTextWithAI(fullText);
        } catch (aiErr) {
          console.error("AI 파싱 실패:", aiErr);
          if (aiErr.message === "NO_API_KEY") {
            uploadStatus.textContent = 'API 키가 없어 분석을 취소합니다.';
            uploadStatus.style.color = 'var(--danger)';
            return; // 전체 루프 중단
          }
          uploadStatus.textContent = `'${file.name}' 분석 실패: ${aiErr.message}`;
          await new Promise(r => setTimeout(r, 2000));
          continue; // 에러나면 건너뛰기
        }

        if (!parsed) continue;

        // Firebase Storage 업로드 생략! (CORS 에러 방지 및 저장소 절약)
        // 원본 PDF는 이미 OneDrive에 안전하게 있으므로, 해당 OneDrive 링크를 그대로 사용합니다.
        const fbUrl = file.webUrl || "";

        // Assign default assignee to currently logged in user if not found by AI
        let assigneeId = '';
        let rawAssignee = parsed.assignee || '';
        if (rawAssignee) {
          const member = state.members.find(m => m.name.includes(rawAssignee) || rawAssignee.includes(m.name));
          if (member) assigneeId = member.id;
        }
        if (!assigneeId && !rawAssignee) {
          const loggedInUser = sessionStorage.getItem('logged_in_user');
          if (loggedInUser) {
            const userPrefix = loggedInUser.split('@')[0];
            const nameMap = { 'hdlee': '이헌덕', 'ujkim': '김욱진', 'wtkang': '강원태', 'shmoon': '문승환', 'yslim': '임윤승', 'mgkim': '김민건', 'whjung': '정원혁' };
            const targetName = nameMap[userPrefix];
            const matchedMember = state.members.find(m => m.name === targetName);
            if (matchedMember) assigneeId = matchedMember.id;
          }
        }

        const contractData = {
          date: parsed.contractDate || new Date().toISOString().split('T')[0],
          assignee: assigneeId || rawAssignee || '',
          assigneeName: assigneeId ? '' : rawAssignee,
          client: parsed.companyName || '미확인 거래처',
          clientRep: parsed.clientRep || '',
          amount: parsed.totalAmount || 0,
          item: '',
          pdfUrl: fbUrl,
          pdfName: file.name,
          period: parsed.contractPeriod || '',
          updatedAt: new Date().toISOString(),
          oneDriveId: file.id
        };

        // Calculate item field
        if (parsed.items && Array.isArray(parsed.items) && parsed.items.length > 0) {
          const firstItemName = parsed.items[0].name;
          const extraCount = parsed.items.length - 1;
          contractData.item = extraCount > 0 ? `${firstItemName} 외 ${extraCount}건` : firstItemName;
        } else {
          contractData.item = "품목 내역 없음";
        }

        await db.collection('contracts').add(contractData);
        syncedCount++;
      } catch (fileErr) {
        console.error(`'${file.name}' 처리 중 오류:`, fileErr);
        uploadStatus.textContent = `'${file.name}' 처리 실패: ${fileErr.message}`;
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    if (syncedCount > 0) {
      uploadStatus.textContent = `${syncedCount}건의 계약서가 자동으로 등록되었습니다!`;
      showToast(`${syncedCount}건의 계약서가 등록되었습니다.`);
    } else {
      uploadStatus.textContent = "새로운 계약서가 없습니다.";
    }

    setTimeout(() => { uploadStatus.textContent = ''; }, 3000);

  } catch (error) {
    console.error("OneDrive Sync Error:", error);
    uploadStatus.textContent = `동기화 실패: ${error.message}`;
    uploadStatus.style.color = 'var(--danger)';
  }
}

function saveContract(e) {
  e.preventDefault();
  const id = document.getElementById('contract-id').value;
  const contractData = {
    date: document.getElementById('contract-date').value,
    assignee: document.getElementById('contract-assignee').value,
    client: document.getElementById('contract-client').value,
    clientRep: document.getElementById('contract-client-rep').value,
    amount: Number(document.getElementById('contract-amount').value),
    item: document.getElementById('contract-item').value,
    pdfUrl: document.getElementById('contract-pdf-url').value,
    pdfName: document.getElementById('contract-pdf-name').value,
    period: document.getElementById('contract-period')?.value || '',
    updatedAt: new Date().toISOString()
  };

  const m = state.members.find(mem => mem.id === contractData.assignee);
  if (m) {
    contractData.assigneeName = m.name;
  } else {
    contractData.assigneeName = contractData.assignee;
  }

  if (id) {
    db.collection("contracts").doc(id).update(contractData).then(() => {
      showToast('계약이 수정되었습니다.');
      closeContractModal();
    });
  } else {
    contractData.createdAt = new Date().toISOString();
    db.collection("contracts").add(contractData).then(() => {
      showToast('계약이 등록되었습니다.');
      closeContractModal();
    });
  }
}

function uploadContractPDF(file) {
  const uploadStatus = document.getElementById('contract-pdf-upload-status');
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`contracts/${Date.now()}_${file.name}`);

  fileRef.put(file).then((snapshot) => {
    snapshot.ref.getDownloadURL().then((url) => {
      document.getElementById('contract-pdf-url').value = url;
      document.getElementById('contract-pdf-name').value = file.name;
      uploadStatus.textContent = '파일 업로드 완료! (' + file.name + ')';
      uploadStatus.style.color = '#10b981';
    });
  }).catch(err => {
    console.error(err);
    uploadStatus.textContent = '업로드 실패';
    uploadStatus.style.color = 'var(--danger)';
  });
}

async function parseContractPDF(file) {
  const uploadStatus = document.getElementById('contract-pdf-upload-status');
  uploadStatus.textContent = 'PDF 파싱 중... (텍스트 추출)';
  uploadStatus.style.color = 'var(--primary)';

  try {
    const fileReader = new FileReader();
    fileReader.onload = async function () {
      const typedarray = new Uint8Array(this.result);
      const pdf = await pdfjsLib.getDocument(typedarray).promise;
      let fullText = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map(item => item.str).join(' ');
        fullText += pageText + ' ';
      }

      // 텍스트 추출 완료 후 GPT API 호출
      await analyzeWithAI(fullText, file);
    };
    fileReader.readAsArrayBuffer(file);
  } catch (err) {
    console.error(err);
    uploadStatus.textContent = 'PDF 파싱 중 오류가 발생했습니다.';
    uploadStatus.style.color = 'var(--danger)';
    uploadContractPDF(file);
  }
}

function renderContractView() {
  const tableBody = document.getElementById('contract-table-body');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  // Set filter inputs to initial state if not set
  const contractStartInput = document.getElementById('filter-contract-start-date');
  const contractEndInput = document.getElementById('filter-contract-end-date');
  if (contractStartInput && !contractStartInput.value) contractStartInput.value = state.filters.contractStart;
  if (contractEndInput && !contractEndInput.value) contractEndInput.value = state.filters.contractEnd;

  let filtered = [...state.contracts];

  if (state.filters.contractSearch) {
    const s = state.filters.contractSearch.toLowerCase();
    filtered = filtered.filter(q =>
      (q.client && q.client.toLowerCase().includes(s)) ||
      (q.item && q.item.toLowerCase().includes(s))
    );
  }

  if (state.filters.contractStart) {
    filtered = filtered.filter(q => q.date && q.date >= state.filters.contractStart);
  }
  if (state.filters.contractEnd) {
    filtered = filtered.filter(q => q.date && q.date <= state.filters.contractEnd);
  }

  // 통계 계산
  const totalCount = filtered.length;
  const totalAmount = filtered.reduce((acc, q) => acc + (Number(q.amount) || 0), 0);

  // 이번 주 월요일 계산
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(today.setDate(diff));
  const mondayStr = `${monday.getFullYear()}-${String(monday.getMonth() + 1).padStart(2, '0')}-${String(monday.getDate()).padStart(2, '0')}`;

  const newContractsThisWeek = state.contracts.filter(q => q.date && q.date >= mondayStr).length;

  document.getElementById('stat-total-contracts').textContent = totalCount + '건';
  document.getElementById('stat-total-contract-amount').textContent = new Intl.NumberFormat().format(totalAmount) + '원';
  const weekStatEl = document.getElementById('stat-new-contracts-week');
  if (weekStatEl) weekStatEl.textContent = newContractsThisWeek + '건';

  // 페이징
  const { currentPage, pageSize } = state.pagination.contract;
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  if (currentPage > totalPages) state.pagination.contract.currentPage = totalPages;

  const startIdx = (state.pagination.contract.currentPage - 1) * pageSize;
  const pageData = filtered.slice(startIdx, startIdx + pageSize);

  if (pageData.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="9" style="text-align: center; padding: 2rem;">등록된 계약이 없습니다.</td></tr>`;
  } else {
    pageData.forEach(contract => {
      let contractNo = '-';
      if (contract.pdfName) {
        const match = contract.pdfName.match(/PRJ-QT-\d{4}-\d+/i);
        if (match) {
          contractNo = match[0].toUpperCase();
        } else {
          contractNo = contract.pdfName.split('.').slice(0, -1).join('.');
        }
      }
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 500; color: var(--primary);">${contractNo}</td>
        <td>${contract.date || ''}</td>
        <td>${contract.client || ''} ${contract.clientRep ? `(${contract.clientRep})` : ''}</td>
        <td>${contract.item || ''}</td>
        <td style="text-align: right;">${new Intl.NumberFormat().format(contract.amount || 0)}원</td>
        <td style="text-align: center;">${contract.period || ''}</td>
        <td style="text-align: center;">${contract.assigneeName || ''}</td>
        <td style="text-align: center;">
          ${contract.pdfUrl ? `<button class="btn-secondary btn-sm" onclick="window.open('${contract.pdfUrl}', '_blank')">PDF 열기</button>` : '-'}
        </td>
        <td>
          <button class="btn-primary btn-sm" onclick="openContractModal('${contract.id}')">수정</button>
        </td>
      `;
      tableBody.appendChild(tr);
    });
  }

  renderPagination('contract-pagination', totalPages, state.pagination.contract.currentPage, (page) => {
    state.pagination.contract.currentPage = page;
    renderContractView();
  });
}