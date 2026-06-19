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

// --- 기본 데이터 (LocalStorage가 비어있을 때 사용) ---
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

  // 상대 생성일자 생성을 위한 헬퍼
  const getOffsetDateString = (offsetDays) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return getNormalizedDateString(d);
  };

  return [
    {
      id: 'r1',
      assignee: 'm1',
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
      createdAt: getOffsetDateString(-3) // 3일 전 (1주일 이내이므로 붉은색 표기)
    },
    {
      id: 'r2',
      assignee: 'm2',
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
      createdAt: getOffsetDateString(-10) // 10일 전 (1주일 넘었으므로 일반색)
    },
    {
      id: 'r3',
      assignee: 'm3',
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
      createdAt: getOffsetDateString(-2) // 2일 전 (1주일 이내이므로 붉은색 표기)
    },
    {
      id: 'r4',
      assignee: 'm4',
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
      createdAt: getOffsetDateString(-15) // 15일 전 (일반색)
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
    memberIds: [], // 필터링에 선택된 팀원 ID 목록 (체크박스)
    startDate: '', // 조회 시작일
    endDate: '', // 조회 종료일
    client: 'all', // 조회 업체
    invoiceYear: 'all', // 세금계산서 조회 연도
    completedYear: 'all', // 프로젝트 완료 현황 조회 연도
    reportAssignee: 'all' // 작성자 필터
  },
  currentView: 'timeline', // 기본 뷰는 'timeline' ('timeline', 'report', 'invoice', 또는 'completed')
  currentDate: new Date(), // 조회 중인 연도와 월 기준일
  timelineScale: 'month', // 타임라인 조회 스케일 ('today', 'month', 'year')
  theme: 'light',
  pagination: {
    report: { currentPage: 1, pageSize: 10 },
    invoice: { currentPage: 1, pageSize: 10 },
    completed: { currentPage: 1, pageSize: 10 }
  }
};

// --- 초기화 및 DOM 로드 완료 핸들러 ---
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  initTheme();
  setupEventListeners();
  renderApp();
});

// --- 데이터 로드 및 저장 ---
function loadData() {
  const storedMembers = localStorage.getItem('ts_members');
  const storedEvents = localStorage.getItem('ts_events');
  const storedReports = localStorage.getItem('ts_reports');
  const storedTheme = localStorage.getItem('ts_theme') || 'light';

  if (storedMembers && storedEvents) {
    state.members = JSON.parse(storedMembers);
    state.events = JSON.parse(storedEvents);
    state.reports = storedReports ? JSON.parse(storedReports) : getDemoReports();
  } else {
    // 최초 실행 시 데모 데이터 주입
    state.members = [...DEFAULT_MEMBERS];
    state.events = getDemoEvents();
    state.reports = getDemoReports();
    // 데모 보고서들을 일정에 연동
    state.reports.forEach(report => {
      syncReportToEvent(report);
    });
    saveData();
  }

  // 마이그레이션: 각 보고서에 5차 분할 발행 배열(invoices) 추가
  state.reports.forEach(report => {
    if (!report.invoices || !Array.isArray(report.invoices) || report.invoices.length < 5) {
      const invoices = [];
      // 1차 발행
      invoices.push({
        status: report.invoiceStatus || 'unissued',
        amount: report.invoiceStatus === 'issued' ? (Number(report.amount) || 0) : 0,
        date: report.invoiceDate || ''
      });
      // 2~5차 발행 초기화
      for (let i = 1; i < 5; i++) {
        invoices.push({ status: 'unissued', amount: 0, date: '' });
      }
      report.invoices = invoices;
    }
  });

  // 모든 멤버 필터를 기본적으로 체크된 상태로 만듬
  state.filters.memberIds = state.members.map(m => m.id);
  state.theme = storedTheme;
}

function saveData() {
  localStorage.setItem('ts_members', JSON.stringify(state.members));
  localStorage.setItem('ts_events', JSON.stringify(state.events));
  localStorage.setItem('ts_reports', JSON.stringify(state.reports));
}

// --- 테마 설정 ---
function initTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  renderThemeIndicator();
}

function renderThemeIndicator() {
  const indicator = document.getElementById('theme-indicator');
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
  // 테마 토글 버튼
  document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);

  // 보기 전환 토글 (타임라인/업무보고/세금계산서/완료현황)
  document.getElementById('view-btn-timeline').addEventListener('click', () => switchView('timeline'));
  document.getElementById('view-btn-report').addEventListener('click', () => switchView('report'));
  document.getElementById('view-btn-invoice').addEventListener('click', () => switchView('invoice'));
  document.getElementById('view-btn-completed').addEventListener('click', () => switchView('completed'));

  // 시작일 필터 변경
  document.getElementById('filter-start-date').addEventListener('change', (e) => {
    state.filters.startDate = e.target.value;
    resetPaginationPages();
    renderApp();
  });

  // 종료일 필터 변경
  document.getElementById('filter-end-date').addEventListener('change', (e) => {
    state.filters.endDate = e.target.value;
    resetPaginationPages();
    renderApp();
  });

  // 기간 필터 초기화
  document.getElementById('btn-clear-date-filter').addEventListener('click', () => {
    state.filters.startDate = '';
    state.filters.endDate = '';
    document.getElementById('filter-start-date').value = '';
    document.getElementById('filter-end-date').value = '';
    resetPaginationPages();
    renderApp();
  });

  // 업체 필터 변경
  document.getElementById('filter-client').addEventListener('change', (e) => {
    state.filters.client = e.target.value;
    resetPaginationPages();
    renderApp();
  });

  // 세금계산서 연도 필터 변경
  document.getElementById('filter-invoice-year').addEventListener('change', (e) => {
    state.filters.invoiceYear = e.target.value;
    resetPaginationPages();
    renderApp();
  });

  // 세금계산서 발행현황 추가 등록 버튼
  const btnAddInvoiceProj = document.getElementById('btn-add-invoice-project');
  if (btnAddInvoiceProj) {
    btnAddInvoiceProj.addEventListener('click', () => {
      openReportModal();
    });
  }

  // 프로젝트 완료 현황 연도 필터 변경
  document.getElementById('filter-completed-year').addEventListener('change', (e) => {
    state.filters.completedYear = e.target.value;
    resetPaginationPages();
    renderApp();
  });

  // 작성자 필터 변경
  const selectReportAssignee = document.getElementById('filter-report-assignee');
  if (selectReportAssignee) {
    selectReportAssignee.addEventListener('change', (e) => {
      state.filters.reportAssignee = e.target.value;
      state.pagination.report.currentPage = 1;
      renderApp();
    });
  }

  // 달력 이전/오늘/다음 이동
  document.getElementById('btn-cal-prev').addEventListener('click', () => navigateCalendar(-1));
  document.getElementById('btn-cal-next').addEventListener('click', () => navigateCalendar(1));
  document.getElementById('btn-cal-today').addEventListener('click', () => {
    state.currentDate = new Date();
    renderApp();
  });

  // 타임라인 스케일 변경 버튼 클릭 리스너
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

  // 우선순위 필터 클릭
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

  // 일정 등록 버튼 및 모달 트리거
  document.getElementById('btn-add-event').addEventListener('click', () => openEventModal());
  document.getElementById('btn-close-event-modal').addEventListener('click', closeEventModal);
  document.getElementById('btn-cancel-event-modal').addEventListener('click', closeEventModal);
  document.getElementById('form-event').addEventListener('submit', handleEventSubmit);
  document.getElementById('btn-delete-event').addEventListener('click', handleDeleteEvent);

  // 팀원 추가 버튼 및 모달 트리거
  document.getElementById('btn-add-member').addEventListener('click', () => openMemberModal());
  document.getElementById('btn-close-member-modal').addEventListener('click', closeMemberModal);
  document.getElementById('btn-cancel-member-modal').addEventListener('click', closeMemberModal);
  document.getElementById('form-member').addEventListener('submit', handleMemberSubmit);
  document.getElementById('btn-delete-member').addEventListener('click', handleDeleteMember);

  // 업무보고 등록 버튼 및 모달 트리거
  document.getElementById('btn-add-report').addEventListener('click', () => openReportModal());
  document.getElementById('btn-close-report-modal').addEventListener('click', closeReportModal);
  document.getElementById('btn-cancel-report-modal').addEventListener('click', closeReportModal);
  document.getElementById('form-report').addEventListener('submit', handleReportSubmit);
  document.getElementById('btn-delete-report').addEventListener('click', handleDeleteReport);
  document.getElementById('btn-complete-report').addEventListener('click', handleProjectComplete);

  // 모바일 사이드바 토글
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebar-toggle-btn');
  const overlay = document.getElementById('sidebar-overlay');

  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.add('active');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });

  // 데이터 내보내기/가져오기/초기화
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
    // 1. 카테고리 필터
    if (state.filters.category !== 'all' && event.category !== state.filters.category) {
      return false;
    }
    // 2. 우선순위 필터
    if (state.filters.priority !== 'all' && event.priority !== state.filters.priority) {
      return false;
    }
    // 3. 팀원 개별 필터 (사이드바 체크박스)
    if (!state.filters.memberIds.includes(event.assignee)) {
      return false;
    }
    // 4. 기간 필터 (조회 기간에 걸쳐있는가)
    if (state.filters.startDate && event.endDate < state.filters.startDate) {
      return false;
    }
    if (state.filters.endDate && event.startDate > state.filters.endDate) {
      return false;
    }
    // 5. 업체 필터
    if (state.filters.client !== 'all') {
      if (event.category === 'project') {
        if (event.client !== state.filters.client) {
          return false;
        }
      } else {
        // 프로젝트가 아닌 일정은 업체필터 적용 시 숨김
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

  // 캘린더 네비게이션 날짜 영역 표시
  const displayRange = document.getElementById('cal-nav-display-range');
  if (displayRange) {
    if (scale === 'today') {
      displayRange.textContent = `${year}년 ${month}월 ${date}일`;
    } else if (scale === 'year') {
      displayRange.textContent = `${year}년`;
    } else {
      displayRange.textContent = `${year}년 ${month}월`;
    }
  }

  // 오늘 날짜 문자열
  const today = new Date();
  const daysKR = ['일', '월', '화', '수', '목', '금', '토'];
  const headerToday = document.getElementById('header-today-string');
  if (headerToday) {
    headerToday.textContent =
      `오늘: ${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 (${daysKR[today.getDay()]})`;
  }
}

// --- 통계 요약 바 갱신 ---
function renderStatsBar() {
  const filteredEvents = getFilteredEvents();
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();

  // 1. 이번 달 총 일정 수
  const thisMonthEvents = filteredEvents.filter(event => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    return (start.getFullYear() === year && start.getMonth() === month) ||
      (end.getFullYear() === year && end.getMonth() === month) ||
      (start <= new Date(year, month, 1) && end >= new Date(year, month + 1, 0));
  });
  document.getElementById('stat-total-events').textContent = thisMonthEvents.length;

  // 2. 등록된 팀원 수
  document.getElementById('stat-total-members').textContent = state.members.length;

  // 3. 진행 예정 회의 수 (회의 카테고리 & 오늘 이후의 회의)
  const todayStr = getNormalizedDateString(new Date());
  const upcomingMeetings = filteredEvents.filter(event => {
    return event.category === 'meeting' && event.endDate >= todayStr;
  });
  document.getElementById('stat-upcoming-meetings').textContent = upcomingMeetings.length;

  // 4. 긴급 중요 일정 수 (우선순위 높음)
  const highPriorityEvents = filteredEvents.filter(event => event.priority === 'high');
  document.getElementById('stat-high-priority').textContent = highPriorityEvents.length;
}

// --- 사이드바 팀원 리스트 렌더링 ---
function renderSidebarMembers() {
  const container = document.getElementById('member-list-container');
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
  if (index > -1) {
    state.filters.memberIds.splice(index, 1);
  } else {
    state.filters.memberIds.push(memberId);
  }
  resetPaginationPages();
  renderApp();
}

// --- 월간 달력(Calendar) 뷰 렌더링 ---
function renderMonthlyCalendar() {
  const grid = document.getElementById('calendar-grid');
  grid.innerHTML = '';

  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay(); // 월의 첫째날 요일 (0:일 ~ 6:토)
  const lastDayDate = new Date(year, month + 1, 0).getDate(); // 월의 마지막날 날짜
  const prevLastDayDate = new Date(year, month, 0).getDate(); // 이전달의 마지막날 날짜

  const filteredEvents = getFilteredEvents();

  // 총 그려야 하는 셀의 갯수를 계산 (5줄 혹은 6줄)
  const totalCells = firstDayIndex + lastDayDate > 35 ? 42 : 35;

  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'cal-day';

    let currentDayNum;
    let currentCellDateString;
    let isOtherMonth = false;

    if (i < firstDayIndex) {
      // 이전 달 영역
      currentDayNum = prevLastDayDate - firstDayIndex + i + 1;
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      currentCellDateString = `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(currentDayNum).padStart(2, '0')}`;
      cell.classList.add('other-month');
    } else if (i >= firstDayIndex + lastDayDate) {
      // 다음 달 영역
      currentDayNum = i - firstDayIndex - lastDayDate + 1;
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      currentCellDateString = `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(currentDayNum).padStart(2, '0')}`;
      cell.classList.add('other-month');
    } else {
      // 이번 달 영역
      currentDayNum = i - firstDayIndex + 1;
      currentCellDateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(currentDayNum).padStart(2, '0')}`;

      const today = new Date();
      if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === currentDayNum) {
        cell.classList.add('today');
      }
    }

    // 날짜 번호 표시
    const numEl = document.createElement('div');
    numEl.className = 'cal-day-num';
    numEl.textContent = currentDayNum;
    cell.appendChild(numEl);

    // 해당 날짜에 해당되는 일정 필터링
    const dayEvents = filteredEvents.filter(event => {
      return event.startDate <= currentCellDateString && event.endDate >= currentCellDateString;
    });

    // 시작시간 기준으로 정렬
    dayEvents.sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'));

    // 일정 요소 그리기
    dayEvents.forEach(event => {
      const assignee = state.members.find(m => m.id === event.assignee);
      const color = assignee ? assignee.color : '#94a3b8';

      const eventEl = document.createElement('div');
      eventEl.className = `event-bar priority-${event.priority}`;
      eventEl.style.backgroundColor = hexToRgba(color, 0.85);
      eventEl.style.color = '#ffffff';

      // 카테고리별 이모지 설정
      let categoryEmoji = '📅';
      if (event.category === 'meeting') categoryEmoji = '💬';
      else if (event.category === 'task') categoryEmoji = '💻';
      else if (event.category === 'vacation') categoryEmoji = '🌴';
      else if (event.category === 'milestone') categoryEmoji = '🏆';

      eventEl.innerHTML = `<span>${categoryEmoji}</span> ${escapeHTML(event.title)}`;
      eventEl.title = `${event.title} (${assignee ? assignee.name : '미배정'})\n${event.startDate} ${event.startTime || ''} ~ ${event.endDate} ${event.endTime || ''}\n${event.description || ''}`;

      eventEl.addEventListener('click', (e) => {
        e.stopPropagation();
        openEventModal(event.id);
      });

      cell.appendChild(eventEl);
    });

    // 빈 날짜 칸 클릭 시 일정 빠른 추가 모달 팝업
    cell.addEventListener('click', () => {
      openEventModal(null, currentCellDateString);
    });

    grid.appendChild(cell);
  }
}

// --- 팀원별 타임라인(Gantt) 뷰 렌더링 ---
function renderTimelineView() {
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const scale = state.timelineScale || 'month';
  let colCount = 10;

  // 스케일 버튼 활성화 클래스 상태 동기화
  const scaleBtns = document.querySelectorAll('#timeline-scale-container .scale-btn');
  scaleBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.scale === scale);
  });

  // 1. 헤더 일자 영역 렌더링
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

  // 2. 각 팀원별 행(Row) 생성
  const rowsContainer = document.getElementById('timeline-rows-container');
  rowsContainer.innerHTML = '';

  // 타임라인은 'project' 일정만 표시
  const filteredEvents = getFilteredEvents().filter(event => event.category === 'project');

  state.members.forEach(member => {
    // 해당 팀원에 배정된 일정 추출 및 스케일 바운더리에 맞게 클램핑
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

          memberEvents.push({
            ...event,
            clampedStartCol: startCol,
            clampedEndCol: endCol
          });
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

        memberEvents.push({
          ...event,
          clampedStartCol: startM,
          clampedEndCol: endM
        });
      });
    } else {
      // month
      const monthStartStr = `${year}-${String(month + 1).padStart(2, '0')}-01`;
      const monthEndStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;
      filteredEvents.forEach(event => {
        if (event.assignee !== member.id) return;
        if (event.endDate < monthStartStr || event.startDate > monthEndStr) return;

        const startD = event.startDate < monthStartStr ? 1 : parseInt(event.startDate.split('-')[2], 10);
        const endD = event.endDate > monthEndStr ? daysInMonth : parseInt(event.endDate.split('-')[2], 10);

        memberEvents.push({
          ...event,
          clampedStartCol: startD,
          clampedEndCol: endD
        });
      });
    }

    // 겹치지 않게 행(Grid Row) 할당하기
    const maxRows = assignRowsToEvents(memberEvents);
    const gridRowsCount = Math.max(1, maxRows);

    const row = document.createElement('div');
    row.className = 'timeline-row';

    // 좌측 프로필 영역
    const profile = document.createElement('div');
    profile.className = 'timeline-row-member';

    const activeProjects = state.reports
      .filter(r => r.assignee === member.id && !r.finalCompleted)
      .map(r => r.project);
    const uniqueProjects = [...new Set(activeProjects)];
    const projectsStr = uniqueProjects.length > 0
      ? `참여 프로젝트: ${uniqueProjects.join(', ')}`
      : '참여 프로젝트 없음';

    profile.innerHTML = `
      <span class="name" style="color: ${member.color};">${escapeHTML(member.name)}</span>
      <span class="role">${escapeHTML(member.role || '역할 미정')}</span>
      <span class="member-projects" style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHTML(projectsStr)}">${escapeHTML(projectsStr)}</span>
    `;
    profile.addEventListener('click', () => openMemberModal(member.id));
    row.appendChild(profile);

    // 우측 그리드 영역
    const grid = document.createElement('div');
    grid.className = 'timeline-row-grid';
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = `repeat(${colCount}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${gridRowsCount}, 34px)`; // 각 줄의 높이
    grid.style.paddingTop = '6px';
    grid.style.paddingBottom = '6px';

    // 백그라운드 날짜 셀 격자 그리기
    for (let c = 1; c <= colCount; c++) {
      let isTodayCell = false;
      if (scale === 'today') {
        const currentHour = new Date().getHours();
        if (checkIfToday(year, month, state.currentDate.getDate()) && currentHour === (c + 8)) {
          isTodayCell = true;
        }
      } else if (scale === 'month') {
        isTodayCell = checkIfToday(year, month, c);
      } else if (scale === 'year') {
        const today = new Date();
        isTodayCell = (today.getFullYear() === year && today.getMonth() + 1 === c);
      }

      const cell = document.createElement('div');
      cell.className = `timeline-grid-cell${isTodayCell ? ' today' : ''}`;
      cell.style.gridColumn = c;
      cell.style.gridRow = `1 / span ${gridRowsCount}`; // 전 높이 영역 스팬
      grid.appendChild(cell);
    }

    // 일정 간트 바 배치하기
    memberEvents.forEach(event => {
      const bar = document.createElement('div');
      bar.className = `timeline-event-bar priority-${event.priority}`;
      bar.style.backgroundColor = hexToRgba(member.color, 0.9);

      // 그리드 시작 컬럼과 끝 컬럼 설정
      bar.style.gridColumn = `${event.clampedStartCol} / ${event.clampedEndCol + 1}`;
      bar.style.gridRow = event.timelineRow;

      let categoryEmoji = '💼';

      bar.innerHTML = `<span style="margin-right: 4px;">${categoryEmoji}</span> ${escapeHTML(event.title)}`;
      bar.title = `${event.title}\n기간: ${event.startDate} ~ ${event.endDate}\n${event.description || ''}`;

      bar.addEventListener('click', () => {
        if (event.id.startsWith('e_r_')) {
          const reportId = event.id.replace('e_r_', '');
          openReportModal(reportId);
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
    rowsContainer.innerHTML = `
      <div style="padding: 3rem; text-align: center; color: var(--text-muted);">
        등록된 팀원이 없습니다. 좌측 사이드바의 [+] 버튼으로 팀원을 먼저 추가해보세요!
      </div>
    `;
  }
}

// --- 일정 간트 바 겹침 해소 (Greedy Interval Coloring) ---
function assignRowsToEvents(memberEvents) {
  // 시작일 기준으로 내림차순 정렬
  memberEvents.sort((a, b) => b.startDate.localeCompare(a.startDate));

  const endTimes = []; // 각 행(Row)의 끝나는 시간 저장

  memberEvents.forEach(event => {
    let assignedRowIndex = -1;
    for (let r = 0; r < endTimes.length; r++) {
      // 직전 행의 스케줄 종료일보다 현재 시작일이 이후인 경우 배치 가능
      if (event.clampedStartCol > endTimes[r]) {
        assignedRowIndex = r;
        break;
      }
    }

    if (assignedRowIndex === -1) {
      endTimes.push(event.clampedEndCol);
      event.timelineRow = endTimes.length; // 1-indexed
    } else {
      endTimes[assignedRowIndex] = event.clampedEndCol;
      event.timelineRow = assignedRowIndex + 1;
    }
  });

  return endTimes.length;
}

// --- 월간/타임라인 내비게이션 월 변경 ---
function navigateCalendar(direction) {
  const scale = state.timelineScale || 'month';
  if (scale === 'today') {
    state.currentDate.setDate(state.currentDate.getDate() + direction);
  } else if (scale === 'year') {
    state.currentDate.setFullYear(state.currentDate.getFullYear() + direction);
  } else {
    state.currentDate.setMonth(state.currentDate.getMonth() + direction);
  }
  renderApp();
}

function switchView(view) {
  state.currentView = view;

  // 버튼 활성화 클래스 조절
  document.getElementById('view-btn-timeline').classList.toggle('active', view === 'timeline');
  document.getElementById('view-btn-report').classList.toggle('active', view === 'report');
  document.getElementById('view-btn-invoice').classList.toggle('active', view === 'invoice');
  document.getElementById('view-btn-completed').classList.toggle('active', view === 'completed');

  // 제목 변경
  if (view === 'timeline') {
    document.getElementById('main-view-title').textContent = '팀원 스케줄 타임라인';
  } else if (view === 'report') {
    document.getElementById('main-view-title').textContent = '팀원 주간업무보고';
  } else if (view === 'invoice') {
    document.getElementById('main-view-title').textContent = '세금계산서 발행현황';
  } else if (view === 'completed') {
    document.getElementById('main-view-title').textContent = '프로젝트 완료 현황';
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

  // 팀원 선택 옵션 동적 채우기
  assigneeSelect.innerHTML = '';
  if (state.members.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = '(등록된 팀원 없음)';
    assigneeSelect.appendChild(opt);
  } else {
    state.members.forEach(member => {
      const opt = document.createElement('option');
      opt.value = member.id;
      opt.textContent = member.name;
      assigneeSelect.appendChild(opt);
    });
  }

  if (eventId) {
    // 수정 모드
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
    // 신규 추가 모드
    document.getElementById('event-modal-title').textContent = '새 일정 등록';
    deleteBtn.style.display = 'none';
    document.getElementById('event-id').value = '';

    // 기본 날짜 바인딩
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

function handleEventSubmit(e) {
  e.preventDefault();

  if (state.members.length === 0) {
    alert('일정을 등록하려면 먼저 최소 1명의 팀원을 사이드바에서 등록해야 합니다.');
    return;
  }

  const id = document.getElementById('event-id').value;
  const title = document.getElementById('event-title').value.trim();
  const startDate = document.getElementById('event-start-date').value;
  const startTime = document.getElementById('event-start-time').value;
  const endDate = document.getElementById('event-end-date').value;
  const endTime = document.getElementById('event-end-time').value;
  const assignee = document.getElementById('event-assignee').value;
  const category = document.getElementById('event-category').value;
  const priority = document.getElementById('event-priority').value;
  const description = document.getElementById('event-desc').value.trim();

  // 날짜 정합성 검사
  if (startDate > endDate || (startDate === endDate && startTime > endTime)) {
    alert('종료 시간은 시작 시간보다 빠를 수 없습니다.');
    return;
  }

  if (id) {
    // 수정 완료 처리
    const eventIndex = state.events.findIndex(e => e.id === id);
    if (eventIndex > -1) {
      state.events[eventIndex] = {
        id, title, startDate, startTime, endDate, endTime, assignee, category, priority, description
      };
      showToast('일정이 수정되었습니다.');
    }
  } else {
    // 새 일정 등록 처리
    const newEvent = {
      id: 'e_' + Date.now(),
      title, startDate, startTime, endDate, endTime, assignee, category, priority, description
    };
    state.events.push(newEvent);
    showToast('새 일정이 정상 등록되었습니다.');
  }

  saveData();
  closeEventModal();
  renderApp();
}

function handleDeleteEvent() {
  const id = document.getElementById('event-id').value;
  if (!id) return;

  if (confirm('이 일정을 삭제하시겠습니까?')) {
    state.events = state.events.filter(e => e.id !== id);
    saveData();
    closeEventModal();
    renderApp();
    showToast('일정이 삭제되었습니다.');
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

  // 색상 팔레트 그리기
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
    // 수정 모드
    document.getElementById('member-modal-title').textContent = '팀원 정보 수정';
    deleteBtn.style.display = 'block';

    const member = state.members.find(m => m.id === memberId);
    if (member) {
      document.getElementById('member-id').value = member.id;
      nameInput.value = member.name;
      roleInput.value = member.role || '';
      colorInput.value = member.color;

      // 선택된 컬러 표시
      const targetOption = Array.from(paletteContainer.children).find(child => child.dataset.color === member.color);
      if (targetOption) {
        targetOption.classList.add('selected');
      }
    }
  } else {
    // 추가 모드
    document.getElementById('member-modal-title').textContent = '새 팀원 추가';
    deleteBtn.style.display = 'none';
    document.getElementById('member-id').value = '';

    // 기본 컬러 선택
    const randomColor = COLOR_PALETTE[state.members.length % COLOR_PALETTE.length];
    colorInput.value = randomColor;
    const targetOption = Array.from(paletteContainer.children).find(child => child.dataset.color === randomColor);
    if (targetOption) {
      targetOption.classList.add('selected');
    }
  }

  modal.classList.add('active');
}

function closeMemberModal() {
  document.getElementById('modal-member').classList.remove('active');
}

function handleMemberSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('member-id').value;
  const name = document.getElementById('member-name').value.trim();
  const role = document.getElementById('member-role').value.trim();
  const color = document.getElementById('member-color').value;

  if (id) {
    // 팀원 수정
    const index = state.members.findIndex(m => m.id === id);
    if (index > -1) {
      state.members[index] = { id, name, role, color };
      showToast('팀원 정보가 변경되었습니다.');
    }
  } else {
    // 신규 추가
    const newId = 'm_' + Date.now();
    state.members.push({ id: newId, name, role, color });
    // 필터에도 바로 체크상태로 추가
    state.filters.memberIds.push(newId);
    showToast('새 팀원이 등록되었습니다.');
  }

  saveData();
  closeMemberModal();
  renderApp();
}

function handleDeleteMember() {
  const id = document.getElementById('member-id').value;
  if (!id) return;

  // 팀원이 배정된 일정이 있는지 확인
  const hasEvents = state.events.some(e => e.assignee === id);
  const hasReports = state.reports.some(r => r.assignee === id);
  const warningMsg = (hasEvents || hasReports)
    ? '이 팀원에 배정된 일정이나 등록된 프로젝트가 존재합니다. 팀원을 삭제하면 배정된 모든 데이터도 함께 삭제됩니다. 계속하시겠습니까?'
    : '정말 이 팀원을 삭제하시겠습니까?';

  if (confirm(warningMsg)) {
    state.members = state.members.filter(m => m.id !== id);
    state.events = state.events.filter(e => e.assignee !== id); // 일정 제거
    state.reports = state.reports.filter(r => r.assignee !== id); // 업무보고 제거
    state.filters.memberIds = state.filters.memberIds.filter(mid => mid !== id); // 필터 제거

    saveData();
    closeMemberModal();
    renderApp();
    showToast('팀원이 목록에서 제거되었습니다.');
  }
}

// --- 데이터 백업: 내보내기 (JSON 다운로드) ---
function exportData() {
  const dataStr = JSON.stringify({
    members: state.members,
    events: state.events,
    reports: state.reports
  }, null, 2);

  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  const dateStr = getNormalizedDateString(new Date()).replace(/-/g, '');
  a.download = `teamscheduler_backup_${dateStr}.json`;
  a.click();

  URL.revokeObjectURL(url);
  showToast('데이터 백업 파일이 다운로드되었습니다.');
}

// --- 데이터 백업: 가져오기 (JSON 업로드) ---
function importData(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const data = JSON.parse(event.target.result);
      if (Array.isArray(data.members) && Array.isArray(data.events)) {
        if (confirm('백업 파일을 가져오면 현재 저장된 모든 데이터가 덮어씌워집니다. 진행하시겠습니까?')) {
          state.members = data.members;
          state.events = data.events;
          state.reports = Array.isArray(data.reports) ? data.reports : [];
          state.filters.memberIds = state.members.map(m => m.id);

          saveData();
          renderApp();
          showToast('성공적으로 데이터를 복원했습니다.');
        }
      } else {
        alert('올바른 백업 파일 형식이 아닙니다.');
      }
    } catch (err) {
      alert('파일을 읽는 도중 오류가 발생했습니다: ' + err.message);
    }
  };
  reader.readAsText(file);
  // 연속 선택을 위해 input 초기화
  e.target.value = '';
}

// --- 전체 데이터 초기화 ---
function resetData() {
  const password = prompt('데이터 초기화를 위해 관리자 비밀번호를 입력해주세요:');
  if (password === null) return; // 취소

  if (password !== '23421342') {
    alert('비밀번호가 일치하지 않습니다. 관리자 권한이 없습니다.');
    return;
  }

  if (confirm('주의: 로컬에 저장된 모든 데이터가 초기화되고 데모 데이터로 재설정됩니다. 진행할까요?')) {
    localStorage.removeItem('ts_members');
    localStorage.removeItem('ts_events');
    localStorage.removeItem('ts_reports');
    loadData();
    renderApp();
    showToast('기본 데모 데이터로 초기화 완료.');
  }
}

// --- 알림 (Toast) 메시지 유틸리티 ---
function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // 리플로우 강제 유도 후 트랜지션
  setTimeout(() => toast.classList.add('show'), 50);

  // 3초 후 엘리먼트 제거
  setTimeout(() => {
    toast.classList.remove('show');
    toast.addEventListener('transitionend', () => toast.remove());
  }, 3000);
}

// --- 헬퍼 함수 목록 ---

// 날짜를 YYYY-MM-DD 스트링으로 반환 (로컬 타임존 반영)
function getNormalizedDateString(date) {
  const offset = date.getTimezoneOffset();
  const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
  return adjustedDate.toISOString().split('T')[0];
}

// 등록된 프로젝트가 1주일(7일) 이내인지 판단
function isNewProject(createdAt) {
  if (!createdAt) return false;
  const createdTime = new Date(createdAt).getTime();
  const todayTime = new Date(getNormalizedDateString(new Date())).getTime();
  const diffDays = (todayTime - createdTime) / (1000 * 60 * 60 * 24);
  return diffDays >= 0 && diffDays <= 7;
}

// 오늘 여부 검사
function checkIfToday(year, month, day) {
  const today = new Date();
  return today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
}

// HEX 색상을 RGBA 문자열로 변환 (알파값 적용)
function hexToRgba(hex, alpha) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// XSS 방지를 위한 HTML 이스케이프
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g,
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// --- 주간 업무보고서 (Weekly Report) 뷰 렌더링 ---
function renderReportView() {
  const tableBody = document.getElementById('report-table-body');
  tableBody.innerHTML = '';

  // 작성자 필터 옵션 동적 설정
  const selectAssignee = document.getElementById('filter-report-assignee');
  if (selectAssignee) {
    const currentSelected = state.filters.reportAssignee || 'all';
    selectAssignee.innerHTML = '<option value="all">전체 작성자</option>';
    state.members.forEach(member => {
      const opt = document.createElement('option');
      opt.value = member.id;
      opt.textContent = member.name;
      if (member.id === currentSelected) {
        opt.selected = true;
      }
      selectAssignee.appendChild(opt);
    });
  }

  // 사이드바 멤버, 기간, 업체 체크 목록에 따라 필터링 (최종 완료 프로젝트 제외)
  const filteredReports = state.reports.filter(report => {
    if (report.finalCompleted) {
      return false;
    }
    if (!state.filters.memberIds.includes(report.assignee)) {
      return false;
    }
    if (state.filters.startDate && report.endDate < state.filters.startDate) {
      return false;
    }
    if (state.filters.endDate && report.startDate > state.filters.endDate) {
      return false;
    }
    if (state.filters.client !== 'all' && report.client !== state.filters.client) {
      return false;
    }
    // 작성자 필터링 조건 추가
    if (state.filters.reportAssignee && state.filters.reportAssignee !== 'all') {
      if (report.assignee !== state.filters.reportAssignee) {
        return false;
      }
    }
    return true;
  });

  // 작성자 기준 정렬 (팀원 목록 순서) 및 2차로 시작일자 내림차순
  filteredReports.sort((a, b) => {
    const indexA = state.members.findIndex(m => m.id === a.assignee);
    const indexB = state.members.findIndex(m => m.id === b.assignee);
    const valA = indexA === -1 ? Infinity : indexA;
    const valB = indexB === -1 ? Infinity : indexB;
    if (valA !== valB) {
      return valA - valB;
    }
    return b.startDate.localeCompare(a.startDate);
  });

  const totalItems = filteredReports.length;
  const pageSize = state.pagination.report.pageSize;
  const totalPages = Math.ceil(totalItems / pageSize);

  if (state.pagination.report.currentPage > totalPages) {
    state.pagination.report.currentPage = Math.max(1, totalPages);
  }
  const currentPage = state.pagination.report.currentPage;

  const start = (currentPage - 1) * pageSize;
  const pageReports = filteredReports.slice(start, start + pageSize);

  if (pageReports.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="10" style="text-align: center; padding: 3rem; color: var(--text-muted);">
          등록된 프로젝트가 없거나 필터링되었습니다.
        </td>
      </tr>
    `;
    document.getElementById('report-pagination').innerHTML = '';
    return;
  }

  pageReports.forEach(report => {
    const member = state.members.find(m => m.id === report.assignee);
    const memberName = member ? member.name : '미배정';
    const memberColor = member ? member.color : '#94a3b8';

    // 진행 상태 매핑
    let statusLabel = '대기';
    let statusClass = 'status-pending';
    if (report.status === 'ongoing') {
      statusLabel = '진행중';
      statusClass = 'status-ongoing';
    } else if (report.status === 'completed') {
      statusLabel = '완료';
      statusClass = 'status-completed';
    } else if (report.status === 'suspended') {
      statusLabel = '보류';
      statusClass = 'status-suspended';
    }

    // 금액 천단위 쉼표 포맷팅
    const formattedAmount = Number(report.amount).toLocaleString();

    const progressClass = report.progressModified ? 'progress-text modified-text' : 'progress-text';
    const remarksClass = report.remarksModified ? 'modified-text' : '';

    let confirmBtn = '';
    if (report.progressModified || report.remarksModified) {
      confirmBtn = `
        <button class="member-action-btn confirm-report-btn" title="주간보고 확인완료" onclick="confirmReport('${report.id}')" style="color: var(--success); border-color: rgba(16, 185, 129, 0.3); margin-left: 0.25rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
      `;
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="reporter-label">
          <span class="reporter-dot" style="background-color: ${memberColor};"></span>
          <span>${escapeHTML(memberName)}</span>
        </div>
      </td>
      <td class="${isNewProject(report.createdAt) ? 'new-project-name' : ''}" style="font-weight: 600;">${escapeHTML(report.project)}</td>
      <td>${escapeHTML(report.client)}</td>
      <td style="font-family: var(--font-heading); font-size: 0.8rem;">${report.startDate}</td>
      <td style="font-family: var(--font-heading); font-size: 0.8rem;">${report.endDate}</td>
      <td style="vertical-align: middle;">
        <div style="text-align: right; width: fit-content; margin: 0 auto; font-weight: 500; font-family: var(--font-heading); min-width: 60px;">
          ${formattedAmount}
        </div>
      </td>
      <td>
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${report.progress}%;"></div>
        </div>
        <span class="${progressClass}">${report.progress}%</span>
      </td>
      <td>
        <span class="status-badge ${statusClass}">${statusLabel}</span>
      </td>
      <td class="${remarksClass}" style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHTML(report.remarks || '')}">
        ${escapeHTML(report.remarks || '-')}
      </td>
      <td>
        <div style="display: flex; align-items: center;">
          <button class="member-action-btn" title="프로젝트 수정/상세" onclick="openReportModal('${report.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z"></path>
            </svg>
          </button>
          ${confirmBtn}
        </div>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  renderPagination('report-pagination', currentPage, totalPages, 'window.changeReportPage');
}

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

  // 팀원 목록 채우기
  assigneeSelect.innerHTML = '';
  if (state.members.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = '(등록된 팀원 없음)';
    assigneeSelect.appendChild(opt);
  } else {
    state.members.forEach(member => {
      const opt = document.createElement('option');
      opt.value = member.id;
      opt.textContent = member.name;
      assigneeSelect.appendChild(opt);
    });
  }

  if (reportId) {
    // 수정 모드
    document.getElementById('report-modal-title').textContent = '프로젝트 정보 수정 및 상세';
    deleteBtn.style.display = 'block';
    completeBtn.style.display = 'block';

    const report = state.reports.find(r => r.id === reportId);
    if (report) {
      document.getElementById('report-id').value = report.id;
      assigneeSelect.value = report.assignee;
      projectInput.value = report.project;
      clientInput.value = report.client;
      amountInput.value = report.amount;
      startDateInput.value = report.startDate;
      endDateInput.value = report.endDate;
      progressInput.value = report.progress;
      statusSelect.value = report.status;
      remarksInput.value = report.remarks || '';
    }
  } else {
    // 추가 모드
    document.getElementById('report-modal-title').textContent = '새 프로젝트 등록';
    deleteBtn.style.display = 'none';
    completeBtn.style.display = 'none';
    document.getElementById('report-id').value = '';

    // 기본 날짜 바인딩 (오늘 날짜)
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

function handleReportSubmit(e) {
  e.preventDefault();

  if (state.members.length === 0) {
    alert('팀원이 존재하지 않아 프로젝트를 등록할 수 없습니다.');
    return;
  }

  const id = document.getElementById('report-id').value;
  const assignee = document.getElementById('report-assignee').value;
  const project = document.getElementById('report-project').value.trim();
  const client = document.getElementById('report-client').value.trim();
  const amount = Number(document.getElementById('report-amount').value);
  const startDate = document.getElementById('report-start-date').value;
  const endDate = document.getElementById('report-end-date').value;
  const progress = Number(document.getElementById('report-progress').value);
  const status = document.getElementById('report-status').value;
  const remarks = document.getElementById('report-remarks').value.trim();

  if (startDate > endDate) {
    alert('종료일은 시작일보다 빠를 수 없습니다.');
    return;
  }

  let targetReport;

  if (id) {
    // 수정 완료
    const reportIndex = state.reports.findIndex(r => r.id === id);
    if (reportIndex > -1) {
      const prevReport = state.reports[reportIndex];
      const isProgressChanged = Number(prevReport.progress) !== Number(progress);
      const isRemarksChanged = prevReport.remarks !== remarks;

      targetReport = {
        id, assignee, project, client, amount, startDate, endDate, progress, status, remarks,
        invoiceStatus: prevReport.invoiceStatus || 'unissued',
        invoiceDate: prevReport.invoiceDate || '',
        invoiceRemarks: prevReport.invoiceRemarks || '',
        invoices: prevReport.invoices || [
          { status: 'unissued', amount: 0, date: '' },
          { status: 'unissued', amount: 0, date: '' },
          { status: 'unissued', amount: 0, date: '' },
          { status: 'unissued', amount: 0, date: '' },
          { status: 'unissued', amount: 0, date: '' }
        ],
        progressModified: isProgressChanged ? true : (prevReport.progressModified || false),
        remarksModified: isRemarksChanged ? true : (prevReport.remarksModified || false),
        finalCompleted: prevReport.finalCompleted || false,
        createdAt: prevReport.createdAt || getNormalizedDateString(new Date())
      };
      state.reports[reportIndex] = targetReport;
      syncReportToEvent(targetReport);
      showToast('프로젝트 일정이 수정되었습니다.');
    }
  } else {
    // 신규 작성
    const newReportId = 'r_' + Date.now();
    targetReport = {
      id: newReportId,
      assignee, project, client, amount, startDate, endDate, progress, status, remarks,
      invoiceStatus: 'unissued',
      invoiceDate: '',
      invoiceRemarks: '',
      invoices: [
        { status: 'unissued', amount: 0, date: '' },
        { status: 'unissued', amount: 0, date: '' },
        { status: 'unissued', amount: 0, date: '' },
        { status: 'unissued', amount: 0, date: '' },
        { status: 'unissued', amount: 0, date: '' }
      ],
      progressModified: false,
      remarksModified: false,
      finalCompleted: false,
      createdAt: getNormalizedDateString(new Date())
    };
    state.reports.push(targetReport);
    syncReportToEvent(targetReport);
    showToast('새 프로젝트 일정이 등록되었습니다.');
  }

  saveData();
  closeReportModal();
  renderApp();
}

function handleDeleteReport() {
  const id = document.getElementById('report-id').value;
  if (!id) return;

  if (confirm('이 프로젝트를 삭제하시겠습니까?')) {
    state.reports = state.reports.filter(r => r.id !== id);
    deleteLinkedEvent(id);
    saveData();
    closeReportModal();
    renderApp();
    showToast('프로젝트 일정이 삭제되었습니다.');
  }
}

// --- 업무보고 스케줄 연동 유틸리티 ---
function syncReportToEvent(report) {
  if (report.finalCompleted) {
    deleteLinkedEvent(report.id);
    return;
  }
  const eventId = 'e_r_' + report.id;
  const existingEventIndex = state.events.findIndex(e => e.id === eventId);
  const title = `[프로젝트] ${report.project}`;

  if (existingEventIndex > -1) {
    state.events[existingEventIndex].title = title;
    state.events[existingEventIndex].startDate = report.startDate;
    state.events[existingEventIndex].endDate = report.endDate;
    state.events[existingEventIndex].assignee = report.assignee;
    state.events[existingEventIndex].category = 'project';
    state.events[existingEventIndex].client = report.client;
    state.events[existingEventIndex].description = `프로젝트 연동 일정 (${report.client})`;
  } else {
    const newEvent = {
      id: eventId,
      title: title,
      startDate: report.startDate,
      startTime: '09:00',
      endDate: report.endDate,
      endTime: '18:00',
      assignee: report.assignee,
      category: 'project',
      priority: 'medium',
      client: report.client,
      description: `프로젝트 연동 일정 (${report.client})`
    };
    state.events.push(newEvent);
  }
}

function deleteLinkedEvent(reportId) {
  const eventId = 'e_r_' + reportId;
  state.events = state.events.filter(e => e.id !== eventId);
}

const expandedInvoiceIds = new Set();

// --- 세금계산서 발행 관리 뷰 렌더링 ---
function renderInvoiceView() {
  const tableBody = document.getElementById('invoice-table-body');
  tableBody.innerHTML = '';

  // 상태가 'completed' 또는 'ongoing'인 보고서 필터링 (사이드바 멤버 체크 목록 반영)
  const filteredReports = state.reports.filter(report => {
    if (report.status !== 'completed' && report.status !== 'ongoing') {
      return false;
    }
    if (!state.filters.memberIds.includes(report.assignee)) {
      return false;
    }
    if (state.filters.startDate && report.endDate < state.filters.startDate) {
      return false;
    }
    if (state.filters.endDate && report.startDate > state.filters.endDate) {
      return false;
    }
    if (state.filters.client !== 'all' && report.client !== state.filters.client) {
      return false;
    }
    // 연도 필터 적용
    if (state.filters.invoiceYear !== 'all') {
      const year = report.startDate ? report.startDate.substring(0, 4) : '';
      if (year !== state.filters.invoiceYear) {
        return false;
      }
    }
    return true;
  });

  // 세금계산서 발행 통계 합계 계산
  let sumTotal = 0;
  let sumIssued = 0;
  let sumUnissued = 0;

  filteredReports.forEach(r => {
    const totalAmt = Number(r.amount) || 0;
    sumTotal += totalAmt;

    let projIssued = 0;
    if (r.invoices && Array.isArray(r.invoices)) {
      r.invoices.forEach(inv => {
        if (inv.status === 'issued') {
          projIssued += Number(inv.amount) || 0;
        }
      });
    }
    sumIssued += projIssued;
  });
  sumUnissued = sumTotal - sumIssued;

  const domTotal = document.getElementById('invoice-sum-total');
  const domIssued = document.getElementById('invoice-sum-issued');
  const domUnissued = document.getElementById('invoice-sum-unissued');
  if (domTotal && domIssued && domUnissued) {
    domTotal.textContent = sumTotal.toLocaleString() + ' 만원';
    domIssued.textContent = sumIssued.toLocaleString() + ' 만원';
    domUnissued.textContent = sumUnissued.toLocaleString() + ' 만원';
  }

  // 정렬: 잔금이 있는 프로젝트 우선, 두 번째는 종료일 기준 내림차순 (최신 프로젝트 우선)
  filteredReports.sort((a, b) => {
    const getBalance = (r) => {
      const totalAmt = Number(r.amount) || 0;
      let projIssued = 0;
      if (r.invoices && Array.isArray(r.invoices)) {
        r.invoices.forEach(inv => {
          if (inv.status === 'issued') projIssued += Number(inv.amount) || 0;
        });
      }
      return totalAmt - projIssued;
    };

    const balanceA = getBalance(a);
    const balanceB = getBalance(b);

    const hasBalanceA = balanceA > 0;
    const hasBalanceB = balanceB > 0;

    if (hasBalanceA && !hasBalanceB) {
      return -1;
    }
    if (!hasBalanceA && hasBalanceB) {
      return 1;
    }

    // 종료일 기준 내림차순 정렬
    return b.endDate.localeCompare(a.endDate);
  });

  const totalItems = filteredReports.length;
  const pageSize = state.pagination.invoice.pageSize;
  const totalPages = Math.ceil(totalItems / pageSize);

  if (state.pagination.invoice.currentPage > totalPages) {
    state.pagination.invoice.currentPage = Math.max(1, totalPages);
  }
  const currentPage = state.pagination.invoice.currentPage;

  const start = (currentPage - 1) * pageSize;
  const pageReports = filteredReports.slice(start, start + pageSize);

  if (pageReports.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; padding: 3rem; color: var(--text-muted);">
          조회 가능한 프로젝트가 없거나 필터링되었습니다.
        </td>
      </tr>
    `;
    document.getElementById('invoice-pagination').innerHTML = '';
    return;
  }

  pageReports.forEach(report => {
    const member = state.members.find(m => m.id === report.assignee);
    const memberName = member ? member.name : '미배정';
    const memberColor = member ? member.color : '#94a3b8';

    const totalAmount = Number(report.amount) || 0;

    let totalIssued = 0;
    if (report.invoices && Array.isArray(report.invoices)) {
      report.invoices.forEach(inv => {
        if (inv.status === 'issued') {
          totalIssued += Number(inv.amount) || 0;
        }
      });
    }
    const balance = totalAmount - totalIssued;

    let statusLabel = '진행중';
    let statusClass = 'status-ongoing';
    if (report.status === 'completed') {
      statusLabel = '완료';
      statusClass = 'status-completed';
    }

    const isExpanded = expandedInvoiceIds.has(report.id);
    const chevronTransform = isExpanded ? 'transform: rotate(180deg);' : '';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="reporter-label">
          <span class="reporter-dot" style="background-color: ${memberColor};"></span>
          <span>${escapeHTML(memberName)}</span>
        </div>
      </td>
      <td style="font-weight: 600;">${escapeHTML(report.project)}</td>
      <td>${escapeHTML(report.client)}</td>
      <td style="font-family: var(--font-heading); font-size: 0.8rem;">${report.endDate}</td>
      <td style="text-align: right; font-weight: 500; font-family: var(--font-heading);">${totalAmount.toLocaleString()}</td>
      <td>
        <span class="status-badge ${statusClass}">${statusLabel}</span>
      </td>
      <td style="text-align: right; font-weight: 600; font-family: var(--font-heading); color: var(--success);">${totalIssued.toLocaleString()}</td>
      <td style="text-align: right; font-weight: 600; font-family: var(--font-heading); color: ${balance > 0 ? '#ef4444' : 'var(--success)'};">${balance.toLocaleString()}</td>
      <td>
        <button class="btn-secondary toggle-expand-btn" onclick="toggleInvoiceExpand('${report.id}')" style="width: auto; padding: 0.35rem 0.75rem; font-size: 0.8rem; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px;">
          <span>발행 관리</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="chevron-icon" style="transition: transform 0.2s; ${chevronTransform}">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </td>
    `;
    tableBody.appendChild(tr);

    const expandTr = document.createElement('tr');
    expandTr.className = 'invoice-expand-row';
    expandTr.id = `invoice-expand-${report.id}`;
    expandTr.style.display = isExpanded ? 'table-row' : 'none';
    expandTr.style.background = 'var(--bg-hover)';

    expandTr.innerHTML = `
      <td colspan="9" style="padding: 1rem 1.5rem; background: var(--bg-hover);">
        <div class="invoice-expand-card" style="background: var(--bg-card); border-radius: 12px; border: 1px solid var(--border-color); padding: 1.25rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 1rem;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
              <span style="font-weight: 600; font-size: 0.95rem; color: var(--text-primary);">[${escapeHTML(report.project)}] 발행 회차별 상세 내역</span>
              <span style="font-size: 0.75rem; color: var(--text-secondary);">(고객사: ${escapeHTML(report.client)})</span>
            </div>
            <div style="display: flex; gap: 1rem; font-size: 0.85rem; font-weight: 600; flex-wrap: wrap;">
              <span style="color: var(--text-secondary);">총 금액: <strong style="color: var(--text-primary); font-family: var(--font-heading);">${totalAmount.toLocaleString()} 만원</strong></span>
              <span style="color: var(--success);">총 발행액: <strong style="font-family: var(--font-heading);">${totalIssued.toLocaleString()} 만원</strong></span>
              <span>잔금: <strong style="color: ${balance > 0 ? '#ef4444' : 'var(--success)'}; font-family: var(--font-heading);">${balance.toLocaleString()} 만원</strong></span>
            </div>
          </div>

          <div class="stage-grid" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem;">
            ${[0, 1, 2, 3, 4].map(idx => {
      const inv = report.invoices[idx];
      const isIssued = inv.status === 'issued';
      return `
                <div class="stage-card" style="border: 1px solid ${isIssued ? 'rgba(16, 185, 129, 0.2)' : 'var(--border-color)'}; background: ${isIssued ? 'rgba(16, 185, 129, 0.02)' : 'transparent'}; border-radius: 10px; padding: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem; min-width: 130px;">
                  <div style="font-weight: 600; font-size: 0.8rem; color: ${isIssued ? 'var(--success)' : 'var(--text-secondary)'}; display: flex; justify-content: space-between; align-items: center; gap: 0.25rem;">
                    <span style="white-space: nowrap;">${idx + 1}차 발행</span>
                    <select class="invoice-status-select ${inv.status}" style="font-size: 0.7rem; padding: 0.2rem 0.4rem; border-radius: 12px;" onchange="updateInvoiceStage('${report.id}', ${idx}, 'status', this.value)">
                      <option value="unissued" ${inv.status === 'unissued' ? 'selected' : ''}>미발행</option>
                      <option value="issued" ${inv.status === 'issued' ? 'selected' : ''}>발행완료</option>
                    </select>
                  </div>
                  
                  <div class="form-group" style="gap: 0.2rem;">
                    <label style="font-size: 0.65rem; color: var(--text-muted); font-weight: 500;">발행 금액 (만원)</label>
                    <input type="number" class="invoice-remarks-input" min="0" value="${inv.amount || 0}" style="padding: 0.25rem 0.4rem; font-size: 0.75rem; font-family: var(--font-heading);" onchange="updateInvoiceStage('${report.id}', ${idx}, 'amount', this.value)">
                  </div>

                  <div class="form-group" style="gap: 0.2rem;">
                    <label style="font-size: 0.65rem; color: var(--text-muted); font-weight: 500;">발행 일자</label>
                    <input type="date" class="invoice-date-input" value="${inv.date || ''}" ${inv.status === 'unissued' ? 'disabled' : ''} style="padding: 0.25rem 0.4rem; font-size: 0.75rem; width: 100%; border-radius: 6px;" onchange="updateInvoiceStage('${report.id}', ${idx}, 'date', this.value)">
                  </div>
                </div>
              `;
    }).join('')}
          </div>

          <div style="display: flex; gap: 0.5rem; align-items: center; margin-top: 0.25rem;">
            <label style="font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); white-space: nowrap;">계산서 비고:</label>
            <input type="text" class="invoice-remarks-input" value="${escapeHTML(report.invoiceRemarks || '')}" placeholder="비고 내용을 입력하고 엔터를 누르거나 포커스를 해제하면 자동 저장됩니다." onchange="handleInvoiceRemarksChange('${report.id}', this.value)" style="flex: 1; padding: 0.35rem 0.6rem; font-size: 0.8rem; border-radius: 6px;">
          </div>

        </div>
      </td>
    `;
    tableBody.appendChild(expandTr);
  });

  renderPagination('invoice-pagination', currentPage, totalPages, 'window.changeInvoicePage');
}

// --- 공통 페이지네이션 렌더링 함수 ---
function renderPagination(containerId, currentPage, totalPages, onPageChangeName) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = `
    <button class="btn-nav" ${currentPage === 1 ? 'disabled' : ''} onclick="${onPageChangeName}(${currentPage - 1})">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
    <span class="pagination-info" style="font-family: var(--font-heading); font-size: 0.85rem; font-weight: 500; color: var(--text-secondary); margin: 0 1rem;">
      ${currentPage} / ${totalPages} 페이지
    </span>
    <button class="btn-nav" ${currentPage === totalPages ? 'disabled' : ''} onclick="${onPageChangeName}(${currentPage + 1})">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>
  `;
}

// --- 사이드바 고객사(업체) 목록 업데이트 ---
function updateClientFilterDropdown() {
  const select = document.getElementById('filter-client');
  if (!select) return;

  const currentSelected = state.filters.client;

  // unique client names from reports
  const clients = [...new Set(state.reports.map(r => r.client).filter(c => c))];
  clients.sort();

  select.innerHTML = '<option value="all">전체 업체</option>';
  clients.forEach(client => {
    const opt = document.createElement('option');
    opt.value = client;
    opt.textContent = client;
    if (client === currentSelected) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });

  // 선택되어 있던 고객사가 더 이상 존재하지 않으면 'all'로 롤백
  if (currentSelected !== 'all' && !clients.includes(currentSelected)) {
    state.filters.client = 'all';
    select.value = 'all';
  }
}

// --- 세금계산서 및 완료현황 연도 목록 업데이트 ---
function updateYearFilterDropdown() {
  // 1. 세금계산서 연도 필터
  const selectInvoice = document.getElementById('filter-invoice-year');
  if (selectInvoice) {
    const currentSelected = state.filters.invoiceYear;
    const years = [...new Set(state.reports.map(r => r.startDate ? r.startDate.substring(0, 4) : null).filter(y => y))];
    years.sort((a, b) => b.localeCompare(a));

    selectInvoice.innerHTML = '<option value="all">전체 연도</option>';
    years.forEach(year => {
      const opt = document.createElement('option');
      opt.value = year;
      opt.textContent = `${year}년`;
      if (year === currentSelected) opt.selected = true;
      selectInvoice.appendChild(opt);
    });
    if (currentSelected !== 'all' && !years.includes(currentSelected)) {
      state.filters.invoiceYear = 'all';
      selectInvoice.value = 'all';
    }
  }

  // 2. 프로젝트 완료 현황 연도 필터
  const selectCompleted = document.getElementById('filter-completed-year');
  if (selectCompleted) {
    const currentSelected = state.filters.completedYear;
    const completedReports = state.reports.filter(r => r.finalCompleted);
    const years = [...new Set(completedReports.map(r => r.startDate ? r.startDate.substring(0, 4) : null).filter(y => y))];
    years.sort((a, b) => b.localeCompare(a));

    selectCompleted.innerHTML = '<option value="all">전체 연도</option>';
    years.forEach(year => {
      const opt = document.createElement('option');
      opt.value = year;
      opt.textContent = `${year}년`;
      if (year === currentSelected) opt.selected = true;
      selectCompleted.appendChild(opt);
    });
    if (currentSelected !== 'all' && !years.includes(currentSelected)) {
      state.filters.completedYear = 'all';
      selectCompleted.value = 'all';
    }
  }
}

// 필터 작동 시 페이지 1로 리셋
function resetPaginationPages() {
  state.pagination.report.currentPage = 1;
  state.pagination.invoice.currentPage = 1;
  state.pagination.completed.currentPage = 1;
}

// 글로벌 핸들러로 등록하여 inline 속성에서 접근 가능하게 설정
window.changeReportPage = function (page) {
  state.pagination.report.currentPage = page;
  renderReportView();
};

window.changeInvoicePage = function (page) {
  state.pagination.invoice.currentPage = page;
  renderInvoiceView();
};

window.handleInvoiceStatusChange = function (reportId, newStatus) {
  const report = state.reports.find(r => r.id === reportId);
  if (report) {
    report.invoiceStatus = newStatus;
    if (newStatus === 'unissued') {
      report.invoiceDate = '';
    }
    saveData();
    renderInvoiceView();
    showToast(`세금계산서 상태가 [${newStatus === 'issued' ? '발행완료' : '미발행'}]으로 변경되었습니다.`);
  }
};

window.handleInvoiceDateChange = function (reportId, newDate) {
  const report = state.reports.find(r => r.id === reportId);
  if (report) {
    report.invoiceDate = newDate;
    saveData();
    showToast(`세금계산서 발행일자가 [${newDate}]로 저장되었습니다.`);
  }
};

window.handleInvoiceRemarksChange = function (reportId, newRemarks) {
  const report = state.reports.find(r => r.id === reportId);
  if (report) {
    report.invoiceRemarks = newRemarks;
    saveData();
    showToast('세금계산서 비고가 저장되었습니다.');
  }
};

// --- 프로젝트 완료 및 주간보고 확인완료 기능 ---
function handleProjectComplete() {
  const id = document.getElementById('report-id').value;
  if (!id) return;

  // 권한 확인
  const isAuthorized = confirm('프로젝트 완료 처리는 팀장 및 파트장만 권한이 있습니다. 귀하는 팀장 또는 파트장입니까?');
  if (!isAuthorized) {
    alert('팀장 및 파트장만 프로젝트 완료 처리를 수행할 수 있습니다.');
    return;
  }

  const reportIndex = state.reports.findIndex(r => r.id === id);
  if (reportIndex > -1) {
    const prevReport = state.reports[reportIndex];

    // 상태를 completed로 변경하고, 진척률도 100%로 설정하며 최종 완료 플래그 적용
    const targetReport = {
      ...prevReport,
      status: 'completed',
      progress: 100,
      finalCompleted: true,
      // 진척률과 상태가 바뀌었으므로 진척률 수정 플래그 세팅
      progressModified: Number(prevReport.progress) !== 100 ? true : (prevReport.progressModified || false)
    };

    state.reports[reportIndex] = targetReport;
    syncReportToEvent(targetReport); // 이 함수 내부에서 완료 상태 확인 후 캘린더에서 제거
    saveData();

    closeReportModal();
    switchView('completed'); // 프로젝트 완료 현황 뷰로 이동
    showToast('프로젝트 완료 처리 및 일정이 주간보고/타임라인에서 삭제되었습니다.');
  }
}

window.confirmReport = function (reportId) {
  const report = state.reports.find(r => r.id === reportId);
  if (report) {
    report.progressModified = false;
    report.remarksModified = false;
    saveData();
    renderReportView();
    showToast('수정된 내역에 대해 주간보고 확인 완료 처리되었습니다.');
  }
};

window.changeCompletedPage = function (page) {
  state.pagination.completed.currentPage = page;
  renderCompletedProjectsView();
};

// --- 프로젝트 완료 현황 뷰 렌더링 ---
function renderCompletedProjectsView() {
  const tableBody = document.getElementById('completed-projects-table-body');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  // 최종 완료(프로젝트 완료 아이콘을 클릭하여 완료 처리됨)된 프로젝트만 필터링 (사이드바 멤버 체크 목록 반영)
  const filteredReports = state.reports.filter(report => {
    if (!report.finalCompleted) {
      return false;
    }
    if (!state.filters.memberIds.includes(report.assignee)) {
      return false;
    }
    if (state.filters.startDate && report.endDate < state.filters.startDate) {
      return false;
    }
    if (state.filters.endDate && report.startDate > state.filters.endDate) {
      return false;
    }
    if (state.filters.client !== 'all' && report.client !== state.filters.client) {
      return false;
    }
    // 완료 현황 연도 필터 적용
    if (state.filters.completedYear !== 'all') {
      const year = report.startDate ? report.startDate.substring(0, 4) : '';
      if (year !== state.filters.completedYear) {
        return false;
      }
    }
    return true;
  });

  // 종료일자 기준 내림차순 정렬 (최신 프로젝트 우선)
  filteredReports.sort((a, b) => b.endDate.localeCompare(a.endDate));

  const totalItems = filteredReports.length;
  const pageSize = state.pagination.completed.pageSize;
  const totalPages = Math.ceil(totalItems / pageSize);

  if (state.pagination.completed.currentPage > totalPages) {
    state.pagination.completed.currentPage = Math.max(1, totalPages);
  }
  const currentPage = state.pagination.completed.currentPage;

  const start = (currentPage - 1) * pageSize;
  const pageReports = filteredReports.slice(start, start + pageSize);

  if (pageReports.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 3rem; color: var(--text-muted);">
          완료된 프로젝트가 없거나 필터링되었습니다.
        </td>
      </tr>
    `;
    document.getElementById('completed-pagination').innerHTML = '';
    return;
  }

  pageReports.forEach(report => {
    const member = state.members.find(m => m.id === report.assignee);
    const memberName = member ? member.name : '미배정';
    const memberColor = member ? member.color : '#94a3b8';
    const formattedAmount = Number(report.amount).toLocaleString();

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>
        <div class="reporter-label">
          <span class="reporter-dot" style="background-color: ${memberColor};"></span>
          <span>${escapeHTML(memberName)}</span>
        </div>
      </td>
      <td style="font-weight: 600;">${escapeHTML(report.project)}</td>
      <td>${escapeHTML(report.client)}</td>
      <td style="font-family: var(--font-heading); font-size: 0.8rem;">${report.startDate}</td>
      <td style="font-family: var(--font-heading); font-size: 0.8rem;">${report.endDate}</td>
      <td style="text-align: right; font-weight: 500; font-family: var(--font-heading);">${formattedAmount}</td>
      <td>
        <span class="status-badge status-completed">완료</span>
      </td>
      <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${escapeHTML(report.remarks || '')}">
        ${escapeHTML(report.remarks || '-')}
      </td>
      <td>
        <button class="member-action-btn" title="완료 프로젝트 삭제" onclick="deleteCompletedProject('${report.id}')" style="color: var(--danger); border: 1px solid rgba(239, 68, 68, 0.2); padding: 4px 8px; border-radius: 6px; font-size: 0.75rem; background: transparent; cursor: pointer; transition: all 0.2s;">
          삭제
        </button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  renderPagination('completed-pagination', currentPage, totalPages, 'window.changeCompletedPage');
}

// --- 추가 글로벌 발행 및 삭제 관리 핸들러 ---

window.toggleInvoiceExpand = function (reportId) {
  const expandRow = document.getElementById(`invoice-expand-${reportId}`);
  if (expandRow) {
    const isHidden = expandRow.style.display === 'none';
    expandRow.style.display = isHidden ? 'table-row' : 'none';

    const toggleBtn = expandRow.previousElementSibling.querySelector('.toggle-expand-btn');
    if (toggleBtn) {
      const chevron = toggleBtn.querySelector('.chevron-icon');
      if (chevron) {
        chevron.style.transform = isHidden ? 'rotate(180deg)' : 'none';
      }
    }

    if (isHidden) {
      expandedInvoiceIds.add(reportId);
    } else {
      expandedInvoiceIds.delete(reportId);
    }
  }
};

window.updateInvoiceStage = function (reportId, stageIndex, field, value) {
  const report = state.reports.find(r => r.id === reportId);
  if (report) {
    if (!report.invoices) {
      report.invoices = Array.from({ length: 5 }, () => ({ status: 'unissued', amount: 0, date: '' }));
    }

    const stage = report.invoices[stageIndex];
    if (stage) {
      if (field === 'status') {
        stage.status = value;
        if (value === 'unissued') {
          stage.date = '';
        } else {
          if (!stage.date) {
            stage.date = getNormalizedDateString(new Date());
          }
        }
      } else if (field === 'amount') {
        stage.amount = Number(value) || 0;
      } else if (field === 'date') {
        stage.date = value;
      }

      saveData();
      renderInvoiceView(); // 재렌더링하여 총액 계산 및 요약 데이터 연계 갱신
    }
  }
};

window.deleteCompletedProject = function (reportId) {
  if (confirm('정말 이 완료된 프로젝트를 삭제하시겠습니까?')) {
    state.reports = state.reports.filter(r => r.id !== reportId);
    deleteLinkedEvent(reportId);
    saveData();
    renderCompletedProjectsView();
    showToast('완료된 프로젝트가 삭제되었습니다.');
  }
};
