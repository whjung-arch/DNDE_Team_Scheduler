// =================================================================
// 🟢 [복원 완료] 외부 로컬 서버 연동을 제거하고 브라우저 자체 메모리 방식으로 원복
// =================================================================

// 1. 기본 데이터 구조 정의 (서버 대신 브라우저가 들고 있을 임시 창고)
let state = {
  members: [],
  events: [],
  reports: [],
  filters: {
    memberIds: []
  }
};

// 2. 외부 통신(fetch) 대신 자체적으로 데이터를 로드하는 함수
function loadDataFromServer() {
  console.log("로컬 서버 연동 해제: 브라우저 내부 모드로 전환합니다.");

  // 혹시 몰라 기존 로컬스토리지(브라우저 저장소)에 데이터가 있다면 꺼내옵니다.
  const savedData = localStorage.getItem('dnde_scheduler_data');
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData);
      state.members = parsed.members || [];
      state.events = parsed.events || [];
      state.reports = parsed.reports || [];
    } catch (e) {
      console.error("데이터 복구 실패:", e);
    }
  }

  // 필터 초기화 후 화면 그리기
  if (state.members.length > 0 && state.filters.memberIds.length === 0) {
    state.filters.memberIds = state.members.map(m => m.id);
  }
  renderApp();
}

// 3. 데이터를 저장할 때 호출하는 함수 (브라우저 로컬스토리지에 안전하게 임시 보관)
function saveDataToServer() {
  localStorage.setItem('dnde_scheduler_data', JSON.stringify({
    members: state.members,
    events: state.events,
    reports: state.reports
  }));
  console.log("브라우저 내부에 일정을 안전하게 임시 저장했습니다.");
}

// ... 아래의 COLOR_PALETTE, initTheme, renderApp, setupEventListeners 등 
// 기존 스케줄러의 화면 UI 관련 디자인/이벤트 코드는 그대로 유지하면 됩니다 ...